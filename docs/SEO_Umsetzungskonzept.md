# Nota Finance — SEO- und AI-Search-Umsetzungskonzept

**Grundlage:** Strategiekonzept (SEO_AI_Search_Konzept.md) + deine Entscheidungen vom August 2026
**Zweck:** Konkrete Inhalte, Struktur und Umsetzungsvorgaben — direkt an Claude Code übergebbar

---

# TEIL 0 · Deine Entscheidungen, festgehalten

| # | Frage | Entscheidung | Auswirkung |
|---|---|---|---|
| 1 | Städte | Top 15 Deutschland + Top 10 Bayern + Gelsenkirchen, Bochum | 25 Städte, siehe Teil 3 |
| 2 | Sichtbarer Autor | ~~Manfred Eberhard~~ **entfällt** (Korrektur 30.08.2026, siehe `docs/entscheidungen.md` Nr. 32) | kein Autorenprofil, keine Personennennung, siehe Teil 1.3 |
| 3 | twenty4collect nennen | **Ja — twenty4collect ist Nota Finance** | Größter Vertrauensanker, durchgängig nutzen |
| 4 | Bewertungen | **Nur echte** — siehe Warnung unten | Systematischer Prozess, siehe Teil 6 |
| 5 | Zeit nach Go-live | **5 Std./Woche** | Bestimmt den Ausrollplan, siehe Teil 7 |
| 6 | Presseberichte | Drei Quellen vorhanden | Entitäts-Autorität, siehe Teil 1.4 |

> ## ⚠️ Zu Entscheidung 4 — verbindlich
> **Keine Bewertungen von Personen, die die Leistung nicht in Anspruch genommen haben.**
> Gefälschte Bewertungen stehen seit 2022 in der Schwarzen Liste des UWG — unzulässig ohne
> Abwägung, abmahnfähig, bußgeldbewehrt. Google sperrt zudem Profile bei erkannten Mustern
> (zehn Bewertungen in kurzer Zeit von regionsfremden Konten ist ein Standardmuster).
> Und: Bei einem Inkassounternehmen ist Vertrauenswürdigkeit das Produkt.
>
> **Der Weg stattdessen:** Bestehende zufriedene Auftraggeber von twenty4collect fragen —
> seit 2008 vorhanden, echte Kunden, echte Bewertungen. Prozess in Teil 6.

---
---

# TEIL 1 · Entitäts-Fundament (höchster Hebel, geringster Aufwand)

Ziel: Ein Sprachmodell muss aus **einer** Quelle zweifelsfrei ableiten können, wer ihr seid.

## 1.1 Der Faktenkern — überall identisch

Dieser Block ist die Wahrheit über euch. Er erscheint sinngemäß in `llms.txt`, in den
strukturierten Daten, auf der Unternehmensseite und im Google-Profil. **Wortlaut abstimmen, dann
nie wieder abweichen.**

```
twenty4collect GmbH — Marke: Nota Finance
Gegründet: 2008
Registrierter Rechtsdienstleister nach RDG, Aktenzeichen 75 E – 52/08
Aufsichtsbehörde: Bundesamt für Justiz
Mitglied im Bundesverband Deutscher Inkasso-Unternehmen (BDIU)
Ausgezeichnet: DIHK/IHK Digital Award 2017 (erste Mobile-Lösung im Forderungsmanagement)
Leistung: digitales Inkasso im Self-Service — Rechnung hochladen oder abfotografieren, fertig
Forderungen ab 50 Euro
Für den Gläubiger kostenfrei; die gesetzlichen Verzugskosten trägt der Schuldner
Zielgruppen: kleine und mittlere Gläubiger aller Branchen — insbesondere Selbstständige,
  Handwerksbetriebe, private Vermieter, Hausverwaltungen und Praxen. Vollständige
  Branchenübersicht: [Link auf die Branchenseite]
Schwesterplattform: gerichtsmahnverfahren.de — erste zentrale, medienbruchfreie Plattform
  für das gerichtliche Mahnverfahren bei allen deutschen Amtsgerichten (gestartet Mai 2025)
```

