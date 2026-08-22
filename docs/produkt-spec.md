# Produktspezifikation — Einreichung und Verarbeitung

## Leitprinzip
**„Rechnung hochladen — sonst nichts."** Jede zusätzliche Eingabe ist eine Conversion-Bremse und
muss sich rechtfertigen. Was aus dem Dokument ableitbar ist, wird nicht gefragt.

---

## 1. Der Einreichungsvorgang (Soll)

Ein Bildschirm, keine Formularstrecke:

| # | Element | Pflicht | Anmerkung |
|---|---|---|---|
| 1 | Rechnung hochladen | ja | PDF, XML (XRechnung/ZUGFeRD), JPG, PNG — auch mehrere Dateien |
| 2 | E-Mail-Adresse | ja | ein Feld, Formatprüfung |
| 3 | Zustimmung AGB + Datenschutz + Auftragserteilung | ja | eine Checkbox |
| 4 | „Wurde bereits gemahnt?" ja/nein | optional | Ein-Klick, bestimmt Einstiegsstufe |

**Keine Registrierung vorab.** Konto entsteht implizit aus der E-Mail-Adresse.

**Mehrere Dateien:** gehören standardmäßig zu **einem** Fall (typisch: Rechnung + Mahnung + Vertrag).
Betrifft der Upload mehrere unabhängige Forderungen, wird das im Backoffice getrennt.

**Fotos:** Der Kunde kann die Rechnung abfotografieren — am Handy und Tablet über einen eigenen
Knopf direkt aus der Kamera, am Rechner über die Dateiauswahl. Alle Bilder einer Einreichung
werden **serverseitig zu genau einem mehrseitigen PDF** zusammengeführt (siehe Abschnitt 4a).

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

### Aktenzeichen — NICHT Teil des Nota-Systems
**Bewusste Entscheidung, Stand August 2026:** Nota Finance vergibt **kein eigenes Aktenzeichen**.
Der Vater führt seinen eigenen Aktenzeichen-/Nummernkreis im bestehenden Backoffice-Prozess
(twenty4collect) fort und vergibt die Fallreferenz dort, sobald er den Fall prüft und übernimmt.
Ein zweiter, paralleler Nummernkreis in Nota würde nur Verwirrung stiften (zwei verschiedene
Referenznummern für denselben Fall).

**Konsequenz für Code und Datenmodell:** Kein Feld `aktenzeichen`, keine Sequenz-Logik, keine
Erwähnung in Kunden- oder interner Mail. Die eindeutige Referenz für die Zuordnung ist stattdessen
die Kombination aus `id` (technischer Schlüssel) und `created_at` bzw. die E-Mail-Adresse des Kunden.
**Falls dieser Punkt in älteren Chatverläufen oder Code-Kommentaren auftaucht: veraltet, ignorieren.**

### Audit-Log — im MVP bewusst nicht in Nota
Nota ist die Annahmestelle; die Fallbearbeitung (und damit der regulatorisch relevante Audit-Trail)
findet im Backoffice-System twenty4collect statt. Ein Nota-seitiger Audit-/Zugriffslog wird erst
relevant, sobald Nota eine eigene Backoffice-Oberfläche mit Benutzer-Logins hat (→ P2). Für das MVP
genügt: zuverlässige Speicherung des Eingangs plus Zustimmungsnachweis (`consent_at`,
`consent_version`).

## 4. Nach dem Absenden (unsichtbar für den Kunden)

1. **Serverseitige Validierung** (siehe 5), dann Speicherung in Supabase Storage,
   Bucket `invoices` (**privat**), Pfad `YYYY/MM/<uuid>.<ext>`
