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
**Lösung:** signierte Links serverseitig (7 Tage), `generatePublicUrl` entfernen; danach in Supabase
Policy löschen und Bucket auf privat. **Reihenfolge: erst Code, dann testen, dann Supabase.**
**Abnahme:** Neuer Link funktioniert, alter öffentlicher Link liefert Fehler.

### P0-2 · Aktenzeichen und PDF-Anhang · M
**Problem:** kein Aktenzeichen, obwohl die Bestätigungsmail eines ankündigt; Backoffice erhält nur Links.
**Lösung:** `NF-JJJJ-####` per DB-Sequenz (race-condition-sicher), in beiden Mails und in der DB;
Datei(en) als Anhang an die interne Mail (> 10 MB: nur Link).
**Abnahme:** Zwei gleichzeitige Uploads erzeugen zwei verschiedene Aktenzeichen.

### P0-3 · Kein Fall darf still verschwinden · M
**Lösung:** DB-Eintrag vor Mailversand; `notification_status`; bei Fehlschlag Warnung an
Ausweichadresse und Protokolleintrag.
**Abnahme:** Provozierter Mailfehler → Status `failed` + Warnung, Kunde erhält keine falsche Erfolgsmeldung.

### P0-4 · API-Route absichern · M
**Lösung:** Ratenbegrenzung pro IP und E-Mail; serverseitige Prüfung von Dateityp, -größe und -anzahl;
MIME-Prüfung am Inhalt.
**Abnahme:** Zu große Datei und falscher Typ werden serverseitig abgewiesen; wiederholte Anfragen gebremst.

### P0-5 · Datenmodell und Audit-Log · L
**Lösung:** Tabelle `uploads` auf das Zielschema (`docs/produkt-spec.md`, Abschnitt 3) bringen,
inkl. `consent_version`; Tabelle `audit_log` (nur anfügen) anlegen.
**Abnahme:** Jeder Eingang und Statuswechsel erzeugt einen unveränderlichen Protokolleintrag.

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

### P0-7 · Anwaltliche Prüfung · L
AGB, Datenschutzerklärung, Markenkonstruktion, alle **[ANWALT]**-Punkte aus
`docs/recht-und-datenschutz.md`. **Kein Livegang ohne diesen Punkt.**

---

## P1 — Vor dem Livegang

### P1-1 · Zweites E-Mail-Feld entfernen · S
`emailConfirm` entfernen, Adresse auf der Bestätigungsseite anzeigen.

### P1-2 · Trust-Logos prüfen · S
BDIU, Schufa, Wolters Kluwer, GeoTrust, GDD — nur behalten, wozu eine Berechtigung nachweisbar ist.
Im Zweifel entfernen. „TÜV" nur bei vorliegender Zertifizierung.

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
1. P0-1 bis P0-6 und P0-8 abarbeiten
2. P1-1 bis P1-9 abarbeiten
3. P0-7 anwaltliche Prüfung, Ergebnisse einarbeiten
4. `npm run build` fehlerfrei, vollständiger Testdurchlauf
5. Passwortschutz entfernen, Zweig nach `main`, Deployment prüfen
6. Danach P2 als laufende Arbeit
