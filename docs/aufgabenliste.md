# Aufgabenliste

**P0** = blockiert den Livegang · **P1** = vor dem Livegang · **P2** = danach / Wachstum
**Aufwand:** S ≈ < 1 h · M ≈ 1–3 h · L ≈ > 3 h

Jede Aufgabe gilt erst als erledigt, wenn ihr Abnahmekriterium erfüllt ist und
`npm run build` fehlerfrei läuft.

**Konvention:** Jede Aufgabe, die auf **ERLEDIGT** gesetzt wird, bekommt eine Zeile
**Nachweis:** — was geprüft wurde und mit welchem Ergebnis, mit Datum. Ohne sie ist später nicht
mehr nachvollziehbar, worauf der Status beruht.

---

## Übersicht

| Nr. | Aufgabe | Status |
|---|---|---|
| P0-1 | Öffentliche Storage-Links beseitigen | **ERLEDIGT** |
| P0-2 | Kein Aktenzeichen im Nota-System | **ENTFÄLLT** |
| P0-3 | Kein Fall darf still verschwinden | **ERLEDIGT** |
| P0-5 | Zustimmung und Herkunft speichern | **ERLEDIGT** |
| P0-6 | Rechtstexte als HTML-Seiten | **ERLEDIGT** |
| P0-7 | Anwaltliche Prüfung | **OFFEN** |
| P0-8 | Messung des Trichters | **ERLEDIGT** |
| P0-9 | Domain-Authentifizierung für E-Mail-Versand (SPF/DKIM/DMARC) | **ERLEDIGT** |
| P0-10 | Vercel-Umgebungsvariablen & robuster Build | **ERLEDIGT** |
| P1-0 | Upload-Endpunkt serverseitig absichern (vor Go-live) | **OFFEN** |
| P1-1 | Zweites E-Mail-Feld bleibt | **ENTFÄLLT** |
| P1-2 | Trust-Logos abgestimmt | **ERLEDIGT** |
| P1-3 | Barrierefreiheit WCAG 2.1 AA | **OFFEN** (Etappe 1 erledigt) |
| P1-4 | Löschkonzept technisch umsetzen | **OFFEN** |
| P1-5 | DSGVO-Pflichtdokumentation | **OFFEN** |
| P1-6 | Erfahrungsangaben und Farbpalette vereinheitlichen | **ERLEDIGT** |
| P1-7 | Projekt-ID und Konfiguration aus Umgebungsvariablen | **ERLEDIGT** |
| P1-8 | Sicherheitswarnungen prüfen | **ERLEDIGT** |
| P1-9 | Datensicherung | **OFFEN** |
| P1-10 | Supabase-Tarif vor dem Livegang | **OFFEN** |
| P1-11 | Aktenzeichen-Formulierungen vereinheitlicht | **ERLEDIGT** |
| P1-12 | Fotos erlauben und zu EINEM PDF zusammenführen | **ERLEDIGT** |
| P1-13 | Strukturierte Daten korrigiert | **ERLEDIGT** |
| P1-14 | AGB an die neuen Einreichungsformate anpassen | **OFFEN** (teilweise erledigt) |

---

## P0 — Blockiert den Livegang

### P0-1 · Öffentliche Storage-Links beseitigen · L — **ERLEDIGT**
**Problem:** `lib/email.ts` erzeugt `/object/public/invoices/...`. Zusammen mit öffentlichem Bucket
und der Policy „allow public downloads" (SELECT für `anon`) wären alle Rechnungen für jeden abrufbar.
**Lösung:** signierte Links serverseitig (14 Tage), `generatePublicUrl` entfernen; danach in Supabase
Policy löschen und Bucket auf privat. **Reihenfolge: erst Code, dann testen, dann Supabase.**
**Abnahme:** Neuer Link funktioniert, alter öffentlicher Link liefert Fehler.
**Nachweis (21.08.2026):** Im Code werden ausschließlich signierte Links erzeugt (`lib/email.ts`,
14 Tage), `generatePublicUrl` ist entfernt. In Supabase wurde die Policy „allow public downloads"
gelöscht und der Bucket per SQL auf privat gestellt. Beweistest bestanden: der alte öffentliche
Link liefert einen Fehler, der signierte Link öffnet die Datei.

