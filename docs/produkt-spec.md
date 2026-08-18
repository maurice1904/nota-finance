# Produktspezifikation — Einreichung und Verarbeitung

## Leitprinzip
**„Rechnung hochladen — sonst nichts."** Jede zusätzliche Eingabe ist eine Conversion-Bremse und
muss sich rechtfertigen. Was aus dem Dokument ableitbar ist, wird nicht gefragt.

---

## 1. Der Einreichungsvorgang (Soll)

Ein Bildschirm, keine Formularstrecke:

| # | Element | Pflicht | Anmerkung |
|---|---|---|---|
| 1 | Rechnung hochladen | ja | PDF/JPG/PNG, auch mehrere Dateien |
| 2 | E-Mail-Adresse | ja | ein Feld, Formatprüfung |
| 3 | Zustimmung AGB + Datenschutz + Auftragserteilung | ja | eine Checkbox |
| 4 | „Wurde bereits gemahnt?" ja/nein | optional | Ein-Klick, bestimmt Einstiegsstufe |

**Keine Registrierung vorab.** Konto entsteht implizit aus der E-Mail-Adresse.

**Mehrere Dateien:** gehören standardmäßig zu **einem** Fall (typisch: Rechnung + Mahnung + Vertrag).
Betrifft der Upload mehrere unabhängige Forderungen, wird das im Backoffice getrennt.

### Abweichung vom Ist-Zustand
Aktuell wird die E-Mail **zweimal** abgefragt (`email` + `emailConfirm`). Das Bestätigungsfeld entfällt;
Tippfehlerschutz entsteht über Anzeige auf der Bestätigungsseite und die Bestätigungsmail.

## 2. Was NICHT gebaut wird
- Kein Schritt, in dem der Kunde extrahierte Rechnungsdaten prüft/bestätigt
- Keine Formularabfrage von Schuldnerdaten, Betrag, Rechnungsnummer
- Kein Login-Zwang, kein Kundenkonto im MVP

Begründung: `docs/entscheidungen.md`.

---

## 3. Datenmodell (Tabelle `uploads`)

Verbindliches Zielschema. Änderungen nur mit Migration und Dokumentation hier.

| Feld | Typ | Zweck |
|---|---|---|
| `id` | uuid, PK | technischer Schlüssel |
| `aktenzeichen` | text, unique | fachliche Referenz `NF-JJJJ-####` |
| `email` | text | Kontakt des Gläubigers |
| `files` | jsonb | Liste: Originalname, Speicherpfad, Größe, MIME-Typ |
| `bereits_gemahnt` | boolean, nullable | Einstiegsstufe |
| `status` | text | siehe Statusmodell |
| `notification_status` | text | `sent` / `failed` / `retried` |
| `consent_agb_at` | timestamptz | Nachweis der Zustimmung |
| `consent_version` | text | Version der akzeptierten AGB/Datenschutzerklärung |
| `source` | text, nullable | Herkunft (Kanal/Kampagne) für die Auswertung |
| `created_at` | timestamptz | Eingang |
| `updated_at` | timestamptz | letzte Änderung |
| `deleted_at` | timestamptz, nullable | Löschvormerkung (Löschkonzept) |

**`consent_version` ist Pflicht:** Ohne sie lässt sich später nicht belegen, welchen Text der Kunde
akzeptiert hat.

### Statusmodell
`eingegangen` → `in_pruefung` → `angenommen` | `abgelehnt` → `in_bearbeitung` → `erledigt`
Jeder Wechsel mit Zeitstempel und auslösender Person im Audit-Log.

### Aktenzeichen
Format `NF-JJJJ-####`, jahresbezogen fortlaufend, **beim Absenden** erzeugt.
Umsetzung über eine **Datenbanksequenz oder atomare Funktion** — nicht über „höchsten Wert lesen und
eins addieren“ (Race Condition bei gleichzeitigen Uploads). Eindeutigkeit per DB-Constraint erzwingen.

**Wichtig — bewusste Entscheidung, Stand August 2026:** Das Aktenzeichen wird **intern** vergeben
(Datenbank, interne Mail ans Backoffice), aber dem **Kunden noch nicht in der Bestätigungsmail
mitgeteilt**. Die Bestätigungsmail an den Kunden dokumentiert nur den Eingang, ohne Aktenzeichen.
Der Kunde erhält das Aktenzeichen **separat**, sobald sein Vater den Fall geprüft hat.
**Grund:** Solange die Fallprüfung manuell erfolgt, würde ein sofort mitgeteiltes Aktenzeichen
Verbindlichkeit suggerieren, bevor der Fall tatsächlich angenommen ist. Wird geändert, sobald die
Prüfung stärker automatisiert ist (siehe `docs/entscheidungen.md`).

### Audit-Log (regulatorisch erforderlich)
Eigene Tabelle `audit_log`: Zeitpunkt, Fallbezug, Ereignis, Akteur, Zusatzdaten.
Zu protokollieren: Eingang, Statuswechsel, fachliche Freigabe, versendete Schreiben, Zugriffe auf
Falldateien, Löschläufe. **Nur anfügen, nie ändern oder löschen.**

---

## 4. Nach dem Absenden (unsichtbar für den Kunden)

