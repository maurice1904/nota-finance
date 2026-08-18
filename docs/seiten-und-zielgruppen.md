# Seitenstruktur, Branchenfläche und SEO

## 1. Grundprinzip: breite Fläche, schmaler Vertriebsfokus

Zwei getrennte Entscheidungen — häufigste Fehlerquelle, wenn sie vermischt werden:

- **Marketingfläche (Website): breit.** Jede Branchenseite ist eine Landefläche für Suchmaschinen
  und ein Wiedererkennungsanker. Grenzkosten nahe null.
- **Aktiver Vertrieb: schmal.** 2–3 Segmente, weil Zeit und Budget knapp sind.

Welche Branche in den aktiven Fokus rückt, entscheidet die **Verteilung der echten Uploads** —
nicht die Vorabannahme. Deshalb misst `source` je Einreichung den Kanal mit.

**Für Umsetzungsaufgaben gilt: immer die vollständige Branchenliste verwenden, nie auf die
Vertriebsprioritäten kürzen.**

---

## 2. Sitemap

| Seite | Zweck | Primärer CTA |
|---|---|---|
| Startseite | Nutzen, Vertrauen, Überblick in 30 Sek. | „Fall einreichen" |
| So funktioniert's / Produkt | Ablauf in 3 Schritten | „Fall einreichen" |
| Branchen (Übersicht) | Einstieg in die Branchenseiten | segmentspezifisch |
| Branchen-Unterseiten (12) | segmentgenaue Ansprache | segmentspezifisch |
| Preise / Was kostet das? | kostenneutrales Modell erklären | „Fall einreichen" |
| Unternehmen | twenty4collect, Historie, Seriosität | Vertrauen → CTA |
| FAQ | Zweifel ausräumen | „Fall einreichen" |
| Einreichen | der Upload-Flow | Absenden |
| `/inkasso-[branche]-[stadt]` | lokale Suchanfragen | „Fall einreichen" |
| Impressum, Datenschutz, AGB, Barrierefreiheit | Pflichtseiten | — |

**Fußzeile:** Impressum, Datenschutz, AGB und Erklärung zur Barrierefreiheit müssen von **jeder**
Seite aus erreichbar sein.

---

## 3. Branchenseiten (Zielbild 12)

| Branche | Typische Forderung | Kernbotschaft |
|---|---|---|
| Freiberufler & Kreative | Honorar-/Projektrechnung | Geld holen, ohne den Kunden zu verlieren |
| Handwerk & Baugewerbe | Schluss-/Regierechnung | Material vorfinanziert — Liquidität zurückholen |
| Gesundheitswesen & Heilberufe | Privatliquidation, IGeL | diskret und patientenschonend |
| Agenturen & Dienstleister | Projekt-/Retainerrechnung | professionell mahnen ohne Reputationsschaden |
| Handel & E-Commerce | Kauf auf Rechnung | Ausfälle senken, Marge sichern |
| Hotels & Gastronomie | No-Shows, Stornos, Firmenkunden | unkompliziert, ohne Zeitaufwand |
| IT & Software-Services | Wartung, Lizenzen, Meilensteine | sachlich klären, Beziehung erhalten |
| Maschinenbau & Industrie | hohe B2B-Auftragswerte | komplexe Fälle konsequent durchsetzen |
| Private Vermieter | Miet- und Nebenkostenrückstände | Rendite sichern, ohne Vorkosten |
| Hausverwaltungen | laufende Miet-/Betriebskosten | Mahnwesen auslagern, Personal entlasten |
| Fitness, Abo & Mitgliedschaften | Beitragsausfälle | viele Kleinforderungen automatisiert einziehen |
| Bildung & Freizeit | Kurs- und Beitragsforderungen | kleine Beträge lohnen sich wieder |

Für die ersten acht liegen Texte aus der Vorarbeit vor (bestehende Branchen-Seite).

**Aufbau je Branchenseite:** Problem spiegeln → typischer Fall → Ablauf in 3 Schritten →
Kostenklarheit → Vertrauensblock → CTA. Mindestens ein branchenspezifisches Element
(typische Forderungsart, Beispiel, branchenübliche Einwände).

---

## 4. Programmatische Seiten `/inkasso-[branche]-[stadt]`

- **Umfang:** ca. 100 Städte × 12 Branchen
- **Technik:** statische Generierung (`generateStaticParams`), pro Seite eigener Title,
  Meta-Description, genau eine H1, kanonische URL
- **Qualitätsregel (wichtig):** Suchmaschinen entwerten austauschbare Massenseiten. Jede Seite
  braucht substanziell variierenden Inhalt — mindestens branchenspezifischer Nutzwert **plus**
  ein echter regionaler Bezug. Reines Ersetzen von Stadtnamen ist nicht zulässig.
- **Qualitätsschwelle:** Seiten, die diese Anforderung nicht erfüllen, werden **nicht veröffentlicht**
  (bzw. auf `noindex` gesetzt). Lieber 200 gute als 1.200 dünne Seiten.
- **Interne Verlinkung:** Branchenseite ↔ passende Stadtseiten; Stadtseiten untereinander regional;
  jede Seite verlinkt auf „Fall einreichen".
- **Start klein:** zuerst 2 Branchen × 20 Städte, Wirkung messen, dann ausrollen.

---

## 5. SEO-Grundanforderungen (jede Seite)
- Eindeutiger Title (≤ 60 Zeichen) und Meta-Description (≤ 155 Zeichen)
- Genau eine H1, saubere Überschriftenhierarchie
- Sprechende URLs, keine Parameter
- `sitemap.xml`, `robots.txt`, kanonische URLs
- Strukturierte Daten (JSON-LD: Organization/LocalBusiness, FAQPage auf der FAQ-Seite)
- Ladezeit und mobile Darstellung prüfen; Bilder komprimiert und mit Alternativtext
- **Solange der Passwortschutz aktiv ist, ist die Seite nicht indexierbar** — das ist gewollt.
  Vor dem Livegang prüfen, dass kein `noindex` versehentlich bestehen bleibt.

---

## 6. Vertriebspriorisierung (nur aktiver Vertrieb, nicht Website)
1. Kleine B2B-Dienstleister, Agenturen, Freelancer
2. Handwerksbetriebe
3. Private Vermieter
4. Hausverwaltungen

Zurückgestellt: E-Commerce und Abo-Geschäfte (niedrige Beträge, direkter Wettbewerb mit
PAIR Finance und Debtist).

## 7. Kanalreihenfolge
1. Warmes Netzwerk und erste Testfälle
2. Programmatic SEO + Branchenseiten (früh starten, spät ernten)
3. Steuerberater- und Verbandspartnerschaften
4. Cross-Sell an Nutzer von gerichtsmahnverfahren.de
5. Bezahlte Suchanzeigen (erst nach der Lernphase)
6. Embedded-Integrationen (zweite Phase)

**Rechtlicher Rahmen der Ansprache:** kalte E-Mails und LinkedIn-Nachrichten sind unzulässig;
Telefon bei Gewerbetreibenden mit dokumentiertem Sachbezug ist zulässig
(`docs/recht-und-datenschutz.md`, Abschnitt 4).
