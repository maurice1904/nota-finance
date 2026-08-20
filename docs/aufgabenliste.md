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

### P0-8 · Messung des Trichters · M — **Code erledigt, Dashboard-Schritte offen**

> **Stand August 2026:** Der Einbau ist fertig (`next-plausible@4`, Proxy, Danke-Seite, zwei
> Ereignisse). **Noch manuell zu erledigen — ohne diese Schritte misst nichts:**
> 1. Seite `notafinance.de` im Plausible-Dashboard anlegen und die seitenspezifische Skript-URL
>    (`https://plausible.io/js/pa-XXXXX.js`) kopieren.
> 2. Diese URL als `PLAUSIBLE_SRC` hinterlegen — in `.env.local` **und** in Vercel
>    (Production, Preview, Development). Fehlt sie, bleibt der Build grün und die Messung aus.
> 3. Drei Ziele im Dashboard anlegen (siehe unten).
>
> **Abweichungen von der ursprünglichen Planung — bewusst:**
> - `next-plausible@4` kennt **kein `domain`-Prop** mehr; die Seite wird über die Skript-URL
>   identifiziert.
> - Proxy-Pfade sind `/js/script.js` und `/api/event`. Beide sind vom Passwortschutz in `proxy.ts`
>   **bereits ausgenommen** — an `proxy.ts` war deshalb nichts zu ändern.
> - „Cookies für die Proxy-Route strippen" entfällt: Das betrifft laut next-plausible-Doku nur den
>   Pfad `/proxy/api/event` aus Version 3.
> - `enabled` ist an `NODE_ENV` geknüpft, damit auch die Vercel-Vorschau misst (der Standard von
>   next-plausible misst nur in Produktion). `npm run dev` sendet nichts.
> - Der Absatz zu Plausible in der Datenschutzerklärung ist ergänzt, aber **noch nicht anwaltlich
>   geprüft** → offener Punkt in P0-7.

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

**Messpunkte (umgesetzt):**
| # | Was | Umsetzung | Wo im Code |
|---|---|---|---|
| 1 | Aufruf `/einreichen` | automatischer Seitenaufruf | `app/layout.tsx` |
| 2 | Klick auf „Fall einreichen" | Ereignis `cta_einreichen_klick` | `components/PlausibleCTATracking.tsx` |
| 3 | Datei ausgewählt = Flow begonnen | Ereignis `upload_started` | `components/UploadForm.tsx`, `handleFileSelect` |
| 4 | Erfolgreich abgesendet | Seitenaufruf `/einreichen/danke` | `app/einreichen/danke/page.tsx` |
| 5 | Herkunft | Plausible erfasst Referrer/UTM automatisch; UTM zusätzlich im Feld `source` der Tabelle `uploads` (P0-5) | `components/UploadForm.tsx`, `getSource()` |

Custom Events erscheinen erst, wenn im Plausible-Dashboard ein passendes **Ziel (Goal)** angelegt ist.
Anzulegen sind drei Ziele: `cta_einreichen_klick` (Custom Event), `upload_started` (Custom Event)
und `/einreichen/danke` (Pageview).

**Zu `cta_einreichen_klick`:** gezählt wird zentral über einen Klick-Listener auf Links zu
`/einreichen` — nicht Button für Button. Damit zählen auch alle künftigen Seiten (Branchen-,
Städte-Seiten) automatisch mit, ohne dass daran gedacht werden muss.

**Bekannte Grenze:** Wird direkt auf der Danke-Seite eine zweite Rechnung eingereicht, bleibt die
URL gleich — Plausible zählt dann nur einen Abschluss. Wahrheitsquelle für die Fallzahl ist ohnehin
die Tabelle `uploads`.

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

**Konkret mit vorzulegen:** der neue Absatz „(3) Reichweitenmessung (Plausible Analytics)" in
`app/datenschutz/page.tsx` (aus P0-8). Er ist im Quelltext mit einem Warnkommentar markiert.
Ebenfalls zu klären: Ist mit Plausible ein AVV nötig oder genügt die Annahme der
Nutzungsbedingungen? (`docs/recht-und-datenschutz.md`, Abschnitt 2.4 ergänzen.)

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

### P1-7 · ERLEDIGT — Konfiguration aus Umgebungsvariablen
**Stand August 2026:** Die hart im Code stehende Supabase-Projekt-ID war bereits mit P0-1 entfallen
(signierte Links statt öffentlicher URLs). Adressen und Bucket-Name sind jetzt über
Umgebungsvariablen änderbar; fehlt eine Variable, greift der bisherige Wert — nichts bricht.

