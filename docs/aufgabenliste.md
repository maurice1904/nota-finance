# Aufgabenliste

**P0** = blockiert den Livegang · **P1** = vor dem Livegang · **P2** = danach / Wachstum
**Aufwand:** S ≈ < 1 h · M ≈ 1–3 h · L ≈ > 3 h

Jede Aufgabe gilt erst als erledigt, wenn ihr Abnahmekriterium erfüllt ist und
`npm run build` fehlerfrei läuft.

---

## P0 — Blockiert den Livegang

### P0-1 · Öffentliche Storage-Links beseitigen · L
**Problem:** `lib/email.ts` erzeugt `/object/public/invoices/...`. Zusammen mit öffentlichem Bucket
und der Policy „allow public downloads" (SELECT für `anon`) wären alle Rechnungen für jeden abrufbar.
**Lösung:** signierte Links serverseitig (14 Tage), `generatePublicUrl` entfernen; danach in Supabase
Policy löschen und Bucket auf privat. **Reihenfolge: erst Code, dann testen, dann Supabase.**
**Abnahme:** Neuer Link funktioniert, alter öffentlicher Link liefert Fehler.

### P0-2 · ENTFÄLLT — kein Aktenzeichen im Nota-System
**Entscheidung (August 2026):** Nota vergibt kein eigenes Aktenzeichen. Der Vater führt seinen
bestehenden Aktenzeichen-Prozess im Backoffice fort. Der PDF-Anhang an die interne Mail wurde
bereits im Rahmen von P0-1 umgesetzt (war Teil des dortigen Auftrags) — dieser Teil ist also
ebenfalls erledigt. Siehe `docs/entscheidungen.md`.

### P0-3 · Kein Fall darf still verschwinden · S
**Grundsatz:** Die Rechnung existiert in der Datei im Storage; die interne Mail mit PDF-Anhang ist die
einzige davon **unabhängige Kopie** und damit das eigentliche Backup. Der Datenbankeintrag ist nur
Wegweiser/Übersicht (speichert den Pfad, nicht die Datei). Der Erfolg für den Kunden hängt allein am
erfolgreichen **Datei-Upload** — nicht an internen Schritten, die er nicht beeinflussen kann.
**Konkrete Verbesserungen in `components/UploadForm.tsx`:**
- Ein fehlgeschlagener Datenbank-Insert führt **nicht** zu einer Fehlermeldung beim Kunden (Erfolg
  bleibt an den Datei-Upload gekoppelt); der Fehler wird nur geloggt.
- Die interne Mail (mit Anhang) wird bereits nach erfolgreichem **Datei-Upload** ausgelöst, nicht erst
  nach erfolgreichem DB-Insert — so erreicht der Fall das Backoffice unabhängig von der Datenbank.
- Die hochgeladene Datei wird **niemals automatisch gelöscht**.
**Bewusst NICHT gebaut:** kein `notification_status`, keine Warnmail, keine Ratenbegrenzung, kein
automatisches Löschen.
**Abnahme:** Normaler Upload → Kunde sieht Erfolg, Backoffice bekommt die Mail mit Anhang. Kein
verwaistes Verhalten, keine Datei wird gelöscht.