**Zielgruppenliste bewusst kurz gehalten:** Der Faktenkern nennt nur eine Auswahl mit „insbesondere"
und verlinkt auf die Branchenseite — er engt die Zielgruppe damit nicht ein, bleibt aber kurz genug,
um zitierfähig zu sein. Die vollständige Liste der zwölf Branchen steht in
`docs/seiten-und-zielgruppen.md` und darf hier nicht dupliziert werden (siehe `CLAUDE.md`, Regel 8).

**Warum das wirkt:** Das sind harte, überprüfbare Fakten. Genau die werden zitiert.
Marketingsätze werden nicht zitiert.

## 1.2 `llms.txt` — kurze Einordnung

PAIR Finance verlinkt eine solche Datei in der Fußzeile. Meine ehrliche Bewertung:

- **Wirkung unbewiesen.** Kein großer KI-Anbieter hat öffentlich bestätigt, `llms.txt` auszuwerten.
  Es ist ein Community-Vorschlag, kein offizieller Standard.
- **Aufwand minimal** — eine Textdatei, 30 Minuten.
- **Nebennutzen sicher:** Um sie zu schreiben, muss man den Faktenkern (1.1) präzise formulieren.
  Diese Arbeit zahlt auf strukturierte Daten, Unternehmensseite und Google-Profil ein.
- **Wettbewerbsargument:** Wenn der Marktführer es tut, gehört es in eurer Branche zum Standard.

**Empfehlung: machen**, als Teil des Entitäts-Blocks, nicht als eigene Aufgabe. Erreichbar unter
`/llms.txt`.

