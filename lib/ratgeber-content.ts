/**
 * Inhalte der 20 Ratgeber-Seiten (SEO-5, docs/SEO_Umsetzungskonzept.md Teil 4 und 5.1).
 *
 * Jede Seite: direkte Antwort zuerst, dann Erklärung, Beispiel mit echten Zahlen, Tabelle,
 * FAQ, Handlungsaufforderung, verwandte Themen. Rechtsaussagen ausschließlich mit Fundstelle,
 * recherchiert (nicht aus dem Gedächtnis) - siehe Nachweis in docs/aufgabenliste.md, SEO-5.
 * Keine erfundenen Statistiken; wo eine Angabe nicht sicher belegt war, wurde sie weggelassen.
 *
 * "twenty4collect" nie ohne "Nota Finance" im Fließtext (faktenkern.markeMitTraeger),
 * keine Personennennung (ArticleMeta ohne Autor, docs/entscheidungen.md Nr. 32).
 */

import { faktenkern } from "@/lib/faktenkern";

export type RatgeberFAQ = {
  frage: string;
  antwort: string;
};

export type RatgeberContent = {
  /** URL-Segment: "teilzahlung-367-bgb" -> /ratgeber/teilzahlung-367-bgb */
  slug: string;
  /** = H1, im Wortlaut der Frage. */
  frage: string;
  metaDescription: string;
  direkteAntwort: string;
  /** ISO-Datum, z. B. "2026-09-05". */
  publishedAt: string;
  updatedAt?: string;
  erklaerungUeberschrift: string;
  erklaerungText: string[];
  beispielUeberschrift: string;
  beispielText: string[];
  /** Optional: eine wichtige Ausnahme von der Regel, eigener Abschnitt. */
  ausnahme?: {
    ueberschrift: string;
    text: string[];
  };
  tabelleUeberschrift: string;
  tabelle: {
    kopfzeile: string[];
    zeilen: string[][];
  };
  faqUeberschrift: string;
  faq: RatgeberFAQ[];
  handlungsaufforderung: string;
  verwandteThemen: { label: string; href: string }[];
};

