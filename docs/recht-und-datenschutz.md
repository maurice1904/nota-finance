# Recht, Datenschutz und Compliance

> Arbeitsgrundlage für die Umsetzung, **keine Rechtsberatung**. Alle mit **[ANWALT]** markierten
> Punkte sind vor dem Livegang anwaltlich zu prüfen und danach hier zu dokumentieren.

Nota Finance operiert in einem **regulierten Umfeld**. Compliance ist hier kein Zusatz, sondern
Teil des Produkts: Seriosität ist das zentrale Verkaufsargument gegenüber einer Branche mit
angeschlagenem Ruf.

---

## 1. Rechtsdienstleistungsgesetz (RDG)

Inkasso ist eine **registrierungspflichtige Rechtsdienstleistung** (§ 2 Abs. 2 RDG). Die Erlaubnis
knüpft an die **Sachkunde einer Person** (§§ 10–12 RDG), nicht an ein System.

**Für die Website verbindlich:**
- Die **twenty4collect GmbH** ist die verantwortliche, registrierte Stelle. Nota Finance ist eine
  Marke, keine eigene Gesellschaft. Das muss erkennbar sein (Impressum vollständig, Fußzeile sichtbar).
- Impressum-Pflichtangaben (vorhanden, beibehalten): Firmierung, Anschrift, Vertretung, Registergericht/HRB,
  RDG-Registrierung mit Aktenzeichen (75 E – 52/08) und registrierender Behörde, Aufsichtsbehörde
  (Bundesamt für Justiz), Berufshaftpflicht nach § 12 RDG, berufsrechtliche Regelungen mit Fundstelle.
- **[ANWALT]** Markenkonstruktion „Nota Finance, eine Marke der twenty4collect GmbH“ prüfen lassen —
  insbesondere, ob und wie die Marke im Schriftverkehr mit Schuldnern auftreten darf.

### § 13a RDG — Informationspflichten gegenüber Schuldnern
Beim ersten Kontakt mit einem Verbraucher-Schuldner sind umfangreiche Pflichtangaben zu machen
(u. a. Name/Firma des Gläubigers, Forderungsgrund, Vertragsgegenstand und -datum, Zinsberechnung,
Inkassokosten, Hinweis auf Auskunfteimeldung). **Bei Verstoß droht Unwirksamkeit des Kostenersatzes.**
Mahnschreiben nur aus freigegebenen, geprüften Textbausteinen erzeugen.

### Grenzen der Automatisierung
**Trennlinie:** Entscheidungs*vorbereitung* darf automatisiert werden, die rechtliche
Entscheidung nicht.

| Prozessschritt | Automatisierbar | Gestaltung |
|---|---|---|
| Datenextraktion aus der Rechnung | ja | OCR/LLM; XRechnung/ZUGFeRD strukturiert |
| Dubletten-, Vollständigkeits-, Formatprüfung | ja | Regelwerk, kein Ermessen |
| Fristen-, Fälligkeits-, Verzugsberechnung | ja, als Vorschlag | Ergebnis wird vorgelegt |
| Schlüssigkeitsprüfung der Forderung | **nein** | KI liefert Hinweise, Mensch entscheidet |
| Entscheidung Verfahrensstart/Eskalation | **nein** | dokumentierte Freigabe (Wer, Wann, Was) |
| Mahnschreiben inkl. § 13a-Angaben | ja, als Entwurf | freigegebene Textbausteine |
| Versand, Fristenlauf, Statusmeldungen | ja | reine Ablaufsteuerung |
| Zahlungsabgleich, Verrechnung (§ 367 BGB) | ja | Regelwerk |
| Widerspruch / Bestreiten | **nein** | Einzelfallbearbeitung |

**Zielbild:** kein „vollautomatisches Inkasso“, sondern ein System, das jeden Fall
**entscheidungsreif** vorlegt.

---

## 2. Datenschutz (DSGVO)

### 2.1 Rollen und Rechtsgrundlagen
- **Verantwortlicher:** twenty4collect GmbH.
- **Schuldnerdaten** werden ohne Einwilligung verarbeitet — Rechtsgrundlage Art. 6 Abs. 1 lit. b
  (Vertragserfüllung) bzw. lit. f (berechtigtes Interesse an der Forderungsdurchsetzung).
- **[ANWALT]** Rollenverteilung zwischen Gläubiger und Inkassodienstleister klären
  (Verantwortlicher vs. Auftragsverarbeiter) — hängt davon ab, ob im eigenen oder fremden Namen
  gehandelt wird. Ergebnis bestimmt, ob mit Gläubigern ein AVV nötig ist.
- **[ANWALT]** Prüfen, ob ein **Datenschutzbeauftragter** zu benennen ist (§ 38 BDSG).

