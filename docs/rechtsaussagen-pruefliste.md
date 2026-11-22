# Prüfliste aller Rechtsaussagen

**Zweck:** Vollständige Liste aller Rechtsaussagen mit Fundstelle auf den 12 Branchenseiten, den
20 Ratgeber-Seiten, der Preise-Seite und im Faktenkern — zur Übergabe an die anwaltliche Prüfung
(P0-7). Jede Zeile wurde einzeln gegen den aktuellen Gesetzestext geprüft, nicht aus dem Code
übernommen.

**Methodik:** Primärquelle ist ausschließlich der amtliche Gesetzestext auf
[gesetze-im-internet.de](https://www.gesetze-im-internet.de) (Stand der Prüfung: 22.11.2026). Bei
einem Befund, der von der bisherigen Dokumentation abwich (VV RVG Nr. 2300, siehe unten), wurde der
rohe HTML-Quelltext der Seite direkt ausgewertet (nicht nur eine KI-Zusammenfassung), um
Fehlzusammenfassungen auszuschließen — und zusätzlich über eine zweite, unabhängige Quelle
(kostennoten.de) gegengeprüft.

**Zeichenerklärung:**
- ✅ korrekt — Aussage und Fundstelle stimmen mit dem aktuellen Gesetzestext überein
- ⚠️ ABWEICHUNG — siehe Anmerkung, echter Korrekturbedarf oder Präzisierungsbedarf
- 🔍 für anwaltliche Prüfung vorgemerkt — im Text selbst bereits als ungeklärt gekennzeichnet

---

## Zusammenfassung der Abweichungen (Details weiter unten je Seite)

| # | Fundstelle im Projekt | Befund | Status |
|---|---|---|---|
| 1 | `app/preise/page.tsx`, Beispielrechnung | Veraltete RVG-Gebühr 49,00 € statt aktuell 51,50 € (§ 13 Abs. 1 RVG, seit 1.6.2025), dazu Auslagenpauschale auf Basis einer noch älteren Tabelle (45,00 €, 2013–2020) mit dem falschen Satz 1,3 statt Regelsatz 0,9 — zwei unterschiedliche Gebühren­generationen gemischt. | **ERLEDIGT (22.11.2026)** — neu durchgerechnet auf 46,35 € (Gebühr, 0,9-Satz) und 9,27 € (Auslagenpauschale, Nr. 7002 VV RVG); Beispiel als Regelfall gekennzeichnet |
| 2 | `lib/ratgeber-content.ts`, Seite `was-darf-inkasso-kosten`, FAQ | Bisherige Prüfnotiz war falsch — die Zwei-Wochen-Frist für den einfachen Fall (0,5-Gebühr) steht wörtlich im Gesetzestext (Anmerkung Abs. 2 zu Nr. 2300 VV RVG). Siehe Begründung unten. | **ERLEDIGT (22.11.2026)** — als Regelvermutung aufgenommen, Vermerk auf „vom Anwalt zu bestätigen" geändert |
| 3 | `lib/branchen-content.ts`, Seite `fitnessstudio` (fallText und FAQ) | Ungenaue Reform-Zuordnung — die 24-Monats-Grenze (§ 309 Nr. 9 Buchst. a BGB) existierte bereits vor der Reform zum 1.3.2022; die Reform änderte nur Buchst. b/c (Verlängerung/Kündigungsfrist). | **ERLEDIGT (22.11.2026)** — Formulierung korrigiert, Hinweis „in Allgemeinen Geschäftsbedingungen" ergänzt |
| 4 | zwölf Fundstellen mit unqualifizierter „100 %"-Aussage (Liste siehe eigener Abschnitt unten) | Grenzwertig zu `docs/marke-und-texte.md` Abschnitt 3 (dort als zu qualifizieren markiert: „Sie erhalten 100 %" ohne Einschränkung ist bei Ratenzahlung erst am Ende zutreffend, § 367 BGB). | **ERLEDIGT (22.11.2026)** — alle zwölf Werbetext-Stellen auf „nach vollständigem Ausgleich der Forderung … in voller Höhe ausgezahlt" umgestellt. **AGB (`app/agb/page.tsx` Z. 505) bewusst unverändert** — gesperrter Rechtstext, weicht damit künftig vom Werbetext ab. Für die anwaltliche Prüfung vermerkt: siehe „Offene Punkte" unten. |
| 5 | `app/preise/page.tsx`, Beispielrechnung, Zeile „Ihre Mahnkosten: 20,00 €" | 20,00 € liegt weit außerhalb des von Gerichten für ein einfaches eigenes Mahnschreiben anerkannten Rahmens (ca. 1,50–2,50 €, in Ausnahmefällen bis 5 €). | **ERLEDIGT (22.11.2026)** — auf 2,50 € geändert, als Beispielbetrag ohne pauschalen Anspruch gekennzeichnet. **Keine Urteile/Aktenzeichen auf der Website** — Rechtsprechungs-Fundstellen nur hier in der Prüfliste, als „ungeprüft, vom Anwalt zu bestätigen" (siehe Begründung unten zur Verifikation der Aktenzeichen) |
| 6 | `app/preise/page.tsx`, Zeile 35 („… gemäß RDGEG i.V.m. dem RVG …") | Fundstelle „RDGEG" war nach altem Recht (bis 30.9.2021) richtig, ist seit der Reform zum 1.10.2021 aber überholt — § 4 RDGEG regelt seither nur noch Rentenberater. | **ERLEDIGT (22.11.2026)** — ersetzt durch „§ 13e RDG i. V. m. § 13 RVG und Nr. 2300 VV RVG". Frage für den Anwalt vermerkt: siehe „Offene Punkte" unten |

Keine weiteren Abweichungen gefunden. Alle übrigen Rechtsaussagen (siehe Tabellen unten) stimmen mit
dem geprüften Gesetzestext überein.

---

## Begründung zu Abweichung 2 (VV RVG Nr. 2300) — wichtigster Befund dieser Prüfung

Der amtliche Text der **Anmerkung zu Nummer 2300 VV RVG** (Anlage 1 zum RVG), direkt aus dem
HTML-Quelltext von gesetze-im-internet.de ausgelesen:

> „(2) Ist Gegenstand der Tätigkeit eine Inkassodienstleistung, die eine unbestrittene Forderung
> betrifft, kann eine Gebühr von mehr als 0,9 nur gefordert werden, wenn die Inkassodienstleistung
> besonders umfangreich oder besonders schwierig war. In einfachen Fällen darf nur eine Gebühr von
> 0,5 gefordert werden; **ein einfacher Fall liegt in der Regel vor, wenn die Forderung innerhalb
> von zwei Wochen nach der ersten Zahlungsaufforderung beglichen wird.** Der Gebührensatz beträgt
> höchstens 1,3."

Die Zwei-Wochen-Frist ist also **Teil des geltenden Gesetzestextes**, keine Sekundärquellen-Erfindung.
Die gegenteilige Feststellung in `docs/aufgabenliste.md` (SEO-5, Nachtrag 07.09.2026: „Gegenprüfung
über mehrere unabhängige Fachquellen … ergab übereinstimmend den tatsächlichen Wortlaut ohne
Fristangabe") war unzutreffend. Die Website selbst sagt an dieser Stelle nichts Falsches — sie
verzichtet nur auf eine tatsächlich belegbare Angabe und verweist stattdessen auf eine offene Frage.
Das ist nicht riskant, aber nicht mehr nötig. **Keine Änderung ohne Ihre Freigabe vorgenommen** —
betroffen ist die FAQ-Antwort auf `was-darf-inkasso-kosten`.

**Wichtig zur Einordnung:** „in der Regel" ist eine **Regelvermutung**, keine starre, zwingende
Grenze. Die Zwei-Wochen-Zahlung beschreibt den Normalfall des „einfachen Falls" (0,5-Gebühr), schließt
im Einzelfall aber eine andere Beurteilung nicht zwingend aus (z. B. könnte ein innerhalb zwei Wochen
beglichener, aber nachweislich besonders aufwendiger Fall trotzdem nicht als „einfach" gelten).

---

## Begründung zu Abweichung 3 (Fitnessstudio, § 309 Nr. 9 BGB) — umgesetzt

**Amtlicher Text, am Rohtext verifiziert:**

> „9. bei einem Vertragsverhältnis, das die regelmäßige Lieferung von Waren oder die regelmäßige
> Erbringung von Dienst- oder Werkleistungen durch den Verwender zum Gegenstand hat, **a)** eine den
> anderen Vertragsteil länger als zwei Jahre bindende Laufzeit des Vertrags, **b)** eine den anderen
> Vertragsteil bindende stillschweigende Verlängerung des Vertragsverhältnisses, es sei denn das
> Vertragsverhältnis wird nur auf unbestimmte Zeit verlängert und dem anderen Vertragsteil wird das
> Recht eingeräumt, das verlängerte Vertragsverhältnis jederzeit mit einer Frist von höchstens einem
> Monat zu kündigen, oder **c)** eine zu Lasten des anderen Vertragsteils längere Kündigungsfrist als
> einen Monat vor Ablauf der zunächst vorgesehenen Vertragsdauer"

