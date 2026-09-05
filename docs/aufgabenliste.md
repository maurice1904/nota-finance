# Aufgabenliste

**P0** = blockiert den Livegang · **P1** = vor dem Livegang · **P2** = danach / Wachstum ·
**SEO-x** = eigene Gruppe „SEO-Vorbereitung", ebenfalls vor dem Livegang (Begründung dort)
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
| P1-3 | Barrierefreiheit WCAG 2.1 AA | **ERLEDIGT** (Erklärung zur Barrierefreiheit → P0-7) |
| P1-4 | Löschkonzept technisch umsetzen | **ERLEDIGT** |
| P1-5 | DSGVO-Pflichtdokumentation | **OFFEN** |
| P1-6 | Erfahrungsangaben und Farbpalette vereinheitlichen | **ERLEDIGT** |
| P1-7 | Projekt-ID und Konfiguration aus Umgebungsvariablen | **ERLEDIGT** |
| P1-8 | Sicherheitswarnungen prüfen | **ERLEDIGT** |
| P1-9 | Datensicherung | **ENTFÄLLT** (geht in P1-10 auf) |
| P1-10 | Supabase-Tarif vor dem Livegang | **OFFEN — Voraussetzung für den Livegang** |
| P1-11 | Aktenzeichen-Formulierungen vereinheitlicht | **ERLEDIGT** |
| P1-12 | Fotos erlauben und zu EINEM PDF zusammenführen | **ERLEDIGT** |
| P1-13 | Strukturierte Daten korrigiert | **ERLEDIGT** |
| P1-14 | AGB an die neuen Einreichungsformate anpassen | **OFFEN** (teilweise erledigt) |
| SEO-1 | Entitäts-Fundament | **ERLEDIGT** |
| SEO-2 | Technische Grundlage (Sitemap, robots.txt, Search Console, Bing, Google Business Profile) | **TEILWEISE ERLEDIGT** (Code fertig, Dashboards offen) |
| SEO-3 | Bestehende Seiten auf extrahierbare Struktur umbauen | **OFFEN** |
| SEO-4 | 12 Branchenseiten (Typ A) | **ERLEDIGT** |
| SEO-5 | 20 Ratgeber-Seiten (Typ B) | **OFFEN** |
| SEO-6 | Pilot: 50 Stadt-Branche-Seiten (2 Branchen × 25 Städte, Typ C) | **OFFEN** |
| SEO-7 | Partnerseite für Steuerberater (`/partner/steuerberater`) | **OFFEN** |

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
- Die hochgeladene Datei wird **niemals automatisch gelöscht** (gemeint: nicht als Fehlerreaktion;
  planmäßige Löschung nach Frist siehe P1-4).
**Bewusst NICHT gebaut:** kein `notification_status`, keine Warnmail, keine Ratenbegrenzung, kein
automatisches Löschen.
**Abnahme:** Normaler Upload → Kunde sieht Erfolg, Backoffice bekommt die Mail mit Anhang. Kein
verwaistes Verhalten, keine Datei wird gelöscht.
**Nachweis (22.08.2026):** Im Code gegengeprüft: Ein fehlgeschlagener Datenbank-Insert wird in
`components/UploadForm.tsx` nur protokolliert (`logError`), der Kunde sieht weiterhin Erfolg; die
interne Mail hängt an `result.success > 0`, also am Datei-Upload und nicht am Insert. Eine Suche über
den gesamten Upload-Pfad (`UploadForm.tsx`, `lib/storage.ts`, beide API-Routen) findet **keinen
einzigen Lösch-Aufruf**. Der normale Ablauf — Upload, Kunde sieht Erfolg, Backoffice bekommt die Mail
mit Anhang — ist zugleich durch den Foto-Test unter P1-12 bestätigt.

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
**Nachweis (22.08.2026):** Code und echte Daten gegengeprüft. `components/UploadForm.tsx` schreibt
bei jedem Insert `consent_at`, `consent_version` (fest `agb-2026-08`) und `source`. In der Tabelle
`uploads` sind bei den zehn jüngsten Einträgen **alle drei Felder gefüllt**, Beispiel:
`consent_at 2026-08-21T14:26:40+00`, `consent_version agb-2026-08`, `source direkt`. Kein Audit-Log
und kein Status-Feld angelegt — wie festgelegt.

### P0-6 · Rechtstexte als HTML-Seiten · M — **ERLEDIGT**
**Lösung:** AGB und Datenschutzerklärung als Seiten (nicht PDF); Datenschutzerklärung um
Auftragsverarbeiter (Supabase, Vercel, Resend), Löschfristen und Betroffenenrechte ergänzen.
**Abnahme:** Beide Seiten erreichbar, in der Fußzeile verlinkt, im Einreichungsflow referenziert.
**Nachweis (22.08.2026):** `app/agb/page.tsx` und `app/datenschutz/page.tsx` vorhanden, beide aus
`components/Footer.tsx` verlinkt; die Datenschutzerklärung nennt Supabase, Vercel und Resend. Vom
Auftraggeber am 22.08.2026 zusätzlich **im Browser geprüft**: beide Seiten erreichbar, über die
Fußzeile auffindbar und im Einreichungsflow verlinkt.

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
**Nachweis (22.08.2026):** Im Code belegt — `PlausibleProvider` in `app/layout.tsx` (nur in
Produktion aktiv), Proxy über `withPlausibleProxy()` in `next.config.ts`, Ereignis `upload_started`
in `components/UploadForm.tsx`, eigene Danke-Seite `app/einreichen/danke/page.tsx`, und `source` wird
je Einreichung geschrieben (in `uploads` nachweislich gefüllt, siehe P0-5).
Im **Plausible-Dashboard sind die Ziele angelegt**: `cta_einreichen_klick` und `upload_started` als
Custom Event, `/einreichen/danke` als Seitenaufruf. Der Trichter ist damit vollständig messbar.

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
**Nachweis (22.08.2026):** Im Projekt sind genau fünf Logos im Einsatz — BDIU, Wolters Kluwer,
SCHUFA, GeoTrust, GDD (`components/TrustSlider.tsx`), jedes mit beschreibendem Alternativtext. Eine
Volltextsuche über `app/`, `components/` und `public/` findet **kein „TÜV"** — die Warnung aus der
Aufgabe greift also nicht. Die Abstimmung mit den Unternehmen beruht auf der Angabe des
Auftraggebers; die schriftliche Bestätigung je Logo ist weiterhin offen (Empfehlung, kein Blocker).

### P1-3 · Barrierefreiheit WCAG 2.1 AA · L — **ERLEDIGT** (Etappen 1–4)
Tastaturbedienbarkeit, Fokus, Kontraste, `label`, Textfehlermeldungen, Alternativtexte, Zoom 200 %.
Erklärung zur Barrierefreiheit ergänzen, sobald die BFSG-Bewertung vorliegt.
**Zusatz, nicht Teil dieser Aufgabe:** Die **Erklärung zur Barrierefreiheit** bleibt offen — sie
hängt an der BFSG-Bewertung durch den Anwalt und wird mit **P0-7** fällig.

#### Etappe 1 — **erledigt**
Tastaturbedienung des Uploads, sichtbarer Fokus, Kontraste.

**Korrektur aus P1-12 (August 2026):** Die in Etappe 1 gewählte Lösung für den Upload-Knopf
(verstecktes `<input type="file">` plus `<label for>` plus Fokus-Spiegelung) war auf dem iPhone
**nicht bedienbar** — Safari öffnet die Dateiauswahl nicht, wenn das Feld nur einen Pixel groß ist.
Ersetzt durch echte `<button>`-Elemente, die das Feld per JavaScript öffnen. **Lehre für die
restlichen Teilaufgaben:** Tastaturlösungen zusätzlich auf einem echten iPhone prüfen, nicht nur
am Rechner.

#### Etappe 2 — **erledigt (21.08.2026)**