### P0-2 · Kein Aktenzeichen im Nota-System — **ENTFÄLLT**
**Entscheidung (August 2026):** Nota vergibt kein eigenes Aktenzeichen. Der Vater führt seinen
bestehenden Aktenzeichen-Prozess im Backoffice fort. Der PDF-Anhang an die interne Mail wurde
bereits im Rahmen von P0-1 umgesetzt (war Teil des dortigen Auftrags) — dieser Teil ist also
ebenfalls erledigt. Siehe `docs/entscheidungen.md`.

### P0-3 · Kein Fall darf still verschwinden · S — **ERLEDIGT**
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

### P0-5 · Zustimmung und Herkunft speichern · S — **ERLEDIGT**
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

### P0-6 · Rechtstexte als HTML-Seiten · M — **ERLEDIGT**
**Lösung:** AGB und Datenschutzerklärung als Seiten (nicht PDF); Datenschutzerklärung um
Auftragsverarbeiter (Supabase, Vercel, Resend), Löschfristen und Betroffenenrechte ergänzen.
**Abnahme:** Beide Seiten erreichbar, in der Fußzeile verlinkt, im Einreichungsflow referenziert.

### P0-7 · Anwaltliche Prüfung · L — **OFFEN**
AGB, Datenschutzerklärung, Markenkonstruktion, alle **[ANWALT]**-Punkte aus
`docs/recht-und-datenschutz.md`. **Kein Livegang ohne diesen Punkt.**

### P0-8 · Messung des Trichters · M — **ERLEDIGT**
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

### P0-9 · Domain-Authentifizierung für E-Mail-Versand (SPF/DKIM/DMARC) · M — **ERLEDIGT**
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

**Nachweis (21.08.2026):** Doppelter DMARC-Eintrag bei IONOS gelöscht, der verbleibende auf
`p=quarantine` gesetzt. Nachkontrolle bestanden: Mails von `service@notafinance.de` landen im
Posteingang, nicht mehr im Spam.