Buchst. a (24-Monats-Grenze) existierte bereits vor der Reform zum 1.3.2022 unverändert. Die Reform
hat nur Buchst. b und c verschärft: automatische Verlängerung seither nur noch auf unbestimmte Zeit
mit höchstens einem Monat Kündigungsfrist, statt zuvor bis zu einem Jahr Verlängerung mit bis zu drei
Monaten Kündigungsfrist. **Umgesetzt:** `lib/branchen-content.ts`, Seite `fitnessstudio` (fallText und
FAQ) korrigiert, mit dem vom Auftraggeber gewünschten Zusatz „in Allgemeinen Geschäftsbedingungen".

---

## Begründung zu Abweichung 5 (Mahnkosten-Pauschale 20,00 €) — umgesetzt

**Prüfung der Aktenzeichen, wie angefordert — Ergebnis:**

| Gericht/Quelle | Anerkannter Betrag laut Sekundärquellen | Verifikationsergebnis |
|---|---|---|
| BGH, Urt. v. 26.06.2019, VIII ZR 95/18 | 2,50 € (Energieversorger-AGB) für zu hoch erklärt, tatsächliche Kosten 0,76 € | **Solide bestätigt** — mehrere unabhängige Quellen (dejure.org, rewis.io, Verbraucherschutzverein, Fachpresse) beschreiben übereinstimmend denselben Sachverhalt: 2,50 €-Mahngebühr und zwei 77,13 €-Pauschalen eines Energieversorgers, Verstoß gegen §§ 307, 309 Nr. 5 Buchst. a BGB. Passt zum Thema. |
| AG Brandenburg, Urt. v. 10.09.2018, 31 C 213/17 | höchstens 2,50 € | **Nicht zweifelsfrei verifizierbar** — eine Quelle beschreibt dieses Aktenzeichen als einen Kfz-Versicherungsfall (nicht offengelegte Kilometerleistung), nennt aber im selben Abschnitt eine Mahnkosten-Position von 2,50 € als Teil der zugesprochenen Summe. Beide Angaben könnten zur selben Entscheidung gehören (eine Mahnkosten-Nebenforderung innerhalb eines Versicherungsstreits) oder es liegt eine Quellenverwechslung vor. **Nicht ohne weitere Prüfung als Beleg verwendbar.** |
| AG Münster, „höchstens 1,50 €" | 1,50 € | **Kein Aktenzeichen auffindbar** — in allen gesichteten Sekundärquellen nur als Faustregel ohne Fundstelle genannt. Nicht als Einzelfallbeleg verwendbar, nur als häufig wiederholte Praxisangabe. |