| Schritt | Was | Dateien |
|---|---|---|
| 4 | **Formulare** (Einreichen und Kontakt): Pflichtfelder mit `required` bei abgeschalteten Browser-Sprechblasen (`noValidate`), damit die eigenen deutschen Fehlertexte inkl. Tippfehler-Hinweis erhalten bleiben; Fehler mit `aria-invalid` und `aria-describedby` am Feld verankert, `role="alert"` zum Vorlesen; `autoComplete` für E-Mail, Name, Firma, Telefon | `components/UploadForm.tsx`, `app/kontakt/page.tsx`, `components/FormError.tsx` |
| 5 | **Meldungen unten rechts (Toast):** Container steht dauerhaft im Seitenaufbau (sonst bleibt die erste Meldung stumm); Erfolg/Hinweis als `role="status"`, Fehler/Warnung als `role="alert"`; Schließen-Knopf mit unsichtbarem Text „Benachrichtigung schließen"; **Fehler und Meldungen mit Knopf blenden nicht mehr automatisch aus**, Erfolg/Hinweis pausieren bei Maus oder Tastaturfokus (WCAG 2.2.1) | `components/Toast.tsx` |
| 6 | **Akkordeons** in FAQ und Branchen: `aria-expanded` und `aria-controls`; zugeklappte Bereiche `inert` (vorher las ein Screenreader alle Antworten am Stück vor); Knopf in die Überschrift verlagert, damit Fragen und Branchen in der Überschriftenliste auftauchen | `app/faq/page.tsx`, `app/branchen/page.tsx` |
| 7 | **Mobiles Menü:** `inert` statt `aria-hidden` (vorher lief man per Tabulator in unsichtbare Links); `aria-modal` nur im geöffneten Zustand; Name des Dialogs aus der sichtbaren Überschrift „Menü"; doppelter Orientierungspunkt darin entfernt; **Fokusrückgabe an den Menü-Knopf beim Schließen** | `components/Navbar.tsx` |
| 8 | **Sprunglink „Zum Inhalt springen"** als erste Tabulator-Station, sichtbar nur bei Fokus; Ziel `#hauptinhalt` mit `scroll-margin-top`, damit der Inhalt nicht hinter der festen Leiste landet | `app/layout.tsx`, `app/globals.css` |

Nebenbei behoben: Im Kontaktformular blieb die Fehlermeldung zum AGB-Häkchen stehen, auch nachdem
es gesetzt war — Feldname (`acceptAGB`) und Fehlerschlüssel (`agb`) fanden sich nicht.

**Nachweis (21.08.2026):** Gegen den Produktionsbuild (`next start`) in **Google Chrome 151**
gemessen, nicht nur im Code gelesen.

- **Mobiles Menü, geschlossen** (Fensterbreite 500 px, das Panel ist dort *nicht* ausgeblendet,
  sondern nur seitlich weggeschoben): `display: block`, `inert = true`, und der erste Link darin
  ließ sich **nicht** fokussieren. Genau der alte Fehler — Tabulator in ein unsichtbares Menü —
  ist damit nachweislich weg.
- **Mobiles Menü, geöffnet:** `inert` entfernt, `aria-modal="true"`, kein `aria-hidden`, Name des
  Dialogs „Menü" aus der sichtbaren Überschrift, Fokus springt auf „Menü schließen".
- **Fokusrückgabe:** Nach `Esc` **und** nach dem Schließen über das ✕ ist das Panel wieder `inert`
  und der Fokus liegt auf dem Menü-Knopf. (Über das ✕ war das vorher kaputt.)
- **Sprunglink:** Auf frisch geladener Seite die erste Tabulator-Station, Text „Zum Inhalt
  springen", nur bei Fokus sichtbar. Enter setzt den Fokus auf `#hauptinhalt`, dessen Oberkante
  bei 80 px liegt — exakt unter der 80 px hohen Leiste, nicht dahinter. Kein Fokusrahmen um den
  ganzen Inhaltsbereich. Die nächste Tabulator-Taste landet **im Inhalt**, nicht wieder in der
  Navigationsleiste.
- **Optik unverändert:** Startseite und `/kontakt` bei 1440 px und 500 px gegengeprüft.
- `npm run lint` und `npm run build` fehlerfrei.

#### Etappe 3 — **erledigt (21.08.2026)**

Bewegung, Logo, Überschriftenstruktur und Benennungen.

| Schritt | Was | Dateien |
|---|---|---|
| 9 | **Bewegung reduzieren.** Sanftes Scrollen wanderte von der Tailwind-Klasse `scroll-smooth` in die CSS-Datei — nur dort lässt es sich per Medienabfrage abschalten, eine Klasse überstimmt jede Medienabfrage. Statt zwei einzeln abgeschalteter Animationen greift jetzt **eine Sammelregel** für alle Animationen und Übergänge; vorher liefen Hero-Dauerzoom, alle Einblendungen und sämtliche `transition-*`-Klassen ungebremst weiter. Zusätzlich ein **Sicherheitsnetz ohne JavaScript**: `RevealOnScroll` startet mit `opacity: 0` — ohne JavaScript blieben große Teile von Startseite, Preisen und Branchen dauerhaft unsichtbar. | `app/globals.css`, `app/layout.tsx`, `components/RevealOnScroll.tsx` |
| 10 | **Logo.** `width`/`height` sind jetzt die echten Maße der Datei (**144 × 147**, nachgemessen) statt der falschen Angabe 40 × 40; die Anzeigegröße macht die Klasse `h-10 w-auto`. Dazu `shrink-0` gegen Stauchung in schmalen Zeilen und `alt=""`, weil direkt daneben „Nota Finance" als Text steht — sonst hört man den Namen zweimal. | `components/Navbar.tsx` |
| 11 | **Überschriftenstruktur und Benennungen.** Vier Seiten sprangen von `h1` direkt auf `h3` (Branchen, Preise, FAQ, Kontakt) — auf `h2` gehoben, Branchen zusätzlich `h4` → `h3`. Die Symbolknöpfe „Erneut versuchen"/„Entfernen" hatten nur ein `title`, das nicht jeder Screenreader vorliest und das am Handy unsichtbar ist — jetzt echter Text **mit Dateiname**. Im Partner-Laufband war jedes Logo doppelt hinterlegt und wurde doppelt vorgelesen. Die Fußzeile bekam einen Orientierungspunkt, und der LinkedIn-Link kündigt den neuen Tab an. | `app/branchen/page.tsx`, `app/preise/page.tsx`, `app/faq/page.tsx`, `app/kontakt/page.tsx`, `components/UploadForm.tsx`, `components/TrustSlider.tsx`, `components/Footer.tsx` |

**Nachweis (21.08.2026):** Gegen den Produktionsbuild in **Google Chrome 151** gemessen.

- **Überschriften:** Startseite `h1 h2 h3 h3 h3 h3 h3 h3 h2 h3 h3 h3 h3 h2 h3 h3 h3 h2` — **keine
  übersprungene Ebene**. Branchen, Preise, FAQ und Kontakt ebenfalls sprungfrei (vorher überall
  `h1 → h3`).
- **Logo:** `alt=""`, gerendert **39,18 × 40 px** — auf zwei Nachkommastellen identisch zu vorher.
- **Scrollen:** `scroll-behavior` am `<html>` ist `smooth`, kommt aus der CSS-Datei, `<html>` trägt
  keine Klasse mehr.
- **Partner-Laufband:** 10 Kacheln, davon **5 vorgelesen** — jeder der fünf Partner genau einmal.
- **Fußzeile:** Orientierungspunkt „Rechtliches und Kontakt"; der LinkedIn-Link heißt für
  Vorlese-Software „Folgen Sie uns auf LinkedIn (öffnet in neuem Tab)".
- **Sicherheitsnetz:** 11 wartende Elemente standen auf `opacity: 0`; mit der Regel wechselten sie
  auf `1`. Damit ist belegt, dass sich das `!important` gegen das `style`-Attribut durchsetzt —
  ohne diesen Beleg wäre die Regel wirkungslos gewesen.