**Umsetzung (30.08.2026):** Auf Wunsch des Auftraggebers zusätzlich als richtige,
menschenlesbare Seite `/llm-info` gestaltet (Vorbild: PAIR Finance) — strukturierte Fakten statt
Fließtext, im normalen Nota-Finance-Seitenlayout. Diese Seite, nicht die reine Textdatei, ist in
der Fußzeile verlinkt (Anzeigename „LLM Info"); `/llm-info` verweist am Ende selbst auf
`/llms.txt` für den automatisierten Abruf.

## 1.3 Autorenprofil — entfällt

**Entscheidung des Auftraggebers (30.08.2026, siehe `docs/entscheidungen.md` Nr. 32):** Es gibt
kein Autorenprofil und keine Personennennung auf Fach-/Ratgeber-Seiten. Der ursprünglich hier
geplante Block (eigene Profilseite, `Person`-Auszeichnung, Autorenzeile mit Name auf jeder
Fachseite) entfällt vollständig. Fach-/Ratgeber-Seiten tragen stattdessen ein
Veröffentlichungs- und Aktualisierungsdatum ohne Namensnennung (siehe Teil 5.1, Teil 8.2).

## 1.4 Presseberichte als Drittquellen

Die drei vorhandenen Quellen sind Gold — es sind unabhängige Belege, die KI-Systeme finden können:

| Quelle | Nutzen |
|---|---|
| lifepr.de — „gerichtsmahnverfahren.de ebnet den Weg zur Transformation im Mahnwesen" | Fachpresse, Innovationsbeleg |
| presseportal.de (PM 75576/6036713) | Reichweitenstarke Verteilerplattform |
| Braunschweiger Zeitung — „erste deutsche medienbruchfreie … Service-Plattform" | Redaktionelles Medium, höchste Glaubwürdigkeit |

**Umsetzung:** Eine Seite `/presse` mit diesen drei Berichten (Titel, Medium, Datum, Link,
zwei Sätze Zusammenfassung). Verlinkt aus der Fußzeile und von der Unternehmensseite. Zusätzlich
in `llms.txt` referenziert.

**Warum wichtig:** Erwähnungen auf fremden Seiten wiegen für KI-Systeme schwerer als eure eigenen
Aussagen. Diese drei existieren bereits — sie müssen nur auffindbar verknüpft werden.

## 1.5 Strukturierte Daten — Zielzustand

| Typ | Wo | Inhalt |
|---|---|---|
| `Organization` | Layout, alle Seiten | Faktenkern aus 1.1, `sameAs` auf Presseberichte und BDIU |
| `LocalBusiness` | Unternehmensseite | Adresse, Servicegebiete, Öffnungszeiten |
| `Service` | Produktseite | Leistung, Preismodell, Gebiet |
| `FAQPage` | FAQ + Fragen-Seiten | jede Frage einzeln ausgezeichnet |
| `Article` | Fragen-Seiten | mit `datePublished`, `dateModified` (kein `author`/Person, siehe 1.3) |
| `BreadcrumbList` | alle Unterseiten | Navigationspfad |

---
---

# TEIL 2 · Die Inhaltsarchitektur

Drei Seitentypen mit unterschiedlicher Herstellungsweise und unterschiedlichem Zweck.

| Typ | Anzahl | Zweck | Hergestellt |
|---|---|---|---|
| **A · Branchenseiten** | 12 | Wiedererkennung, Conversion | einzeln geschrieben |
| **B · Fragen-Seiten** | 20 | **KI-Zitierbarkeit**, Longtail | einzeln geschrieben |
| **C · Stadt-Branche-Seiten** | 50 (Pilot) | lokale Suche | programmatisch + redaktionell geprüft |

**Wichtig zur Verteilung:** 32 einzeln geschriebene Seiten stehen 50 programmatischen gegenüber.
Das ist ein gesundes Verhältnis. Bei 1.200 programmatischen Seiten wäre es 32 zu 1.200 — genau
das Muster, das im März 2026 abgestraft wurde.

---
---

# TEIL 3 · Die Städte (25) und ihr regionaler Inhalt

## 3.1 Die Liste

**Top 15 Deutschland:** Berlin · Hamburg · München · Köln · Frankfurt am Main · Stuttgart ·
Düsseldorf · Leipzig · Dortmund · Essen · Bremen · Dresden · Hannover · Nürnberg · Duisburg

**Zusätzlich benannt:** Gelsenkirchen · Bochum

**Top 10 Bayern** (München und Nürnberg bereits oben): Augsburg · Regensburg · Ingolstadt ·
Fürth · Würzburg · Erlangen · Bamberg · Bayreuth

**Gesamt: 25 Städte**

## 3.2 Der regionale Inhalt — euer Trumpf

Eine Städteseite ohne echten Ortsbezug ist wertlos und gefährlich. Ihr habt aber etwas, das kein
Wettbewerber in dieser Tiefe hat: **Verfahrenswissen zum gerichtlichen Mahnverfahren.**

Je Stadt sind drei Angaben recherchierbar und echt:

| Angabe | Ebene | Beispielhafter Nutzen |
|---|---|---|
| **Zentrales Mahngericht** | je Bundesland | „Für Forderungen aus Bayern ist das zentrale Mahngericht in … zuständig" |
| **Örtliches Amtsgericht** | je Stadt | zuständig für streitiges Verfahren und Vollstreckung |
| **Regionale Wirtschaftsstruktur** | je Stadt | zuständige IHK/Handwerkskammer, prägende Branchen |

> **Verbindlich für die Umsetzung:** Diese Angaben müssen **recherchiert und belegt** werden — je
> Bundesland bzw. je Stadt. Sie dürfen unter keinen Umständen erfunden oder geraten werden.
> Falsche Gerichtsangaben auf einer Rechtsdienstleistungs-Website sind ein ernstes Problem.
> Wo eine Angabe nicht sicher belegbar ist: weglassen, nicht schätzen.

## 3.3 Der Pilot

**2 Branchen × 25 Städte = 50 Seiten**

Gewählte Branchen für den Pilot:
1. **Handwerk** — größtes Volumen, höchste Forderungsbeträge, klare lokale Suche
2. **Private Vermieter** — höchste Wettbewerbsfreiheit, kein Digital-Player adressiert das

Beides sind eure Wave-1-Segmente. Erst wenn diese 50 Seiten nachweislich Wirkung zeigen, folgen
weitere Branchen.

---
---

# TEIL 4 · Die 20 Fragen-Seiten (Typ B) — höchster KI-Hebel

Das sind die Teilfragen, in die KI-Systeme kommerzielle Anfragen zerlegen. Hier liegt eure größte
Chance, weil der Wettbewerb dünn und euer Fachwissen echt ist.

## Block 1 · Kosten und Grundlagen (5)

| # | Seitentitel | Warum |
|---|---|---|
| B-01 | Was kostet Inkasso — und wer bezahlt es? | häufigste Einstiegsfrage überhaupt |
| B-02 | Ab welchem Forderungsbetrag lohnt sich ein Inkassobüro? | Ihr könnt „ab 50 €" als konkrete Antwort liefern |
| B-03 | Was passiert bei Teilzahlung? Die Reihenfolge nach § 367 BGB | Fachlich, konkret, kaum jemand erklärt es verständlich |
| B-04 | Inkassokosten: Was darf ein Inkassounternehmen berechnen? | RVG/RDG, Gebührendeckel bei Verbrauchern |
| B-05 | Inkasso oder Anwalt — was ist wann richtig? | Vergleichsfrage, wird von KI häufig gestellt |

## Block 2 · Verfahren und Fristen (6)

| # | Seitentitel | Warum |
|---|---|---|
| B-06 | Wann ist eine Rechnung im Verzug? | Voraussetzung für alles Weitere |
| B-07 | Außergerichtliches und gerichtliches Mahnverfahren — der Unterschied | euer Kernthema, ihr habt beides |
| B-08 | Was ist ein Mahnbescheid — und wann lohnt er sich? | direkte Brücke zu gerichtsmahnverfahren.de |
| B-09 | Wie lange dauert ein Inkassoverfahren? | Erwartungsfrage, hohe Suchhäufigkeit |
| B-10 | Verjährung von Forderungen: Welche Fristen gelten? | Dringlichkeit erzeugt Handlung |
| B-11 | Was passiert, wenn der Schuldner nicht zahlen kann? | ehrliche Antwort schafft Vertrauen |

## Block 3 · Zielgruppenspezifisch (6)

| # | Seitentitel | Zielgruppe |
|---|---|---|
| B-12 | Kunde zahlt die Rechnung nicht — was können Handwerksbetriebe tun? | Handwerk |
| B-13 | Mietrückstand: Welche Schritte haben private Vermieter? | private Vermieter |
| B-14 | Honorarrechnung unbezahlt — was können Freiberufler tun? | Klein-B2B |
| B-15 | Privatrechnung nicht bezahlt — was können Praxen tun? | Ärzte, Zahnärzte |
| B-16 | Zahlungsrückstände in der Hausverwaltung richtig behandeln | Hausverwaltungen |
| B-17 | Offene Mitgliedsbeiträge einziehen — Wege für Vereine und Studios | Abo-Geschäfte |

## Block 4 · Vertrauen und Entscheidung (3)

| # | Seitentitel | Warum |
|---|---|---|
| B-18 | Woran erkennt man ein seriöses Inkassounternehmen? | Vertrauensfrage — beantwortet eure Positionierung mit |
| B-19 | Selbst mahnen oder Inkasso beauftragen? | Entscheidungsfrage, hohe Kaufabsicht |
| B-20 | Inkasso beauftragen, ohne die Kundenbeziehung zu zerstören | euer Alleinstellungsmerkmal als Frage formuliert |

---
---

# TEIL 5 · Seitenvorlagen — Aufbau je Typ

## 5.1 Fragen-Seite (Typ B) — die wichtigste Vorlage

```
H1: [Die Frage im Wortlaut]

[DIREKTE ANTWORT — 2 bis 3 Sätze, sofort, ohne Einleitung.
 Das ist der Absatz, den ein Sprachmodell zitiert. Konkret, mit Zahlen wo möglich.]

Veröffentlicht [Datum] · Aktualisiert [Datum] (ohne Namensnennung, siehe 1.3)

H2: [Die ausführliche Erklärung]
    Fließtext, kurze Absätze, konkrete Zahlen und Rechtsnormen.

H2: [Ein konkretes Beispiel]
    Mit echten Beträgen durchgerechnet. Beispiele werden überdurchschnittlich oft zitiert.

H2: [Tabelle mit den Kernfakten]
    Tabellen sind maschinell besonders gut extrahierbar.

H2: Häufige Fragen dazu
    3 bis 5 Unterfragen, je 2 bis 3 Sätze. Mit FAQPage ausgezeichnet.

H2: [Handlungsaufforderung]
    Kein Verkaufsdruck. Ein Satz plus Link auf /einreichen.

Verwandte Themen: [3 bis 5 interne Links auf andere Fragen- und Branchenseiten]
```

**Nicht verhandelbare Regeln:**
- Die direkte Antwort steht **vor** allem anderen. Keine Einleitung, kein „In diesem Artikel erfahren Sie…"
- Mindestens **drei konkrete, überprüfbare Fakten** je Seite (Beträge, Fristen, Paragrafen)
- Keine erfundenen Statistiken. Wo eine Zahl nicht belegbar ist: weglassen
- Rechtsaussagen mit Fundstelle (§, Gesetz) — das macht sie zitierfähig
- Beide Daten (Veröffentlicht/Aktualisiert) sichtbar, ohne Namensnennung

## 5.2 Branchenseite (Typ A)

```
H1: Inkasso für [Branche]

[DIREKTE ANTWORT: Was Nota für diese Branche tut, 2 bis 3 Sätze]

H2: Das typische Problem in [Branche]
    Branchenspezifisch: welche Forderungsart, welcher Betrag, welcher Anlass

H2: Ein typischer Fall
    Konkretes, realistisches Beispiel mit Zahlen

H2: So läuft es bei Nota Finance
    Drei Schritte: hochladen — prüfen — einziehen

H2: Was es kostet
    Kostenklarheit, für den Gläubiger kostenfrei

H2: Häufige Fragen aus [Branche]
    4 bis 6 branchenspezifische Fragen, FAQPage-ausgezeichnet

Vertrauensblock: twenty4collect seit 2008, RDG-registriert, BDIU
CTA + interne Links zu passenden Fragen-Seiten
```

## 5.3 Stadt-Branche-Seite (Typ C)

```
H1: Inkasso für [Branche] in [Stadt]

[DIREKTE ANTWORT mit Ortsbezug, 2 bis 3 Sätze]

H2: [Branche] in [Stadt] — die Ausgangslage
    Regionale Wirtschaftsstruktur, zuständige Kammer. RECHERCHIERT, nicht erfunden.

H2: Der Weg zur Durchsetzung
    H3: Außergerichtlich — was Nota übernimmt
    H3: Gerichtlich — das zuständige Mahngericht
         Zentrales Mahngericht für [Bundesland]: [RECHERCHIERT]
         Örtliches Amtsgericht [Stadt]: [RECHERCHIERT]

H2: Was es kostet

H2: Häufige Fragen
    2 bis 3 Fragen, davon mindestens eine mit Ortsbezug

CTA + interne Links: Branchenseite, passende Fragen-Seiten, benachbarte Städte
```

### Qualitätsschwelle für Typ C — verbindlich

Eine Seite wird **nur veröffentlicht**, wenn alle fünf Punkte erfüllt sind:

| # | Anforderung |
|---|---|
| 1 | Echter, recherchierter regionaler Bezug (Mahngericht, Amtsgericht, Kammer) |
| 2 | Branchenspezifischer Inhalt, der nicht wortgleich auf anderen Seiten steht |
| 3 | Eigenständiger Einstiegsabsatz — keine Textbaustein-Variante mit getauschtem Ortsnamen |
| 4 | Mindestens ein konkreter Fakt (Betrag, Frist, Rechtsnorm, Verfahrensweg) |
| 5 | **Von einem Menschen gelesen** vor Veröffentlichung |

**Seiten, die das nicht erfüllen: `noindex` oder gar nicht veröffentlichen.**
Lieber 30 gute als 50 mittelmäßige.

---
---

# TEIL 6 · Bewertungen — der systematische Weg

Der wirksamste einzelne Hebel für lokale und KI-Sichtbarkeit. **Ausschließlich echte Bewertungen.**

## 6.1 Die Quelle

**Bestandskunden von twenty4collect.** Seit 2008 gibt es zufriedene Auftraggeber — das sind
Menschen, die die Leistung tatsächlich in Anspruch genommen haben und bewerten dürfen.

## 6.2 Der Prozess

| Schritt | Was |
|---|---|
| 1 | Dein Vater erstellt eine Liste von 15–20 Auftraggebern mit positivem Verlauf |
| 2 | Persönliche Ansprache (Telefon oder E-Mail), keine Massenmail |
| 3 | Direktlink zum Google-Bewertungsformular mitschicken — die Hürde muss minimal sein |
| 4 | **Verteilt über Wochen**, nicht alle an einem Tag (Muster-Erkennung) |
| 5 | Jede Bewertung beantworten — auch kritische, sachlich und lösungsorientiert |

## 6.3 Laufend nach dem Go-live

Nach jedem erfolgreich abgeschlossenen Fall die Bitte um eine Bewertung — als fester Bestandteil
der Abschlusskommunikation. Das ist der nachhaltige Weg, und er skaliert von selbst.

---
---

# TEIL 7 · Umsetzungsplan bei 5 Stunden pro Woche

## 7.1 Vor dem Go-live (parallel zur Anwaltswartezeit)

| Woche | Arbeit | Std. |
|---|---|---|
| 1 | Entitäts-Fundament: Faktenkern, strukturierte Daten, `llms.txt`, Autorenprofil, Presseseite | 5 |
| 2 | Technik: `sitemap.xml`, `robots.txt` (KI-Crawler erlauben), Search Console, Bing, Google Business Profile | 5 |
| 3 | Bestehende Seiten auf extrahierbare Struktur umbauen (direkte Antwort zuerst, FAQ-Auszeichnung) | 5 |
| 4–5 | 12 Branchenseiten (Typ A) | 10 |
| 6–8 | 20 Fragen-Seiten (Typ B) — der wichtigste Block | 15 |
| 9–10 | 50 Stadt-Branche-Seiten (Typ C): Recherche, Vorlage, Erzeugung, redaktionelle Durchsicht | 10 |
| laufend | Bewertungen einsammeln (dein Vater) | — |

**Summe: rund 50 Stunden über 10 Wochen.** Passt zur Anwaltswartezeit.

## 7.2 Nach dem Go-live

| Rhythmus | Arbeit | Std. |
|---|---|---|
| wöchentlich | Search Console prüfen, Indexierungsprobleme beheben | 1 |
| wöchentlich | Eine neue Fragen-Seite oder eine bestehende aktualisieren | 2 |
| wöchentlich | Bewertungen anfragen und beantworten | 1 |
| monatlich | KI-Sichtbarkeitsmessung (20 Prompts, siehe 7.3) | 0,5 |
| monatlich | Drittseiten-Kontakte (Verbände, Kammern, Fachmedien) | 1 |

**Ausrollen weiterer Städteseiten erst**, wenn der Pilot nachweislich Wirkung zeigt — frühestens
nach 8 Wochen Messung.

## 7.3 Die monatliche Messung

20 feste Prompts, immer dieselben, Ergebnis in eine Tabelle. Beispiele:

1. „Ich bin Handwerker in München, ein Kunde zahlt 3.000 € nicht. Was kann ich tun?"
2. „Welche digitalen Inkassodienstleister gibt es in Deutschland?"
3. „Was kostet ein Inkassobüro und wer trägt die Kosten?"
4. „Mein Mieter zahlt seit drei Monaten nicht. Welche Möglichkeiten habe ich?"
5. „Inkasso ab welchem Betrag sinnvoll?"
6. „Wie funktioniert das gerichtliche Mahnverfahren?"
7. „Seriöses Inkassounternehmen für kleine Forderungen"
8. „Was passiert bei Teilzahlung einer Forderung?"

Erfasst wird je Prompt: Wird Nota/twenty4collect genannt? Wie beschrieben? Welche Quellen zitiert?

**Getestet in:** ChatGPT, Claude, Gemini, Perplexity.

---
---

# TEIL 8 · Technische Vorgaben für die Umsetzung

## 8.1 URL-Struktur

| Typ | Muster | Beispiel |
|---|---|---|
| Branche | `/inkasso-[branche]` | `/inkasso-handwerk` |
| Frage | `/ratgeber/[frage-slug]` | `/ratgeber/was-kostet-inkasso` |
| Stadt-Branche | `/inkasso-[branche]-[stadt]` | `/inkasso-handwerk-muenchen` |
| Presse | `/presse` | |

Umlaute in Slugs auflösen (`muenchen`, nicht `münchen`).

## 8.2 Pflichtangaben je Seite

- Eindeutiger Title (≤ 60 Zeichen), Meta-Description (≤ 155 Zeichen)
- Genau eine H1, saubere Überschriftenhierarchie
- Kanonische URL
- JSON-LD passend zum Seitentyp (Teil 1.5)
- Veröffentlichungs- und Aktualisierungsdatum, ohne Namensnennung (siehe 1.3)
- Mindestens drei interne Links

## 8.3 `robots.txt` — kritisch

KI-Crawler müssen **ausdrücklich erlaubt** sein. Wer GPTBot, ClaudeBot, PerplexityBot und Co.
aussperrt, kann nicht zitiert werden. Vor dem Go-live prüfen.

## 8.4 Interne Verlinkung

- Jede Fragen-Seite verlinkt auf 2–3 andere Fragen-Seiten und die passende Branchenseite
- Jede Branchenseite verlinkt auf die zugehörigen Fragen-Seiten und die Stadt-Seiten
- Jede Stadt-Seite verlinkt auf die Branchenseite und auf 2–3 Nachbarstädte
- Jede Seite verlinkt auf `/einreichen`

## 8.5 Sitemap

`sitemap.xml` mit allen öffentlichen Seiten, `lastmod` gepflegt. Einreichen bei **Google Search
Console und Bing Webmaster Tools** — Bing ist Pflicht, weil ChatGPTs Websuche darauf aufsetzt.

---
---

# TEIL 9 · Was zu recherchieren ist, bevor gebaut wird

> Diese Angaben müssen belegt werden. **Nichts davon darf geraten werden.**

| # | Zu recherchieren | Für |
|---|---|---|
| 1 | Zentrales Mahngericht je Bundesland (für die 25 Städte relevant: mind. 8 Bundesländer) | Typ C |
| 2 | Örtliches Amtsgericht je Stadt (25 Angaben) | Typ C |
| 3 | Zuständige IHK und Handwerkskammer je Stadt | Typ C |
| 4 | Aktuelle RVG-Gebührensätze für die Kostenbeispiele | Typ B |
| 5 | Gebührendeckel bei Verbraucherforderungen (RDG-Reform) | B-04 |
| 6 | Verjährungsfristen nach BGB für die relevanten Forderungsarten | B-10 |
| 7 | Vollständige Firmierung und Anschrift twenty4collect für strukturierte Daten | Teil 1 |

---
---

# TEIL 10 · Nicht empfohlen

- **Keine gekauften oder erfundenen Bewertungen** (Teil 0)
- **Keine 1.200 Seiten** — der Pilot umfasst 50, Ausrollen nur nach Messung
- **Kein Ahrefs/Semrush** vor 30 Seiten und wöchentlicher Veröffentlichung
- **Keine erfundenen Gerichts- oder Kammerangaben** — falsche Rechtsangaben auf einer
  Rechtsdienstleistungs-Website sind ein ernstes Problem
- **Keine erfundenen Statistiken** in Fachtexten
- **Kein Ranking-Ziel für „Inkasso München"** in den ersten sechs Monaten
- **Keine werblichen Beiträge in Foren**

---

**Nächster Schritt:** Ich formuliere daraus die Aufträge für Claude Code — beginnend mit dem
Entitäts-Fundament (Teil 1), weil es den höchsten Hebel bei geringstem Aufwand hat und die
Grundlage für alles Weitere ist.