**Entscheidung des Auftraggebers (22.11.2026):** Keine Urteile oder Aktenzeichen auf der Website
nennen. Hier in der Prüfliste werden alle drei Fundstellen als **„ungeprüft, vom Anwalt zu
bestätigen"** eingestuft — das gilt ausdrücklich auch für die BGH-Entscheidung, obwohl deren
Existenz und Thema solide bestätigt ist: die Übertragbarkeit auf den vorliegenden Fall (eigene
Mahnkosten eines Gläubigers, nicht AGB eines Energieversorgers) ist eine rechtliche Wertung, die dem
Anwalt vorbehalten bleibt.

**Umgesetzt:** Die Beispielzahl ist auf **2,50 €** geändert und auf der Website ausdrücklich als
Beispielbetrag ohne pauschalen Anspruch gekennzeichnet (Tooltip: „kein pauschaler Anspruch; die
tatsächliche Höhe ist im Einzelfall nachzuweisen"). Keine Gerichtsnamen oder Aktenzeichen im
Website-Text.

---

## Begründung zu Abweichung 6 (Fundstelle „RDGEG") — umgesetzt

**Aktuelle Fassung von § 4 RDGEG** (seit 1.10.2021), amtlicher Text:

> „(1) Für die Vergütung der registrierten Erlaubnisinhaber mit Ausnahme der Frachtprüferinnen und
> Frachtprüfer gilt § 13d des Rechtsdienstleistungsgesetzes entsprechend.
> (2) Für die Erstattungsfähigkeit der Vergütung von Kammerrechtsbeiständen gilt § 13d Absatz 3 des
> Rechtsdienstleistungsgesetzes entsprechend."

§ 13d RDG, auf den hier verwiesen wird, regelt ausschließlich die **Vergütung der Rentenberater**
(„Für die Vergütung der Rentenberater gilt das Rechtsanwaltsvergütungsgesetz entsprechend") — mit
Inkassodienstleistungen hat das nichts zu tun.

**Frühere Fassung von § 4 RDGEG** (bis 30.9.2021), zum Vergleich:

> „(1) Das Rechtsanwaltsvergütungsgesetz gilt für die Vergütung der Rentenberaterinnen und
> Rentenberater … sowie der registrierten Erlaubnisinhaber mit Ausnahme der Frachtprüferinnen und
> Frachtprüfer entsprechend."
> „(5) [Erstattungsfähigkeit von Inkassokosten für außergerichtliche Dienstleistungen, inhaltlich
> der heutige § 13e Abs. 1 RDG]"

**Ergebnis:** Die von einer Quelle zitierte Fundstelle „§ 4 Abs. 1 RDGEG i. V. m. Nr. 2300 VV RVG"
war **nach altem Recht (bis 30.9.2021) zutreffend** — damals ordnete Abs. 1 die entsprechende Geltung
des RVG (und damit auch von Nr. 2300 VV RVG) für Inkassodienstleister an, während Abs. 5 die
Erstattungsfähigkeit gegenüber dem Schuldner regelte. **Nach geltendem Recht ist die Fundstelle
überholt.** Die Reform zum 1.10.2021 hat die Inkasso-spezifischen Regelungen vollständig aus dem
RDGEG herausgelöst und in die §§ 13a–13e RDG überführt; § 4 RDGEG regelt seither nur noch
Rentenberater. **Die korrekte heutige Fundstelle für die Kostenerstattung gegenüber dem Schuldner ist
§ 13e RDG** — in Verbindung mit Nr. 2300 VV RVG und § 13 RVG für die Berechnung der konkreten
Beträge. **Umgesetzt:** Die Website nennt jetzt „§ 13e RDG i. V. m. § 13 RVG und Nr. 2300 VV RVG",
kein „RDGEG" mehr auf der Seite.

---

## Preise-Seite (`app/preise/page.tsx`)

| Rechts-/Zahlenaussage | Fundstelle im Projekt | Prüfergebnis |
|---|---|---|
| Geschäftsgebühr Regelfall (0,9-Satz) | 46,35 € | ✅ **korrigiert (22.11.2026)** — § 13 Abs. 1 RVG (51,50 € Basis, seit 1.6.2025) × 0,9-Satz nach Anm. Abs. 2 zu Nr. 2300 VV RVG; im Beispiel jetzt ausdrücklich als Regelfall gekennzeichnet |
| Auslagenpauschale | 9,27 € | ✅ **korrigiert** — Nr. 7002 VV RVG, 20 % der Gebühr (46,35 € × 20 %), keine Kappung erreicht (Höchstbetrag 20,00 €) |
| Mahnkosten (Beispiel) | 2,50 € | ✅ **korrigiert** — siehe Begründung zu Abweichung 5; als Beispielbetrag ohne pauschalen Anspruch gekennzeichnet, keine Urteile/Aktenzeichen im Website-Text |
| Gesamtzahlungsaufforderung / Auszahlung an Gläubiger / Einbehalt | 259,86 € / 204,24 € / 55,62 € | ✅ nachgerechnet, stimmt (199,18+2,50+2,56+46,35+9,27 = 259,86; 199,18+2,50+2,56 = 204,24; 46,35+9,27 = 55,62) |
| Fundstelle „gemäß RDGEG i.V.m. dem RVG" | ersetzt durch „§ 13e RDG i. V. m. § 13 RVG und Nr. 2300 VV RVG" | ✅ **korrigiert** — siehe Begründung zu Abweichung 6 |
| „100 %"-Aussagen (Fließtext, Kachel, Fußnote) | zwölf Fundstellen | ✅ **korrigiert** — siehe eigener Abschnitt unten |
| `priceValidUntil: "2027-12-31"` | `app/preise/layout.tsx` Z. 30 | ✅ keine Rechtsaussage, nur Gültigkeitsdatum — unverändert korrekt (Entscheidung 28) |

---

## Faktenkern (`lib/faktenkern.ts`)

| Angabe | Prüfergebnis |
|---|---|
| `mindestforderung: 50` (€) | ✅ Produktentscheidung, keine Rechtsnorm — nichts zu prüfen |
| `kostenmodell` / `kostenmodellSieAnsprache` | ✅ reine Werbeaussage, mit `docs/marke-und-texte.md` abgeglichen, keine Zahl, kein Veralterungsrisiko |
| RDG-Aktenzeichen „75 E – 52/08" | nicht Gegenstand dieser Prüfung (Registerangabe, nicht Gesetzestext) |
| Keine RVG-/Verjährungs-/Fristangaben im Faktenkern enthalten | ✅ keine veralteten Beträge gefunden |

---

## Branchenseiten (`lib/branchen-content.ts`)

### Handwerk

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Vergütung fällig mit Abnahme des Werks | § 641 BGB | ✅ korrekt |
| Verzug Gewerbekunde automatisch nach 30 Tagen | § 286 Abs. 3 BGB | ✅ korrekt |
| Abschlagszahlung in Höhe der bereits erbrachten Leistung, muss nicht abgeschlossen sein | § 632a Abs. 1 BGB | ✅ korrekt (Rechtslage seit Bauvertragsrechtsreform 2018) |
| Bauhandwerkersicherung: volle offene Vergütung + 10 % Nebenforderungen | § 650f BGB | ✅ korrekt, am Rohtext verifiziert |
| Regelmäßige Verjährung 3 Jahre, Beginn mit Jahresende | §§ 195, 199 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Freiberufler & Kreative

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Verzug Gewerbekunde automatisch nach 30 Tagen | § 286 Abs. 3 BGB | ✅ korrekt |
| Verjährung 3 Jahre | §§ 195, 199 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Gesundheitswesen & Heilberufe

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Fälligkeit mit Rechnungserteilung nach GOÄ/GOZ | sinngemäß § 12 Abs. 1 GOÄ | ✅ für GOÄ am Rohtext verifiziert; GOZ nicht einzeln geprüft (eigene Verordnung, inhaltsgleiche Regel in § 10 GOZ) |
| Verjährung 3 Jahre | § 195 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Agenturen & Dienstleister

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Verzug Gewerbekunde automatisch nach 30 Tagen | § 286 Abs. 3 BGB | ✅ korrekt |
| Freie Kündigung: vereinbarte Vergütung bleibt, abzgl. erspartem/anderweitigem Erwerb, Vermutung 5 % für nicht erbrachten Teil | § 648 BGB | ✅ korrekt, am Rohtext verifiziert |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Handel & E-Commerce

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Verzugszinsen 5 / 9 Prozentpunkte über Basiszinssatz | § 288 Abs. 1/2 BGB | ✅ korrekt |
| Verzug nach 30 Tagen | § 286 Abs. 3 BGB | ✅ korrekt |
| Verjährung 3 Jahre | § 195 BGB | ✅ korrekt |
| Widerrufsrecht 14 Tage bei Fernabsatz | § 312g Abs. 1 i. V. m. § 355 Abs. 2 BGB | ✅ korrekt, beide Normen zusammen zitiert (zutreffend: § 312g begründet das Recht, § 355 Abs. 2 regelt die Frist) |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Hotels & Gastronomie

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Verzug Gewerbekunde automatisch nach 30 Tagen | § 286 Abs. 3 BGB | ✅ korrekt |
| Verjährung 3 Jahre | § 195 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### IT & Software-Services

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Fiktive Abnahme nach Fristsetzung; bei Verbrauchern zusätzlich Textform-Hinweis nötig | § 640 Abs. 2 BGB | ✅ korrekt, am Rohtext verifiziert (Verbraucher-Zusatz enthalten) |
| Freie Kündigung: Vergütung bleibt, 5 %-Vermutung | § 648 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Maschinenbau & Industrie

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Zahlungsfristen zwischen Unternehmern max. 60 Tage, außer ausdrücklich vereinbart und nicht grob unbillig | § 271a BGB | ✅ korrekt, am Rohtext verifiziert |
| Verzugszinsen 9 Prozentpunkte über Basiszinssatz | § 288 Abs. 2 BGB | ✅ korrekt |
| Abschlagszahlung ohne Erfordernis abgeschlossener Teile | § 632a Abs. 1 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Private Vermieter

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Fristlose Kündigung: zwei aufeinanderfolgende Termine, Rückstand > 1 Monatsmiete, ODER über längeren Zeitraum insgesamt 2 Monatsmieten | § 543 Abs. 2 S. 1 Nr. 3 Buchst. a/b BGB i. V. m. § 569 Abs. 3 Nr. 1 BGB | ✅ korrekt, am Rohtext verifiziert (bereits in einer früheren Korrekturrunde richtiggestellt) |
| Verjährung 3 Jahre | § 195 BGB | ✅ korrekt |
| Fälligkeit Miete spätestens 3. Werktag | § 556b Abs. 1 BGB | ✅ korrekt |
| Verzug ohne Mahnung bei kalendermäßig fester Fälligkeit | § 286 Abs. 2 Nr. 1 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Hausverwaltungen

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Gemeinschaft der Wohnungseigentümer ist rechtsfähig, Trägerin des Hausgeldanspruchs | § 9a Abs. 1 WEG | ✅ korrekt (korrekte Fundstelle ist `woeigg`-Dokument auf gesetze-im-internet.de, nicht „weg") |
| Rechte mit einheitlicher Rechtsverfolgung übt die Gemeinschaft aus, nicht der einzelne Eigentümer | § 9a Abs. 2 WEG | ✅ korrekt |
| Verwalter vertritt die Gemeinschaft gerichtlich und außergerichtlich | § 9a i. V. m. § 9b WEG | ✅ korrekt |
| Wirtschaftsplan/Vorschüsse durch Beschluss | § 28 Abs. 1 WEG | ✅ korrekt |
| Verjährung 3 Jahre | § 195 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Fitness, Abo & Mitgliedschaften

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Erstlaufzeit max. 24 Monate bei Verbraucherverträgen über wiederkehrende Leistungen, in AGB | § 309 Nr. 9 Buchst. a BGB | ✅ **korrigiert (22.11.2026)** — Reform-Zuordnung richtiggestellt, Hinweis „in Allgemeinen Geschäftsbedingungen" ergänzt; siehe Begründung zu Abweichung 3 |
| Kündigung höchstens Textform | § 309 Nr. 13 BGB | ✅ im Ergebnis korrekt — die Norm nennt „Kündigung" nicht wörtlich, regelt aber allgemein „Anzeigen oder Erklärungen" gegenüber dem Verwender; eine Kündigungserklärung ist davon erfasst |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

### Bildung & Freizeit

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Minderjährige können keinen wirksamen Vertrag schließen, Vertragspartner ist der unterschreibende Erziehungsberechtigte | §§ 106 ff. BGB | ✅ korrekt |
| Verjährung 3 Jahre | § 195 BGB | ✅ korrekt |
| Widerrufsrecht 14 Tage bei Fernabsatz | § 312g Abs. 1 i. V. m. § 355 Abs. 2 BGB | ✅ korrekt |
| Zulassung als Inkassodienstleister | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |

---

## Ratgeber-Seiten (`lib/ratgeber-content.ts`)

### B-01 `was-kostet-inkasso`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Kostendeckel: höchstens RVG-Anwaltsvergütung | § 13e RDG | ✅ korrekt, am Rohtext verifiziert |
| Gebührenrahmen 0,5–1,3, Regelsatz 0,9 | Anm. Abs. 2 zu Nr. 2300 VV RVG | ✅ korrekt |
| Volle Gebühr bis 500 € = 51,50 € | § 13 Abs. 1 RVG (seit 1.6.2025) | ✅ korrekt, am Rohtext verifiziert, Datum bestätigt (KostBRÄG 2025) |
| Gebühr bis 50 € = 31,50 € | § 13 Abs. 2 RVG | ✅ korrekt |

### B-02 `ab-welchem-betrag-lohnt-sich-inkasso`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Keine gesetzliche Mindestgrenze | — | ✅ zutreffend (negative Tatsachenbehauptung, nicht widerlegt) |
| Gebühr bis 50 € = 31,50 € | § 13 Abs. 2 RVG | ✅ korrekt |
| Mindestgebühr 15 € | § 13 Abs. 3 RVG | ✅ korrekt, am Rohtext verifiziert |

### B-03 `teilzahlung-367-bgb`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Teilzahlung: zuerst Kosten, dann Zinsen, zuletzt Hauptforderung | § 367 Abs. 1 BGB | ✅ korrekt, am Rohtext verifiziert |
| Gläubiger darf andere Anrechnung ablehnen | § 367 Abs. 2 BGB | ✅ korrekt |
| Ausnahme Verbraucherdarlehen: Kosten, dann Hauptforderung, zuletzt Zinsen; keine Zurückweisung möglich | § 497 Abs. 3 BGB | ✅ korrekt, am Rohtext verifiziert |

### B-04 `was-darf-inkasso-kosten`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Kostendeckel seit 1.10.2021 | § 13e RDG | ✅ korrekt |
| Gebührenrahmen 0,5–1,3, Regelsatz 0,9 | Anm. Abs. 2 zu Nr. 2300 VV RVG | ✅ korrekt |
| „Einfacher Fall" nicht abschließend definiert, Zwei-Wochen-Kriterium nicht belegbar, für anwaltliche Prüfung vorgemerkt | FAQ-Text | ⚠️ **Prüfnotiz selbst unzutreffend** — siehe Abweichung 2 und Begründung oben. Die Zwei-Wochen-Frist steht im Gesetzestext |
| Volle Gebühr bis 500 €/50 € | § 13 Abs. 1/2 RVG | ✅ korrekt |
| Mindestgebühr 15 € | § 13 Abs. 3 RVG | ✅ korrekt |

### B-05 `inkasso-oder-anwalt`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Inkasso erlaubnispflichtige Rechtsdienstleistung | § 2 Abs. 2 RDG | ✅ korrekt |
| Zulassung für außergerichtliche Geltendmachung und automatisiertes Mahnverfahren | § 10 Abs. 1 Nr. 1 RDG | ✅ korrekt |
| Anwaltszwang ab Landgericht | § 78 ZPO | ✅ korrekt, am Rohtext verifiziert |

### B-06 `rechnung-im-verzug`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Verzug grundsätzlich erst nach Mahnung | § 286 Abs. 1 BGB | ✅ korrekt, am Rohtext verifiziert |
| Mahnung entbehrlich in vier Fallgruppen | § 286 Abs. 2 BGB | ✅ korrekt |
| 30-Tage-Automatik bei Entgeltforderungen | § 286 Abs. 3 BGB | ✅ korrekt |
| Verzugszinsen 5 / 9 Prozentpunkte | § 288 Abs. 1/2 BGB | ✅ korrekt |
| 40-€-Pauschale gegenüber Unternehmern | § 288 Abs. 5 BGB | ✅ korrekt |
| Basiszinssatz | § 247 BGB | ✅ korrekt |

### B-07 `aussergerichtliches-und-gerichtliches-mahnverfahren`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Mahnverfahren zulässig für bestimmte Geldsumme | § 688 Abs. 1 ZPO | ✅ korrekt, am Rohtext verifiziert |
| Ausschluss bei noch nicht erbrachter Gegenleistung | § 688 Abs. 2 ZPO | ✅ korrekt |
| Widerspruchsfrist 2 Wochen | § 692 Abs. 1 Nr. 3 ZPO | ✅ korrekt |
| Vollstreckungsbescheid frühestens nach Fristablauf | § 699 ZPO | ✅ korrekt |
| 6-Monats-Frist für den Antrag | § 701 ZPO | ✅ korrekt |
| Einspruchsfrist 2 Wochen gegen Vollstreckungsbescheid | § 700 Abs. 1 i. V. m. § 339 Abs. 1 ZPO | ✅ korrekt — Vollstreckungsbescheid wird einem Versäumnisurteil gleichgestellt (§ 700 Abs. 1), dessen Einspruchsfrist 2 Wochen beträgt (§ 339 Abs. 1) |

### B-08 `was-ist-ein-mahnbescheid`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Zulässigkeit, keine inhaltliche Prüfung | § 688 Abs. 1 ZPO | ✅ korrekt |
| Ausschluss bei Vorleistungspflicht des Gläubigers | § 688 Abs. 2 ZPO | ✅ korrekt |
| Widerspruchsfrist 2 Wochen | § 692 Abs. 1 Nr. 3 ZPO | ✅ korrekt |
| 6-Monats-Frist | § 701 ZPO | ✅ korrekt |

### B-09 `dauer-inkassoverfahren`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Keine pauschale Gesamtdauer (bewusst nicht beziffert) | — | ✅ zutreffend zurückhaltend, keine erfundene Zahl |
| Widerspruchsfrist 2 Wochen | § 692 Abs. 1 Nr. 3 ZPO | ✅ korrekt |
| 6-Monats-Frist | § 701 ZPO | ✅ korrekt |
| Einspruchsfrist 2 Wochen | § 700 Abs. 1 i. V. m. § 339 Abs. 1 ZPO | ✅ korrekt |

### B-10 `verjaehrung-von-forderungen`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Regelmäßige Verjährung 3 Jahre, Beginn mit Kenntnis/Jahresende | §§ 195, 199 Abs. 1 BGB | ✅ korrekt, am Rohtext verifiziert |
| Höchstfrist 10 Jahre unabhängig von Kenntnis | § 199 Abs. 4 BGB | ✅ korrekt |
| Titulierte Forderungen 30 Jahre, Beginn mit Rechtskraft/Titelerrichtung | §§ 197 Abs. 1 Nr. 3, 201 BGB | ✅ korrekt — Gleichstellung des Vollstreckungsbescheids mit einem rechtskräftigen Titel ergibt sich aus § 700 Abs. 1 ZPO |

### B-11 `schuldner-kann-nicht-zahlen`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Vermögensauskunft über den Gerichtsvollzieher | § 802c ZPO | ✅ korrekt, am Rohtext verifiziert |
| Forderungsanmeldung im Insolvenzverfahren, auch durch Inkassodienstleister | § 174 InsO | ✅ korrekt, am Rohtext verifiziert |
| Restschuldbefreiung nach 3 Jahren Abtretungsfrist; bei Wiederholung 5 Jahre | § 287 Abs. 2 InsO | ✅ korrekt, am Rohtext verifiziert — **dies ist die bereits in einer früheren Runde korrigierte Angabe (zuvor fälschlich „6 Jahre" nach altem Recht), hier erneut bestätigt** |
| 30-jährige Verjährung titulierter Forderungen | § 197 Abs. 1 Nr. 3 BGB | ✅ korrekt |

### B-12 `handwerker-kunde-zahlt-rechnung-nicht`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| 30-Tage-Verzugsautomatik | § 286 Abs. 3 BGB | ✅ korrekt |
| Zurückbehaltungsrecht nur bei Ansprüchen aus demselben rechtlichen Verhältnis | § 273 BGB | ✅ korrekt, am Rohtext verifiziert |
| Verweis auf Bauhandwerkersicherung | § 650f BGB | ✅ korrekt |
| Mahnverfahren | §§ 688 ff. ZPO | ✅ korrekt |

### B-13 `mietrueckstand-was-tun-vermieter`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Fristlose Kündigung: 2 Termine > 1 Monatsmiete ODER insgesamt 2 Monatsmieten über längeren Zeitraum | § 543 Abs. 2 S. 1 Nr. 3 Buchst. a/b BGB i. V. m. § 569 Abs. 3 Nr. 1 BGB | ✅ korrekt, am Rohtext verifiziert |
| Schonfristzahlung: vollständiger Ausgleich binnen 2 Monaten nach „Klageerhebung"/„Erhebung der Räumungsklage"; Ausschluss bei Wiederholung binnen 2 Jahren | § 569 Abs. 3 Nr. 2 BGB | ✅ korrekt — das Gesetz spricht von „Rechtshängigkeit"; nach § 253 Abs. 1, § 261 Abs. 1 ZPO tritt diese mit der **Zustellung** der Klage ein, was dem juristischen Begriff „Klageerhebung" entspricht. Keine Abweichung, nur zur Transparenz dokumentiert |
| Fälligkeit Miete spätestens 3. Werktag | § 556b Abs. 1 BGB | ✅ korrekt |
| Verzug ohne Mahnung bei kalendermäßiger Fälligkeit | § 286 Abs. 2 Nr. 1 BGB | ✅ korrekt |

### B-14 `honorarrechnung-unbezahlt-freiberufler`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Dienstvertrag: Vergütung fällig nach Leistung, ohne Abnahme | § 614 BGB | ✅ korrekt, am Rohtext verifiziert |
| Werkvertrag zum Vergleich: Fälligkeit mit Abnahme | § 641 BGB | ✅ korrekt |
| 30-Tage-Verzugsautomatik | § 286 Abs. 3 BGB | ✅ korrekt |

### B-15 `privatrechnung-unbezahlt-praxis`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Fälligkeit mit ordnungsgemäßer Rechnungserteilung | § 12 Abs. 1 GOÄ | ✅ korrekt, am Rohtext verifiziert |
| Verzug ohne Mahnung nach 30 Tagen | § 286 Abs. 3 BGB | ✅ korrekt |
| FAQ-Hinweis: berufsrechtliche Gebührenordnungen unterscheiden sich im Detail (Zahnärzte/GOZ) | — | ✅ zutreffend zurückhaltend formuliert, keine falsche Gleichsetzung |

### B-16 `zahlungsrueckstaende-hausverwaltung`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Gemeinschaft der Wohnungseigentümer ist Gläubigerin, nicht die Verwaltung | § 9a Abs. 1 WEG | ✅ korrekt |
| Rechte mit einheitlicher Rechtsverfolgung übt die Gemeinschaft aus | § 9a Abs. 2 WEG | ✅ korrekt |
| Grundlage der Forderungshöhe: Wirtschaftsplan | § 28 Abs. 1 WEG | ✅ korrekt |

### B-17 `offene-mitgliedsbeitraege-einziehen`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Vereinssatzung soll Beitragsregelung enthalten | § 58 Nr. 2 BGB | ✅ korrekt, am Rohtext verifiziert |

### B-18 `serioeses-inkassounternehmen-erkennen`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Öffentliches, kostenloses Rechtsdienstleistungsregister | § 16 Abs. 1 RDG | ✅ korrekt, am Rohtext verifiziert |
| Berufshaftpflicht ab 250.000 € Deckung | § 12 Abs. 1 RDG | ✅ korrekt, am Rohtext verifiziert |
| Kostendeckel nach RVG-Sätzen | § 13e RDG | ✅ korrekt |
| Inkasso erlaubnispflichtige Rechtsdienstleistung | § 2 Abs. 2 RDG | ✅ korrekt |

### B-19 `selbst-mahnen-oder-inkasso-beauftragen`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| RDG gilt nur für fremde Angelegenheiten, nicht die eigene Forderung | § 2 Abs. 1 RDG | ✅ korrekt, am Rohtext verifiziert |
| Kein Anwaltszwang vor dem Amtsgericht | § 79 Abs. 1 ZPO | ✅ korrekt, am Rohtext verifiziert — Ausnahme für „fremde" Geldforderungen betrifft hier nicht den Gläubiger, der seine **eigene** Forderung verfolgt |
| Kosten bei unbestrittener Forderung trägt der Schuldner | § 13e RDG | ✅ korrekt |

### B-20 `inkasso-ohne-kundenbeziehung-zu-zerstoeren`

| Rechtsaussage | Fundstelle | Prüfergebnis |
|---|---|---|
| Pflichtangaben beim ersten Kontakt mit Verbraucher-Schuldner | § 13a RDG | ✅ korrekt, am Rohtext verifiziert |
| Anrechnungsreihenfolge bei Teilzahlung | § 367 BGB | ✅ korrekt |

---

## Offene Punkte für die anwaltliche Prüfung (im Text selbst bereits gekennzeichnet bzw. hier vermerkt)

| Seite/Thema | Punkt |
|---|---|
| `was-darf-inkasso-kosten` | FAQ-Antwort markiert jetzt „vom Anwalt zu bestätigen" (statt „für die anwaltliche Prüfung vorgemerkt") — die Zwei-Wochen-Regelvermutung ist aufgenommen, der Anwalt soll die Formulierung bestätigen. |
| `app/preise/page.tsx` (Gebührenforderung) | **Frage für den Anwalt:** Ist § 4 RDGEG für die Vergütung von Inkassodienstleistern noch einschlägig? (Hintergrund: siehe Begründung zu Abweichung 6 — nach unserer Prüfung seit 1.10.2021 nicht mehr, die einschlägige Norm ist seither § 13e RDG; zur Sicherheit vom Anwalt bestätigen lassen.) |
| `app/preise/page.tsx` (Mahnkosten-Beispiel) | Die drei Rechtsprechungs-Fundstellen zur Höhe erstattungsfähiger Mahnkosten (BGH VIII ZR 95/18, AG Brandenburg 31 C 213/17, AG Münster) sind **ungeprüft, vom Anwalt zu bestätigen** — siehe Begründung zu Abweichung 5 für den Verifikationsstand je Fundstelle (BGH solide bestätigt, AG Brandenburg nicht zweifelsfrei verifizierbar, AG Münster ohne Aktenzeichen). |
| „100 %"-Formulierungen vs. AGB vs. § 13g RDG | **Vom Auftraggeber zur anwaltlichen Prüfung vermerkt (22.11.2026):** Auszahlungspraxis bei Teilzahlungen vs. die neue Formulierung „nach vollständigem Ausgleich" vs. § 13g RDG (unverzügliche Weiterleitung von Fremdgeldern durch den Inkassodienstleister — Wortlaut: „Inkassodienstleister haben fremde Gelder unverzüglich an eine empfangsberechtigte Person weiterzuleiten oder auf ein gesondertes Konto einzuzahlen"). Zu klären: Verträgt sich eine Formulierung, die die Auszahlung an den Gläubiger erst „nach vollständigem Ausgleich der Forderung" verspricht, mit der Pflicht zur unverzüglichen Weiterleitung bereits eingegangener (Teil-)Zahlungen nach § 13g RDG? |

## Zusätzliche Hinweise, keine Rechtsaussagen im engeren Sinne

- Mehrfach verwendete Kostenformulierung „Für Sie kostenfrei — die gesetzlichen Verzugskosten trägt
  der Schuldner" (`faktenkern.kostenmodellSieAnsprache`): keine Rechtsnorm zitiert, entspricht dem in
  `docs/marke-und-texte.md` freigegebenen Wortlaut. Nicht Gegenstand dieser Prüfung.
- Mehrfach verwendete Formulierung „Nota Finance (ein Geschäftsfeld der twenty4collect GmbH)"
  (`faktenkern.markeMitTraeger`): keine Rechtsaussage, Markenbezeichnung.