- `npm run lint` und `npm run build` fehlerfrei.

**Bekannte, bewusst hingenommene Nebenwirkung:** `app/globals.css` koppelt die Typografie an die
Überschriften*ebene* (`h2` enger als `h3`). Das Heben von `h3` auf `h2` verändert deshalb messbar
die Darstellung — bei den Branchen-Überschriften (24 px) die Zeilenhöhe von 30,0 auf 28,8 px und
den Zeichenabstand von −0,48 auf −0,60 px je Zeichen. Alle betroffenen Überschriften sind einzeilig,
sichtbar ist das praktisch nicht. Die saubere Lösung wäre, Aussehen und Ebene in `globals.css` zu
entkoppeln — **eigene Entscheidung, bewusst nicht nebenbei erledigt.**

**Merkposten aus dieser Etappe:** `npm run build` erzeugte das CSS-Bündel trotz geänderter Quelle
nicht neu — die neuen Regeln fehlten im Ergebnis. Erst `rm -rf .next` mit anschließendem Neubau
brachte sie hinein. **Wenn eine CSS-Änderung lokal nicht ankommt, ist das der erste Griff.** Für
Vercel unkritisch, dort wird ohnehin frisch gebaut.

**Nachtrag (29.08.2026):** Die Entwicklerkonsole zeigte erneut die Warnung
„Detected `scroll-behavior: smooth` on the `<html>` element" — keine Regression der Etappe-3-Lösung,
sondern eine neue Prüfung des Next.js-Routers seit dem Update auf 16.3.1 (P1-8, 21.08.2026): Er
verlangt jetzt zusätzlich das Attribut `data-scroll-behavior="smooth"` am `<html>`-Element, um das
sanfte Scrollen während eines Seitenwechsels kurz abzuschalten. Ergänzt in `app/layout.tsx`
(`<html lang="de" data-scroll-behavior="smooth">`). Reine Router-Hinweis-Markierung, keine
CSS-Regel — an `app/globals.css` und der `prefers-reduced-motion`-Regel wurde nichts geändert,
`npm run build` läuft weiter fehlerfrei.

#### Etappe 4 — **erledigt (22.08.2026)**
- **Alternativtexte** aller Bilder prüfen und ergänzen. (Das Navigations-Logo ist mit Etappe 3
  erledigt; offen sind vor allem die Partner-Logos und die Hero-Bilder.)
- **Zoom bis 200 %** ohne Verlust von Inhalt oder Bedienbarkeit prüfen.
- **Sichtprüfung** der Etappen 1 bis 3 durch den Auftraggeber — ausdrücklich **auch auf einem
  echten iPhone** (Lehre aus P1-12: am Rechner funktionierte damals, was am Handy tot war).
  Dazu gehört ein Durchgang mit eingeschaltetem „Bewegung reduzieren": Hero-Zoom und Laufband
  müssen stehen, und **nichts darf unsichtbar bleiben**.

**Nachweis (22.08.2026):**
- **Alternativtexte:** Im Code gegengeprüft. Alle fünf Partner-Logos tragen einen beschreibenden
  Text (`components/TrustSlider.tsx`), das Navigations-Logo korrekt `alt=""` (Etappe 3). Die
  Hero-Bilder sind durchweg **CSS-Hintergründe** (`backgroundImage` in `app/page.tsx`,
  `app/kontakt/page.tsx`, `app/faq/page.tsx`, `app/produkt/page.tsx`) — sie tragen keine Information
  und brauchen nach WCAG deshalb keinen Alternativtext. Andere Bilder gibt es im Projekt nicht.
- **Zoom auf 200 %:** vom Auftraggeber geprüft, ohne Verlust bedienbar — nichts abgeschnitten, keine
  waagerechte Scrollleiste.
- **Sichtprüfung am echten iPhone:** alle Seiten durchgescrollt, Darstellung in Ordnung. Mit
  eingeschaltetem „Bewegung reduzieren" standen Hero-Zoom und Partner-Laufband still, nichts blieb
  unsichtbar.

#### Nicht Teil der Etappen: Erklärung zur Barrierefreiheit
Hängt an der BFSG-Bewertung durch den Anwalt und wird deshalb erst mit **P0-7** fällig, nicht
vorher. Bewusst getrennt geführt, damit sie die technischen Etappen nicht blockiert.

### P1-4 · Löschkonzept technisch umsetzen · M — **ERLEDIGT**
Differenzierte Fristen nach `docs/recht-und-datenschutz.md` 2.5; Löschläufe protokollieren.

**Umgesetzt (22.08.2026):** Einmal täglich löscht ein automatischer Lauf alles, was älter als
**90 Tage** ist — **Datei im Storage und Eintrag in `uploads`**, nie nur eines von beidem.

**Warum nicht pg_cron:** `pg_cron` ist im kostenlosen Supabase-Tarif zwar verfügbar, kann aus der
Datenbank heraus aber nur SQL ausführen — und **SQL kann die Datei nicht löschen.** Ein `delete`
auf `storage.objects` entfernt nur den Eintrag; die Datei bliebe im S3-Speicher liegen, unsichtbar
und über die Oberfläche nicht mehr löschbar. Genau der verwaiste Rest, den es nicht geben darf.
Wirklich entfernt wird eine Datei nur über die Storage-Schnittstelle. Ausgelöst wird der Lauf
deshalb von **Vercel-Cron** (`vercel.json`, täglich 03:20 UTC) gegen eine eigene API-Route
(Entscheidung 30).

**Bestandteile:**

| Datei | Zweck |
|---|---|
| `lib/loeschlauf.ts` | die Logik: fällige Einträge holen, Geschützte überspringen, **erst Datei, dann Eintrag** löschen, Reste aufräumen, protokollieren |
| `app/api/cron/loeschlauf/route.ts` | Route mit Geheimwort-Prüfung; `runtime = "nodejs"`, `maxDuration = 60` |
| `lib/email.ts` | `sendLoeschlaufWarnung()` — Mail ans Backoffice **nur bei Fehlern** |
| `vercel.json` | der tägliche Auslöser |

**Drei Eigenschaften, auf die es ankommt:**
1. **Erst die Datei, dann der Eintrag.** Bricht es dazwischen ab, findet der nächste Lauf den
   Eintrag wieder und räumt ihn ab — der Lauf repariert sich selbst. Andersherum entstünde eine
   Datei ohne Eintrag. Aus demselben Grund braucht es keine Sperre gegen doppelte Läufe: Vercel
   sagt ausdrücklich, dass ein Cron-Lauf ausfallen **oder doppelt kommen** kann; beides ist hier
   folgenlos, weil jeder Schritt beliebig oft wiederholbar ist.
2. **Reste-Suche.** Schlägt beim Upload der Datenbankeintrag fehl, wird das bewusst nur geloggt
   (Entscheidung 21) — dann liegt eine Datei ohne Eintrag im Speicher. Der Lauf sucht solche
   Dateien und entfernt sie ebenfalls. Ohne diesen Schritt blieben sie für immer liegen.
3. **Der Aufbewahrungs-Haken hält eine Einreichung zusammen.** Ist bei **einer** Datei
   `aufbewahren` gesetzt, bleiben **alle** Dateien derselben Einreichung erhalten — insbesondere
   das erzeugte `fotos-….pdf` samt seinen Originalbildern. Erkannt wird die Zusammengehörigkeit
   an **E-Mail + Zustimmungszeitpunkt**: `components/UploadForm.tsx` erzeugt `consent_at` einmal
   je Absendevorgang und schreibt ihn in jede Zeile, auch in die des erzeugten PDFs. An echten
   Daten gegengeprüft (`fotos-c54d1d84…` und `89da5a9a-0860…` tragen denselben Zeitstempel).

**Sicherheitsschalter:** Fehlt die Umgebungsvariable `LOESCHLAUF_AKTIV` oder steht sie nicht auf
`true`, läuft **jeder Lauf als Probelauf** — er zählt und protokolliert, löscht aber nichts.
Grund: Bis P1-10 erledigt ist, gibt es **keine Sicherung**, und Löschen ist unumkehrbar.
Scharfschalten daher erst nach P1-10, siehe dort.