### P0-10 · Vercel-Umgebungsvariablen & robuster Build · S
**Problem:** Der Vercel-Build von `umbau-mvp` schlägt fehl: „Missing Supabase admin environment
variables". Die neuen Schlüssel liegen nur lokal in `.env.local`, nicht in Vercel.
**Lösung:**
1. In Vercel unter *Environment Variables* setzen (für Production, Preview, Development):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`.
2. Optional/robuster: den Supabase-Admin-Client **lazy** initialisieren (erst im Request, nicht beim
   Modul-Laden), damit der Build nicht an fehlenden Laufzeit-Secrets scheitert.
**Abnahme:** Vercel-Build läuft grün durch.

### P0-5 · Zustimmung und Herkunft speichern · S
**Problem:** Das AGB-Häkchen ist Pflicht, wird aber nirgends gespeichert — kein Nachweis, dass/wann
der Kunde zugestimmt hat.
**Lösung:** In `uploads` drei Spalten ergänzen und beim Insert befüllen: `consent_at` (Zeitpunkt),
`consent_version` (feste Kennung, z. B. `agb-2026-08`), `source` (Herkunft: UTM/Referrer, sonst
„direkt").
**Bewusst NICHT jetzt:** kein Audit-Log, kein Status-Feld. Nota ist im MVP nur die Annahmestelle; der
regulatorisch relevante Audit-Trail über die Fallbearbeitung gehört in das Backoffice-System
(twenty4collect), nicht an die Eingangs-Website. Ein Nota-seitiger Audit-/Zugriffslog wird relevant,
sobald es eine Backoffice-Oberfläche mit Logins gibt (→ P2).
**Abnahme:** Ein neuer Upload erzeugt in `uploads` einen Eintrag mit gefülltem `consent_at`,
`consent_version` und `source`.

### P0-6 · Rechtstexte als HTML-Seiten · M
**Lösung:** AGB und Datenschutzerklärung als Seiten (nicht PDF); Datenschutzerklärung um
Auftragsverarbeiter (Supabase, Vercel, Resend), Löschfristen und Betroffenenrechte ergänzen.
**Abnahme:** Beide Seiten erreichbar, in der Fußzeile verlinkt, im Einreichungsflow referenziert.

### P0-8 · Messung des Trichters · M
**Warum P0:** Der gesamte Zweck von Phase 1 ist zu messen, ob über die Website Gläubiger gewonnen
werden. Ohne Messung ist der Test wertlos — und Traffic-Daten lassen sich **nicht rückwirkend** erheben.

**Werkzeug:** Plausible (EU-gehostet in Estland, cookiefrei, ~1 KB Skript).
Kein Einwilligungsbanner nötig, weil keine Cookies gesetzt und keine personenbezogenen Daten
gespeichert werden (DSK-Beschluss vom 20.11.2023). **Aber:** DPA gilt mit Annahme der Nutzungsbedingungen,
und Plausible muss in der Datenschutzerklärung genannt werden.

**Technische Umsetzung (Next.js App Router):**
- Paket `next-plausible`, `PlausibleProvider` in `app/layout.tsx`; site-spezifische Skript-URL aus dem
  Plausible-Dashboard
- **Proxy aktivieren** (`withPlausibleProxy()` in `next.config.ts`) — reduziert Verluste durch Werbeblocker
- Cookies für die Proxy-Route strippen (bekanntes Verhalten bei gleicher Domain)

**Vier Messpunkte:**
| # | Was | Umsetzung |
|---|---|---|
| 1 | Aufruf `/einreichen` | automatischer Seitenaufruf |
| 2 | Datei ausgewählt = Flow begonnen | Custom Event `upload_started` via `usePlausible()` |
| 3 | Erfolgreich abgesendet | **eigene Danke-Seite** `/einreichen/danke` als Seitenaufruf-Ziel — robuster als ein Custom Event |
| 4 | Herkunft | Plausible erfasst Referrer/UTM automatisch; zusätzlich UTM-Parameter in das Feld `source` der Tabelle `uploads` schreiben |

Custom Events erscheinen erst, wenn im Plausible-Dashboard ein passendes **Ziel (Goal)** angelegt ist.

**Verboten:** keine personenbezogenen Daten an Plausible — keine E-Mail, keine Dateinamen, keine
Rechnungsdaten, keine Aktenzeichen.

**Wahrheitsquelle:** Die Tabelle `uploads` zählt die echten Fälle; Plausible dient Trichter und
Herkunft. Beide Zahlen wöchentlich abgleichen.

**Abnahme:** Eine Testeinreichung erzeugt Seitenaufruf, `upload_started`, Danke-Seiten-Aufruf und einen
`source`-Eintrag in der Datenbank; im Netzwerk-Protokoll des Browsers ist kein personenbezogenes Feld
Richtung Plausible zu sehen.

### P0-9 · Domain-Authentifizierung für E-Mail-Versand (SPF/DKIM/DMARC) · M
**Problem:** Mails von `service@notafinance.de` (bzw. `admin@notafinance.de`) landen im Spam-Ordner,
weil die Domain nicht als autorisierter Absender bei Resend verifiziert ist. Betrifft sowohl die
Bestätigungsmail an den Kunden als auch die interne Benachrichtigung — beide sind für den Betrieb
kritisch.
**Lösung:**
1. In Resend („Domains") die Domain `notafinance.de` hinzufügen/öffnen
2. Die von Resend angezeigten DNS-Einträge (SPF, DKIM, ggf. MX für eine Versand-Unterdomain wie
   `send.notafinance.de`) beim Domain-Anbieter eintragen
3. DMARC-Eintrag ergänzen, zu Beginn mit `p=none` (nur Beobachtung), nach 1–2 Wochen ohne
   Auffälligkeiten auf `p=quarantine` verschärfen
4. Prüfen, ob sich dadurch die Absenderadresse ändert (z. B. auf eine Versand-Unterdomain) und
   Code/Texte entsprechend anpassen
5. Nach DNS-Änderung 24–48 Std. auf Ausbreitung warten, dann in Resend auf „Verify" klicken
**Abnahme:** Eine Testmail landet im normalen Posteingang (nicht Spam) bei Gmail **und** Outlook;
Resend zeigt die Domain als „Verified"; E-Mail-Header zeigen `dkim=pass` und `spf=pass`.

**Nachkontrolle (Datum eintragen):** ~2 Tage nach der DNS-Änderung auf mxtoolbox.com/dmarc.aspx prüfen, dass kein doppelter DMARC-Eintrag mehr existiert und `p=quarantine` aktiv ist; Testmail muss im Posteingang landen (nicht Spam).

### P0-7 · Anwaltliche Prüfung · L
AGB, Datenschutzerklärung, Markenkonstruktion, alle **[ANWALT]**-Punkte aus
`docs/recht-und-datenschutz.md`. **Kein Livegang ohne diesen Punkt.**

---

## P1 — Vor dem Livegang

### P1-0 · Upload-Endpunkt serverseitig absichern (vor Go-live) · M
**Warum erst vor Go-live:** Solange der Passwortschutz aktiv ist, ist der Endpunkt nicht öffentlich.
Beim Livegang fällt der Schutz weg — dann ist die Upload-/Mail-Route offen erreichbar, und
Browser-seitige Prüfungen lassen sich umgehen. Risiko: Müll-Uploads und Missbrauch des E-Mail-Versands
(schadet der Zustellbarkeit, siehe P0-9).
**Lösung (reduziert):** **serverseitige** Prüfung von Dateityp (PDF/JPG/PNG, per Inhalt/MIME, nicht nur
Endung) und Dateigröße. **Bewusst NICHT:** keine Ratenbegrenzung und keine Obergrenze für die Anzahl
der Dateien — der Vater hat legitime Kunden, die viele Rechnungen auf einmal hochladen.
**Abnahme:** Eine zu große Datei und ein falscher Dateityp werden serverseitig abgewiesen; ein normaler
Mehrfach-Upload mit vielen PDFs funktioniert weiterhin.

### P1-1 · ENTFÄLLT — zweites E-Mail-Feld bleibt
**Entscheidung:** Das E-Mail-Bestätigungsfeld (`emailConfirm`) bleibt bewusst erhalten, um zu
verhindern, dass Kunden versehentlich eine falsche Adresse angeben (ohne gültige Adresse gibt es keine
Statuskommunikation). Damit ist diese Aufgabe erledigt — nichts zu tun.

### P1-2 · ERLEDIGT — Trust-Logos abgestimmt
**Stand:** Laut Vater ist die Nutzung der Logos (BDIU, Schufa, Wolters Kluwer, GeoTrust, GDD) mit den
Unternehmen abgestimmt. **Offene Empfehlung (kein Blocker):** kurze schriftliche Bestätigung je Logo
sichern (E-Mail genügt), da im Abmahnfall die Beweislast bei uns liegt. „TÜV" nur, falls eine
Zertifizierung tatsächlich vorliegt.

### P1-3 · Barrierefreiheit WCAG 2.1 AA · L
Tastaturbedienbarkeit, Fokus, Kontraste, `label`, Textfehlermeldungen, Alternativtexte, Zoom 200 %.
Erklärung zur Barrierefreiheit ergänzen, sobald die BFSG-Bewertung vorliegt.

### P1-4 · Löschkonzept technisch umsetzen · M
Differenzierte Fristen nach `docs/recht-und-datenschutz.md` 2.5; Löschläufe protokollieren.

### P1-5 · DSGVO-Pflichtdokumentation · M
Verzeichnis der Verarbeitungstätigkeiten (Art. 30), TOM-Dokumentation, AVV mit Supabase/Vercel/Resend,
Datenpannen-Ablauf schriftlich (72 h), Postfach für Betroffenenanfragen.

### P1-6 · Erfahrungsangaben und Farbpalette vereinheitlichen · S
Widerspruch „über 15 Jahre" vs. „über 20 Jahre" auflösen (Gründung 2008). Eine Farbpalette festlegen.

### P1-7 · Projekt-ID und Konfiguration aus Umgebungsvariablen · S
Supabase-Projekt-ID nicht hart in `lib/email.ts`; Empfänger- und Ausweichadresse konfigurierbar.

### P1-8 · Sicherheitswarnungen prüfen · M
`npm audit` meldet 15 Schwachstellen. Gezielt bewerten und beheben. **Nie `npm audit fix --force`.**

### P1-9 · Backup und Wiederherstellung · M
Supabase-Backups prüfen und **einmal testweise wiederherstellen**. Ein ungetestetes Backup ist keines.

---

## P2 — Nach dem Livegang

- **P2-1 · Branchen-Unterseiten (12)** · L — vollständige Liste in `docs/seiten-und-zielgruppen.md`
- **P2-2 · Programmatische SEO-Seiten** · L — `/inkasso-[branche]-[stadt]`, Qualitätsregeln beachten
- **P2-3 · Backoffice-Übersicht** · L — geschützte Seite mit Fällen und Status, damit kein Fall nur im Postfach existiert
- **P2-4 · Einreichung per E-Mail** · M — `fall@notafinance.de`
- **P2-5 · Strukturierte Daten, Sitemap, robots.txt** · M
- **P2-6 · Backstage-Extraktion** · L — Rechnungsdaten automatisch auslesen, Fall entscheidungsreif vorlegen
- **P2-7 · Monitoring** · M — Fehler- und Ausfallbenachrichtigung (z. B. Sentry), Testeinreichung als Wächter

---

## Reihenfolge bis zum Livegang
1. P0-1, P0-3, P0-5, P0-6, P0-8, P0-10 abarbeiten (P0-2 entfällt, P0-4 → P1-0)
2. P1-0 bis P1-9 abarbeiten
3. P0-7 anwaltliche Prüfung, Ergebnisse einarbeiten
4. `npm run build` fehlerfrei, vollständiger Testdurchlauf
5. Passwortschutz entfernen, Zweig nach `main`, Deployment prüfen
6. Danach P2 als laufende Arbeit