| Variable | Standardwert | Wo |
|---|---|---|
| `EMAIL_FROM` | `Nota Finance Service <service@notafinance.de>` | `lib/email.ts` (serverseitig) |
| `EMAIL_INTERNAL_RECIPIENT` | `admin@notafinance.de` | `lib/email.ts` (serverseitig) |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | `service@notafinance.de` | `lib/config.ts` |
| `NEXT_PUBLIC_SUPABASE_BUCKET` | `invoices` | `lib/config.ts` |

Öffentliche Werte stehen in `lib/config.ts`, die beiden Versandadressen bewusst in `lib/email.ts` —
`lib/config.ts` wird auch von Client-Code importiert, die interne Backoffice-Adresse soll nicht im
Browser-Bundle landen. `.env.example` dokumentiert alle Variablen des Projekts.

**Bewusst nicht konfigurierbar:** `CONSENT_VERSION` (Rechtsnachweis, muss zum ausgelieferten
AGB-Text passen) sowie Linkgültigkeit und Anhanggrenze (Fachregeln aus `docs/produkt-spec.md`).
Adressen in Impressum, AGB und Datenschutzerklärung bleiben im Text — juristisch geprüfte Fassungen.

### P1-8 · ERLEDIGT — Sicherheitswarnungen bewertet und gezielt behoben
**Stand August 2026:** Aus 15 Meldungen wurden 7. Jede wurde einzeln bewertet; behoben wurde nur,
was im Betrieb läuft oder ohne Risiko entfernbar war. Kein `npm audit fix --force`.

**Behoben (vier getrennte Schritte, nach jedem `npm run build` geprüft):**

| Paket | Ist → Soll | Warum |
|---|---|---|
| `next` | 16.1.6 → 16.3.1 | **Der einzige real ausnutzbare Punkt.** Mehrere „Middleware/Proxy bypass"-Lücken betreffen genau den Mechanismus hinter `proxy.ts` (Passwortschutz); dazu Cache-Poisoning, SSRF und XSS, die nach dem Livegang die öffentliche Seite träfen. `eslint-config-next` wurde mit angehoben. |
| `sharp`, `postcss`, `nanoid` | mit `next` bzw. `npm update` | Kamen kostenlos mit. Eigenständig nicht ausnutzbar: `sharp` verarbeitet nur eigene Bilder (hochgeladene Rechnungen laufen nie durch `next/image`), `postcss`/`nanoid` sind reine Bauwerkzeuge. |
| `@supabase/supabase-js` | 2.86.0 → 2.112.3 | Gemeldet wegen `ws` (Realtime-WebSockets). Nota nutzt kein Realtime — nicht ausnutzbar. Ab 2.112.3 entfällt `ws` als Abhängigkeit ganz. |
| `resend` | 6.9.2 → 6.20.0 | Gemeldet wegen `svix` (Webhook-Signaturprüfung). Nota empfängt keine Webhooks — nicht ausnutzbar. Ab 6.20.0 entfällt `svix` ganz. |
| `uuid` | 13.0.0 → 13.0.2 | Lücke betrifft `v3/v5/v6` mit `buf`-Parameter; Nota nutzt nur `v4` ohne `buf` — nicht ausnutzbar. Patch, keine Codeänderung. |

**Bewusst NICHT behoben — 7 verbleibende Meldungen:**
`@babel/core`, `ajv`, `brace-expansion`, `flatted`, `js-yaml`, `minimatch`, `picomatch`.
Alle hängen an `eslint` bzw. `eslint-config-next` und laufen **ausschließlich auf dem
Entwicklungsrechner** beim Linten. Sie landen nicht im ausgelieferten Code und sind für keinen
Website-Besucher erreichbar. Die Lücken sind durchweg ReDoS — der einzige Text, den diese Werkzeuge
je zu sehen bekommen, ist unser eigener Quelltext. Ihre Behebung würde `eslint` auf Version 10
(Hauptversionssprung) zwingen: reales Risiko für die Lint-Konfiguration, null Sicherheitsgewinn.
**Neu bewerten, wenn** eines dieser Pakete in den Laufzeit-Code wandert oder `eslint` ohnehin
angehoben wird.

**Nebenbei erledigt:** 14 Lint-Fehler (`react/no-unescaped-entities`) in `app/agb/page.tsx` und
`app/datenschutz/page.tsx` behoben — gerade Anführungszeichen im JSX-Text zu `&quot;` maskiert.
Bewusst `&quot;` und nicht `&ldquo;`: der sichtbare Text bleibt Zeichen für Zeichen identisch,
die juristisch geprüften Formulierungen sind unverändert. `npm run lint` meldet jetzt 0 Fehler.

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