### 2.2 Art. 14 DSGVO — die oft übersehene Pflicht
Schuldnerdaten stammen **nicht von der betroffenen Person selbst**, sondern vom Gläubiger.
Daher besteht eine **aktive Informationspflicht gegenüber dem Schuldner**, grundsätzlich
innerhalb eines Monats bzw. spätestens bei der ersten Kontaktaufnahme. Diese Information gehört
fest in das erste Anschreiben.

### 2.3 Pflichtdokumentation (auch für kleine Unternehmen)
- **Verzeichnis von Verarbeitungstätigkeiten (Art. 30)** — anlegen und pflegen.
- **TOM-Dokumentation (Art. 32)** — welche technischen und organisatorischen Maßnahmen greifen
  (Verschlüsselung, Zugriffskonzept, signierte Links, Protokollierung, Backup).
- **Löschkonzept** mit dokumentierten Löschläufen (siehe 2.5).
- **Datenschutzerklärung** nach Art. 13/14, inkl. Nennung aller Auftragsverarbeiter.

### 2.4 Auftragsverarbeiter

**Darstellung in der Datenschutzerklärung (Art. 13 Abs. 1 lit. e):** Es genügt nicht, die
Dienstleister nur beim Namen zu nennen. Erforderlich ist je Dienstleister: vollständige Firmierung
mit Anschrift, Zweck der Verarbeitung, Verarbeitungsort und — als gute Praxis — ein Link auf dessen
Datenschutzerklärung, eingeleitet durch den Hinweis, dass die Übermittlung im Rahmen eines
Auftragsverarbeitungsverhältnisses nach Art. 28 DSGVO an weisungsgebundene Dienstleister mit
geeigneten Maßnahmen nach Art. 32 DSGVO erfolgt. Diesen Standard setzen auch die etablierten
Wettbewerber (z. B. PAIR Finance).

**Die AV-Verträge selbst werden nicht veröffentlicht** — es sind zweiseitige Verträge, die der
Aufsichtsbehörde auf Anfrage vorgelegt werden. Öffentlich ist nur die Aussage, dass sie bestehen;
diese Aussage darf erst in die Datenschutzerklärung, wenn die Verträge tatsächlich abgeschlossen und
abgelegt sind.

AVV erforderlich mit: **Supabase**, **Vercel**, **Resend**, ggf. Analytics-Anbieter, Auskunfteien.
Für jeden Dienst dokumentieren: Zweck, Datenkategorien, Serverstandort, Drittlandtransfer.
**Supabase-Region ist `eu-central-1` (Frankfurt) — beibehalten.** Bei US-Anbietern zusätzlich
Transfergrundlage prüfen.

### 2.5 Löschkonzept (differenziert — nicht pauschal)
Der häufigste Fehler ist eine einheitliche Frist. Richtig ist eine Unterscheidung nach Datenkategorie:

| Kategorie | Frist | Grundlage |
|---|---|---|
| Upload ohne Beauftragung / abgelehnter Fall | kurz (z. B. 30–90 Tage), dann löschen | Zweckfortfall, Art. 17 |
| Laufende Forderungsakte | solange zur Beitreibung erforderlich | Art. 6 Abs. 1 lit. b/f |
| Erledigte Forderung — Geschäftsbriefe | **6 Jahre** | § 257 HGB |
| Erledigte Forderung — Buchungsbelege | **10 Jahre** | § 147 AO |
| Titulierte Forderung | Überwachung bis Verjährung (bis 30 Jahre) | Vollstreckungsrecht |

**Wichtig:** Gesetzliche Aufbewahrungspflichten sind eine zulässige Rechtsgrundlage und verdrängen
die Löschpflicht — aber nur für die betroffenen Daten und nur für den Aufbewahrungszweck
(Zugriff einschränken statt aktiv weiterverarbeiten). Fristbeginn ist regelmäßig **das Ende des
Kalenderjahres**. Löschläufe sind zu **protokollieren**; abgelehnte Löschbegehren sind in der
Forderungsakte zu dokumentieren.
**[ANWALT]** Konkrete Fristen final festlegen; Orientierung bietet der BDIU-Leitfaden zur DSGVO
im Forderungsmanagement.

### 2.6 Betroffenenrechte (Art. 15–22)
Prozess definieren für Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
Widerspruch — inklusive Zuständigkeit, Frist (ein Monat) und Dokumentation der Entscheidung.
Postfach dafür einrichten (z. B. `datenschutz@notafinance.de`).

### 2.7 Datenpannen (Art. 33/34)
Meldepflicht an die Aufsichtsbehörde **binnen 72 Stunden**; bei hohem Risiko zusätzlich Information
der Betroffenen. **Vorab festlegen:** Wer entscheidet, wer meldet, welche Aufsichtsbehörde ist
zuständig, wie wird dokumentiert. Ein Ein-Personen-Backoffice braucht diesen Ablauf schriftlich.