1. **Serverseitige Validierung** (siehe 5), dann Speicherung in Supabase Storage,
   Bucket `invoices` (**privat**), Pfad `YYYY/MM/<uuid>.<ext>`
2. **Datenbankeintrag** inkl. Aktenzeichen — **vor** jedem Mailversand
3. **Bestätigungsmail an den Kunden** — dokumentiert den Eingang, **ohne Aktenzeichen**; nennt die nächsten Schritte
4. **Interne Benachrichtigung** ans Backoffice mit
   - Datei(en) im **Anhang** (> 10 MB: nur Link),
   - **signiertem** Download-Link, Gültigkeit 14 Tage,
   - E-Mail des Kunden, Aktenzeichen, Zeitstempel, `bereits_gemahnt`
5. **Fachliche Prüfung und Verfahrensstart erfolgen manuell** im Backoffice

---

## 5. Validierung und Missbrauchsschutz

Die API-Route ist vom Passwortschutz ausgenommen und von außen erreichbar. Erforderlich:

- **Serverseitige Prüfung** von Dateityp (Whitelist: PDF, JPG, PNG), Größe (z. B. max. 10 MB je Datei,
  30 MB gesamt) und Anzahl (z. B. max. 10). Clientseitige Prüfung allein genügt nie.
- **MIME-Typ am Dateiinhalt prüfen**, nicht nur an der Endung
- **Ratenbegrenzung** pro IP und pro E-Mail-Adresse
- **Dublettenerkennung** (gleiche E-Mail + gleicher Dateiname + kurzer Zeitraum)
- Keine Ausführung oder Vorschau hochgeladener Dateien im Browser
- Prüfung der Gläubigerstellung im Backoffice, bevor ein Verfahren startet

---

## 6. Fehlerbehandlung — kein Fall darf verschwinden

| Fehlerpunkt | Verhalten |
|---|---|
| Upload zu Storage scheitert | Fehlermeldung an den Kunden, **kein** Erfolg melden |
| Datenbankeintrag scheitert | Fehler melden, hochgeladene Datei wieder entfernen |
| Bestätigungsmail scheitert | Fall bleibt gültig, `notification_status = failed`, Wiederholung |
| Interne Mail scheitert | `notification_status = failed`, **Warnung an Ausweichadresse**, Protokolleintrag |

Dem Kunden wird **nur** Erfolg gemeldet, wenn Datei **und** Datenbankeintrag vorliegen.
Ein offener Fehlerstatus muss sichtbar werden — kein stiller Verlust.

---

## 7. Nutzerführung und Barrierefreiheit

Standard: **WCAG 2.1 AA** (Begründung: `docs/recht-und-datenschutz.md`, Abschnitt 3).

- Jedes Feld mit sichtbarem `label`; Upload-Feld auch per Tastatur bedienbar
- Fehler als Text mit klarer Handlungsanweisung, nicht nur farblich
- Sichtbarer Fokus, Kontrast ≥ 4,5:1, Zoom bis 200 %, `lang="de"`
- Ladezustand während Upload und Extraktion sichtbar
- Vertrauenselemente ohne Verlängerung des Flows: Verschlüsselungs-/DSGVO-Hinweis,
  „Für Sie kostenfrei — die gesetzlichen Kosten trägt der Schuldner“, twenty4collect als
  registrierter Rechtsdienstleister, sichtbarer Ansprechpartner

---

## 8. Backstage-Extraktion (Ausbaustufe, nicht MVP-kritisch)
Nach dem Absenden werden Rechnungsdaten maschinell ausgelesen (XRechnung/ZUGFeRD strukturiert,
PDF per OCR/Sprachmodell) und dem Backoffice **entscheidungsreif** vorgelegt.
Erkennungsfehler dürfen nie zu automatischen Rechtsfolgen führen — die Freigabe bleibt beim Menschen.

## 9. Zweiter Eingangskanal (Ausbaustufe)
Einreichung per E-Mail an `fall@notafinance.de`; Fall entsteht aus dem Anhang. Gleiche Validierung,
gleiche Statuslogik.

---

## 10. Abnahmekriterien
Eine Änderung am Einreichungsvorgang gilt erst als fertig, wenn:

1. Einreichung mit einer echten PDF funktioniert (Datei in Storage, Datensatz in DB, Aktenzeichen intern vergeben — nicht in der Kundenmail)
2. Beide E-Mails ankommen; interne Mail enthält Anhang **und** funktionierenden signierten Link
3. Ein bewusst provozierter Mailfehler den Status auf `failed` setzt und eine Warnung auslöst
4. Kein öffentlicher Storage-Link mehr erzeugt wird
5. Ein zu großer bzw. unzulässiger Dateityp **serverseitig** abgewiesen wird
6. Der Flow vollständig per Tastatur bedienbar ist
7. `npm run build` fehlerfrei durchläuft

## 11. Messgrößen
| Kennzahl | Ziel |
|---|---|
| Zeit vom Seitenaufruf bis Absenden | < 90 Sekunden |
| Aktive Eingaben | 1 Feld + 1–2 Klicks + Datei |
| Abbruchquote im Flow | < 30 % |
| Rückfragequote an Kunden | < 20 % |
| Anteil `notification_status = failed` | 0 % |