#### Das SQL zu dieser Aufgabe (einmalig im Supabase SQL Editor)

Mehrfach ausführbar; ein zweiter Durchlauf schadet nicht.

```sql
-- ── 1) Aufbewahrungs-Haken ────────────────────────────────────────────────
alter table public.uploads
  add column if not exists aufbewahren boolean not null default false;

comment on column public.uploads.aufbewahren is
  'AUFBEWAHREN: Haken setzen = dieser Eintrag und seine Datei werden NIE automatisch '
  'gelöscht. Wirkt für die ganze Einreichung: ist eine Datei markiert, bleiben auch die '
  'übrigen Dateien derselben Einreichung erhalten (z. B. Foto-PDF und Originalfotos). '
  'Ohne Haken wird nach 90 Tagen automatisch gelöscht.';

-- ── 2) Indizes ────────────────────────────────────────────────────────────
create index if not exists uploads_created_at_idx  on public.uploads (created_at);
create index if not exists uploads_filepath_idx    on public.uploads (filepath);
create index if not exists uploads_einreichung_idx on public.uploads (email, consent_at);

-- ── 3) Protokolltabelle — der DSGVO-Nachweis ──────────────────────────────
create table if not exists public.loeschlaeufe (
  id                  bigint generated always as identity primary key,
  gestartet_am        timestamptz not null default now(),
  beendet_am          timestamptz,
  probelauf           boolean     not null default false,
  frist_tage          integer     not null,
  stichtag            timestamptz not null,
  ergebnis            text,
  eintraege_geloescht integer     not null default 0,
  dateien_geloescht   integer     not null default 0,
  reste_geloescht     integer     not null default 0,
  aufbewahrt          integer     not null default 0,
  fehler              integer     not null default 0,
  details             jsonb       not null default '{}'::jsonb
);

comment on table public.loeschlaeufe is
  'Protokoll der automatischen Löschläufe (Art. 5 Abs. 2, Art. 32 DSGVO). Enthält bewusst '
  'KEINE personenbezogenen Daten: nur Zeitpunkte, Anzahlen und Speicherpfade (zufällige UUIDs).';

comment on column public.loeschlaeufe.ergebnis is
  'Ergebnis in einem Satz, im Klartext. Bei einem Probelauf steht dort ausdrücklich, dass '
  'NICHTS gelöscht wurde, sondern was gelöscht worden WÄRE.';

comment on column public.loeschlaeufe.aufbewahrt is
  'Wie viele fällige Einträge wegen des Aufbewahrungs-Hakens übersprungen wurden. '
  'Die zugehörigen Pfade stehen in "details".';

create index if not exists loeschlaeufe_gestartet_am_idx
  on public.loeschlaeufe (gestartet_am desc);

-- Kein Zugriff für Website-Besucher: RLS an, absichtlich keine Policy.
alter table public.loeschlaeufe enable row level security;

-- ── 4) Welche Einträge sind fällig — und welche sind geschützt? ───────────
create or replace function public.faellige_uploads(
  p_stichtag timestamptz,
  p_limit    integer default 2000
)
returns table (id uuid, filepath text, geschuetzt boolean)
language sql
stable
security definer
set search_path = ''
as $$
  select
    u.id,
    u.filepath,
    (
      u.aufbewahren
      or exists (
        select 1
        from public.uploads g
        where g.aufbewahren
          and g.email = u.email
          and g.consent_at is not null
          and u.consent_at is not null
          and g.consent_at = u.consent_at
      )
    ) as geschuetzt
  from public.uploads u
  where u.created_at < p_stichtag
  order by u.created_at
  limit p_limit;
$$;

-- ── 5) Reste finden: Dateien im Bucket ohne Eintrag ───────────────────────
create or replace function public.verwaiste_dateien(
  p_bucket   text,
  p_stichtag timestamptz,
  p_limit    integer default 500
)
returns table (pfad text)
language sql
stable
security definer
set search_path = ''
as $$
  select o.name
  from storage.objects o
  where o.bucket_id = p_bucket
    and o.created_at < p_stichtag
    and o.name ~ '^[0-9]{4}/[0-9]{2}/'
    and not exists (
      select 1 from public.uploads u where u.filepath = o.name
    )
  order by o.created_at
  limit p_limit;
$$;

-- ── 6) Beide Funktionen darf nur der Server aufrufen, nie der Browser ─────
revoke all on function public.faellige_uploads(timestamptz, integer)
  from public, anon, authenticated;
grant execute on function public.faellige_uploads(timestamptz, integer)
  to service_role;

revoke all on function public.verwaiste_dateien(text, timestamptz, integer)
  from public, anon, authenticated;
grant execute on function public.verwaiste_dateien(text, timestamptz, integer)
  to service_role;
```

#### Kontrolle im Betrieb

```sql
-- Die letzten Läufe im Klartext
select gestartet_am, probelauf, frist_tage, ergebnis,
       eintraege_geloescht, dateien_geloescht, reste_geloescht, aufbewahrt, fehler
from public.loeschlaeufe
order by gestartet_am desc
limit 20;

-- Lief er in den letzten zwei Tagen?
select case when max(gestartet_am) > now() - interval '48 hours'
            then 'OK — letzter Lauf: ' || max(gestartet_am)::text
            else 'ACHTUNG — kein Lauf seit ' || coalesce(max(gestartet_am)::text, 'nie')
       end as status
from public.loeschlaeufe;

-- Bleibt nichts liegen? (muss 0 ergeben)
select count(*) from public.verwaiste_dateien('invoices', now() - interval '90 days', 1000);

-- Vorschau ohne Code: was täte der Lauf jetzt?
select * from public.faellige_uploads(now() - interval '90 days');
```

**Einschränkung:** Vercel löst Cron-Jobs **nur auf der Produktions-Bereitstellung** aus, nicht auf
Vorschau-Bereitstellungen. Solange `umbau-mvp` nicht auf `main` gewandert ist, läuft der Job nicht
von selbst; von Hand aufrufen geht trotzdem. Im Hobby-Tarif ist genau ein Lauf pro Tag erlaubt,
und er kann bis zu 59 Minuten später als geplant starten — für einen täglichen Löschlauf ohne
Bedeutung.

**Abnahme:** Ein Eintrag älter als die Frist verschwindet vollständig — Datei **und** Eintrag; ein
markierter Eintrag bleibt samt allen Dateien derselben Einreichung erhalten; jeder Lauf hinterlässt
eine Zeile in `loeschlaeufe`.

**Nachweis (22.08.2026):** `npm run lint` und `npm run build` fehlerfrei. Gegen den Produktionsbuild
(`next start`) geprüft: Aufruf **ohne** Geheimwort und **mit falschem** Geheimwort liefert jeweils
**401**. Dabei fiel ein Fehler auf und wurde behoben: Bei gescheiterter Datenbankabfrage meldete das
Protokoll zuvor „nichts zu tun" (falsche Entwarnung), jetzt „Lauf mit Fehlern beendet … Es wurde
nichts gelöscht".

Das SQL wurde am 22.08.2026 im Supabase SQL Editor ausgeführt (Aufbewahrungs-Haken, Indizes,
Protokolltabelle `loeschlaeufe`, Funktionen `faellige_uploads` und `verwaiste_dateien`). Test B lokal
mit `LOESCHLAUF_AKTIV=true` gegen die echte Datenbank gefahren, **zwei protokollierte Läufe, beide
mit `fehler = 0`**:

- **Lauf 1:** 48 Einträge wegen Aufbewahrungs-Haken behalten — damit belegt, dass ein Haken bei
  **einer** von drei Dateien die **gesamte Einreichung** schützt (Foto-PDF und Originalbilder werden
  zusammengehalten). Zusätzlich 36 verwaiste Storage-Dateien aus früheren Tests entfernt und
  1 ungeschützter Eintrag gelöscht.