### 2.8 Art. 22 DSGVO
Keine ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung
gegenüber dem Schuldner. Eskalationsentscheidungen menschlich freigeben und dokumentieren.

### 2.9 Auskunfteien
Anfragen an Schufa, Creditreform, Regis24 nur mit tragfähiger Rechtsgrundlage und berechtigtem
Interesse; Anfragen protokollieren. Meldungen an Auskunfteien setzen die Voraussetzungen des
§ 31 BDSG voraus und erfordern vorherige Hinweise an den Schuldner.

---

## 3. Barrierefreiheit (BFSG) — seit 28.06.2025

Das Barrierefreiheitsstärkungsgesetz verpflichtet Anbieter **elektronischer Dienstleistungen für
Verbraucher** zur barrierefreien Gestaltung von Website und Anmeldestrecken; Maßstab ist
EN 301 549 bzw. WCAG 2.1 Stufe AA. Erforderlich ist zudem eine **Erklärung zur Barrierefreiheit**.
Bußgelder bis 100.000 €.

**Einschätzung für Nota:**
- **Kleinstunternehmens-Ausnahme** (< 10 Beschäftigte **und** ≤ 2 Mio. € Umsatz/Bilanzsumme) greift
  bei Dienstleistungen — twenty4collect erfüllt das derzeit. Die Ausnahme entfällt bei Wachstum.
- **B2B-Ausnahme** greift nur, wenn sich das Angebot **erkennbar ausschließlich** an Gewerbetreibende
  richtet. Nota spricht ausdrücklich **auch private Vermieter** an — also Verbraucher. Diese Ausnahme
  greift daher **nicht**.
- **[ANWALT]** Anwendbarkeit final bewerten und dokumentieren.

**Vorgabe für die Umsetzung — unabhängig von der Ausnahme:**
WCAG 2.1 AA als Baustandard einhalten. Das ist wenig Mehraufwand, verhindert eine teure Nachrüstung
bei Wachstum und verbessert zugleich Nutzbarkeit und Suchmaschinenbewertung.
Konkret: Tastaturbedienbarkeit, sichtbarer Fokus, Kontrast ≥ 4,5:1, Formularbeschriftungen mit
`label`, Fehlermeldungen als Text (nicht nur Farbe), Alternativtexte, semantische Überschriften,
Zoom bis 200 %, `lang="de"`.

---

## 4. Werbung und Kundenansprache (§ 7 UWG)

**Ohne vorherige ausdrückliche Einwilligung unzulässig — auch B2B:**
- kalte Werbe-E-Mails
- werbliche LinkedIn-/Messenger-Nachrichten

**Zulässig:**
- **Telefonanruf bei Gewerbetreibenden** bei mutmaßlicher Einwilligung — setzt konkreten Sachbezug
  zum Gewerbe voraus. **Sachbezug je Anruf dokumentieren.**
- postalische Werbung
- Inbound: Einwilligung per **Double-Opt-in** einsammeln, Nachweis speichern (Zeitstempel, IP, Text)

Irreführende Werbung ist zusätzlich nach §§ 5, 5a UWG angreifbar → siehe Aussagenregeln in
`marke-und-texte.md`.

---

## 5. Tracking und Cookies (TDDDG)
Bevorzugt **cookiefreie, EU-gehostete Statistik** (Plausible, Umami) — dann in der Regel kein
Consent-Banner nötig. Bei Cookies oder Diensten mit Endgerätezugriff ist eine **aktive Einwilligung
vor dem Setzen** erforderlich; Ablehnen muss so einfach sein wie Zustimmen.

---

## 6. Weitere Regelungen im Blick
- **EU AI Act:** KI-Einsatz dokumentieren, Risiko bewerten, menschliche Aufsicht sicherstellen.
- **[ANWALT]** Geldwäschegesetz: prüfen, ob und in welchem Umfang Pflichten bestehen.
- **Aufsicht:** Bundesamt für Justiz (RDG). Keine BaFin-Aufsicht, solange kein Forderungskauf
  oder Zahlungsdienst betrieben wird — bei Modelländerung neu prüfen.

---

## 7. Pflichtseiten der Website
| Seite | Status |
|---|---|
| Impressum | vorhanden, juristisch sauber |
| Datenschutzerklärung | als **HTML-Seite**, inkl. Auftragsverarbeiter, Löschfristen, Betroffenenrechte |
| AGB inkl. Inkasso-Auftragserteilung | als **HTML-Seite** |
| Erklärung zur Barrierefreiheit | erstellen, sobald BFSG-Bewertung vorliegt |
| Kontakt für Datenschutzanfragen | eigene Adresse, klar auffindbar |

PDF-Ablage genügt nicht: Pflichtinformationen müssen leicht zugänglich, durchsuchbar und
barrierefrei sein.