export const ratgeberContent: Record<string, RatgeberContent> = {
  "was-kostet-inkasso": {
    slug: "was-kostet-inkasso",
    frage: "Was kostet Inkasso — und wer bezahlt es?",
    metaDescription:
      "Für Gläubiger ist außergerichtliches Inkasso bei unbestrittenen Forderungen in der Regel kostenfrei. Die gesetzlich gedeckelten Kosten trägt der Schuldner. Mit Gesetzesfundstellen erklärt.",
    direkteAntwort:
      "Für den Gläubiger ist das außergerichtliche Inkasso einer unbestrittenen Forderung in der Regel kostenfrei. Die gesetzlich geregelten Kosten trägt der Schuldner. Diese Kosten sind gedeckelt: Nach § 13e RDG kann der Gläubiger vom Schuldner höchstens die Vergütung ersetzt verlangen, die einem Rechtsanwalt nach dem RVG für dieselbe Tätigkeit zustünde.",
    publishedAt: "2026-09-05",
    erklaerungUeberschrift: "Wie sich die Kosten aufteilen",
    erklaerungText: [
      "Reicht ein Gläubiger eine unbestrittene, fällige Forderung ein, entstehen ihm im außergerichtlichen Verfahren in der Regel keine eigenen Kosten. Der Inkassodienstleister macht seine Gebühr stattdessen beim Schuldner geltend, als Teil der Forderung, die dieser ohnehin durch den Zahlungsverzug verursacht hat.",
      "Wie hoch diese Gebühr sein darf, ist seit der Reform zum 1.10.2021 gesetzlich begrenzt: Nach § 13e RDG darf ein Inkassodienstleister vom Schuldner nicht mehr verlangen, als ein Rechtsanwalt nach dem Rechtsanwaltsvergütungsgesetz (RVG) für dieselbe Tätigkeit abrechnen dürfte. Für unbestrittene Forderungen gilt dabei die Anmerkung Absatz 2 zu Nummer 2300 des Vergütungsverzeichnisses (VV RVG): Der Gebührenrahmen reicht von 0,5 bis 1,3, mit einem Regelsatz (Schwellenwert) von 0,9. Mehr als 0,9 darf nur berechnet werden, wenn der Fall besonders umfangreich oder schwierig war; nur 0,5 fällt in besonders einfachen Fällen an.",
      "Wie viel Euro eine solche Gebühr ausmacht, hängt vom Gegenstandswert (der Höhe der Forderung) ab. Nach § 13 Abs. 1 RVG beträgt die volle (1,0-)Gebühr bei einem Gegenstandswert bis 500 € seit dem 1.6.2025 51,50 €; für Inkassodienstleistungen bei unbestrittenen Forderungen bis 50 € gilt nach § 13 Abs. 2 RVG die günstigere Stufe von 31,50 €.",
    ],
    beispielUeberschrift: "Ein Beispiel mit Zahlen",
    beispielText: [
      "Ein Gläubiger reicht eine unbestrittene Forderung von 300 € ein. Der Gegenstandswert liegt damit in der Stufe bis 500 €, die volle Gebühr beträgt 51,50 €. Im Regelfall (0,9-Gebühr) macht der Inkassodienstleister beim Schuldner zusätzlich zur Hauptforderung 46,35 € geltend. Nicht der Gläubiger zahlt das, sondern der Schuldner.",
      "Zahlt der Schuldner bereits auf die erste Zahlungsaufforderung hin, kann die Gebühr auf 0,5 sinken: 25,75 € statt 46,35 €.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Angabe", "Wert", "Fundstelle"],
      zeilen: [
        ["Gebührenrahmen bei unbestrittenen Forderungen", "0,5 bis 1,3", "Anm. Abs. 2 zu Nr. 2300 VV RVG"],
        ["Regelsatz (Schwellenwert)", "0,9", "Anm. Abs. 2 zu Nr. 2300 VV RVG"],
        ["Volle Gebühr, Gegenstandswert bis 500 €", "51,50 €", "§ 13 Abs. 1 RVG (seit 1.6.2025)"],
        ["Volle Gebühr, Gegenstandswert bis 50 €", "31,50 €", "§ 13 Abs. 2 RVG (seit 1.6.2025)"],
        ["Kostendeckel gegenüber dem Schuldner", "max. RVG-Anwaltsvergütung", "§ 13e RDG"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Muss ich als Gläubiger in Vorleistung gehen?",
        antwort: "Nein. Im außergerichtlichen Verfahren entstehen Ihnen in der Regel keine eigenen Kosten.",
      },
      {
        frage: "Was zahlt der Schuldner konkret?",
        antwort:
          "Die Hauptforderung, gesetzliche Verzugszinsen und die nach § 13e RDG gedeckelte Inkassogebühr gemäß RVG-Tabelle.",
      },
      {
        frage: "Gilt der Kostendeckel auch bei bestrittenen Forderungen?",
        antwort:
          "Die hier beschriebene Inkasso-spezifische Deckelung (0,5 bis 1,3) gilt nur für unbestrittene Forderungen. Bestreitet der Schuldner die Forderung inhaltlich, handelt es sich um einen Rechtsstreit mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Wovon hängt die genaue Gebührenhöhe ab?",
        antwort:
          "Vom Gegenstandswert (der Forderungshöhe) nach der RVG-Tabelle und vom Schwierigkeitsgrad des Falls (0,5 bis 1,3).",
      },
    ],
    handlungsaufforderung:
      "Nota Finance prüft bei jeder eingereichten Forderung, welche Kosten gesetzlich zulässig sind. Reichen Sie Ihre offene Forderung ein.",
    verwandteThemen: [
      { label: "Ab welchem Betrag lohnt sich Inkasso?", href: "/ratgeber/ab-welchem-betrag-lohnt-sich-inkasso" },
      { label: "Was darf Inkasso kosten?", href: "/ratgeber/was-darf-inkasso-kosten" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
      { label: "Beispielrechnung", href: "/preise" },
    ],
  },

  "ab-welchem-betrag-lohnt-sich-inkasso": {
    slug: "ab-welchem-betrag-lohnt-sich-inkasso",
    frage: "Ab welchem Forderungsbetrag lohnt sich ein Inkassobüro?",
    metaDescription:
      "Eine gesetzliche Mindestgrenze für Inkasso gibt es nicht. Bei Nota Finance sind Forderungen ab 50 € einreichbar, mit einer eigenen, günstigeren RVG-Gebührenstufe.",
    direkteAntwort:
      "Eine gesetzliche Mindestgrenze für die Einreichung einer Forderung gibt es nicht. Bei Nota Finance sind Forderungen ab 50 € einreichbar; für genau diese Größenordnung gibt es seit der RVG-Reform sogar eine eigene, günstigere Gebührenstufe von 31,50 € statt 51,50 € (§ 13 Abs. 2 RVG).",
    publishedAt: "2026-09-05",
    erklaerungUeberschrift: "Warum es keine feste Grenze gibt",
    erklaerungText: [
      "Ob sich die Einreichung einer Forderung lohnt, ist keine gesetzliche, sondern eine wirtschaftliche Frage: Sie hängt vom Aufwand des jeweiligen Anbieters ab, nicht von einer festen Vorschrift. Klassische, papierbasierte Inkassoprozesse lohnen sich für sehr kleine Beträge oft nicht. Digitale Prozesse senken diesen Aufwand erheblich.",
      "Der Gesetzgeber hat für kleine Forderungen dennoch eine eigene Regelung getroffen: Für Inkassodienstleistungen bei unbestrittenen Forderungen bis 50 € gilt nach § 13 Abs. 2 RVG eine eigene, niedrigere Gebührenstufe (31,50 € statt 51,50 € bei der vollen Gebühr). Der Gesetzgeber geht also selbst davon aus, dass auch Kleinstforderungen ein eigenes, wirtschaftlich sinnvolles Verfahren verdienen.",
      `Nota Finance setzt die eigene Untergrenze bei ${faktenkern.mindestforderung} € an.`,
    ],
    beispielUeberschrift: "Ein Beispiel mit Zahlen",
    beispielText: [
      "Eine Forderung über 45 € liegt in der RVG-Gebührenstufe bis 50 € (31,50 € volle Gebühr). Im Regelfall (0,9-Gebühr) macht das 28,35 € Inkassokosten für den Schuldner aus, im einfachen Fall (0,5-Gebühr) 15,75 €.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Angabe", "Wert", "Fundstelle"],
      zeilen: [
        ["Mindestforderung bei Nota Finance", `${faktenkern.mindestforderung} €`, "Produktentscheidung"],
        ["Gesetzliche Mindestgrenze für Inkasso", "keine", "—"],
        ["RVG-Gebührenstufe bis 50 €", "31,50 € (volle Gebühr)", "§ 13 Abs. 2 RVG (seit 1.6.2025)"],
        ["Mindestbetrag einer RVG-Gebühr", "15 €", "§ 13 Abs. 3 RVG"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Gibt es eine gesetzliche Mindestgrenze für Inkasso?",
        antwort: "Nein. Die Grenze setzt jeder Anbieter selbst, abhängig vom eigenen Aufwand.",
      },
      {
        frage: "Warum liegt die Grenze bei Nota Finance bei 50 €?",
        antwort:
          "Digitale, automatisierte Prozesse machen auch kleinere Beträge wirtschaftlich bearbeitbar, passend zur eigenen RVG-Gebührenstufe für Forderungen bis 50 €.",
      },
      {
        frage: "Was, wenn meine Forderung unter 50 € liegt?",
        antwort:
          "Bei Nota Finance ist sie derzeit nicht einreichbar. Ob sich Inkasso über einen anderen Anbieter lohnt, ist eine wirtschaftliche Einzelfallfrage.",
      },
      {
        frage: "Fällt bei sehr kleinen Forderungen trotzdem eine Mindestgebühr an?",
        antwort: "Ja, die Mindestgebühr nach RVG beträgt 15 € (§ 13 Abs. 3 RVG).",
      },
    ],
    handlungsaufforderung: `Forderungen ab ${faktenkern.mindestforderung} € können Sie direkt bei Nota Finance einreichen.`,
    verwandteThemen: [
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Was darf Inkasso kosten?", href: "/ratgeber/was-darf-inkasso-kosten" },
      { label: "Mitgliedsbeiträge einziehen", href: "/inkasso-fitnessstudio" },
      { label: "Kursgebühren einziehen", href: "/inkasso-bildung" },
    ],
  },

  "teilzahlung-367-bgb": {
    slug: "teilzahlung-367-bgb",
    frage: "Was passiert bei einer Teilzahlung? Die Reihenfolge nach § 367 BGB",
    metaDescription:
      "Bei einer Teilzahlung wird zuerst auf Kosten, dann Zinsen, zuletzt auf die Hauptforderung angerechnet (§ 367 BGB). Wichtige Ausnahme bei Verbraucherdarlehen (§ 497 Abs. 3 BGB).",
    direkteAntwort:
      "Zahlt ein Schuldner nur einen Teil einer Forderung, die neben der Hauptschuld auch Zinsen und Kosten umfasst, wird die Zahlung nach § 367 Abs. 1 BGB zuerst auf die Kosten, danach auf die Zinsen und erst zuletzt auf die Hauptforderung angerechnet. Bestimmt der Schuldner bei der Zahlung ausdrücklich eine andere Reihenfolge, darf der Gläubiger die Annahme der Zahlung ablehnen (§ 367 Abs. 2 BGB).",
    publishedAt: "2026-09-05",
    erklaerungUeberschrift: "Die Reihenfolge im Detail",
    erklaerungText: [
      "§ 367 BGB gilt immer dann, wenn eine Forderung aus mehreren Bestandteilen besteht, üblicherweise aus der ursprünglichen Rechnungssumme (Hauptforderung), Verzugszinsen und Kosten (etwa Mahn- oder Inkassokosten). Reicht eine Zahlung nicht aus, um alle drei Bestandteile vollständig zu decken, bestimmt das Gesetz zwingend die Reihenfolge: zuerst die Kosten, dann die Zinsen, zuletzt die Hauptforderung. Der Gläubiger kann diese Reihenfolge nicht einseitig zu seinen Gunsten ändern.",
    ],
    beispielUeberschrift: "Ein Beispiel mit Zahlen",
    beispielText: [
      "Eine Forderung setzt sich zusammen aus 1.000 € Hauptforderung, 45 € Verzugszinsen und 49 € Kosten, insgesamt 1.094 €. Der Schuldner zahlt 500 €. Nach § 367 Abs. 1 BGB werden zunächst die Kosten angerechnet (49 €), danach die Zinsen (45 €). Die verbleibenden 406 € werden auf die Hauptforderung angerechnet.",
      "Offen bleiben damit 594 € Hauptforderung, nicht etwa 500 € weniger von der Gesamtsumme, wie man ohne Kenntnis der Vorschrift annehmen könnte.",
    ],
    ausnahme: {
      ueberschrift: "Eine wichtige Ausnahme: Verbraucherdarlehen",
      text: [
        "Bei Verbraucherdarlehensverträgen gilt eine abweichende Reihenfolge. Nach § 497 Abs. 3 BGB werden nicht ausreichende Zahlungen des Darlehensnehmers ausdrücklich abweichend von § 367 Abs. 1 BGB zunächst auf die Kosten der Rechtsverfolgung, dann auf den übrigen geschuldeten Betrag (die Hauptforderung) und erst zuletzt auf die Zinsen angerechnet. Zusätzlich darf der Darlehensgeber solche Teilzahlungen nicht zurückweisen.",
        "Diese Ausnahme gilt nur für Verbraucherdarlehen, nicht für gewöhnliche Rechnungsforderungen aus Kauf-, Dienst- oder Werkverträgen, wie sie bei Nota Finance typischerweise eingereicht werden.",
      ],
    },
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Bestandteil", "Betrag im Beispiel", "Rang bei Teilzahlung (§ 367 BGB)"],
      zeilen: [
        ["Kosten", "49 €", "1. (zuerst angerechnet)"],
        ["Zinsen", "45 €", "2."],
        ["Hauptforderung", "1.000 €", "3. (zuletzt, hier: 594 € bleiben offen)"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Kann der Schuldner verlangen, dass zuerst die Hauptforderung getilgt wird?",
        antwort:
          "Nicht einseitig. Bestimmt er bei der Zahlung eine andere Reihenfolge, darf der Gläubiger die Zahlung nach § 367 Abs. 2 BGB ablehnen.",
      },
      {
        frage: "Gilt die Reihenfolge auch bei Verbraucherdarlehen?",
        antwort:
          "Nein, dort gilt nach § 497 Abs. 3 BGB eine abweichende Reihenfolge: Kosten, dann Hauptforderung, zuletzt Zinsen.",
      },
      {
        frage: "Gilt die Reihenfolge auch ohne Zinsen oder Kosten?",
        antwort: "Dann entfällt die Prüfung insoweit; die Zahlung wird direkt auf die verbleibende Hauptforderung angerechnet.",
      },
      {
        frage: "Läuft auf die offene Hauptforderung weiter Verzugszins?",
        antwort: "Ja, auf den nach der Anrechnung verbleibenden Teil fallen bei fortbestehendem Verzug weiterhin Zinsen an.",
      },
      {
        frage: "Warum wirkt eine Teilzahlung dann oft „kleiner“ als erwartet?",
        antwort:
          "Weil Kosten und Zinsen zuerst gedeckt werden, sinkt die eigentliche Hauptforderung erst, wenn beides vollständig beglichen ist.",
      },
    ],
    handlungsaufforderung:
      "Nota Finance berechnet bei jeder eingereichten Forderung die Anrechnung von Zahlungen korrekt nach § 367 BGB. Reichen Sie Ihre offene Forderung ein, um den tatsächlich verbleibenden Betrag zu klären.",
    verwandteThemen: [
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Verjährung von Forderungen", href: "/ratgeber/verjaehrung-von-forderungen" },
      { label: "Beispielrechnung", href: "/preise" },
    ],
  },

  "was-darf-inkasso-kosten": {
    slug: "was-darf-inkasso-kosten",
    frage: "Inkassokosten: Was darf ein Inkassounternehmen berechnen?",
    metaDescription:
      "Seit der RDG-Reform 2021 gilt ein Kostendeckel: höchstens die RVG-Anwaltsvergütung. Gebührenrahmen 0,5 bis 1,3, Regelsatz 0,9. Mit Fundstellen erklärt.",
    direkteAntwort:
      "Seit der Reform 2021 darf ein Inkassodienstleister von einem Schuldner bei einer unbestrittenen Forderung höchstens die Geschäftsgebühr verlangen, die einem Rechtsanwalt nach dem RVG zustünde (§ 13e RDG): im Regelfall eine 0,9-Gebühr, bei besonders einfachen Fällen nur 0,5, bei umfangreichen oder schwierigen Fällen bis zu 1,3 (Anmerkung Abs. 2 zu Nr. 2300 VV RVG).",
    publishedAt: "2026-09-05",
    erklaerungUeberschrift: "Der gesetzliche Rahmen seit der Reform 2021",
    erklaerungText: [
      "Vor dem 1.10.2021 konnten Inkassokosten für Verbraucher schwer nachvollziehbar und teils unverhältnismäßig hoch ausfallen. Mit dem Gesetz zur Verbesserung des Verbraucherschutzes im Inkassorecht wurde das geändert: Seit diesem Stichtag gilt § 13e RDG. Die vom Schuldner erstattungsfähigen Kosten eines Inkassodienstleisters sind auf die Höhe der Vergütung gedeckelt, die ein Rechtsanwalt für dieselbe Tätigkeit nach dem RVG erhalten würde. Die Regelung gilt für Inkassoaufträge, die nach dem 30.9.2021 erteilt wurden.",
      "Für die außergerichtliche Geltendmachung unbestrittener Forderungen legt die Anmerkung Absatz 2 zu Nummer 2300 des Vergütungsverzeichnisses (VV RVG) einen eigenen, engeren Gebührenrahmen fest: 0,5 bis 1,3, mit einem Regelsatz (Schwellenwert) von 0,9. Eine höhere Gebühr als 0,9 darf nur berechnet werden, wenn die Tätigkeit besonders umfangreich oder schwierig war. Nur 0,5 fällt in besonders einfachen Fällen an. Als Beispiel dafür wird in der Praxis die Zahlung des Schuldners bereits auf die erste Zahlungsaufforderung hin genannt.",
      "Wie viel das in Euro bedeutet, hängt vom Gegenstandswert ab: Nach § 13 Abs. 1 RVG beträgt die volle Gebühr bei einem Gegenstandswert bis 500 € seit dem 1.6.2025 51,50 €, für unbestrittene Forderungen bis 50 € gilt nach § 13 Abs. 2 RVG die eigene, günstigere Stufe von 31,50 €. Der Mindestbetrag einer Gebühr liegt bei 15 € (§ 13 Abs. 3 RVG).",
    ],
    beispielUeberschrift: "Ein Beispiel mit Zahlen",
    beispielText: [
      "Bei einer Forderung von 300 € (Gegenstandswert-Stufe bis 500 €, volle Gebühr 51,50 €) beträgt die Inkassogebühr im Regelfall (0,9) 46,35 €. Zahlt der Schuldner sofort auf die erste Zahlungsaufforderung, sinkt sie auf 25,75 € (0,5-Gebühr).",
    ],
    tabelleUeberschrift: "Gebührenrahmen im Überblick",
    tabelle: {
      kopfzeile: ["Gebührensatz", "Voraussetzung", "Betrag bei 51,50 €-Basis", "Fundstelle"],
      zeilen: [
        ["0,5", "einfacher Fall", "25,75 €", "Anm. Abs. 2 zu Nr. 2300 VV RVG"],
        ["0,9", "Regelfall (Schwellenwert)", "46,35 €", "Anm. Abs. 2 zu Nr. 2300 VV RVG"],
        ["bis 1,3", "besonders umfangreich/schwierig", "bis 66,95 €", "Anm. Abs. 2 zu Nr. 2300 VV RVG"],
        ["Mindestgebühr", "unabhängig vom Gegenstandswert", "15 €", "§ 13 Abs. 3 RVG"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Darf ein Inkassounternehmen mehr als die RVG-Sätze verlangen?",
        antwort: "Vom Schuldner erstattungsfähig ist gegenüber Verbrauchern höchstens die RVG-Anwaltsvergütung (§ 13e RDG).",
      },
      {
        frage: "Was genau zählt als „einfacher Fall“ mit nur 0,5 Gebühr?",
        antwort:
          "Nach der Anmerkung Absatz 2 zu Nummer 2300 VV RVG liegt ein einfacher Fall in der Regel vor, wenn die Forderung innerhalb von zwei Wochen nach der ersten Zahlungsaufforderung beglichen wird — das ist eine Regelvermutung für den Normalfall, keine starre Grenze. Dieser Punkt ist vom Anwalt zu bestätigen.",
      },
      {
        frage: "Gilt der Kostendeckel auch bei bestrittenen Forderungen?",
        antwort: "Nein, die hier beschriebene Deckelung gilt speziell für unbestrittene Forderungen im Inkasso.",
      },
      {
        frage: "Wie wirkt sich die Forderungshöhe auf die Gebühr aus?",
        antwort:
          "Über den Gegenstandswert nach der RVG-Tabelle (§ 13 RVG): Je höher die Forderung, desto höher die zulässige Gebühr, mit einer eigenen, günstigeren Stufe für Forderungen bis 50 €.",
      },
    ],
    handlungsaufforderung:
      "Nota Finance berechnet die Inkassokosten für jeden Fall nach den gesetzlich zulässigen RVG-Sätzen. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
      { label: "Was passiert bei Teilzahlung?", href: "/ratgeber/teilzahlung-367-bgb" },
      { label: "Beispielrechnung", href: "/preise" },
    ],
  },

  "inkasso-oder-anwalt": {
    slug: "inkasso-oder-anwalt",
    frage: "Inkasso oder Anwalt — was ist wann richtig?",
    metaDescription:
      "Für unbestrittene Forderungen ist ein registrierter Inkassodienstleister meist die schnellere, kostengünstigere Wahl. Bei bestrittenen Forderungen ist ein Anwalt nötig. Mit Fundstellen erklärt.",
    direkteAntwort:
      "Für unbestrittene Forderungen ist ein registrierter Inkassodienstleister meist die schnellere und für den Gläubiger günstigere Wahl. Die Kosten sind durch § 13e RDG gedeckelt und werden im Erfolgsfall vom Schuldner getragen. Bei bestrittenen Forderungen oder streitigen Rechtsfragen ist ein Rechtsanwalt notwendig, da Inkassodienstleister nach dem RDG keine rechtliche Bewertung streitiger Ansprüche vornehmen dürfen.",
    publishedAt: "2026-09-05",
    erklaerungUeberschrift: "Zwei unterschiedliche Zuständigkeiten",
    erklaerungText: [
      "Inkasso ist eine erlaubnispflichtige Rechtsdienstleistung (§ 2 Abs. 2 RDG). Registrierte Inkassodienstleister dürfen unbestrittene Forderungen außergerichtlich geltend machen und im automatisierten gerichtlichen Mahnverfahren (Mahnbescheid, Vollstreckungsbescheid) tätig werden. Die Erlaubnis dazu ergibt sich aus § 10 Abs. 1 Nr. 1 RDG.",
      "Wird eine Forderung inhaltlich bestritten, etwa wegen einer behaupteten Mängelrüge oder einem Streit über den Leistungsumfang, endet die Zuständigkeit des Inkassodienstleisters. Ab hier handelt es sich um einen Rechtsstreit, der eine anwaltliche Prüfung der Rechtslage erfordert. Kommt es zu einer streitigen Klage vor dem Landgericht oder einem höheren Gericht, besteht zudem Anwaltszwang (§ 78 ZPO). Die Parteien müssen sich dort durch einen Rechtsanwalt vertreten lassen.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Kunde zahlt eine Rechnung über 2.000 € nicht, äußert sich aber nicht zur Sache: unbestrittene Forderung. Ein Inkassodienstleister kann außergerichtlich mahnen und bei Erfolglosigkeit das gerichtliche Mahnverfahren einleiten. Rügt derselbe Kunde dagegen konkrete Mängel der gelieferten Leistung, handelt es sich um eine bestrittene Forderung. Hier ist anwaltliche Prüfung nötig, bevor weitere Schritte sinnvoll sind.",
    ],
    tabelleUeberschrift: "Inkasso oder Anwalt im Vergleich",
    tabelle: {
      kopfzeile: ["", "Inkassodienstleister", "Rechtsanwalt"],
      zeilen: [
        ["Zuständig bei", "unbestrittenen Forderungen", "bestrittenen/streitigen Forderungen"],
        ["Kosten für den Gläubiger", "in der Regel keine (§ 13e RDG)", "nach RVG, abhängig vom Streitwert"],
        ["Gerichtliches Mahnverfahren", "ja", "ja"],
        ["Streitige Klage vor Gericht", "nein", "ja (Anwaltszwang ab Landgericht, § 78 ZPO)"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Kann ein Inkassounternehmen vor Gericht vertreten?",
        antwort:
          "Im automatisierten gerichtlichen Mahnverfahren ja. In einem streitigen Klageverfahren vor dem Landgericht oder höher nicht. Dort besteht Anwaltszwang (§ 78 ZPO).",
      },
      {
        frage: "Was, wenn zunächst unklar ist, ob die Forderung bestritten wird?",
        antwort:
          "Ein Inkassodienstleister kann die Forderung zunächst außergerichtlich geltend machen; bestreitet der Schuldner sie, wird der Fall an dieser Stelle einer anwaltlichen Prüfung zugeführt.",
      },
      {
        frage: "Ist ein Anwalt immer teurer als Inkasso?",
        antwort:
          "Für unbestrittene Forderungen gilt für beide dieselbe RVG-Gebührentabelle; der Unterschied liegt in der Zuständigkeit, nicht zwingend im Preis.",
      },
    ],
    handlungsaufforderung:
      "Ist Ihre Forderung unbestritten, reichen Sie sie direkt bei Nota Finance ein. Wir prüfen den Fall und übernehmen das weitere Verfahren.",
    verwandteThemen: [
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Außergerichtliches und gerichtliches Mahnverfahren", href: "/ratgeber/aussergerichtliches-und-gerichtliches-mahnverfahren" },
      { label: "Woran erkennt man ein seriöses Inkassounternehmen?", href: "/ratgeber/serioeses-inkassounternehmen-erkennen" },
      { label: "So funktioniert Nota Finance", href: "/produkt" },
    ],
  },

  "rechnung-im-verzug": {
    slug: "rechnung-im-verzug",
    frage: "Wann ist eine Rechnung im Verzug?",
    metaDescription:
      "Verzug tritt meist erst nach einer Mahnung ein. Bei Rechnungen gilt eine Ausnahme: Spätestens nach 30 Tagen ist der Schuldner automatisch in Verzug, § 286 BGB.",
    direkteAntwort:
      "Grundsätzlich gerät ein Schuldner erst in Verzug, wenn die Forderung fällig ist und der Gläubiger ihn danach gemahnt hat (§ 286 Abs. 1 BGB). Bei Geldforderungen aus Rechnungen gilt jedoch eine wichtige Ausnahme: Der Schuldner kommt spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung automatisch in Verzug, auch ohne Mahnung (§ 286 Abs. 3 BGB). Gegenüber Verbrauchern gilt das nur, wenn die Rechnung ausdrücklich auf diese Folge hingewiesen hat.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Die zwei Wege in den Verzug",
    erklaerungText: [
      "Der gesetzliche Grundfall verlangt zwei Voraussetzungen: Die Forderung muss fällig sein, und der Gläubiger muss den Schuldner danach gemahnt haben (§ 286 Abs. 1 BGB). Eine Mahnung ist eine eindeutige Aufforderung zur Zahlung nach Fälligkeit, sie kann formlos erfolgen.",
      "Eine Mahnung ist nach § 286 Abs. 2 BGB entbehrlich, wenn für die Leistung eine feste, kalendermäßig bestimmte Zeit vereinbart wurde, wenn ein Ereignis vorausgehen musste und sich die Zeit danach kalendermäßig berechnen lässt, wenn der Schuldner die Zahlung ernsthaft und endgültig verweigert, oder wenn besondere Gründe den sofortigen Verzug rechtfertigen.",
      "Für Rechnungen gilt zusätzlich die 30-Tage-Regel aus § 286 Abs. 3 BGB: Spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung gerät der Schuldner automatisch in Verzug, ganz ohne Mahnung. Handelt es sich beim Schuldner um einen Verbraucher, greift diese Regel nur, wenn die Rechnung ausdrücklich auf diese Folge hingewiesen hat.",
    ],
    beispielUeberschrift: "Zwei Beispiele",
    beispielText: [
      "Eine Handwerksrechnung nennt als Zahlungsziel den 15. März. Zahlt der Kunde bis dahin nicht, ist er ab dem 16. März automatisch in Verzug, denn die Zahlungsfrist war kalendermäßig bestimmt (§ 286 Abs. 2 Nr. 1 BGB). Eine gesonderte Mahnung ist nicht nötig.",
      "Eine Rechnung ohne konkretes Zahlungsziel geht am 1. Juni beim Kunden ein. Zahlt er bis zum 1. Juli nicht, tritt Verzug spätestens mit Ablauf dieser 30 Tage ein, unabhängig davon, ob vorher gemahnt wurde (§ 286 Abs. 3 BGB).",
    ],
    tabelleUeberschrift: "Verzugsfolgen im Überblick",
    tabelle: {
      kopfzeile: ["Folge", "Höhe", "Fundstelle"],
      zeilen: [
        ["Verzugszinssatz gegenüber Verbrauchern", "5 Prozentpunkte über Basiszinssatz", "§ 288 Abs. 1 BGB"],
        ["Verzugszinssatz zwischen Unternehmern", "9 Prozentpunkte über Basiszinssatz", "§ 288 Abs. 2 BGB"],
        ["Pauschale bei Verzug gegenüber Unternehmern", "40 €", "§ 288 Abs. 5 BGB"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Muss ich immer erst mahnen, bevor Verzug eintritt?",
        antwort:
          "Nein. Bei Rechnungen tritt Verzug spätestens nach 30 Tagen automatisch ein, unabhängig von einer Mahnung (§ 286 Abs. 3 BGB).",
      },
      {
        frage: "Gilt die 30-Tage-Regel auch gegenüber Verbrauchern?",
        antwort:
          "Ja, aber nur, wenn die Rechnung ausdrücklich auf diese Folge hingewiesen hat. Fehlt der Hinweis, bleibt es bei der Mahnung als Voraussetzung.",
      },
      {
        frage: "Was ist der Basiszinssatz?",
        antwort:
          "Ein von der Deutschen Bundesbank halbjährlich angepasster Referenzzinssatz, auf dem die gesetzlichen Verzugszinsen aufbauen (§ 247 BGB).",
      },
      {
        frage: "Fällt die 40-Euro-Pauschale auch bei Verbraucherschuldnern an?",
        antwort: "Nein, sie gilt nur bei Entgeltforderungen gegenüber Unternehmern (§ 288 Abs. 5 BGB).",
      },
    ],
    handlungsaufforderung:
      "Nota Finance prüft für jede eingereichte Rechnung, ab wann Verzug vorliegt, und macht die gesetzlichen Verzugszinsen geltend. Reichen Sie Ihre offene Forderung ein.",
    verwandteThemen: [
      { label: "Was passiert bei Teilzahlung?", href: "/ratgeber/teilzahlung-367-bgb" },
      { label: "Außergerichtliches und gerichtliches Mahnverfahren", href: "/ratgeber/aussergerichtliches-und-gerichtliches-mahnverfahren" },
      { label: "Verjährung von Forderungen", href: "/ratgeber/verjaehrung-von-forderungen" },
      { label: "So funktioniert Nota Finance", href: "/produkt" },
    ],
  },

  "aussergerichtliches-und-gerichtliches-mahnverfahren": {
    slug: "aussergerichtliches-und-gerichtliches-mahnverfahren",
    frage: "Außergerichtliches und gerichtliches Mahnverfahren: Was ist der Unterschied?",
    metaDescription:
      "Außergerichtlich mahnt der Gläubiger selbst oder über einen Inkassodienstleister. Gerichtlich läuft das automatisierte Mahnverfahren nach §§ 688 ff. ZPO bis zum vollstreckbaren Titel.",
    direkteAntwort:
      "Beim außergerichtlichen Mahnverfahren fordert der Gläubiger oder ein beauftragter Inkassodienstleister den Schuldner ohne Gericht zur Zahlung auf. Führt das nicht zum Erfolg, kann der Gläubiger das gerichtliche, automatisierte Mahnverfahren nach §§ 688 ff. ZPO einleiten. Es beginnt mit einem Mahnbescheid und endet, wenn der Schuldner nicht widerspricht, mit einem Vollstreckungsbescheid, einem vollstreckbaren Titel.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Der Ablauf Schritt für Schritt",
    erklaerungText: [
      "Außergerichtlich bedeutet: Kein Gericht ist beteiligt. Der Gläubiger oder ein Inkassodienstleister fordert den Schuldner schriftlich zur Zahlung auf, meist mit einer Zahlungsfrist. Diese Phase ist gesetzlich nicht in ein festes Schema gegossen.",
      "Bleibt die außergerichtliche Mahnung erfolglos, kann der Gläubiger einen Mahnbescheid beantragen. Das gerichtliche Mahnverfahren ist nach § 688 Abs. 1 ZPO für Ansprüche auf Zahlung einer bestimmten Geldsumme zulässig, ausgeschlossen ist es unter anderem, wenn der Anspruch von einer noch nicht erbrachten Gegenleistung abhängt (§ 688 Abs. 2 ZPO).",
      "Nach Zustellung des Mahnbescheids hat der Schuldner zwei Wochen Zeit, Widerspruch einzulegen (§ 692 Abs. 1 Nr. 3 ZPO). Widerspricht er nicht, kann der Gläubiger frühestens nach Ablauf dieser Frist den Vollstreckungsbescheid beantragen (§ 699 ZPO), muss dies aber innerhalb von sechs Monaten nach Zustellung des Mahnbescheids tun, sonst verliert der Mahnbescheid seine Wirkung (§ 701 ZPO).",
      "Auch gegen den Vollstreckungsbescheid kann der Schuldner innerhalb von zwei Wochen Einspruch einlegen (§ 700 Abs. 1 i. V. m. § 339 Abs. 1 ZPO). Legt er das nicht rechtzeitig ein, wird der Vollstreckungsbescheid zu einem vollstreckbaren Titel, mit dem der Gläubiger die Zwangsvollstreckung betreiben kann. Widerspricht oder Einspruch legt der Schuldner dagegen ein, wird der Fall an das zuständige Gericht abgegeben und dort wie eine normale Klage weiterverhandelt.",
    ],
    beispielUeberschrift: "Ein Beispiel mit Fristen",
    beispielText: [
      "Ein Gläubiger mahnt eine Rechnung über 800 € zweimal erfolglos außergerichtlich an. Er beantragt einen Mahnbescheid, der dem Schuldner am 1. Oktober zugestellt wird. Legt der Schuldner bis zum 15. Oktober keinen Widerspruch ein, kann der Gläubiger den Vollstreckungsbescheid beantragen. Nach dessen Zustellung hat der Schuldner erneut zwei Wochen Zeit für einen Einspruch. Bleibt auch das aus, hat der Gläubiger einen vollstreckbaren Titel in der Hand.",
    ],
    tabelleUeberschrift: "Außergerichtlich und gerichtlich im Vergleich",
    tabelle: {
      kopfzeile: ["", "Außergerichtliches Mahnverfahren", "Gerichtliches Mahnverfahren"],
      zeilen: [
        ["Beteiligtes Gericht", "keines", "zentrales Mahngericht des Bundeslandes"],
        ["Rechtsgrundlage", "keine feste gesetzliche Frist", "§§ 688 ff. ZPO"],
        ["Ergebnis bei Erfolg", "Zahlung ohne weiteren Schritt", "Vollstreckungsbescheid (vollstreckbarer Titel)"],
        ["Reaktionsmöglichkeit des Schuldners", "formlos", "Widerspruch bzw. Einspruch, je zwei Wochen"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Muss ich erst außergerichtlich mahnen, bevor ich einen Mahnbescheid beantrage?",
        antwort:
          "Gesetzlich vorgeschrieben ist das nicht, in der Praxis aber üblich, da viele Schuldner schon auf eine Zahlungsaufforderung reagieren.",
      },
      {
        frage: "Was passiert, wenn der Schuldner dem Mahnbescheid widerspricht?",
        antwort: "Der Fall wird an das im Mahnbescheid genannte Gericht abgegeben und dort im normalen Klageverfahren weiter verhandelt.",
      },
      {
        frage: "Prüft das Mahngericht, ob die Forderung berechtigt ist?",
        antwort: "Nein. Das automatisierte Mahnverfahren prüft nur formale Voraussetzungen, keine inhaltliche Berechtigung der Forderung.",
      },
      {
        frage: "Was, wenn der Gläubiger die Sechs-Monats-Frist verpasst?",
        antwort: "Dann verliert der Mahnbescheid seine Wirkung, und der Gläubiger müsste das Verfahren neu einleiten (§ 701 ZPO).",
      },
    ],
    handlungsaufforderung:
      "Nota Finance übernimmt sowohl die außergerichtliche Ansprache als auch, wenn nötig, das gerichtliche Mahnverfahren. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Was ist ein Mahnbescheid?", href: "/ratgeber/was-ist-ein-mahnbescheid" },
      { label: "Wie lange dauert ein Inkassoverfahren?", href: "/ratgeber/dauer-inkassoverfahren" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
      { label: "So funktioniert Nota Finance", href: "/produkt" },
    ],
  },

  "was-ist-ein-mahnbescheid": {
    slug: "was-ist-ein-mahnbescheid",
    frage: "Was ist ein Mahnbescheid, und wann lohnt er sich?",
    metaDescription:
      "Ein Mahnbescheid ist eine gerichtliche Zahlungsaufforderung im automatisierten Mahnverfahren, ohne inhaltliche Prüfung. Er lohnt sich vor allem bei voraussichtlich unbestrittenen Forderungen.",
    direkteAntwort:
      "Ein Mahnbescheid ist eine förmliche, gerichtliche Zahlungsaufforderung im automatisierten Mahnverfahren nach §§ 688 ff. ZPO. Das Gericht prüft dabei nur formale Voraussetzungen, nicht ob die Forderung inhaltlich berechtigt ist. Er lohnt sich vor allem bei Forderungen, die der Schuldner voraussichtlich nicht bestreiten wird, denn er ist schneller und günstiger als eine Klage.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Wie ein Mahnbescheid zustande kommt",
    erklaerungText: [
      "Der Gläubiger, oder ein von ihm beauftragter Inkassodienstleister, beantragt den Mahnbescheid beim zuständigen zentralen Mahngericht, in der Regel online. Zulässig ist das Verfahren nach § 688 Abs. 1 ZPO für Ansprüche auf Zahlung einer bestimmten Geldsumme.",
      "Nicht zulässig ist der Mahnbescheid unter anderem, wenn der Anspruch von einer noch nicht erbrachten Gegenleistung des Gläubigers abhängt (§ 688 Abs. 2 ZPO), etwa bei einer noch nicht vollständig erbrachten Leistung.",
      "Nach Zustellung hat der Schuldner zwei Wochen Zeit, Widerspruch einzulegen (§ 692 Abs. 1 Nr. 3 ZPO). Reagiert er gar nicht, kann der Gläubiger den Vollstreckungsbescheid beantragen, muss dies aber innerhalb von sechs Monaten nach Zustellung tun (§ 701 ZPO).",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Handwerksbetrieb hat eine unbestrittene Rechnung über 1.500 € offen, der Kunde reagiert auf Mahnungen nicht mehr, äußert aber auch keine inhaltlichen Einwände. Hier lohnt sich ein Mahnbescheid: Reagiert der Kunde weiterhin nicht, führt er zügig zu einem vollstreckbaren Titel. Hätte der Kunde dagegen Mängel an der Werkleistung gerügt, wäre die Forderung bestritten und ein Mahnbescheid weniger geeignet.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Angabe", "Wert", "Fundstelle"],
      zeilen: [
        ["Widerspruchsfrist", "2 Wochen ab Zustellung", "§ 692 Abs. 1 Nr. 3 ZPO"],
        ["Frist für den Antrag auf Vollstreckungsbescheid", "6 Monate ab Zustellung des Mahnbescheids", "§ 701 ZPO"],
        ["Zulässig für", "Zahlung einer bestimmten Geldsumme in Euro", "§ 688 Abs. 1 ZPO"],
        ["Inhaltliche Prüfung durch das Gericht", "nein", "§ 688 ZPO"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Prüft das Gericht, ob meine Forderung berechtigt ist?",
        antwort: "Nein, das automatisierte Mahnverfahren prüft nur formale Angaben, keine inhaltliche Berechtigung.",
      },
      {
        frage: "Was, wenn der Schuldner widerspricht?",
        antwort: "Der Fall geht in ein normales, streitiges Gerichtsverfahren über, in dem die Forderung inhaltlich geprüft wird.",
      },
      {
        frage: "Kann ich einen Mahnbescheid auch bei einer bestrittenen Forderung beantragen?",
        antwort:
          "Rechtlich möglich, aber wenig sinnvoll. Widerspricht der Schuldner, verzögert sich der Fall zusätzlich, ohne dass die Streitfrage geklärt wird.",
      },
      {
        frage: "Wie lange bleibt ein Mahnbescheid wirksam?",
        antwort: "Wird innerhalb von sechs Monaten nach Zustellung kein Vollstreckungsbescheid beantragt, verliert er seine Wirkung (§ 701 ZPO).",
      },
    ],
    handlungsaufforderung:
      "Nota Finance prüft, ob sich ein Mahnbescheid für Ihren Fall eignet, und beantragt ihn bei Bedarf. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Außergerichtliches und gerichtliches Mahnverfahren", href: "/ratgeber/aussergerichtliches-und-gerichtliches-mahnverfahren" },
      { label: "Wie lange dauert ein Inkassoverfahren?", href: "/ratgeber/dauer-inkassoverfahren" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
      { label: "Beispielrechnung", href: "/preise" },
    ],
  },

  "dauer-inkassoverfahren": {
    slug: "dauer-inkassoverfahren",
    frage: "Wie lange dauert ein Inkassoverfahren?",
    metaDescription:
      "Eine pauschale Dauer gibt es nicht. Fest steht nur der gerichtliche Teil: zwei Wochen Widerspruchsfrist, sechs Monate Antragsfrist, zwei Wochen Einspruchsfrist.",
    direkteAntwort:
      "Eine pauschale Dauer für ein Inkassoverfahren gibt es nicht, denn die außergerichtliche Phase ist gesetzlich nicht fest terminiert. Fest steht dagegen der gerichtliche Teil: Nach Zustellung eines Mahnbescheids hat der Schuldner zwei Wochen Zeit für einen Widerspruch (§ 692 Abs. 1 Nr. 3 ZPO); reagiert er nicht, kann der Vollstreckungsbescheid beantragt werden, gegen den wiederum zwei Wochen Einspruch möglich sind.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Was gesetzlich feststeht, und was nicht",
    erklaerungText: [
      "Die außergerichtliche Phase, also Zahlungserinnerungen und Mahnungen vor einem gerichtlichen Schritt, unterliegt keiner gesetzlichen Frist. Wie lange sie dauert, hängt vom Einzelfall und vom gewählten Vorgehen ab.",
      "Anders sieht es aus, sobald das gerichtliche Mahnverfahren eingeleitet wird. Hier gibt das Gesetz feste Fristen vor: Der Schuldner hat nach Zustellung des Mahnbescheids zwei Wochen Zeit für einen Widerspruch (§ 692 Abs. 1 Nr. 3 ZPO). Reagiert er nicht, kann der Gläubiger den Vollstreckungsbescheid beantragen, muss dies aber innerhalb von sechs Monaten nach Zustellung des Mahnbescheids tun (§ 701 ZPO). Gegen den Vollstreckungsbescheid hat der Schuldner erneut zwei Wochen Zeit für einen Einspruch (§ 700 Abs. 1 i. V. m. § 339 Abs. 1 ZPO).",
      "Legt der Schuldner zu keinem Zeitpunkt Widerspruch oder Einspruch ein, kann das gerichtliche Verfahren allein durch den Ablauf dieser beiden Zwei-Wochen-Fristen relativ zügig zu einem vollstreckbaren Titel führen. Widerspricht oder legt der Schuldner Einspruch ein, wird der Fall dagegen an das zuständige Gericht abgegeben und dort als normales Klageverfahren fortgeführt, dessen Dauer sich nicht pauschal vorhersagen lässt.",
    ],
    beispielUeberschrift: "Ein Beispiel für den zeitlichen Ablauf",
    beispielText: [
      "Der Mahnbescheid wird dem Schuldner am 1. März zugestellt. Legt er keinen Widerspruch ein, kann der Gläubiger frühestens ab dem 15. März den Vollstreckungsbescheid beantragen. Wird dieser dem Schuldner am 5. April zugestellt und legt er auch dagegen keinen Einspruch ein, liegt spätestens ab dem 19. April ein vollstreckbarer Titel vor, in diesem Beispiel also rund sieben Wochen nach der ersten Zustellung. Widerspricht der Schuldner dagegen, verlängert sich das Verfahren um die Dauer des anschließenden Gerichtsverfahrens.",
    ],
    tabelleUeberschrift: "Die gesetzlich festen Fristen im Überblick",
    tabelle: {
      kopfzeile: ["Schritt", "Frist", "Fundstelle"],
      zeilen: [
        ["Widerspruch gegen den Mahnbescheid", "2 Wochen ab Zustellung", "§ 692 Abs. 1 Nr. 3 ZPO"],
        ["Antrag auf Vollstreckungsbescheid", "innerhalb von 6 Monaten ab Zustellung des Mahnbescheids", "§ 701 ZPO"],
        ["Einspruch gegen den Vollstreckungsbescheid", "2 Wochen ab Zustellung", "§ 700 Abs. 1 i. V. m. § 339 Abs. 1 ZPO"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Warum gibt es keine pauschale Gesamtdauer?",
        antwort:
          "Weil die außergerichtliche Phase nicht gesetzlich terminiert ist und die gerichtliche Phase sich deutlich verlängert, sobald der Schuldner widerspricht.",
      },
      {
        frage: "Was beschleunigt das Verfahren am meisten?",
        antwort: "Wenn der Schuldner zu keinem Zeitpunkt Widerspruch oder Einspruch einlegt, laufen nur die beiden gesetzlichen Zwei-Wochen-Fristen.",
      },
      {
        frage: "Was verlängert das Verfahren am meisten?",
        antwort:
          "Ein Widerspruch oder Einspruch des Schuldners, weil der Fall dann als normales, streitiges Gerichtsverfahren weitergeführt wird.",
      },
    ],
    handlungsaufforderung:
      "Nota Finance hält alle gesetzlichen Fristen im Blick und informiert Sie über den Stand Ihres Falls. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Außergerichtliches und gerichtliches Mahnverfahren", href: "/ratgeber/aussergerichtliches-und-gerichtliches-mahnverfahren" },
      { label: "Was ist ein Mahnbescheid?", href: "/ratgeber/was-ist-ein-mahnbescheid" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
      { label: "So funktioniert Nota Finance", href: "/produkt" },
    ],
  },

  "verjaehrung-von-forderungen": {
    slug: "verjaehrung-von-forderungen",
    frage: "Verjährung von Forderungen: Welche Fristen gelten?",
    metaDescription:
      "Die meisten Forderungen verjähren nach drei Jahren, spätestens aber nach zehn Jahren. Titulierte Forderungen verjähren erst nach 30 Jahren. Mit Fundstellen erklärt.",
    direkteAntwort:
      "Die regelmäßige Verjährungsfrist beträgt drei Jahre und beginnt mit dem Ende des Jahres, in dem die Forderung entstanden ist und der Gläubiger von Schuldner und Umständen Kenntnis erlangt hat oder hätte erlangen müssen (§§ 195, 199 Abs. 1 BGB). Unabhängig von dieser Kenntnis verjähren die meisten Forderungen spätestens zehn Jahre nach ihrer Entstehung (§ 199 Abs. 4 BGB). Wird eine Forderung rechtskräftig festgestellt, etwa durch ein Urteil oder einen unangefochtenen Vollstreckungsbescheid, verlängert sich die Frist auf 30 Jahre (§ 197 Abs. 1 Nr. 3 BGB).",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Die drei relevanten Fristen",
    erklaerungText: [
      "Die regelmäßige Verjährungsfrist von drei Jahren (§ 195 BGB) beginnt nicht automatisch mit der Fälligkeit, sondern erst mit dem Ende des Kalenderjahres, in dem die Forderung entstanden ist und der Gläubiger von den anspruchsbegründenden Umständen und der Person des Schuldners Kenntnis erlangt hat oder ohne grobe Fahrlässigkeit hätte erlangen müssen (§ 199 Abs. 1 BGB).",
      "Diese Anknüpfung an die Kenntnis wird durch eine Höchstfrist begrenzt: Unabhängig davon, wann der Gläubiger von der Forderung erfährt, verjähren die meisten Ansprüche spätestens zehn Jahre nach ihrer Entstehung (§ 199 Abs. 4 BGB).",
      "Eine deutlich längere Frist gilt für bereits rechtskräftig festgestellte Ansprüche, etwa aus einem Urteil oder einem unangefochtenen Vollstreckungsbescheid. Hier beträgt die Verjährungsfrist 30 Jahre, gerechnet ab der Rechtskraft der Entscheidung oder der Errichtung des Titels, nicht ab dem ursprünglichen Rechnungsdatum (§§ 197 Abs. 1 Nr. 3, 201 BGB). Das lohnt sich für Gläubiger besonders dann, wenn ein Schuldner aktuell nicht zahlungsfähig ist, die Forderung aber gesichert bleiben soll.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Eine Rechnung wird im März 2026 gestellt und bleibt unbezahlt. Die dreijährige Verjährungsfrist beginnt nicht sofort, sondern erst am 31. Dezember 2026, und endet damit am 31. Dezember 2029. Wird die Forderung rechtzeitig vor Ablauf dieser Frist tituliert, etwa durch einen unangefochtenen Vollstreckungsbescheid, beginnt für den titulierten Anspruch eine neue, 30-jährige Frist ab der Rechtskraft des Titels.",
    ],
    tabelleUeberschrift: "Verjährungsfristen im Überblick",
    tabelle: {
      kopfzeile: ["Forderungsart", "Frist", "Fundstelle"],
      zeilen: [
        ["Regelmäßige Verjährung (die meisten Rechnungsforderungen)", "3 Jahre ab Jahresende der Entstehung und Kenntnis", "§§ 195, 199 Abs. 1 BGB"],
        ["Höchstfrist unabhängig von Kenntnis", "10 Jahre ab Entstehung", "§ 199 Abs. 4 BGB"],
        ["Rechtskräftig festgestellte (titulierte) Forderungen", "30 Jahre ab Rechtskraft des Titels", "§§ 197 Abs. 1 Nr. 3, 201 BGB"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Ab wann läuft die Drei-Jahres-Frist konkret?",
        antwort:
          "Ab dem Ende des Kalenderjahres, in dem die Forderung entstanden ist und der Gläubiger von ihr wusste oder hätte wissen müssen, nicht ab dem Rechnungsdatum selbst.",
      },
      {
        frage: "Kann die Verjährung unterbrochen oder gehemmt werden?",
        antwort:
          "Ja, zum Beispiel durch die Zustellung eines Mahnbescheids. Die konkrete Wirkung im Einzelfall ist eine Frage der anwaltlichen Prüfung.",
      },
      {
        frage: "Warum lohnt sich eine Titulierung vor Ablauf der Verjährung?",
        antwort: "Weil sich die Frist dadurch von drei beziehungsweise zehn Jahren auf 30 Jahre verlängert (§ 197 Abs. 1 Nr. 3 BGB).",
      },
      {
        frage: "Gilt die Zehn-Jahres-Höchstfrist für alle Forderungen gleich?",
        antwort:
          "Sie gilt für die meisten Ansprüche nach § 199 Abs. 4 BGB. Für bestimmte Schadensersatzansprüche gelten eigene, teils längere Fristen.",
      },
    ],
    handlungsaufforderung:
      "Je früher eine Forderung eingereicht wird, desto mehr Zeit bleibt, sie vor Ablauf der Verjährung durchzusetzen. Reichen Sie Ihre offene Forderung jetzt ein.",
    verwandteThemen: [
      { label: "Was passiert bei Teilzahlung?", href: "/ratgeber/teilzahlung-367-bgb" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Außergerichtliches und gerichtliches Mahnverfahren", href: "/ratgeber/aussergerichtliches-und-gerichtliches-mahnverfahren" },
      { label: "Beispielrechnung", href: "/preise" },
    ],
  },

  "schuldner-kann-nicht-zahlen": {
    slug: "schuldner-kann-nicht-zahlen",
    frage: "Was passiert, wenn der Schuldner nicht zahlen kann?",
    metaDescription:
      "Bei echter Zahlungsunfähigkeit helfen Vermögensauskunft, Forderungsanmeldung im Insolvenzverfahren und, für die Zukunft, ein rechtzeitiger Titel. Mit Fundstellen erklärt.",
    direkteAntwort:
      "Ob ein Schuldner nicht zahlen will oder tatsächlich nicht zahlen kann, macht einen großen Unterschied für das weitere Vorgehen. Liegt ein vollstreckbarer Titel vor, kann der Gläubiger über den Gerichtsvollzieher eine Vermögensauskunft verlangen (§ 802c ZPO). Ist der Schuldner tatsächlich insolvent, muss die Forderung im Insolvenzverfahren beim Insolvenzverwalter angemeldet werden (§ 174 InsO). Bei natürlichen Personen kann nach drei Jahren eine Restschuldbefreiung erfolgen, die auch die restliche Forderung erlöschen lässt (§ 287 Abs. 2 InsO).",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Zahlungsunwillig oder zahlungsunfähig?",
    erklaerungText: [
      "Reagiert ein Schuldner gar nicht oder zögert erkennbar hinaus, ist das noch kein Beleg für Zahlungsunfähigkeit. Ein gerichtliches Mahnverfahren und, falls nötig, eine Vermögensauskunft klären, ob überhaupt pfändbares Vermögen vorhanden ist.",
      "Liegt bereits ein vollstreckbarer Titel vor, etwa ein Vollstreckungsbescheid, kann der Gläubiger über den Gerichtsvollzieher verlangen, dass der Schuldner Auskunft über sein Vermögen erteilt (§ 802c ZPO). Diese Auskunft zeigt, ob eine Pfändung erfolgversprechend ist.",
      "Ist der Schuldner tatsächlich zahlungsunfähig und wird ein Insolvenzverfahren eröffnet, kann der Gläubiger seine Forderung nicht mehr einzeln durchsetzen, sondern muss sie beim Insolvenzverwalter zur Insolvenztabelle anmelden (§ 174 InsO). Auch Inkassodienstleister dürfen den Gläubiger dabei vertreten.",
      "Bei natürlichen Personen endet ein Insolvenzverfahren regelmäßig mit der Restschuldbefreiung. Nach Ablauf einer dreijährigen Abtretungsfrist werden dem Schuldner die verbliebenen Schulden erlassen, auch gegenüber Gläubigern, die ihre Forderung angemeldet hatten (§ 287 Abs. 2 InsO).",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Schuldner reagiert weder auf Mahnungen noch auf den Mahnbescheid. Nach Erlass des Vollstreckungsbescheids beauftragt der Gläubiger den Gerichtsvollzieher mit der Vermögensauskunft. Diese zeigt: Der Schuldner hat kein pfändbares Einkommen und kein verwertbares Vermögen. Wenig später eröffnet das Insolvenzgericht ein Verbraucherinsolvenzverfahren. Der Gläubiger meldet seine Forderung beim Insolvenzverwalter an, erhält aber nur eine anteilige Quote aus der Insolvenzmasse. Nach drei Jahren wird dem Schuldner Restschuldbefreiung erteilt, der Rest der Forderung erlischt.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Schritt", "Was passiert", "Fundstelle"],
      zeilen: [
        ["Vermögensauskunft", "Schuldner offenbart sein Vermögen gegenüber dem Gerichtsvollzieher", "§ 802c ZPO"],
        ["Forderungsanmeldung im Insolvenzverfahren", "schriftlich beim Insolvenzverwalter, auch durch Inkassodienstleister möglich", "§ 174 InsO"],
        ["Abtretungsfrist bis zur Restschuldbefreiung", "3 Jahre ab Verfahrenseröffnung", "§ 287 Abs. 2 InsO"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Lohnt sich ein gerichtliches Mahnverfahren auch bei einem zahlungsunfähigen Schuldner?",
        antwort:
          "Ja, denn ohne einen Titel gibt es später auch im Insolvenzverfahren keine bevorzugte Stellung. Ein Titel sichert die Forderung zumindest für die Zukunft, unter anderem durch die 30-jährige Verjährungsfrist (§ 197 Abs. 1 Nr. 3 BGB).",
      },
      {
        frage: "Muss ich die Forderung selbst im Insolvenzverfahren anmelden?",
        antwort: "Ein beauftragter Inkassodienstleister darf den Gläubiger bei der Anmeldung vertreten (§ 174 InsO).",
      },
      {
        frage: "Erlischt meine Forderung automatisch mit der Restschuldbefreiung?",
        antwort:
          "Ja, sie wird gegenüber dem Schuldner nach Ablauf der dreijährigen Frist regelmäßig unwirksam, unabhängig davon, wie viel tatsächlich gezahlt wurde.",
      },
      {
        frage: "Kann eine erneute Restschuldbefreiung genauso schnell erteilt werden?",
        antwort: "Nein. Wurde bereits einmal Restschuldbefreiung erteilt, verlängert sich die Frist im wiederholten Verfahren auf fünf Jahre.",
      },
    ],
    handlungsaufforderung:
      "Auch wenn ein Schuldner aktuell nicht zahlen kann, sichert eine rechtzeitig eingereichte Forderung Ihre Position. Reichen Sie sie jetzt bei Nota Finance ein.",
    verwandteThemen: [
      { label: "Wie lange dauert ein Inkassoverfahren?", href: "/ratgeber/dauer-inkassoverfahren" },
      { label: "Verjährung von Forderungen", href: "/ratgeber/verjaehrung-von-forderungen" },
      { label: "Was ist ein Mahnbescheid?", href: "/ratgeber/was-ist-ein-mahnbescheid" },
      { label: "So funktioniert Nota Finance", href: "/produkt" },
    ],
  },

  "handwerker-kunde-zahlt-rechnung-nicht": {
    slug: "handwerker-kunde-zahlt-rechnung-nicht",
    frage: "Kunde zahlt die Rechnung nicht: Was können Handwerksbetriebe tun?",
    metaDescription:
      "Der Ablauf für Handwerksbetriebe: Zahlungserinnerung, Verzug, gegebenenfalls Zurückbehaltungsrecht bei Folgeaufträgen, dann Inkasso oder gerichtliches Mahnverfahren.",
    direkteAntwort:
      "Zahlt ein Kunde eine Handwerksrechnung nicht, folgt der Weg in der Regel diesen Schritten: Zahlungserinnerung, danach Mahnung, Prüfung eines Zurückbehaltungsrechts bei laufenden Folgeaufträgen (§ 273 BGB), und bei Erfolglosigkeit außergerichtliches Inkasso oder das gerichtliche Mahnverfahren. Die branchentypischen Rechtsfragen zu Fälligkeit und Abschlagszahlungen erklärt die Handwerk-Branchenseite von Nota Finance.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Der Ablauf Schritt für Schritt",
    erklaerungText: [
      "Der erste Schritt ist meist eine formlose Zahlungserinnerung. Bleibt sie erfolglos, folgt eine schriftliche Mahnung mit Zahlungsfrist. Ab wann genau Verzug eintritt und welche Verzugszinsen dann gelten, erklärt der Ratgeber zum Zahlungsverzug.",
      "Läuft mit demselben Kunden noch ein weiterer Auftrag, kann ein Handwerksbetrieb prüfen, ob er die weitere Leistung zurückhalten darf, bis die offene Rechnung beglichen ist. Das Zurückbehaltungsrecht nach § 273 BGB setzt voraus, dass der Gegenanspruch aus demselben rechtlichen Verhältnis stammt. Bei einem völlig unabhängigen, neuen Auftrag greift es nicht automatisch.",
      "Bleibt die Rechnung trotz Mahnung offen, folgt der reguläre Inkassoweg: außergerichtliche Ansprache durch einen Inkassodienstleister, bei Erfolglosigkeit das gerichtliche Mahnverfahren mit Mahnbescheid und, falls nötig, Vollstreckungsbescheid.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Malerbetrieb stellt nach Abschluss der Arbeiten eine Schlussrechnung über 4.200 €. Der Kunde zahlt trotz Zahlungserinnerung und Mahnung nicht. Da kein weiterer Auftrag mit diesem Kunden läuft, entfällt ein Zurückbehaltungsrecht als Druckmittel. Der Betrieb reicht die Rechnung bei Nota Finance ein, die zunächst außergerichtlich mahnt und bei Erfolglosigkeit das gerichtliche Mahnverfahren einleitet.",
    ],
    tabelleUeberschrift: "Der Ablauf im Überblick",
    tabelle: {
      kopfzeile: ["Schritt", "Inhalt", "Vertiefung"],
      zeilen: [
        ["1. Zahlungserinnerung", "formlose Erinnerung an die offene Rechnung", "kein fester Fristablauf"],
        ["2. Mahnung", "schriftliche Aufforderung mit Zahlungsfrist, spätestens nach 30 Tagen automatischer Verzug", "§ 286 Abs. 3 BGB"],
        ["3. Zurückbehaltungsrecht bei Folgeaufträgen", "nur innerhalb desselben rechtlichen Verhältnisses", "§ 273 BGB"],
        ["4. Inkasso und Mahnverfahren", "außergerichtliche Ansprache, danach Mahnbescheid und Vollstreckungsbescheid", "§§ 688 ff. ZPO"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Darf ich einen Folgeauftrag verweigern, solange die alte Rechnung offen ist?",
        antwort:
          "Nur wenn beide Ansprüche aus demselben rechtlichen Verhältnis stammen, etwa demselben Bauvorhaben (§ 273 BGB). Bei einem völlig neuen, unabhängigen Auftrag gilt das nicht automatisch.",
      },
      {
        frage: "Wie hängt das mit der Bauhandwerkersicherung zusammen?",
        antwort:
          "Die Bauhandwerkersicherung nach § 650f BGB betrifft laufende, noch nicht abgeschlossene Aufträge und wird auf der Handwerk-Branchenseite erklärt.",
      },
      {
        frage: "Ab wann sollte ich professionelle Hilfe einschalten?",
        antwort:
          "Spätestens wenn zwei Mahnungen erfolglos geblieben sind, lohnt sich der Wechsel zum Inkasso, um Verzugszinsen und Fristen im Blick zu behalten.",
      },
    ],
    handlungsaufforderung:
      "Nota Finance übernimmt Mahnung, Inkasso und bei Bedarf das gerichtliche Mahnverfahren für Ihre offene Handwerksrechnung. Reichen Sie sie ein.",
    verwandteThemen: [
      { label: "Inkasso für Handwerk", href: "/inkasso-handwerk" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Außergerichtliches und gerichtliches Mahnverfahren", href: "/ratgeber/aussergerichtliches-und-gerichtliches-mahnverfahren" },
      { label: "Was passiert bei Teilzahlung?", href: "/ratgeber/teilzahlung-367-bgb" },
    ],
  },

  "mietrueckstand-was-tun-vermieter": {
    slug: "mietrueckstand-was-tun-vermieter",
    frage: "Mietrückstand: Welche Schritte haben private Vermieter?",
    metaDescription:
      "Vom automatischen Verzug über die fristlose Kündigung bis zur Schonfristzahlung: der Ablauf bei Mietrückständen für private Vermieter, mit Fundstellen.",
    direkteAntwort:
      "Bei Mietrückstand kann ein Vermieter zwei Dinge parallel verfolgen: die offenen Beträge einziehen und, ab einer bestimmten Rückstandshöhe, fristlos kündigen. Fristlos kündbar ist es, wenn der Mieter mit zwei aufeinanderfolgenden Mietzahlungen um mehr als eine Monatsmiete in Rückstand ist, oder wenn sich der Rückstand über einen längeren Zeitraum auf insgesamt zwei Monatsmieten summiert (§ 543 Abs. 2 Satz 1 Nr. 3 BGB i. V. m. § 569 Abs. 3 Nr. 1 BGB). Der Mieter kann die Kündigung durch vollständige Nachzahlung innerhalb von zwei Monaten nach Klageerhebung noch abwenden, die sogenannte Schonfristzahlung (§ 569 Abs. 3 Nr. 2 BGB).",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Der Ablauf Schritt für Schritt",
    erklaerungText: [
      "Miete wird üblicherweise am dritten Werktag des Monats fällig (§ 556b Abs. 1 BGB), sodass bei einer kalendermäßig festen Fälligkeit oft schon ohne Mahnung Verzug eintritt (§ 286 Abs. 2 Nr. 1 BGB). Die Details dazu erklärt der Ratgeber zum Zahlungsverzug.",
      "Das Gesetz kennt zwei Varianten des Zahlungsverzugs, die zur fristlosen Kündigung berechtigen: Entweder ist der Mieter mit zwei aufeinanderfolgenden Mietzahlungen um mehr als eine Monatsmiete in Rückstand (§ 543 Abs. 2 Satz 1 Nr. 3 Buchst. a i. V. m. § 569 Abs. 3 Nr. 1 BGB), oder der Rückstand hat sich über einen längeren Zeitraum auf insgesamt zwei Monatsmieten summiert (§ 543 Abs. 2 Satz 1 Nr. 3 Buchst. b BGB). Das Einziehen der Mietschulden und die Kündigung sind zwei getrennte rechtliche Schritte, die parallel laufen können. Eine Räumungsklage ersetzt nicht die Geltendmachung der offenen Miete und umgekehrt.",
      "Selbst nach einer fristlosen Kündigung kann der Mieter sie noch unwirksam machen, wenn er die Rückstände spätestens zwei Monate nach Erhebung der Räumungsklage vollständig ausgleicht, die sogenannte Schonfristzahlung (§ 569 Abs. 3 Nr. 2 BGB). Das gilt allerdings nicht, wenn der Mieter diese Möglichkeit bereits in den letzten zwei Jahren aus demselben Grund genutzt hat.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Mieter zahlt drei Monate lang keine Miete von je 850 €, insgesamt 2.550 €. Damit ist er sowohl mit zwei aufeinanderfolgenden Zahlungen um mehr als eine Monatsmiete als auch insgesamt um mehr als zwei Monatsmieten im Rückstand, beide gesetzlichen Varianten sind hier erfüllt. Der Vermieter kündigt fristlos und erhebt Räumungsklage. Zwei Wochen später zahlt der Mieter die gesamten Rückstände nach. Da er diese Möglichkeit in den letzten zwei Jahren nicht bereits genutzt hat, wird die Kündigung dadurch unwirksam. Die Mietschulden selbst muss der Mieter trotzdem vollständig begleichen.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Angabe", "Regel", "Fundstelle"],
      zeilen: [
        ["Fälligkeit der Miete", "spätestens 3. Werktag des Monats", "§ 556b Abs. 1 BGB"],
        ["Fristlose Kündigung möglich ab", "mehr als 1 Monatsmiete bei 2 aufeinanderfolgenden Terminen, oder insgesamt 2 Monatsmieten über längeren Zeitraum", "§ 543 Abs. 2 S. 1 Nr. 3 BGB, § 569 Abs. 3 Nr. 1 BGB"],
        ["Schonfristzahlung heilt Kündigung", "vollständige Zahlung binnen 2 Monaten nach Klageerhebung", "§ 569 Abs. 3 Nr. 2 BGB"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Muss ich vor der Kündigung erst mahnen?",
        antwort: "Nein, bei Erreichen der gesetzlichen Rückstandsschwelle ist eine vorherige Mahnung für die fristlose Kündigung nicht zwingend erforderlich.",
      },
      {
        frage: "Was, wenn der Mieter nach der Kündigung doch noch zahlt?",
        antwort:
          "Zahlt er innerhalb von zwei Monaten nach Erhebung der Räumungsklage vollständig, wird die Kündigung unwirksam, außer er hat diese Möglichkeit in den letzten zwei Jahren bereits genutzt.",
      },
      {
        frage: "Muss ich die Mietschulden trotzdem einziehen, wenn die Kündigung unwirksam wird?",
        antwort: "Bei einer vollständigen Schonfristzahlung sind die Schulden bereits beglichen. Zahlt der Mieter nur teilweise, bleibt der Rest offen und einziehbar.",
      },
      {
        frage: "Kann ich Kündigung und Inkasso gleichzeitig betreiben?",
        antwort: "Ja, beides sind getrennte rechtliche Schritte, die sich nicht gegenseitig ausschließen.",
      },
    ],
    handlungsaufforderung: "Nota Finance zieht Ihre Mietrückstände ein, unabhängig davon, ob Sie zusätzlich kündigen. Reichen Sie den offenen Betrag ein.",
    verwandteThemen: [
      { label: "Inkasso für private Vermieter", href: "/inkasso-vermieter" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Verjährung von Forderungen", href: "/ratgeber/verjaehrung-von-forderungen" },
      { label: "Was ist ein Mahnbescheid?", href: "/ratgeber/was-ist-ein-mahnbescheid" },
    ],
  },

  "honorarrechnung-unbezahlt-freiberufler": {
    slug: "honorarrechnung-unbezahlt-freiberufler",
    frage: "Honorarrechnung unbezahlt: Was können Freiberufler tun?",
    metaDescription:
      "Bei einem Dienstvertrag wird das Honorar mit der Leistungserbringung fällig, ohne separate Abnahme. Der Ablauf bei unbezahlten Honorarrechnungen für Freiberufler.",
    direkteAntwort:
      "Bei vielen freiberuflichen Tätigkeiten handelt es sich rechtlich um einen Dienstvertrag: Die Vergütung wird bereits mit der Erbringung der Leistung fällig, eine förmliche Abnahme wie beim Werkvertrag ist dafür nicht nötig (§ 614 BGB). Bleibt die Zahlung trotzdem aus, folgt der übliche Weg über Mahnung, außergerichtliches Inkasso und, falls nötig, das gerichtliche Mahnverfahren.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Dienstvertrag oder Werkvertrag: ein wichtiger Unterschied",
    erklaerungText: [
      "Ob eine freiberufliche Leistung als Dienstvertrag oder als Werkvertrag einzuordnen ist, hängt davon ab, ob ein bestimmter Erfolg geschuldet wird, etwa ein fertiges Werk, oder nur die Tätigkeit selbst, etwa laufende Beratung. Bei einem Dienstvertrag ist die Vergütung nach der Leistung der Dienste zu entrichten, bei zeitabschnittsweiser Vergütung nach Ablauf des jeweiligen Zeitabschnitts (§ 614 BGB).",
      "Das bedeutet: Anders als beim Werkvertrag, bei dem die Fälligkeit an eine Abnahme geknüpft ist, braucht es beim Dienstvertrag keine gesonderte Abnahmeerklärung des Kunden, damit die Rechnung fällig wird.",
      "Ist die Rechnung fällig und bleibt unbezahlt, gilt wie bei jeder anderen Geldforderung: Spätestens nach 30 Tagen tritt automatisch Verzug ein (§ 286 Abs. 3 BGB), danach kann außergerichtlich gemahnt und bei Erfolglosigkeit das gerichtliche Mahnverfahren eingeleitet werden.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Eine selbstständige Beraterin stellt nach Abschluss eines dreimonatigen Projekts ihre Honorarrechnung über 6.000 €. Da es sich um einen Dienstvertrag handelt, ist die Vergütung bereits mit Erbringung der Leistung fällig, unabhängig davon, ob der Kunde die Arbeit ausdrücklich abnimmt. Zahlt er trotz Zahlungserinnerung nicht, reicht sie die Rechnung bei Nota Finance ein.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Vertragsart", "Fälligkeit der Vergütung", "Fundstelle"],
      zeilen: [
        ["Dienstvertrag (z. B. laufende Beratung)", "mit Erbringung der Leistung, ohne Abnahme", "§ 614 BGB"],
        ["Werkvertrag (z. B. ein bestimmtes Arbeitsergebnis)", "mit Abnahme des Werks", "§ 641 BGB"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Ist meine Tätigkeit ein Dienst- oder ein Werkvertrag?",
        antwort:
          "Entscheidend ist, ob ein konkreter Erfolg geschuldet ist (Werkvertrag) oder nur die Tätigkeit selbst (Dienstvertrag). Im Zweifel hilft ein Blick in den geschlossenen Vertrag.",
      },
      {
        frage: "Muss mein Kunde meine Leistung ausdrücklich abnehmen?",
        antwort: "Bei einem Dienstvertrag nein, die Vergütung wird bereits mit der Leistung fällig (§ 614 BGB).",
      },
      {
        frage: "Was, wenn im Vertrag ein anderes Zahlungsziel vereinbart wurde?",
        antwort: "Eine vertragliche Fälligkeitsregelung geht der gesetzlichen Regel vor. § 614 BGB gilt nur, wenn nichts anderes vereinbart ist.",
      },
    ],
    handlungsaufforderung: "Nota Finance zieht Ihre unbezahlten Honorarrechnungen ein, unabhängig davon, ob Dienst- oder Werkvertrag. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Inkasso für Freiberufler & Kreative", href: "/inkasso-freiberufler" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
    ],
  },

  "privatrechnung-unbezahlt-praxis": {
    slug: "privatrechnung-unbezahlt-praxis",
    frage: "Privatrechnung nicht bezahlt: Was können Praxen tun?",
    metaDescription:
      "Ärztliche Privatrechnungen werden mit ordnungsgemäßer Rechnungsstellung fällig, nicht erst nach einer Frist. Der diskrete Ablauf bei unbezahlten Privatliquidationen.",
    direkteAntwort:
      "Eine ärztliche Privatrechnung wird bereits fällig, sobald eine der Gebührenordnung für Ärzte entsprechende Rechnung erteilt wurde (§ 12 Abs. 1 GOÄ), eine zusätzliche Frist muss die Praxis dafür nicht setzen. Bleibt die Zahlung aus, kann diskret über einen Inkassodienstleister gemahnt werden, ohne dass der Patient den Eindruck einer öffentlichen Auseinandersetzung bekommt.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Fälligkeit und diskreter Ablauf",
    erklaerungText: [
      "Nach § 12 Abs. 1 GOÄ wird das Honorar fällig, sobald dem Zahlungspflichtigen eine der Verordnung entsprechende Rechnung erteilt wurde. Anders als bei vielen anderen Rechnungen braucht es also keine gesonderte Zahlungsfrist, damit die Forderung fällig ist. Praktisch räumen Praxen dennoch meist ein Zahlungsziel ein.",
      "Bleibt die Zahlung aus, gilt für den Eintritt des Verzugs wieder die allgemeine Regel: entweder nach Mahnung, oder spätestens 30 Tage nach Fälligkeit und Rechnungszugang automatisch (§ 286 Abs. 3 BGB).",
      "Bei Privatliquidationen ist Diskretion besonders wichtig, denn eine Rechnung offenbart häufig auch, welche Behandlung stattgefunden hat. Ein spezialisierter Inkassodienstleister spricht den Patienten sachlich und ohne öffentliche Auseinandersetzung an, etwa ohne ein Mahnschreiben, das Dritte im Haushalt einsehen könnten.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Eine hautärztliche Praxis stellt nach einer privat abgerechneten Behandlung eine GOÄ-Rechnung über 780 €. Die Rechnung ist bereits mit ordnungsgemäßer Ausstellung fällig. Der Patient zahlt trotz Zahlungserinnerung nicht. Die Praxis reicht die Rechnung bei Nota Finance ein, die den Patienten diskret und sachlich anspricht, ohne Details der Behandlung offen erkennbar zu machen.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Angabe", "Regel", "Fundstelle"],
      zeilen: [
        ["Fälligkeit der ärztlichen Vergütung", "mit Erteilung einer ordnungsgemäßen Rechnung", "§ 12 Abs. 1 GOÄ"],
        ["Verzug ohne Mahnung", "spätestens 30 Tage nach Fälligkeit und Rechnungszugang", "§ 286 Abs. 3 BGB"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Muss ich meinen Patienten eine Zahlungsfrist einräumen?",
        antwort:
          "Rechtlich nicht zwingend, die Rechnung ist bereits mit Erteilung fällig (§ 12 Abs. 1 GOÄ). Praktisch ist eine Frist trotzdem üblich und kundenfreundlich.",
      },
      {
        frage: "Erfährt der Inkassodienstleister, welche Behandlung stattgefunden hat?",
        antwort: "Nur das für die Forderung notwendige Minimum wird weitergegeben, die Ansprache selbst erfolgt sachlich und diskret.",
      },
      {
        frage: "Gilt das auch für Zahnärzte und andere Heilberufe?",
        antwort: "Die berufsrechtlichen Gebührenordnungen unterscheiden sich im Detail. Für Ärzte gilt die genannte Regelung aus der GOÄ.",
      },
    ],
    handlungsaufforderung: "Nota Finance zieht offene Privatrechnungen diskret und patientenschonend ein. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Inkasso für Gesundheitswesen & Heilberufe", href: "/inkasso-gesundheitswesen" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Was passiert bei Teilzahlung?", href: "/ratgeber/teilzahlung-367-bgb" },
    ],
  },

  "zahlungsrueckstaende-hausverwaltung": {
    slug: "zahlungsrueckstaende-hausverwaltung",
    frage: "Zahlungsrückstände in der Hausverwaltung richtig behandeln",
    metaDescription:
      "Hausgeld-Rückstände klagt die teilrechtsfähige Gemeinschaft ein, nicht die Hausverwaltung selbst. Der richtige Ablauf für Hausverwaltungen, mit Fundstellen.",
    direkteAntwort:
      "Bei Hausgeld-Rückständen ist rechtlich nicht die Hausverwaltung selbst Gläubigerin, sondern die teilrechtsfähige Gemeinschaft der Wohnungseigentümer, die dafür klagen und verklagt werden kann (§ 9a Abs. 1 WEG). Die Hausverwaltung handelt hier als deren Vertreterin und muss ihre Vertretungsmacht entsprechend nachweisen, bevor sie einen Inkassodienstleister beauftragt.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Wer ist eigentlich Gläubiger?",
    erklaerungText: [
      "Seit der WEG-Reform ist die Gemeinschaft der Wohnungseigentümer selbst rechtsfähig: Sie kann Rechte erwerben, Verbindlichkeiten eingehen sowie klagen und verklagt werden (§ 9a Abs. 1 WEG). Rechte, die eine einheitliche Rechtsverfolgung erfordern, wie das Einziehen von Hausgeld-Rückständen, übt die Gemeinschaft aus, nicht der einzelne Eigentümer (§ 9a Abs. 2 WEG).",
      "Die Hausverwaltung selbst ist dabei nur Vertreterin der Gemeinschaft, nicht selbst Gläubigerin. Für die Beauftragung eines Inkassodienstleisters braucht es deshalb einen Nachweis der Vertretungsmacht, üblicherweise über den Verwaltervertrag und den zugrunde liegenden Beschluss der Eigentümerversammlung.",
      "Grundlage der Forderung ist meist der beschlossene Wirtschaftsplan, aus dem sich die Höhe der monatlichen Vorschüsse der Eigentümer ergibt. Bleiben diese Vorschüsse aus, gilt für den Verzug dieselbe allgemeine Regel wie bei anderen Geldforderungen.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Eigentümer zahlt seit vier Monaten kein Hausgeld gemäß dem beschlossenen Wirtschaftsplan. Die Hausverwaltung mahnt im Namen der Gemeinschaft der Wohnungseigentümer, nicht im eigenen Namen. Bleibt die Zahlung aus, beauftragt sie, gedeckt durch ihre Vertretungsmacht, einen Inkassodienstleister, der die Forderung im Namen der Gemeinschaft weiterverfolgt.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Angabe", "Regel", "Fundstelle"],
      zeilen: [
        ["Wer ist Gläubiger bei Hausgeld-Rückständen?", "die Gemeinschaft der Wohnungseigentümer", "§ 9a Abs. 1/2 WEG"],
        ["Rolle der Hausverwaltung", "Vertreterin, nicht selbst Gläubigerin", "§ 9a Abs. 1/2 WEG"],
        ["Grundlage der Forderungshöhe", "beschlossener Wirtschaftsplan", "§ 28 Abs. 1 WEG"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Kann die Hausverwaltung im eigenen Namen mahnen?",
        antwort: "Nein, rechtlich handelt sie im Namen und mit Vertretungsmacht der Gemeinschaft der Wohnungseigentümer.",
      },
      {
        frage: "Welchen Nachweis braucht ein Inkassodienstleister?",
        antwort: "In der Regel den Verwaltervertrag und den Beschluss, aus dem sich die Vertretungsmacht der Hausverwaltung ergibt.",
      },
      {
        frage: "Was, wenn der Wirtschaftsplan noch nicht beschlossen wurde?",
        antwort: "Ohne wirksamen Beschluss fehlt der Forderung häufig die Grundlage, das sollte vor der Einreichung geklärt werden.",
      },
    ],
    handlungsaufforderung: "Nota Finance zieht Hausgeld-Rückstände im Namen der Gemeinschaft ein und prüft die nötige Vertretungsmacht. Reichen Sie den Fall ein.",
    verwandteThemen: [
      { label: "Inkasso für Hausverwaltungen", href: "/inkasso-hausverwaltung" },
      { label: "Mietrückstand: Welche Schritte haben private Vermieter?", href: "/ratgeber/mietrueckstand-was-tun-vermieter" },
      { label: "Wann ist eine Rechnung im Verzug?", href: "/ratgeber/rechnung-im-verzug" },
      { label: "Was ist ein Mahnbescheid?", href: "/ratgeber/was-ist-ein-mahnbescheid" },
    ],
  },

  "offene-mitgliedsbeitraege-einziehen": {
    slug: "offene-mitgliedsbeitraege-einziehen",
    frage: "Offene Mitgliedsbeiträge einziehen: Wege für Vereine und Studios",
    metaDescription:
      "Vereine stützen sich auf ihre Satzung, Fitnessstudios auf den Vertrag. Beide profitieren beim Einzug vieler kleiner Beträge vom automatisierten Mahnverfahren.",
    direkteAntwort:
      "Bei eingetragenen Vereinen ergibt sich die Beitragspflicht aus der Satzung, die Bestimmungen zu Beiträgen enthalten soll (§ 58 Nr. 2 BGB), bei Fitnessstudios aus dem individuellen Vertrag. In beiden Fällen handelt es sich meist um viele gleichartige, kleine Forderungen, für die sich das automatisierte gerichtliche Mahnverfahren besonders eignet.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Zwei unterschiedliche Rechtsgrundlagen, ein ähnlicher Ablauf",
    erklaerungText: [
      "Ein eingetragener Verein leitet die Beitragspflicht seiner Mitglieder aus der Satzung ab. Diese soll unter anderem regeln, ob und welche Beiträge zu leisten sind (§ 58 Nr. 2 BGB). Ohne eine solche Regelung fehlt es häufig an einer klaren Grundlage für die Forderung.",
      "Ein Fitnessstudio stützt sich dagegen auf den individuellen Mitgliedschaftsvertrag mit dem jeweiligen Kunden, nicht auf eine Satzung. Die zulässige Vertragslaufzeit ist dabei durch AGB-rechtliche Grenzen beschränkt, näher erklärt auf der Branchenseite für Fitnessstudios.",
      "In beiden Fällen entstehen typischerweise viele kleine, gleichartige Forderungen gegenüber unterschiedlichen Mitgliedern. Das automatisierte gerichtliche Mahnverfahren ist für genau solche Fälle konzipiert und lässt sich effizient auf viele Fälle parallel anwenden.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Sportverein hat bei zwölf Mitgliedern Beitragsrückstände von jeweils rund 90 € pro Jahr. Statt jeden Fall einzeln aufwendig zu bearbeiten, reicht der Verein alle zwölf Forderungen bei Nota Finance ein. Die Fälle werden einheitlich gemahnt und bei Bedarf jeweils ins gerichtliche Mahnverfahren überführt.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["", "Verein", "Fitnessstudio"],
      zeilen: [
        ["Rechtsgrundlage der Beitragspflicht", "Satzung", "individueller Vertrag"],
        ["Fundstelle", "§ 58 Nr. 2 BGB", "allgemeines Vertragsrecht, AGB-rechtliche Laufzeitgrenzen"],
        ["Typische Fallzahl", "viele kleine, gleichartige Forderungen", "viele kleine, gleichartige Forderungen"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Was, wenn die Satzung meines Vereins keine Beitragshöhe nennt?",
        antwort: "Dann sollte zunächst über die Mitgliederversammlung eine klare Grundlage geschaffen werden, bevor Forderungen eingezogen werden.",
      },
      {
        frage: "Lohnt sich Inkasso auch bei sehr kleinen Beträgen?",
        antwort:
          "Ja, gerade bei vielen gleichartigen Kleinforderungen ist das automatisierte Mahnverfahren effizient. Nota Finance nimmt Forderungen ab 50 € an.",
      },
      {
        frage: "Unterscheidet sich der Ablauf zwischen Verein und Fitnessstudio?",
        antwort: "Nur in der Rechtsgrundlage der Forderung, der praktische Ablauf über Mahnung und gegebenenfalls gerichtliches Mahnverfahren ist derselbe.",
      },
    ],
    handlungsaufforderung: "Nota Finance zieht auch viele kleine, gleichartige Mitgliedsbeiträge automatisiert ein. Reichen Sie Ihre offenen Forderungen ein.",
    verwandteThemen: [
      { label: "Inkasso für Fitnessstudios, Abos & Mitgliedschaften", href: "/inkasso-fitnessstudio" },
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
      { label: "Ab welchem Betrag lohnt sich Inkasso?", href: "/ratgeber/ab-welchem-betrag-lohnt-sich-inkasso" },
      { label: "Wie lange dauert ein Inkassoverfahren?", href: "/ratgeber/dauer-inkassoverfahren" },
    ],
  },

  "serioeses-inkassounternehmen-erkennen": {
    slug: "serioeses-inkassounternehmen-erkennen",
    frage: "Woran erkennt man ein seriöses Inkassounternehmen?",
    metaDescription:
      "Registrierung im öffentlichen Rechtsdienstleistungsregister, eine Berufshaftpflicht ab 250.000 € und Kosten nach RVG-Sätzen sind objektiv prüfbare Merkmale.",
    direkteAntwort:
      "Ein seriöses Inkassounternehmen ist beim Bundesamt für Justiz als Rechtsdienstleister registriert, das lässt sich kostenlos im öffentlichen Rechtsdienstleistungsregister nachprüfen (§ 16 Abs. 1 RDG). Zur Registrierung gehört zwingend eine Berufshaftpflichtversicherung mit mindestens 250.000 € Deckungssumme je Schadensfall (§ 12 Abs. 1 RDG). Ein weiteres objektives Merkmal: Die verlangten Inkassokosten folgen den gesetzlich gedeckelten RVG-Sätzen, nicht frei erfundenen Pauschalen (§ 13e RDG).",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Drei objektiv prüfbare Merkmale",
    erklaerungText: [
      "Inkasso ist eine erlaubnispflichtige Rechtsdienstleistung (§ 2 Abs. 2 RDG). Wer sie anbietet, muss beim Bundesamt für Justiz registriert sein. Diese Registrierung ist keine bloße Behauptung, sondern öffentlich einsehbar: Jeder darf kostenlos im Rechtsdienstleistungsregister nachsehen, ob ein Unternehmen tatsächlich eingetragen ist (§ 16 Abs. 1 RDG).",
      "Zur Registrierung gehört zwingend der Nachweis persönlicher Zuverlässigkeit, fachlicher Sachkunde und einer Berufshaftpflichtversicherung mit einer Mindestdeckung von 250.000 € je Schadensfall (§ 12 Abs. 1 RDG). Ohne diese Voraussetzungen wird die Registrierung gar nicht erst erteilt.",
      "Ein drittes Merkmal betrifft die Kosten: Seit der Reform 2021 sind die von einem Inkassounternehmen gegenüber dem Schuldner erstattungsfähigen Kosten auf die RVG-Anwaltsvergütung gedeckelt (§ 13e RDG). Verlangt ein Anbieter deutlich höhere oder intransparente Pauschalen, ist das ein Warnsignal.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Gläubiger erhält von einem Inkassounternehmen ein Schreiben mit hohen, nicht näher aufgeschlüsselten Zusatzkosten. Eine Prüfung im Rechtsdienstleistungsregister zeigt, dass das Unternehmen dort tatsächlich eingetragen ist. Die verlangten Kosten lassen sich aber nicht mit den RVG-Sätzen für unbestrittene Forderungen in Einklang bringen. Das ist ein Anlass, die Rechnung genauer zu hinterfragen oder anwaltlich prüfen zu lassen.",
    ],
    tabelleUeberschrift: "Prüfbare Merkmale im Überblick",
    tabelle: {
      kopfzeile: ["Merkmal", "Worauf es hindeutet", "Fundstelle"],
      zeilen: [
        ["Eintrag im Rechtsdienstleistungsregister", "Erlaubnis zur Inkassotätigkeit liegt vor", "§ 16 Abs. 1 RDG"],
        ["Berufshaftpflicht ab 250.000 € Deckung", "Voraussetzung für die Registrierung", "§ 12 Abs. 1 RDG"],
        ["Kosten nach RVG-Sätzen", "gesetzlicher Kostendeckel gegenüber dem Schuldner", "§ 13e RDG"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Wo kann ich die Registrierung eines Inkassounternehmens prüfen?",
        antwort: "Im Rechtsdienstleistungsregister, das vom Bundesamt für Justiz geführt wird und jedem kostenlos zur Einsicht offensteht (§ 16 Abs. 1 RDG).",
      },
      {
        frage: "Ist eine BDIU-Mitgliedschaft Pflicht?",
        antwort: "Nein, sie ist freiwillig. Anders als die RDG-Registrierung ist sie keine gesetzliche Voraussetzung, kann aber als zusätzliches Qualitätssignal dienen.",
      },
      {
        frage: "Was, wenn ein Unternehmen gar nicht registriert ist?",
        antwort: "Dann darf es keine Inkassodienstleistungen erbringen. Ein fehlender Registereintrag ist ein deutliches Warnsignal.",
      },
    ],
    handlungsaufforderung: `${faktenkern.markeMitTraeger} ist seit ${faktenkern.gegruendet} als Rechtsdienstleister registriert, Aktenzeichen ${faktenkern.rdg.aktenzeichen}. Reichen Sie Ihre Forderung ein.`,
    verwandteThemen: [
      { label: "Was darf Inkasso kosten?", href: "/ratgeber/was-darf-inkasso-kosten" },
      { label: "Inkasso oder Anwalt?", href: "/ratgeber/inkasso-oder-anwalt" },
      { label: "Selbst mahnen oder Inkasso beauftragen?", href: "/ratgeber/selbst-mahnen-oder-inkasso-beauftragen" },
      { label: "Über Nota Finance", href: "/unternehmen" },
    ],
  },

  "selbst-mahnen-oder-inkasso-beauftragen": {
    slug: "selbst-mahnen-oder-inkasso-beauftragen",
    frage: "Selbst mahnen oder Inkasso beauftragen?",
    metaDescription:
      "Für die eigene Forderung braucht es keine RDG-Erlaubnis, auch das gerichtliche Mahnverfahren lässt sich selbst durchführen. Wann sich die Beauftragung trotzdem lohnt.",
    direkteAntwort:
      "Rechtlich kann jeder Gläubiger seine eigene Forderung selbst mahnen und auch das gerichtliche Mahnverfahren selbst durchführen, denn das Rechtsdienstleistungsgesetz gilt nur für fremde Angelegenheiten, nicht für die eigene Forderung (§ 2 Abs. 1 RDG). Vor dem Amtsgericht, wo auch das Mahnverfahren angesiedelt ist, besteht zudem kein Anwaltszwang (§ 79 Abs. 1 ZPO). Die Beauftragung eines Inkassodienstleisters lohnt sich trotzdem, sobald der eigene Zeitaufwand, die Zahl der Fälle oder die Kenntnis der Fristen zum Engpass werden.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Was rechtlich möglich ist, und was dafür spricht, es abzugeben",
    erklaerungText: [
      "Das Rechtsdienstleistungsgesetz regelt nur Tätigkeiten in fremden Angelegenheiten (§ 2 Abs. 1 RDG). Wer seine eigene Forderung geltend macht, betreibt keine erlaubnispflichtige Rechtsdienstleistung und kann selbst mahnen, ohne dafür registriert zu sein.",
      "Auch das gerichtliche Mahnverfahren ist beim Amtsgericht angesiedelt, vor dem grundsätzlich kein Anwaltszwang besteht: Soweit eine anwaltliche Vertretung nicht vorgeschrieben ist, können Parteien den Rechtsstreit selbst führen (§ 79 Abs. 1 ZPO). Ein Gläubiger kann also selbst einen Mahnbescheid beantragen.",
      "Trotzdem hat die Beauftragung eines Inkassodienstleisters praktische Vorteile: Die Kosten dafür trägt bei unbestrittenen Forderungen in aller Regel der Schuldner (§ 13e RDG), die Fristen aus dem gerichtlichen Mahnverfahren werden zuverlässig eingehalten, und bei vielen gleichartigen Forderungen lässt sich der Aufwand pro Fall deutlich senken.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Ein Vermieter mit einer einzigen offenen Mietforderung mahnt selbst und beantragt bei Erfolglosigkeit selbst einen Mahnbescheid, das ist rechtlich ohne Weiteres möglich. Ein Fitnessstudio mit vierzig gleichzeitig säumigen Mitgliedern stößt dagegen schnell an zeitliche Grenzen, wenn es jeden Fall einzeln bearbeiten müsste. Hier zahlt sich die Beauftragung eines spezialisierten Dienstleisters eher aus.",
    ],
    tabelleUeberschrift: "Selbst oder beauftragt: der Unterschied",
    tabelle: {
      kopfzeile: ["", "Selbst mahnen", "Inkasso beauftragen"],
      zeilen: [
        ["Rechtlich erforderlich", "keine besondere Erlaubnis nötig", "Inkassodienstleister braucht RDG-Registrierung"],
        ["Zeitaufwand für den Gläubiger", "trägt der Gläubiger selbst", "übernimmt der Dienstleister"],
        ["Kosten bei unbestrittener Forderung", "eigener Aufwand, keine RVG-Erstattung", "in der Regel vom Schuldner getragen (§ 13e RDG)"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Brauche ich eine Erlaubnis, um meine eigene Rechnung zu mahnen?",
        antwort: "Nein, das Rechtsdienstleistungsgesetz gilt nur für fremde Angelegenheiten (§ 2 Abs. 1 RDG).",
      },
      {
        frage: "Kann ich den Mahnbescheid selbst beantragen?",
        antwort: "Ja, vor dem Amtsgericht, bei dem das Mahnverfahren angesiedelt ist, besteht grundsätzlich kein Anwaltszwang (§ 79 Abs. 1 ZPO).",
      },
      {
        frage: "Ab wann lohnt sich die Beauftragung eher?",
        antwort: "Vor allem bei vielen gleichartigen Forderungen, wenig eigener Zeit oder Unsicherheit über die geltenden Fristen.",
      },
    ],
    handlungsaufforderung: "Wenn Ihnen die Zeit oder die Übersicht über die Fristen fehlt, übernimmt Nota Finance den gesamten Ablauf für Sie. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Wie lange dauert ein Inkassoverfahren?", href: "/ratgeber/dauer-inkassoverfahren" },
      { label: "Was ist ein Mahnbescheid?", href: "/ratgeber/was-ist-ein-mahnbescheid" },
      { label: "Woran erkennt man ein seriöses Inkassounternehmen?", href: "/ratgeber/serioeses-inkassounternehmen-erkennen" },
      { label: "Was kostet Inkasso?", href: "/ratgeber/was-kostet-inkasso" },
    ],
  },

  "inkasso-ohne-kundenbeziehung-zu-zerstoeren": {
    slug: "inkasso-ohne-kundenbeziehung-zu-zerstoeren",
    frage: "Inkasso beauftragen, ohne die Kundenbeziehung zu zerstören",
    metaDescription:
      "Ein Inkassodienstleister als neutraler Dritter, sachliche Pflichtangaben nach § 13a RDG und Ratenzahlung helfen, eine Geschäftsbeziehung trotz offener Rechnung zu erhalten.",
    direkteAntwort:
      "Ein Inkassodienstleister tritt als neutraler Dritter auf, sodass der Gläubiger die Zahlungsaufforderung nicht persönlich aussprechen muss. Gesetzlich vorgeschrieben ist dabei ein sachlicher Mindeststandard: Beim ersten Kontakt mit einem Verbraucher-Schuldner müssen umfangreiche Pflichtangaben gemacht werden, etwa zu Forderungsgrund und Kosten (§ 13a RDG), keine bloßen Drohungen. Zusätzlich lässt sich über Teilzahlungen eine für beide Seiten tragbare Lösung finden.",
    publishedAt: "2026-09-06",
    erklaerungUeberschrift: "Drei praktische Hebel",
    erklaerungText: [
      "Der erste Hebel ist die Rollentrennung: Reicht ein Gläubiger seine Forderung bei einem Inkassodienstleister ein, muss er die Zahlungsaufforderung nicht mehr selbst persönlich gegenüber seinem Kunden vertreten. Das trennt die laufende Geschäftsbeziehung von der reinen Zahlungsdurchsetzung.",
      "Der zweite Hebel ist der gesetzliche Mindeststandard der Kommunikation: Beim ersten Kontakt mit einem Verbraucher-Schuldner sind bestimmte Pflichtangaben vorgeschrieben, unter anderem zu Forderungsgrund, Vertragsgegenstand, Zinsberechnung und Inkassokosten (§ 13a RDG). Das schreibt eine sachliche, informative Ansprache vor, keine Drohkulisse.",
      "Der dritte Hebel ist Flexibilität bei der Zahlung: Auch bei Teilzahlungen bleibt die gesetzliche Anrechnungsreihenfolge nach § 367 BGB klar geregelt, sodass eine Ratenzahlung eine praktikable, nachvollziehbare Lösung für beide Seiten sein kann, statt sofort die vollständige Zahlung zu verlangen.",
    ],
    beispielUeberschrift: "Ein Beispiel",
    beispielText: [
      "Eine Agentur hat einen langjährigen Kunden, der eine Rechnung nicht bezahlt, möchte die Geschäftsbeziehung aber nicht durch eine eigene, hart formulierte Mahnung belasten. Sie reicht die Forderung bei Nota Finance ein. Der Kunde erhält eine sachliche, gesetzeskonforme Zahlungsaufforderung von einem neutralen Dritten und einigt sich auf eine Ratenzahlung. Die Agentur selbst bleibt aus der direkten Auseinandersetzung heraus.",
    ],
    tabelleUeberschrift: "Kernfakten im Überblick",
    tabelle: {
      kopfzeile: ["Hebel", "Wirkung", "Fundstelle"],
      zeilen: [
        ["Neutraler Dritter", "Gläubiger muss nicht persönlich mahnen", "praktische Rollentrennung"],
        ["Pflichtangaben beim ersten Kontakt", "sachliche statt drohende Kommunikation", "§ 13a RDG"],
        ["Ratenzahlung mit klarer Anrechnung", "praktikable Lösung statt Alles-oder-nichts", "§ 367 BGB"],
      ],
    },
    faqUeberschrift: "Häufige Fragen dazu",
    faq: [
      {
        frage: "Merkt mein Kunde, dass ich einen Inkassodienstleister beauftragt habe?",
        antwort: "Ja, das ergibt sich schon aus den gesetzlich vorgeschriebenen Pflichtangaben. Die Ansprache selbst bleibt aber sachlich und lösungsorientiert.",
      },
      {
        frage: "Muss ich eine Ratenzahlung anbieten?",
        antwort: "Nein, das ist keine gesetzliche Pflicht, aber ein gängiges Mittel, um eine Lösung zu finden, ohne auf die Forderung zu verzichten.",
      },
      {
        frage: "Ändert sich dadurch etwas an meinem Anspruch auf die volle Forderung?",
        antwort: "Nein, die Forderung bleibt bestehen. Nur die Art und Weise, wie und in welchem Tempo sie beglichen wird, kann flexibel gestaltet werden.",
      },
    ],
    handlungsaufforderung: "Nota Finance übernimmt die Kommunikation sachlich und lösungsorientiert, damit Ihre Geschäftsbeziehung geschont bleibt. Reichen Sie Ihre Forderung ein.",
    verwandteThemen: [
      { label: "Was passiert bei Teilzahlung?", href: "/ratgeber/teilzahlung-367-bgb" },
      { label: "Selbst mahnen oder Inkasso beauftragen?", href: "/ratgeber/selbst-mahnen-oder-inkasso-beauftragen" },
      { label: "Woran erkennt man ein seriöses Inkassounternehmen?", href: "/ratgeber/serioeses-inkassounternehmen-erkennen" },
      { label: "So funktioniert Nota Finance", href: "/produkt" },
    ],
  },
};