2. **Zusammenführung der Fotos** zu einem PDF (siehe 4a), sofern Bilder dabei sind
3. **Datenbankeintrag** — **vor** jedem Mailversand
4. **Bestätigungsmail an den Kunden** — dokumentiert den Eingang, **ohne Aktenzeichen**; nennt die nächsten Schritte
5. **Interne Benachrichtigung** ans Backoffice mit
   - Datei(en) im **Anhang** (> 10 MB: nur Link),
   - **signiertem** Download-Link, Gültigkeit 14 Tage,
   - E-Mail des Kunden, Zeitstempel, `bereits_gemahnt`
6. **Fachliche Prüfung und Verfahrensstart erfolgen manuell** im Backoffice

---

## 4a. Fotos zu einem PDF zusammenführen

**Grundsatz:** Wer eine dreiseitige Rechnung abfotografiert, reicht **ein Dokument** ein, nicht drei
lose Bilder. Das PDF ist die Verpackung, die Originalbilder bleiben der Nachweis.

| Regel | Verhalten |
|---|---|
| Alle Bilder einer Einreichung | ergeben **genau ein** mehrseitiges PDF — auch bei nur einem Foto |
| Seitenreihenfolge | Auswahlreihenfolge des Kunden |
| Hochgeladene PDF- und XML-Dateien | bleiben **unverändert** und wandern nicht in das erzeugte PDF |
| Gemischte Einreichung (z. B. 2 Fotos + 1 PDF) | ergibt zwei Dokumente: erzeugtes Foto-PDF und Original-PDF |
| Originalbilder | bleiben zusätzlich im Storage — kein interner Fehler löscht sie; planmäßige Löschung erst nach Ablauf der Aufbewahrungsfrist (P1-4) |
| Mailanhang und signierter Link | zeigen auf das **erzeugte** PDF |

**Technisch:** Der Browser lädt die Originale direkt zu Supabase; die Route
`POST /api/merge-images-to-pdf` erhält nur die Storage-Pfade, holt die Bilder mit dem
Service-Role-Key und legt das Ergebnis unter `YYYY/MM/fotos-<uuid>.pdf` ab. Der Umweg über Pfade
ist nötig, weil der Anfragekörper einer Serverfunktion auf ca. 4,5 MB begrenzt ist — ein einziges
Handyfoto sprengt das.

- **Ausrichtung:** EXIF-Drehung wird angewendet, Quer- und Hochformat bekommen jeweils eine
  passend ausgerichtete A4-Seite.
- **Größe:** Bilder werden auf A4 bei 150 dpi verkleinert und als JPEG komprimiert. Überschreitet
  das PDF 9 MB, wird es einmal sparsamer neu gebaut (110 dpi). So bleibt es unter der 10-MB-Grenze
  für Mailanhänge — sonst entfiele ausgerechnet bei Fotoeinreichungen die einzige vom Storage
  unabhängige Kopie (Abschnitt 6).
- **Fehlerfall:** Scheitert die Zusammenführung oder läuft sie ins Zeitlimit (45 s im Browser,
  60 s serverseitig), gehen die **Originalbilder** in die interne Mail. Der Kunde sieht Erfolg,
  der Fall geht nicht verloren.

---

## 5. Validierung (serverseitig, relevant ab Go-live)

Die API-Route ist beim Livegang (ohne Passwortschutz) öffentlich erreichbar; Browser-Prüfungen lassen
sich umgehen. Erforderlich **vor** dem Go-live:

- **Serverseitige Prüfung** von Dateityp (Whitelist: PDF, XML, JPG, PNG — anhand des Inhalts/MIME,
  nicht der Endung) und Dateigröße (10 MB je Dokument, 15 MB je Foto; Grenzwerte in
  `lib/fileTypes.ts`, damit Browser- und Serverprüfung dieselbe Regel lesen).
- **Bewusst nicht:** keine Ratenbegrenzung, keine Obergrenze für die Anzahl der Dateien. Kunden laden
  legitim viele Rechnungen auf einmal hoch (siehe `docs/entscheidungen.md`).