### P0-10 · Vercel-Umgebungsvariablen & robuster Build · S — **ERLEDIGT**
**Problem:** Der Vercel-Build von `umbau-mvp` schlägt fehl: „Missing Supabase admin environment
variables". Die neuen Schlüssel liegen nur lokal in `.env.local`, nicht in Vercel.
**Lösung:**
1. In Vercel unter *Environment Variables* setzen (für Production, Preview, Development):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`.
2. Optional/robuster: den Supabase-Admin-Client **lazy** initialisieren (erst im Request, nicht beim
   Modul-Laden), damit der Build nicht an fehlenden Laufzeit-Secrets scheitert.
**Abnahme:** Vercel-Build läuft grün durch.
**Nachweis (21.08.2026):** Umgebungsvariablen in Vercel gesetzt, Build läuft grün durch. Der
Admin-Client wird über `getSupabaseAdmin()` (`lib/supabase-admin.ts`) erst bei der ersten Anfrage
erzeugt statt beim Laden des Moduls; gegengeprüft mit einem lokalen Build ohne
`SUPABASE_SERVICE_ROLE_KEY` — er läuft fehlerfrei durch.

---

## P1 — Vor dem Livegang

### P1-0 · Upload-Endpunkt serverseitig absichern (vor Go-live) · M — **OFFEN**
**Warum erst vor Go-live:** Solange der Passwortschutz aktiv ist, ist der Endpunkt nicht öffentlich.
Beim Livegang fällt der Schutz weg — dann ist die Upload-/Mail-Route offen erreichbar, und
Browser-seitige Prüfungen lassen sich umgehen. Risiko: Müll-Uploads und Missbrauch des E-Mail-Versands
(schadet der Zustellbarkeit, siehe P0-9).
**Lösung (reduziert):** **serverseitige** Prüfung von Dateityp (PDF/JPG/PNG, per Inhalt/MIME, nicht nur
Endung) und Dateigröße. **Bewusst NICHT:** keine Ratenbegrenzung und keine Obergrenze für die Anzahl
der Dateien — der Vater hat legitime Kunden, die viele Rechnungen auf einmal hochladen.
**Abnahme:** Eine zu große Datei und ein falscher Dateityp werden serverseitig abgewiesen; ein normaler
Mehrfach-Upload mit vielen PDFs funktioniert weiterhin.

### P1-1 · Zweites E-Mail-Feld bleibt — **ENTFÄLLT**
**Entscheidung:** Das E-Mail-Bestätigungsfeld (`emailConfirm`) bleibt bewusst erhalten, um zu
verhindern, dass Kunden versehentlich eine falsche Adresse angeben (ohne gültige Adresse gibt es keine
Statuskommunikation). Damit ist diese Aufgabe erledigt — nichts zu tun.

### P1-2 · Trust-Logos abgestimmt — **ERLEDIGT**
**Stand:** Laut Vater ist die Nutzung der Logos (BDIU, Schufa, Wolters Kluwer, GeoTrust, GDD) mit den
Unternehmen abgestimmt. **Offene Empfehlung (kein Blocker):** kurze schriftliche Bestätigung je Logo
sichern (E-Mail genügt), da im Abmahnfall die Beweislast bei uns liegt. „TÜV" nur, falls eine
Zertifizierung tatsächlich vorliegt.

### P1-3 · Barrierefreiheit WCAG 2.1 AA · L — **OFFEN** (Etappe 1 erledigt)
Tastaturbedienbarkeit, Fokus, Kontraste, `label`, Textfehlermeldungen, Alternativtexte, Zoom 200 %.
Erklärung zur Barrierefreiheit ergänzen, sobald die BFSG-Bewertung vorliegt.

**Korrektur aus P1-12 (August 2026):** Die in Etappe 1 gewählte Lösung für den Upload-Knopf
(verstecktes `<input type="file">` plus `<label for>` plus Fokus-Spiegelung) war auf dem iPhone
**nicht bedienbar** — Safari öffnet die Dateiauswahl nicht, wenn das Feld nur einen Pixel groß ist.
Ersetzt durch echte `<button>`-Elemente, die das Feld per JavaScript öffnen. **Lehre für die
restlichen Teilaufgaben:** Tastaturlösungen zusätzlich auf einem echten iPhone prüfen, nicht nur
am Rechner.

### P1-4 · Löschkonzept technisch umsetzen · M — **OFFEN**
Differenzierte Fristen nach `docs/recht-und-datenschutz.md` 2.5; Löschläufe protokollieren.

### P1-5 · DSGVO-Pflichtdokumentation · M — **OFFEN**
Verzeichnis der Verarbeitungstätigkeiten (Art. 30), TOM-Dokumentation, AVV mit Supabase/Vercel/Resend,
Datenpannen-Ablauf schriftlich (72 h), Postfach für Betroffenenanfragen.

### P1-6 · Erfahrungsangaben und Farbpalette vereinheitlichen · S — **ERLEDIGT**
Widerspruch „über 15 Jahre" vs. „über 20 Jahre" auflösen (Gründung 2008). Eine Farbpalette festlegen.

### P1-7 · Projekt-ID und Konfiguration aus Umgebungsvariablen · S — **ERLEDIGT**
Supabase-Projekt-ID nicht hart in `lib/email.ts`; Empfänger- und Ausweichadresse konfigurierbar.

### P1-8 · Sicherheitswarnungen prüfen · M — **ERLEDIGT**
`npm audit` meldet 15 Schwachstellen. Gezielt bewerten und beheben. **Nie `npm audit fix --force`.**

### P1-9 · Datensicherung · M — **OFFEN**
**Befund (August 2026):** Der kostenlose Supabase-Tarif enthält **null Tage** Sicherungsaufbewahrung —
es existiert keine Kopie der Daten. Art. 32 Abs. 1 lit. c DSGVO verlangt jedoch die Fähigkeit, die
Verfügbarkeit der Daten nach einem Zwischenfall rasch wiederherzustellen.
**Zwischenlösung (jetzt):** manuell auslösbares Sicherungsskript (Export der Tabelle `uploads` plus
Download der Storage-Dateien in einen datierten lokalen Ordner; Ordner in `.gitignore`).
**Endlösung:** siehe P1-10.
**Abnahme:** Sicherung einmal erzeugt und Inhalt geprüft; Ergebnis in der TOM-Dokumentation vermerkt.

### P1-10 · Supabase-Tarif vor dem Livegang · S — **OFFEN**
**Zwei Probleme des kostenlosen Tarifs:**
1. Keine automatischen Sicherungen (siehe P1-9).
2. **Automatische Pausierung nach 7 Tagen ohne Datenbankaktivität** — das Projekt geht offline, bis es
   manuell gestartet wird. Genau der wahrscheinliche Zustand in der Anfangsphase mit wenig Verkehr;
   ein Interessent fände eine tote Seite vor.
**Lösung:** Wechsel auf Supabase Pro (ca. 25 $/Monat) **vor dem Livegang**. Beseitigt beide Probleme.
Bei ~3.000 € Budget etwa 1 % pro Monat.
**Alternative (nicht empfohlen):** beim kostenlosen Tarif bleiben und eine automatische
Wachhalte-Routine einrichten — Krücke, kein Ersatz für Sicherungen.
**Abnahme:** Tarif umgestellt; anschließend Wiederherstellung einmal erprobt und dokumentiert.

### P1-11 · Aktenzeichen-Formulierungen vereinheitlicht — **ERLEDIGT**
**Entschieden:** Der **automatische Inkassostart bleibt** in den Texten — die Aussage ist korrekt,
weil zuerst die fachliche Prüfung erfolgt und der Verfahrensablauf danach automatisiert läuft.
**Zu ändern:** Überall, wo ein Aktenzeichen erwähnt wird, muss sinngemäß stehen:
**„Sie erhalten nach Prüfung ein Aktenzeichen."** Keine Zusage eines sofortigen Aktenzeichens in der
Eingangsbestätigung (Entscheidung 17: der Vater vergibt es erst nach der Prüfung).
**Fundstellen:** `components/UploadForm.tsx` (Z. 603, 607), `components/EinreichenContent.tsx`
(Z. 43), `app/page.tsx` (Z. 208), `app/faq/page.tsx` (Z. 40) — sowie alle weiteren, die die Suche
ergibt (auch E-Mail-Vorlagen in `lib/email.ts` prüfen).
**Abnahme:** Keine Fundstelle verspricht ein sofortiges Aktenzeichen; alle Formulierungen knüpfen es
an die Prüfung.

**Umgesetzt (August 2026) — mit einer Erweiterung gegenüber der ursprünglichen Vorgabe:**
Beim Durchsehen zeigte sich, dass die **AGB den Ablauf bereits korrekt beschreiben** (§ 4 Abs. 4
und 5): Es sind **zwei** E-Mails — die Eingangsbestätigung geht unmittelbar nach dem Upload raus,
dokumentiert nur den Zugang und ist **noch keine Annahme**; erst die separate **Auftragsbestätigung**
nach der Prüfung nennt das Inkassoaktenzeichen. Die Werbetexte behaupteten dagegen eine einzige
Bestätigung, die das Aktenzeichen schon enthält. Auf Weisung des Auftraggebers wurden die Texte
deshalb nicht nur entkoppelt, sondern an den AGB-Ablauf angeglichen — Website und AGB sagen jetzt
dasselbe (senkt zugleich das UWG-Risiko aus `docs/marke-und-texte.md`, Abschnitt 3).

Geändert: `app/page.tsx` (2 Stellen), `components/ProcessTimeline.tsx`,
`components/EinreichenContent.tsx`, `app/faq/page.tsx`, `app/faq/layout.tsx` (JSON-LD).
Bereits korrekt und unverändert: `lib/email.ts` (Kundenmail) und `components/UploadForm.tsx`
(Bestätigungskasten). **Nicht angefasst:** das RDG-Register-Aktenzeichen im Impressum (andere
Bedeutung) und die AGB selbst (gesperrter Rechtstext, dort steht es richtig).
Der automatische Inkassostart bleibt wie entschieden erhalten.

### P1-12 · Fotos erlauben und zu EINEM PDF zusammenführen — **ERLEDIGT**
**Entschieden:** Kunden sollen Rechnungen abfotografieren können. **Alle Bilder einer Einreichung
werden serverseitig zu genau einem mehrseitigen PDF zusammengeführt** — auch bei nur einem Foto.
Begründung: Ein Handwerker, der eine dreiseitige Rechnung abfotografiert, soll ein Dokument
einreichen, nicht drei lose Bilder. Bewusster Kundenvorteil, besonders für Handwerk und private
Vermieter.

**Regeln:**
1. Erlaubte Formate: **PDF, JPG, PNG, XML** (XRechnung/ZUGFeRD). Spezifikation angleichen.
2. Alle **Bilder** einer Einreichung → **ein** mehrseitiges PDF, Seitenreihenfolge = Auswahlreihenfolge
   des Kunden.
3. **Hochgeladene PDFs und XML-Dateien bleiben unverändert** und werden nicht in das erzeugte PDF
   eingefügt. Gemischte Einreichung (z. B. 2 Fotos + 1 PDF) ergibt zwei Dokumente: das erzeugte
   Foto-PDF und das Original-PDF.
4. **Die Original-Bilder bleiben zusätzlich im Storage** — sie sind der eigentliche Nachweis, das PDF
   ist die Verpackung (Grundsatz: Dateien werden nie automatisch gelöscht).
5. **Mail-Anhang und signierter Link zeigen auf das erzeugte PDF.**
6. **Bildgröße beachten:** Handyfotos sind groß. Bilder vor dem Einbetten sinnvoll auf Seitenformat
   skalieren und komprimieren, damit das erzeugte PDF die 10-MB-Grenze für Mailanhänge möglichst
   nicht überschreitet (sonst greift die Regel „nur Link").
7. Hoch- und Querformat sowie die EXIF-Ausrichtung korrekt berücksichtigen, damit Seiten nicht
   gedreht erscheinen.

**Abnahme:** Drei Fotos in einer Einreichung erzeugen **ein** PDF mit drei Seiten in richtiger
Reihenfolge und Ausrichtung; die internen Mail enthält dieses PDF als Anhang; der signierte Link
öffnet dasselbe PDF; die drei Originalbilder liegen weiterhin im Storage.

**Umgesetzt (August 2026):**
- `lib/pdf.ts` — Zusammenführung mit `sharp` (EXIF-Drehung, Verkleinerung auf A4/150 dpi,
  JPEG-Kompression) und `@cantoo/pdf-lib` (gepflegter Fork von `pdf-lib`; für die genutzten
  Aufrufe API-gleich). Reißt das PDF 9 MB, wird es einmal sparsamer neu gebaut.
- `app/api/merge-images-to-pdf/route.ts` — Node-Runtime, `maxDuration = 60` (Hobby-Tarif erlaubt
  bis 300 s; bewusst darunter, damit kein Kunde minutenlang wartet). Nimmt nur Storage-Pfade
  entgegen, weil der Anfragekörper auf ca. 4,5 MB begrenzt ist.
- `lib/fileTypes.ts` — eine Quelle für erlaubte Formate und Größen (10 MB je Dokument, 15 MB je
  Foto), die Browser und Server gemeinsam lesen. Grundlage für P1-0.
- `components/UploadForm.tsx` — Kamera-Knopf „Rechnung fotografieren" (nur auf Geräten mit
  Berührungsbildschirm, Regel `.touch-only` in `app/globals.css` über `any-pointer: coarse`),
  eigener Fortschrittshinweis während der Zusammenführung, eigene Zeile in `uploads` für das
  erzeugte PDF. Rückfallebene: Scheitert die Erzeugung, gehen die Originalbilder in die Mail.
- **Upload-Knöpfe sind jetzt echte `<button>`**, die das versteckte Dateifeld per JavaScript
  öffnen. Grund: Safari auf dem iPhone öffnete die Dateiauswahl über ein `<label for>` **nicht**,
  wenn das Feld per `sr-only` auf einen Pixel geschrumpft ist — am Rechner funktionierte es.
  Damit war „Dateien auswählen" auf dem iPhone seit P1-3 wirkungslos.
  Die Umstellung verbessert zugleich die Tastaturbedienung: Ein Knopf ist von sich aus in der
  Tabulator-Reihenfolge, reagiert auf Enter und Leertaste und zeigt seinen Fokusrahmen selbst.
  Die frühere Hilfskonstruktion `.focus-proxy` in `app/globals.css` ist deshalb entfallen.
- Hinweis im Upload-Bereich unterscheidet nach Gerät: Auf Handy und Tablet „Mehrere Fotos fügen
  wir automatisch zu einem PDF zusammen", am Rechner stattdessen der Hinweis, die Seite zum
  Fotografieren am Mobilgerät zu öffnen (Regeln `.touch-only` / `.pointer-only`).

### P1-13 · Strukturierte Daten korrigiert — **ERLEDIGT**
**Problem:** Im JSON-LD (`app/layout.tsx`) standen `foundingDate: "2024"` und falsche Logo-Maße.
**Umgesetzt (August 2026):** `foundingDate` auf **2008**; Logo-Maße auf die tatsächlichen
**144 × 147** (an `public/logo.png` nachgemessen, nicht aus der Aufgabenbeschreibung übernommen).
Die Erfahrungsangabe „über 15 Jahren Erfahrung" war bereits durch P1-6 vereinheitlicht und steht so
an sieben Stellen — sie wurde deshalb **bewusst nicht geändert**; sie ist zu Gründung 2008
widerspruchsfrei.
**Geprüft und bewusst so belassen:** `app/preise/layout.tsx` Z. 28 nennt `validFrom: "2024-01-01"`
für die Preisangaben. Vom Auftraggeber am 21.08.2026 gesichtet und für in Ordnung befunden — es ist
keine Aussage über das Unternehmensalter. Nicht erneut aufwerfen (Entscheidung 28).
**Abnahme:** Keine widersprüchliche Jahresangabe zum Unternehmen mehr im Projekt (erfüllt).

### P1-14 · AGB an die neuen Einreichungsformate anpassen · S — **OFFEN** (teilweise erledigt)
**Problem:** Die AGB nannten als zulässige Einreichungsformate „PDF, XRechnung, ZUGFeRD". Mit P1-12
sind zusätzlich **Fotos (JPG, PNG)** zulässig. Die Website böte damit etwas an, das die AGB nicht
abdecken.
**Erledigt (auf ausdrückliche Weisung des Auftraggebers, August 2026):** In `app/agb/page.tsx`
wurde **ausschließlich die Aufzählung der Dateiformate** um „Bilddatei (JPG, PNG)" ergänzt —
zwei Stellen (Vertragsschluss, Leistungsbeschreibung). Am übrigen juristischen Text wurde nichts
geändert.
**Weiterhin offen — gehört in P0-7:** Rechtlich noch zu bewerten ist nicht die Formatliste, sondern
dass Nota aus den Fotos **serverseitig ein neues Dokument erzeugt** und die Originale zusätzlich
speichert. Das ist eine Verarbeitung, die die AGB bisher nicht beschreiben.
**Abnahme:** AGB nennen die tatsächlich zulässigen Formate (erfüllt); anwaltliche Bestätigung der
Foto-Verarbeitung liegt vor (offen).

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