- **Lauf 2:** nach Entfernen des Hakens genau die drei Testzeilen und ihre Dateien gelöscht,
  45 geschützte Bestandseinträge unverändert.

Anschließend zurückgestellt: `LOESCHLAUF_AKTIV` und `CRON_SECRET` aus `.env.local` entfernt.
**Offen bleibt nur das Scharfschalten in Produktion** (`LOESCHLAUF_AKTIV=true` in Vercel), bewusst
erst nach P1-10 — der Hinweis steht dort.

### P1-5 · DSGVO-Pflichtdokumentation · M — **OFFEN**
Verzeichnis der Verarbeitungstätigkeiten (Art. 30), TOM-Dokumentation, AVV mit Supabase/Vercel/Resend,
Datenpannen-Ablauf schriftlich (72 h), Postfach für Betroffenenanfragen.

### P1-6 · Erfahrungsangaben und Farbpalette vereinheitlichen · S — **ERLEDIGT**
Widerspruch „über 15 Jahre" vs. „über 20 Jahre" auflösen (Gründung 2008). Eine Farbpalette festlegen.
**Nachweis (22.08.2026):** Volltextsuche über `app/` und `components/`: „über 20 Jahre" kommt
**nirgends mehr vor**; „über 15 Jahre" steht an sechs Stellen und ist zu Gründung 2008
widerspruchsfrei. Farbpalette: `app/globals.css` enthält genau **einen** `@theme inline`-Block mit
13 Farbtokens, die alle auf denselben Variablensatz zeigen — keine zweite Palette daneben.

### P1-7 · Projekt-ID und Konfiguration aus Umgebungsvariablen · S — **ERLEDIGT**
Supabase-Projekt-ID nicht hart in `lib/email.ts`; Empfänger- und Ausweichadresse konfigurierbar.
**Nachweis (22.08.2026):** `lib/email.ts` enthält **keine hart kodierte Projekt-ID** mehr; der
signierte Link entsteht über den Supabase-Client statt über eine selbst zusammengebaute URL.
Absender (`EMAIL_FROM`) und interner Empfänger (`EMAIL_INTERNAL_RECIPIENT`) kommen über `envOr()`
mit dokumentiertem Standardwert, der Storage-Bucket aus `lib/config.ts`. Fehlt eine Variable, greift
der bisherige Wert — nichts bricht.

### P1-8 · Sicherheitswarnungen prüfen · M — **ERLEDIGT**
`npm audit` meldet 15 Schwachstellen. Gezielt bewerten und beheben. **Nie `npm audit fix --force`.**
**Nachweis (21.08.2026, Zählerstand ergänzt am 22.08.2026):** Alle 15 Meldungen wurden **einzeln
bewertet**. Real angreifbar war nur Next.js selbst — unter anderem mehrere
„Middleware/Proxy-bypass"-Meldungen, die genau den Mechanismus betrafen, auf dem der Passwortschutz
in `proxy.ts` beruht, dazu Cache-Poisoning und XSS bei CSP-Nonces. Behoben durch das Update auf
**next 16.3.1**; das räumte `sharp`, `postcss` und `nanoid` automatisch mit ab.
Zusätzlich behoben, obwohl nicht ausnutzbar: `@supabase/supabase-js` auf 2.112.3 (`ws` entfällt —
Nota nutzt kein Realtime), `resend` auf 6.20.0 (`svix` entfällt — Nota empfängt keine Webhooks),
`uuid` auf 13.0.2 (die Lücke betrifft v3/v5/v6 mit `buf`-Parameter, Nota nutzt nur v4 ohne `buf`).
Die Updates liefen in **vier getrennten Schritten mit Build-Prüfung nach jedem** — kein Breaking
Change, keine Zeile Anwendungscode angepasst. Anschließend vom Auftraggeber manuell getestet:
Passwortschutz, Darstellung, Rechtstexte und der komplette Einreichungsvorgang.
**Bewusst stehen gelassen:** Die verbleibenden Meldungen hängen alle am Linter, laufen nur auf dem
Entwicklungsrechner und landen nie im ausgelieferten Code. Ihre Behebung würde ESLint auf Version 10
zwingen — reales Risiko für die Lint-Konfiguration, null Sicherheitsgewinn.
**Zählerstand 22.08.2026:** `npm audit` meldet noch **7** Meldungen (1 niedrig, 1 mittel, 5 hoch) —
`@babel/core`, `ajv`, `brace-expansion`, `flatted`, `js-yaml`, `minimatch`, `picomatch`, sämtlich
Entwicklungsabhängigkeiten. **Bei jedem Abhängigkeits-Update neu bewerten.**

### P1-9 · Datensicherung — **ENTFÄLLT** (geht in P1-10 auf)
**Befund (August 2026):** Der kostenlose Supabase-Tarif enthält **null Tage** Sicherungsaufbewahrung —
es existiert keine Kopie der Daten. Art. 32 Abs. 1 lit. c DSGVO verlangt jedoch die Fähigkeit, die
Verfügbarkeit der Daten nach einem Zwischenfall rasch wiederherzustellen.

**Entscheidung (22.08.2026):** Die ursprünglich geplante **Zwischenlösung — ein manuell auslösbares
Sicherungsskript — entfällt.** Der Wechsel auf **Supabase Pro (P1-10)** erfolgt ohnehin vor dem
Livegang und bringt **automatische tägliche Sicherungen** mit. Ein eigenes Skript wäre damit
doppelte Arbeit an einer Krücke, die kurz darauf wieder wegfällt.

**Bedingung — nicht verhandelbar:** **P1-10 muss zwingend VOR dem Livegang umgesetzt sein.**
Bis dahin existiert **keine Datensicherung**. Verschiebt sich P1-10 oder wird der Livegang ohne
Tarifwechsel erwogen, lebt diese Aufgabe sofort wieder auf.

### P1-10 · Supabase-Tarif vor dem Livegang · S — **OFFEN — Voraussetzung für den Livegang**
**Kein Livegang ohne diesen Punkt.** Seit dem Entfall von P1-9 (22.08.2026) ist P1-10 die **einzige**
Maßnahme, die überhaupt eine Datensicherung herstellt — bis zur Umsetzung existiert keine Kopie der
Daten.

**Zwei Probleme des kostenlosen Tarifs:**
1. Keine automatischen Sicherungen (P1-9 ist hierin aufgegangen).
2. **Automatische Pausierung nach 7 Tagen ohne Datenbankaktivität** — das Projekt geht offline, bis es
   manuell gestartet wird. Genau der wahrscheinliche Zustand in der Anfangsphase mit wenig Verkehr;
   ein Interessent fände eine tote Seite vor.
**Lösung:** Wechsel auf Supabase Pro (ca. 25 $/Monat) **vor dem Livegang**. Beseitigt beide Probleme
und bringt automatische tägliche Sicherungen mit. Bei ~3.000 € Budget etwa 1 % pro Monat.
**Alternative (nicht empfohlen):** beim kostenlosen Tarif bleiben und eine automatische
Wachhalte-Routine einrichten — Krücke, kein Ersatz für Sicherungen.
**Abnahme:** Tarif umgestellt; automatische tägliche Sicherung im Supabase-Dashboard sichtbar;
anschließend Wiederherstellung einmal erprobt und in der TOM-Dokumentation (P1-5) vermerkt.