- Keine Ausführung oder Vorschau hochgeladener Dateien im Browser.
- Prüfung der Gläubigerstellung erfolgt fachlich im Backoffice, nicht technisch im Upload.

## 6. Fehlerbehandlung — kein Fall darf verschwinden

**Was den Fall real schützt — drei getrennte Ebenen:**
1. **Die Datei im Storage** — das Original der Rechnung. Ohne sie gibt es nichts einzuziehen.
2. **Der Datenbankeintrag** — speichert nur den *Pfad* zur Datei, nicht die Datei selbst. Er ist der
   Wegweiser und die Übersicht, **kein** eigenes Sicherheitsnetz für die Datei: Fällt der Storage aus,
   zeigt der Eintrag ins Leere.
3. **Die interne Mail mit PDF im Anhang** — die **einzige unabhängige Kopie** der Rechnung, physisch
   getrennt vom Storage. Sie ist das eigentliche Sicherheitsnetz gegen einen Storage-Verlust.

**Wichtige Konsequenz:** Datenbankeintrag und Storage-Datei hängen zusammen. Der wirklich unabhängige
Schutz ist die Mail-Kopie. Deshalb ist die **zuverlässige Zustellung der internen Mail** kritisch
(siehe auch P0-9 Spam/Domain-Authentifizierung) — sie ist nicht bloß Benachrichtigung, sondern Backup.

**Der Kunde** hat seinen Teil erledigt, sobald die Datei bei uns ist — sein Erfolg hängt allein am
erfolgreichen Datei-Upload, nicht an internen Schritten, die er nicht beeinflussen kann.

| Fehlerpunkt | Verhalten |
|---|---|
| Datei-Upload zu Storage scheitert | Fehlermeldung an den Kunden (nur hier), **kein** Erfolg — er muss es erneut versuchen |
| Datenbankeintrag scheitert | Kunde sieht **Erfolg**; Fehler wird geloggt; Datei bleibt liegen; interne Mail (mit Anhang!) geht trotzdem raus → Fall erreicht das Backoffice |
| Interne Mail scheitert | Fall bleibt über Storage + DB-Eintrag auffindbar; Fehler loggen. Zustellbarkeit der Mail ist wichtig, weil sie die einzige unabhängige Kopie trägt |
| Bestätigungsmail an Kunden scheitert | unkritisch; Fall bleibt gültig; Fehler loggen |

**Drei feste Regeln:**
- Die hochgeladene **Datei wird niemals als Reaktion auf einen internen Fehler gelöscht** — nicht bei
  fehlgeschlagenem Datenbankeintrag, nicht bei fehlgeschlagenem Mailversand, nicht bei Teilfehlern im
  Mehrfach-Upload. Sie ist der Fall. (Ein früher Entwurf sah ein Löschen bei DB-Fehler vor — falsch,
  ausdrücklich verworfen.) **Davon zu unterscheiden ist die planmäßige Löschung nach Ablauf der
  Aufbewahrungsfrist** (90 Tage, protokolliert, mit Ausnahme über den Aufbewahrungs-Haken) — siehe
  Löschkonzept, `docs/recht-und-datenschutz.md` 2.5, und Aufgabe P1-4.
- Die **interne Mail (mit Anhang) wird schon nach erfolgreichem Datei-Upload** ausgelöst, nicht erst
  nach erfolgreichem DB-Insert — so entsteht die unabhängige Kopie unabhängig von der Datenbank.
- **Bei mehreren Dateien in einem Vorgang:** Die interne Mail wird ausgelöst, sobald **mindestens
  eine** Datei erfolgreich hochgeladen wurde — unabhängig davon, ob andere Dateien im selben Vorgang
  fehlgeschlagen sind. Sonst würde ein einzelner Fehlschlag die Mail für alle erfolgreichen Dateien
  im selben Vorgang unterdrücken, obwohl deren Backup-Kopie genauso wichtig ist.

Der Vater sieht alle Fälle mit Datenbankeintrag in der Tabelle `uploads` (im MVP direkt in Supabase;
später eigene Übersichtsseite).

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

1. Einreichung mit einer echten PDF funktioniert (Datei in Storage, Datensatz in DB — kein Aktenzeichen wird vergeben)
2. Beide E-Mails ankommen; interne Mail enthält Anhang **und** funktionierenden signierten Link
3. Ein bewusst provozierter Mailfehler den Status auf `failed` setzt und eine Warnung auslöst
4. Kein öffentlicher Storage-Link mehr erzeugt wird
5. Ein zu großer bzw. unzulässiger Dateityp **serverseitig** abgewiesen wird
6. Drei Fotos **ein** PDF mit drei Seiten in richtiger Reihenfolge und Ausrichtung ergeben; die
   Originalbilder weiterhin im Storage liegen
7. Der Flow vollständig per Tastatur bedienbar ist
8. `npm run build` fehlerfrei durchläuft

## 11. Messgrößen
| Kennzahl | Ziel |
|---|---|
| Zeit vom Seitenaufruf bis Absenden | < 90 Sekunden |
| Aktive Eingaben | 1 Feld + 1–2 Klicks + Datei |
| Abbruchquote im Flow | < 30 % |
| Rückfragequote an Kunden | < 20 % |
| Verwaiste Dateien im Storage (Datei ohne Datenbankeintrag) | 0 |
| Zustellquote der internen Benachrichtigung | 100 % |

**Zu den verwaisten Dateien:** Diese Kennzahl ersetzt die frühere Größe
„Anteil `notification_status = failed`" — dieses Feld gibt es bewusst nicht (P0-3), die Kennzahl war
damit gegenstandslos. Gemessen wird mit:

```sql
select count(*) from public.verwaiste_dateien('invoices', now() - interval '1 hour', 5000);
```

Der **Puffer von einer Stunde** ist nötig: Datei und Datenbankeintrag entstehen Sekunden
auseinander — ohne ihn zählte man frische Uploads mit, deren Eintrag gerade erst geschrieben wird.
Ein dauerhaft von Null verschiedener Wert deutet auf fehlgeschlagene Datenbankeinträge hin; die
werden bewusst nur geloggt (Abschnitt 6), diese Kennzahl macht sie sichtbar.

Die Spalte `reste_geloescht` im Protokoll `loeschlaeufe` zeigt dasselbe **rückblickend**, aber mit
rund 90 Tagen Verzug — der Löschlauf sieht nur Reste jenseits der Aufbewahrungsfrist. Für die
laufende Kontrolle gilt die Abfrage oben; das Protokoll ist der Verlauf, nicht der Frühwarnwert.

**Stand 22.08.2026: 0.** Der erste echte Löschlauf räumte 36 Reste aus früheren Tests ab.

**Zur Zustellquote der internen Benachrichtigung:** Diese Mail ist nach Abschnitt 6 die einzige vom
Storage unabhängige Kopie einer Einreichung. Fällt sie aus, fehlt das eigentliche Sicherheitsnetz —
während Website und Datenbank unauffällig weiterlaufen und niemand etwas merkt. Ein von 100 %
abweichender Wert heißt deshalb: Zu mindestens einer Einreichung gibt es nur noch die Datei im
Storage.

**Wo und wie oft:** Im Resend-Dashboard unter **Emails**, gefiltert auf den Betreff
„Neue Einreichung" — dort steht je Mail der Zustellstatus. **Einmal wöchentlich**, zusammen mit dem
ohnehin vorgesehenen wöchentlichen Abgleich von `uploads` gegen Plausible (P0-8); so entsteht eine
Routine statt eines zweiten Termins. Resend bewahrt die Protokolle **30 Tage** auf — eine
wöchentliche Kontrolle liegt also mit großem Abstand innerhalb des Fensters. Kein Code nötig.