**Nach dem Tarifwechsel nicht vergessen (P1-4):** In Vercel → Settings → Environment Variables die
Variable **`LOESCHLAUF_AKTIV = true`** für **Production** setzen und anschließend neu ausrollen
(Deployments → „Redeploy"). Erst dann löscht der tägliche Löschlauf wirklich; bis dahin
protokolliert er nur, ohne etwas anzufassen. **Kontrolle:** In `public.loeschlaeufe` muss die
neueste Zeile `probelauf = false` zeigen.

**Verwandte Tarifgrenze, separat zu prüfen — Resend statt Supabase (Notiz 22.08.2026):** Der
kostenlose Resend-Tarif ist auf **100 Mails pro Tag** begrenzt. Jede Einreichung verschickt zwei
(Bestätigung an den Kunden, interne Benachrichtigung ans Backoffice) — die Obergrenze liegt also
bei rund **50 Einreichungen pro Tag**. Betroffen wäre ausgerechnet die interne Mail, die nach
Abschnitt 6 der `docs/produkt-spec.md` das eigentliche Sicherheitsnetz ist. In der MVP-Phase mit
wenig Verkehr unkritisch; vor einem Wachstumsschub oder spätestens beim Livegang gegen das dann
erwartete Volumen prüfen und bei Bedarf auf einen bezahlten Resend-Tarif wechseln.

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
**Nachweis (22.08.2026):** Volltextsuche nach „Aktenzeichen" über `app/`, `components/` und `lib/`
ergibt acht Fundstellen — `app/page.tsx` (2×), `app/faq/page.tsx`, `app/faq/layout.tsx`,
`components/UploadForm.tsx`, `components/EinreichenContent.tsx`, `components/ProcessTimeline.tsx`,
`lib/email.ts`. **Jede** knüpft das Aktenzeichen an die Prüfung („nach der Prüfung",
„nach Auftragsprüfung", „Nach Prüfung"); keine verspricht es in der Eingangsbestätigung. Das
RDG-Register-Aktenzeichen im Impressum (75 E – 52/08) ist wie vorgesehen ausgenommen.

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
   ist die Verpackung (Grundsatz: Dateien werden nie automatisch gelöscht — gemeint: nicht als
   Fehlerreaktion; planmäßige Löschung nach Frist siehe P1-4).
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

**Nachweis (22.08.2026):** **Vom Auftraggeber getestet** — drei Fotos in einer Einreichung ergaben
**ein** PDF mit drei Seiten in richtiger Reihenfolge und Ausrichtung; die interne Mail enthielt
dieses PDF als Anhang, der signierte Link öffnete dasselbe PDF, und die drei Originalbilder lagen
weiterhin im Storage. Bausteine im Code gegengeprüft: `lib/pdf.ts`, `lib/fileTypes.ts`,
`app/api/merge-images-to-pdf/route.ts` sowie der Kamera-Knopf (`capture="environment"`, Regel
`.touch-only`).

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
**Nachweis (22.08.2026):** `app/layout.tsx` gegengeprüft — `foundingDate: "2008"`, Logo-Maße
`width: 144` / `height: 147`, passend zur Datei `public/logo.png`. Keine widersprüchliche
Jahresangabe zum Unternehmen mehr im Projekt; `validFrom: "2024-01-01"` in `app/preise/layout.tsx`
bleibt bewusst stehen (Entscheidung 28).

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

## SEO-Vorbereitung — vor dem Livegang (Grundlage: `docs/SEO_Umsetzungskonzept.md`)

**Warum vor dem Livegang statt danach (Entscheidung des Auftraggebers, 22.08.2026):** Solange
`proxy.ts` die Seite passwortgeschützt hält, wird nichts indexiert — das ist gewollt
(`docs/seiten-und-zielgruppen.md`, Abschnitt 5). Stünden diese Seiten erst nach dem Livegang bereit,
begänne die Indexierungs- und Zitier-„Uhr" entsprechend später. Deshalb entstehen sie parallel zur
Anwaltswartezeit (P0-7), bevor der Passwortschutz fällt. **Sie sind selbst kein Blocker für den
Livegang** — die eigentlichen Voraussetzungen bleiben P1-10 (Supabase-Tarif) und P0-7 (anwaltliche
Prüfung); diese Gruppe soll nur *fertig sein*, wenn der Passwortschutz fällt, nicht ihn aufhalten.

### SEO-1 · Entitäts-Fundament · M — **ERLEDIGT**
Faktenkern, `llms.txt`, Presseseite `/presse`, strukturierte Daten (`Organization`,
`LocalBusiness`, `BreadcrumbList`). **Kein Autorenprofil, keine `Person`-Auszeichnung**
(Entscheidung vom 30.08.2026, siehe `docs/entscheidungen.md` Nr. 32). Details:
`docs/SEO_Umsetzungskonzept.md` Teil 1.
**Zu beachten:** Faktenkern-Zielgruppenzeile bewusst kurz mit Verweis auf die Branchenseite
(Entscheidung vom 22.08.2026, siehe `docs/entscheidungen.md`) — nicht die volle Zwölferliste
eintragen.

**Nachweis (30.08.2026):** Zentrale Faktenquelle `lib/faktenkern.ts` angelegt (Stammdaten aus dem
bestehenden Impressum übernommen, Impressum selbst nicht verändert). Strukturierte Daten ergänzt:
`Organization` in `app/layout.tsx` trägt jetzt `identifier` (RDG-Aktenzeichen), `memberOf` (BDIU),
`award` (DIHK/IHK 2017) und `LegalService` im `@type`-Array, `sameAs` mit LinkedIn (vom
Auftraggeber bestätigt: `nota-finance` mit Bindestrich ist korrekt) und allen drei
Presseberichten. `LocalBusiness` (Adresse, Telefon, Servicegebiet — Öffnungszeiten fehlen als
Faktum und wurden nicht erfunden) ergänzt `app/unternehmen/layout.tsx` um dieselbe `@id`.
`BreadcrumbList` (`lib/breadcrumb.ts`) auf allen zehn Inhaltsseiten ergänzt (agb, datenschutz,
einreichen, branchen, kontakt, faq, preise, produkt, unternehmen, presse) — bei agb/datenschutz
über eine neue, separate `layout.tsx`, ohne die geprüften Rechtstexte selbst anzufassen. `/llms.txt`
als Route Handler umgesetzt (liest aus `lib/faktenkern.ts`), in der Fußzeile verlinkt.
Unternehmensseite um die Sektion „Fakten auf einen Blick" ergänzt. `components/ArticleMeta.tsx`
(Veröffentlicht/Aktualisiert, ohne Namensnennung) für SEO-5 vorbereitet, noch ungenutzt.

**Presseseite `/presse`:** alle drei vom Auftraggeber am 30.08.2026 verifizierten Berichte
(presseportal.de, Braunschweiger Zeitung, lifePR — alle frei zugänglich, keine Bezahlschranke)
mit Titel, Medium, Datum, Link und zwei-Satz-Zusammenfassung eingebaut, Fußzeilen-Link ergänzt.
Datum des Braunschweiger-Zeitung-Berichts (19.05.2025, vom Auftraggeber nachgereicht — mein
automatischer Abruf dieser Seite blieb technisch blockiert, kein Bezahlschranken-Problem) in
`lib/faktenkern.ts` ergänzt. Alle drei Berichte damit vollständig.

Nebenbei erledigt: `app/preise/layout.tsx` `priceValidUntil` von `2026-12-31` auf `2027-12-31`
verlängert (vom Auftraggeber angefragt).

**Nachtrag (30.08.2026):** Auf Wunsch des Auftraggebers zusätzlich zur reinen Textdatei `/llms.txt`
eine richtig gestaltete Seite `/llm-info` gebaut (Vorbild: PAIR Finance) — strukturierte Fakten im
normalen Nota-Finance-Layout statt Fließtext, liest ebenfalls aus `lib/faktenkern.ts`. Diese Seite
ist jetzt in der Fußzeile verlinkt (Anzeigename „LLM Info"), nicht mehr die Textdatei direkt;
`/llm-info` verweist am Ende selbst auf `/llms.txt`. `docs/SEO_Umsetzungskonzept.md` Teil 1.2
entsprechend ergänzt.

`npm run build` und `npm run lint` fehlerfrei; JSON-LD, `/llms.txt`, `/llm-info`, `/presse` und
die Fußzeilen-Links gegen den Produktionsbuild geprüft (Basic-Auth-geschützt, `curl -u nota:…`).

### SEO-2 · Technische Grundlage · S — **TEILWEISE ERLEDIGT**
`sitemap.xml`, `robots.txt` (KI-Crawler wie GPTBot/ClaudeBot/PerplexityBot ausdrücklich erlauben),
Google Search Console, Bing Webmaster Tools, Google Business Profile. Details:
`docs/SEO_Umsetzungskonzept.md` Teil 7.1 (Woche 2), 8.3, 8.5.
**Zu beachten:** Solange `proxy.ts` aktiv ist, bleibt die Seite trotzdem nicht indexierbar — das ist
gewollt. Diese Aufgabe bereitet nur vor, damit die Indexierung mit dem Fall des Passwortschutzes
sofort beginnt.

**Nachweis (30.08.2026) — Code-Teil erledigt:**
- **`app/sitemap.ts`:** durchsucht `app/` zur Build-Zeit selbst nach `page.tsx`-Dateien (keine
  Handpflege) und schließt nur die absichtlich nicht indexierte Seite `/einreichen/danke` aus.
  `lastmod` kommt aus der Git-Historie je Datei (`git log -1 --format=%cI`) statt aus dem
  Dateisystem-Datum, weil Vercel bei einem frischen Checkout jeder Datei denselben
  Build-Zeitpunkt geben würde. Gegen den Produktionsbuild geprüft: alle 13 zu indexierenden
  Seiten erscheinen mit plausiblem `lastmod` (neue, noch unversionierte Dateien fallen korrekt
  auf das heutige Datum zurück und korrigieren sich nach dem ersten Commit von selbst).
- **`app/robots.ts`:** erlaubt `*` sowie 13 namentlich genannte KI-Crawler ausdrücklich (Liste
  recherchiert, u. a. gegen Anthropics eigene Crawler-Dokumentation und das
  Community-Verzeichnis `github.com/ai-robots-txt/ai.robots.txt`, Stand 30.08.2026) — deckt alle
  vier in Teil 7.3 monatlich gemessenen Systeme ab (GPTBot/OAI-SearchBot/ChatGPT-User für
  ChatGPT, ClaudeBot/Claude-User/Claude-SearchBot für Claude, PerplexityBot/Perplexity-User,
  Google-Extended für Gemini) plus CCBot, Applebot-Extended, Amazonbot, meta-externalagent.
  `/api/` bleibt für alle gesperrt. Verweist auf `sitemap.xml`.
- **Geprüft, kein blockierendes `noindex` gefunden:** Volltextsuche über `app/` findet genau zwei
  `index: false` — `app/not-found.tsx` (404-Seite) und `app/einreichen/danke/page.tsx`
  (Duplicate-Content-Schutz mit `canonical: /einreichen`) — beide korrekt und beabsichtigt.
  `app/layout.tsx` setzt sitecweit `robots: { index: true, follow: true }`. `proxy.ts` selbst
  unverändert, wie vorgegeben.

**Noch offen (kein Code, sondern Accounts/Dashboards):** Google Search Console, Bing Webmaster
Tools, Google Business Profile einrichten — das kann nur der Auftraggeber mit seinem eigenen
Konto tun. **Einzureichende URL bei beiden:** `https://www.notafinance.de/sitemap.xml` (deckt
automatisch alle aktuellen und künftigen Seiten ab). Reihenfolge wichtig: erst nach Entfernen des
Passwortschutzes einreichen, siehe Hinweis oben.

**Nachtrag (30.08.2026) — kanonische Domain:** Bestätigt: `www.notafinance.de` ist die einzig
richtige Domain (`notafinance.de` leitet per 307 darauf um, nur `www` ist Production in Vercel).
Geprüft und korrigiert:
- **`alternates.canonical`** fehlte auf 11 von 13 Seiten komplett (nur `/einreichen/danke` hatte
  eins) — jetzt trägt jede Seite ihre eigene kanonische URL (`app/layout.tsx` + je Route).
- Open-Graph-URLs, Organization-JSON-LD, `lib/faktenkern.ts`, `sitemap.xml`, `robots.txt`:
  durchsucht, nirgends die Variante ohne `www` gefunden.
- **`notafinance.vercel.app`** ist zusätzlich als Production erreichbar und liefert identischen
  Inhalt — ohne Gegenmaßnahme wäre das Duplicate Content. Gelöst mit einem host-basierten
  Redirect in `next.config.ts` (`redirects()`, `has: [{ type: "host", value:
  "notafinance.vercel.app" }]`), 308 auf `www.notafinance.de`. Geprüft: `withPlausibleProxy`
  rührt `redirects` nicht an (nur `env`/`rewrites`), keine Kollision. Next.js-Ausführungsreihenfolge
  bestätigt (`redirects` vor Proxy) — der Passwortschutz auf `www.notafinance.de` bleibt davon
  unberührt, `proxy.ts` unverändert. Mit simuliertem `Host`-Header gegen den Produktionsbuild
  geprüft: `notafinance.vercel.app` leitet auch **ohne** Zugangsdaten sofort weiter (Redirect
  läuft vor der Passwortabfrage), `www.notafinance.de` verlangt weiterhin wie bisher das Passwort.

### SEO-3 · Bestehende Seiten auf extrahierbare Struktur umbauen · M — **OFFEN**
Direkte Antwort zuerst, FAQ-Auszeichnung. Details: `docs/SEO_Umsetzungskonzept.md` Teil 7.1 (Woche 3).

### SEO-4 · 12 Branchenseiten (Typ A) · L — **ERLEDIGT**
Vollständige Branchenliste: `docs/seiten-und-zielgruppen.md` Abschnitt 3. Seitenvorlage:
`docs/SEO_Umsetzungskonzept.md` Teil 5.2.

**Architektur:** ein gemeinsamer Präsentations-Baustein (`components/BranchenSeite.tsx`), 12
eigene Content-Objekte (`lib/branchen-content.ts`), ein gemeinsamer Metadata-/JSON-LD-Helfer
(`lib/branchen-seo.ts`) und 12 schlanke Routen `app/inkasso-<slug>/{page,layout}.tsx` — kein
dynamisches `[branche]`-Routing, weil das zu austauschbaren Seiten verleiten würde. Ablauf und
Kosten sind bewusst fest im Baustein verankert (identisch für jede Branche, keine
Textbausteine); Problem, Fallbeispiel und FAQ sind je Branche recherchiert, mit Rechtsnachweis,
keine erfundenen Statistiken.

**Slugs (final):** `/inkasso-freiberufler`, `/inkasso-handwerk`, `/inkasso-gesundheitswesen`,
`/inkasso-agenturen`, `/inkasso-handel`, `/inkasso-gastronomie`, `/inkasso-it` (kurz statt
„it-unternehmen"), `/inkasso-maschinenbau`, `/inkasso-vermieter`, `/inkasso-hausverwaltung`,
`/inkasso-fitnessstudio` (statt „mitgliedschaften" — trifft die tatsächliche Suche von
Fitnessstudio-/Vereinsbetreibern besser), `/inkasso-bildung`.

**Nachweis (01.09.2026):** Alle 12 Seiten umgesetzt und geprüft — `npm run build`/`npm run lint`
fehlerfrei; gegen den Produktionsbuild je Seite: eigenes `<link rel="canonical">`, genau eine
H1, `FAQPage`-JSON-LD und `BreadcrumbList`-JSON-LD vorhanden, alle 12 erscheinen automatisch in
`sitemap.xml`. Kostenformulierung exakt aus `docs/marke-und-texte.md` übernommen und als
`faktenkern.kostenmodellSieAnsprache` zentralisiert. Jede Nennung von „twenty4collect" im
Fließtext ist mit „Nota Finance (ein Geschäftsfeld der twenty4collect GmbH)" verknüpft
(`faktenkern.markeMitTraeger`) — wer nur eine Unterseite sieht, soll den Zusammenhang zu Nota
Finance sofort erkennen.

**Nachtrag (05.09.2026) — FAQ-Bereich auf 7–8 Fragen je Seite erweitert:** Ursprünglich 4–5
Fragen (Teil-5.2-Minimum), auf Wunsch des Auftraggebers für mehr Einstiegspunkte in
KI-Antworten auf 7 (bei Handwerk 8) ausgebaut — 24 neue Frage-Antwort-Paare, jede mit
mindestens einem konkreten Fakt (Betrag, Frist, Rechtsnorm mit Fundstelle oder Verfahrensweg),
keine erfundenen Statistiken. Unter anderem neu: § 650f BGB (Bauhandwerkersicherung,
Handwerk), § 648 BGB (freie Kündigung bei Werkverträgen, Agenturen und IT), § 355 Abs. 2 BGB
(Widerrufsfrist Fernabsatz, Handel und Bildung), § 556b Abs. 1 BGB und § 286 Abs. 2 Nr. 1 BGB
(Fälligkeit und automatischer Verzug bei Miete, Vermieter), § 28 Abs. 1 BGB sowie § 27 WEG
(Wirtschaftsplan-Beschluss und Vertretungsmacht, Hausverwaltung), § 309 Nr. 13 BGB (Kündigung
höchstens Textform, Fitnessstudio). Besonders geprüft: keine Doppelung zwischen Freiberufler
und Agenturen sowie zwischen Vermieter und Hausverwaltung — die bereits zuvor recht ähnlich
klingende Nebenkosten-Frage bei Hausverwaltung wurde dabei zusätzlich auf die
Vollmacht-Perspektive geschärft. `FAQPage`-JSON-LD erweitert sich automatisch aus
`lib/branchen-content.ts` (`lib/branchen-seo.ts`), kein manueller Eingriff je Seite nötig.
Alle 12 Seiten gegen den Produktionsbuild geprüft: FAQ-Anzahl im JSON-LD stimmt exakt mit dem
Content-Objekt überein.

Je Branche mindestens drei nachprüfbare, branchenspezifische Fakten (Rechtsnorm mit Fundstelle
plus konkretes Fallbeispiel mit Zahlen), unter anderem: § 641/§ 632a BGB (Handwerk), § 640
Abs. 2 BGB — fiktive Abnahme (IT), § 271a BGB — 60-Tage-Grenze zwischen Unternehmern
(Maschinenbau), § 288 Abs. 1/2 BGB — Verzugszinshöhe (Handel), § 543 Abs. 2 Nr. 3 BGB —
Kündigung ab zwei Monatsmieten (Vermieter), § 9a WEG — Rechtsfähigkeit der
Eigentümergemeinschaft (Hausverwaltung), § 309 Nr. 9 BGB — Laufzeitgrenzen seit der Reform
2022 (Fitnessstudio), §§ 106 ff. BGB — Vertragspartner bei Minderjährigen (Bildung).

**`/branchen`-Übersicht umgebaut:** Akkordeon (9 Einträge, davon 8 der 12 Branchen als
Vorarbeit-Text) ersetzt durch ein reines 12-Karten-Raster (Icon, Name, Kernbotschaft aus
`docs/seiten-und-zielgruppen.md`, Link) — kein Fließtext mehr auf der Übersichtsseite, um
Keyword-Kannibalisierung mit den Unterseiten zu vermeiden (Hub = breite Navigation, Unterseite
= einzige Stelle mit Tiefe). Die 8 vorhandenen „Herausforderung"/„Lösung"-Texte sind in die
jeweilige neue Einzelseite eingeflossen. Der „Steuerberater"-Akkordeon-Eintrag wurde **nicht
gelöscht**, sondern nach `lib/steuerberater-content.ts` verschoben — Ausgangsmaterial für SEO-7.

### SEO-5 · 20 Ratgeber-Seiten (Typ B) · L — **OFFEN**
Seitenliste, Vorlage, Pflichtangaben: `docs/SEO_Umsetzungskonzept.md` Teil 4, 5.1, 8.2.

### SEO-6 · Pilot: 50 Stadt-Branche-Seiten (Typ C) · L — **OFFEN**
2 Branchen (Handwerk, private Vermieter) × 25 Städte. Städteliste, Qualitätsschwelle,
Recherchepunkte: `docs/SEO_Umsetzungskonzept.md` Teil 3, 5.3, 9. **Verbindlich:** Gerichts- und
Kammerangaben müssen recherchiert und belegt sein, nie geraten (Teil 3.2, Teil 9). Der Ausbau über
den Pilot hinaus (volle Fläche laut `docs/seiten-und-zielgruppen.md`: ca. 100 Städte × 12 Branchen)
bleibt **P2-2**, erst nach nachgewiesener Wirkung des Pilots.

### SEO-7 · Partnerseite für Steuerberater (`/partner/steuerberater`) · M — **OFFEN**
**Kein Bestandteil von SEO-4** — Steuerberater gehören nicht zur 12er-Branchenliste (sie dürfen
nach RDG selbst keine Forderungen einziehen), sind laut `docs/entscheidungen.md` Nr. 7 aber der
wertvollste **Partnerkanal**: Sie sehen die OPOS-Listen ihrer Mandanten und können auf Nota Finance
verweisen. Eigene Aufgabe, weil die Ansprache eine andere ist als bei einer Branchenseite — **nicht
„Inkasso für Sie", sondern „Lösung für Ihre Mandanten"**.
**Ausgangsmaterial:** der bestehende „Steuerberater"-Text (Subtitle, Challenge, Solutions) steht
seit dem Umbau der `/branchen`-Übersicht (SEO-4) unverändert in `lib/steuerberater-content.ts` —
dort abholen, in „Lösung für Ihre Mandanten"-Ansprache umformulieren.

---

## P2 — Nach dem Livegang

- **P2-1 · Branchen-Unterseiten (12) — laufende Pflege** · L — die zwölf Seiten selbst entstehen
  jetzt vor dem Livegang als **SEO-4**; hier verbleibt nur die Pflege/Erweiterung danach
- **P2-2 · Programmatische SEO-Seiten — Ausbau über den Pilot hinaus** · L — der Pilot
  (2 Branchen × 25 Städte) entsteht vor dem Livegang als **SEO-6**; hier der Ausbau auf die volle
  Fläche (`docs/seiten-und-zielgruppen.md`: ca. 100 Städte × 12 Branchen), erst nach nachgewiesener
  Wirkung des Pilots (`docs/SEO_Umsetzungskonzept.md` Teil 7.2)
- **P2-3 · Backoffice-Übersicht** · L — geschützte Seite mit Fällen und Status, damit kein Fall nur im Postfach existiert
- **P2-4 · Einreichung per E-Mail** · M — `fall@notafinance.de`
- **P2-5 · Strukturierte Daten, Sitemap, robots.txt — laufende Pflege** · M — die Ersteinrichtung
  entsteht jetzt vor dem Livegang als **SEO-1** bzw. **SEO-2**; hier nur laufende Pflege danach
- **P2-6 · Backstage-Extraktion** · L — Rechnungsdaten automatisch auslesen, Fall entscheidungsreif vorlegen
- **P2-7 · Monitoring** · M — Fehler- und Ausfallbenachrichtigung (z. B. Sentry), Testeinreichung als Wächter

---

## Reihenfolge bis zum Livegang
1. P0-1, P0-3, P0-5, P0-6, P0-8, P0-10 abarbeiten (P0-2 entfällt, P0-4 → P1-0)
2. P1-0 bis P1-10 abarbeiten (P1-9 entfällt; **P1-10 ist Voraussetzung für den Livegang**)
3. P0-7 anwaltliche Prüfung, Ergebnisse einarbeiten — **parallel dazu: SEO-1 bis SEO-6**
   (`docs/SEO_Umsetzungskonzept.md`), damit die Seiten mit dem Fall des Passwortschutzes bereitstehen
4. `npm run build` fehlerfrei, vollständiger Testdurchlauf
5. Passwortschutz entfernen, Zweig nach `main`, Deployment prüfen
6. Danach P2 als laufende Arbeit
