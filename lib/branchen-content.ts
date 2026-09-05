/**
 * Inhalte der 12 Branchenseiten (SEO-4, docs/SEO_Umsetzungskonzept.md Teil 5.2).
 *
 * Ablauf ("hochladen — prüfen — einziehen") und Kosten sind bewusst NICHT Teil dieses Objekts,
 * sondern fest in components/BranchenSeite.tsx bzw. lib/faktenkern.ts verankert — das sind
 * identische, wahre Fakten für jede Branche, keine austauschbaren Textbausteine. Was hier steht,
 * muss branchenspezifisch sein: Problem, Fallbeispiel mit Zahlen, FAQ mit Rechtsnachweis.
 *
 * Nur mit belegbaren Fakten füllen - keine erfundenen Statistiken (siehe Auftrag SEO-4).
 *
 * "twenty4collect" nie ohne "Nota Finance" im Fließtext nennen - wer nur diese eine Seite sieht,
 * kennt den Zusammenhang nicht. Dafür faktenkern.markeMitTraeger verwenden.
 */

import { faktenkern } from "@/lib/faktenkern";

export type BranchenFAQ = {
  frage: string;
  antwort: string;
};

export type BranchenContent = {
  /** URL-Segment: "handwerk" -> /inkasso-handwerk */
  slug: string;
  /** Für Breadcrumb und Übersicht, z. B. "Handwerk & Baugewerbe". */
  branchenname: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  direkteAntwort: string;
  problemUeberschrift: string;
  problemText: string;
  fallText: string;
  faqUeberschrift: string;
  faq: BranchenFAQ[];
  /** Optional: ersetzt den generischen CTA-Titel "Jetzt Forderung einreichen". */
  ctaTitel?: string;
};

export const branchenContent: Record<string, BranchenContent> = {
  handwerk: {
    slug: "handwerk",
    branchenname: "Handwerk & Baugewerbe",
    metaTitle: "Inkasso für Handwerk & Baugewerbe",
    metaDescription:
      "Offene Rechnungen für Material und Arbeitsstunden einziehen — digital eingereicht, für Sie kostenfrei. Nota Finance holt Ihr Geld ein.",
    h1: "Inkasso für Handwerk & Baugewerbe",
    direkteAntwort:
      "Nota Finance holt offene Rechnungen für Handwerksbetriebe ein — für Material und geleistete Arbeitsstunden, die Sie bereits vorfinanziert haben. Sie reichen die Rechnung ein, wir übernehmen die Mahnung und, falls nötig, das gerichtliche Verfahren.",
    problemUeberschrift: "Das typische Problem im Handwerk",
    problemText:
      "Sie erbringen handfeste Leistungen und treten dabei fast immer in Vorleistung: Material wird eingekauft, Arbeitsstunden geleistet, bevor die Rechnung bezahlt ist. Bleibt die Zahlung aus, ist nicht nur der Gewinn, sondern oft schon das eingesetzte Material gefährdet. Für Mahnwesen und Bürokram neben dem Tagesgeschäft fehlt meist die Zeit.",
    fallText:
      "Ein Elektrobetrieb stellt nach Abschluss einer Elektroinstallation eine Schlussrechnung über 4.200 € (Material und Arbeitszeit). Der Kunde zahlt trotz zweier eigener Erinnerungen nicht. Nach § 641 BGB ist die Vergütung mit der Abnahme des Werks fällig — der Betrieb reicht die unbezahlte Schlussrechnung bei Nota Finance ein. Bei Gewerbekunden tritt Verzug spätestens 30 Tage nach Fälligkeit und Rechnungszugang automatisch ein (§ 286 Abs. 3 BGB); bei Privatkunden nur, wenn die Rechnung ausdrücklich auf diese Folge hinweist.",
    faqUeberschrift: "Häufige Fragen aus dem Handwerk",
    faq: [
      {
        frage: "Für welche Handwerker- und Baugewerbegruppen ist Inkasso relevant?",
        antwort:
          "Für alle — offene Rechnungen sind branchenübergreifend ein Thema. Nota Finance holt Forderungen unter anderem für Maler, Gerüstbauer, Elektriker, Sanitär-, Heizungs- und Klimatechniker (SHK), Tischler, Garten- und Landschaftsbauer, Dachdecker, Fliesenleger und Kfz-Werkstätten ein.",
      },
      {
        frage: "Kann ich auch Abschlagsrechnungen einreichen, nicht nur die Schlussrechnung?",
        antwort:
          "Ja — nach § 632a BGB können Sie für in sich abgeschlossene Teile Ihrer Leistung Abschlagszahlungen verlangen; auch offene Abschläge sind einreichbar.",
      },
      {
        frage: "Ab wann ist mein Kunde im Verzug?",
        antwort:
          "Bei Gewerbekunden automatisch 30 Tage nach Fälligkeit und Rechnungszugang (§ 286 Abs. 3 BGB); bei Privatkunden nur mit entsprechendem Hinweis auf der Rechnung.",
      },
      {
        frage: "Was, wenn der Kunde die Werkleistung nicht offiziell abgenommen hat?",
        antwort:
          "Ohne Abnahme ist die Fälligkeit oft strittig — reichen Sie den Fall trotzdem ein, wir prüfen die Sachlage.",
      },
      {
        frage: "Was, wenn der Kunde wegen angeblicher Mängel nicht zahlt?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten inhaltlichen Auseinandersetzung — etwa einer konkreten Mängelrüge — handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung; die rechtliche Bewertung trifft dabei immer ein Mensch, nie ein automatisierter Prozess.",
      },
      {
        frage: "Kann ich vor Baubeginn eine Sicherheit für meine Vergütung verlangen?",
        antwort:
          "Ja — bei Bauverträgen können Sie vom Besteller nach § 650f BGB eine Sicherheit in Höhe von 10 % des voraussichtlichen Vergütungsanspruchs verlangen.",
      },
      {
        frage: "Verjährt meine Werklohnforderung irgendwann?",
        antwort:
          "Ja — regelmäßig nach drei Jahren (§ 195 BGB), die Frist beginnt mit dem Ende des Jahres, in dem die Forderung entstanden ist (§ 199 BGB).",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Rechnung einreichen",
  },

  freiberufler: {
    slug: "freiberufler",
    branchenname: "Freiberufler & Kreative",
    metaTitle: "Inkasso für Freiberufler & Kreative",
    metaDescription:
      "Offenes Honorar einziehen — für Grafikdesigner, Texter, Berater, IT-Spezialisten und weitere Freiberufler. Digital eingereicht, für Sie kostenfrei.",
    h1: "Inkasso für Freiberufler & Kreative",
    direkteAntwort:
      "Nota Finance holt offene Honorarforderungen für Freiberufler und Kreative ein — digital eingereicht, ohne Ihre Kundenbeziehung mit einer eigenen Mahnung zu belasten. Sie reichen die Rechnung ein, wir übernehmen den Rest.",
    problemUeberschrift: "Das typische Problem bei Freiberuflern",
    problemText:
      "Sie leisten oft projektbasierte, persönlich erbrachte Arbeit — und stehen dabei in einem direkten, häufig langjährigen Verhältnis zu Ihren Kunden. Genau das macht das eigene Mahnen unangenehm: Wer mahnt, riskiert den nächsten Auftrag. Gleichzeitig fehlt neben der eigentlichen Arbeit oft die Zeit für Bürokratie.",
    fallText:
      "Ein Grafikdesigner stellt nach Abschluss eines Projekts eine Rechnung über 1.850 €. Der Kunde, ein Gewerbetreibender, zahlt nicht. Er gerät automatisch in Verzug, wenn er nicht innerhalb von 30 Tagen nach Fälligkeit und Zugang der Rechnung zahlt (§ 286 Abs. 3 BGB) — bei einem privaten Auftraggeber gilt das nur, wenn die Rechnung ausdrücklich auf diese Folge hinweist.",
    faqUeberschrift: "Häufige Fragen von Freiberuflern",
    faq: [
      {
        frage: "Für welche Freiberufler-Gruppen ist Inkasso relevant?",
        antwort:
          "Für alle projektbasiert arbeitenden Freiberufler — unter anderem Grafik- und Webdesigner, Texter, Berater, IT-Spezialisten, Fotografen und Musiker.",
      },
      {
        frage: "Verjährt meine Honorarforderung irgendwann?",
        antwort:
          "Ja — regelmäßig nach drei Jahren (§ 195 BGB). Die Frist beginnt mit dem Ende des Jahres, in dem die Forderung entstanden ist (§ 199 BGB).",
      },
      {
        frage: "Was, wenn der Kunde mit der Qualität der Arbeit nicht einverstanden ist?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer inhaltlichen Auseinandersetzung über die Leistung handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Lohnt sich die Einreichung auch bei kleineren Honoraren?",
        antwort: `Ja — einreichbar ab ${faktenkern.mindestforderung} € Forderungshöhe.`,
      },
      {
        frage: "Brauche ich einen schriftlichen Vertrag, um die Forderung einzureichen?",
        antwort:
          "Nein — ein Dienst- oder Werkvertrag kommt auch formfrei durch Auftrag und Ausführung zustande. Als Nachweis genügen die Rechnung und die Kommunikation mit dem Kunden (z. B. Auftragsbestätigung per E-Mail).",
      },
      {
        frage: "Kann ich mehrere offene Rechnungen desselben Kunden gemeinsam einreichen?",
        antwort:
          "Ja — mehrere Forderungen gegen denselben Schuldner werden als ein Fall bearbeitet, Sie müssen nicht für jede Rechnung einzeln einreichen.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Honorar einreichen",
  },

  gesundheitswesen: {
    slug: "gesundheitswesen",
    branchenname: "Gesundheitswesen & Heilberufe",
    metaTitle: "Inkasso für Gesundheitswesen & Heilberufe",
    metaDescription:
      "Offene Privatrechnungen diskret einziehen — für Ärzte, Zahnärzte, Therapeuten und Pflegedienste. Für Sie kostenfrei, vertraulich behandelt.",
    h1: "Inkasso für Gesundheitswesen & Heilberufe",
    direkteAntwort:
      "Nota Finance holt offene Privatrechnungen für Praxen und Gesundheitsberufe ein — diskret und mit Fokus auf die reine Rechnungsforderung, nicht auf medizinische Inhalte. Sie reichen die Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem im Gesundheitswesen",
    problemText:
      "Offene Rechnungen bei Privatleistungen oder Selbstzahlern erfordern ein besonders sensibles Vorgehen — das Vertrauensverhältnis zum Patienten darf nicht beschädigt werden. Gleichzeitig soll das Praxisteam durch das Mahnwesen möglichst wenig zusätzlich belastet werden.",
    fallText:
      "Eine Zahnarztpraxis stellt einem Selbstzahler eine Rechnung über 780 € für eine private Zusatzleistung nach GOZ. Der Patient zahlt trotz Erinnerung nicht. Die Vergütung wird bei privatärztlichen und -zahnärztlichen Leistungen grundsätzlich mit Zugang einer den Vorgaben der Gebührenordnung entsprechenden Rechnung fällig.",
    faqUeberschrift: "Häufige Fragen aus dem Gesundheitswesen",
    faq: [
      {
        frage: "Für welche Gruppen im Gesundheitswesen ist Inkasso relevant?",
        antwort:
          "Für alle, die privat liquidieren — unter anderem Ärzte, Zahnärzte, Therapeuten (etwa Physio-, Ergo- oder Logopädie), Heilpraktiker, Pflegedienste und Tierärzte.",
      },
      {
        frage: "Wie geht Nota Finance mit den übermittelten Patientendaten um?",
        antwort:
          "Vertraulich und nach den Vorgaben der DSGVO — übermittelt werden nur die für die Forderungseinziehung nötigen Rechnungsdaten.",
      },
      {
        frage: "Ab wann ist eine private Liquidation fällig?",
        antwort:
          "Grundsätzlich mit Zugang einer ordnungsgemäßen, den Vorgaben der GOÄ beziehungsweise GOZ entsprechenden Rechnung.",
      },
      {
        frage: "Verjährt die Forderung irgendwann?",
        antwort: "Ja — regelmäßig nach drei Jahren (§ 195 BGB).",
      },
      {
        frage: "Sind auch Rechnungen für individuelle Gesundheitsleistungen (IGeL) einreichbar?",
        antwort:
          "Ja — IGeL-Leistungen werden dem Patienten unabhängig vom Versicherungsstatus privat in Rechnung gestellt und sind wie jede andere Privatrechnung einreichbar.",
      },
      {
        frage: "Was, wenn der Patient die Rechnung wegen einer vermeintlich fehlerhaften Behandlung nicht zahlt?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten Auseinandersetzung über die Behandlung handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Privatrechnung einreichen",
  },

  agenturen: {
    slug: "agenturen",
    branchenname: "Agenturen & Dienstleister",
    metaTitle: "Inkasso für Agenturen & Dienstleister",
    metaDescription:
      "Offene Projekt- und Retainer-Rechnungen einziehen — für Marketing-, Werbe- und PR-Agenturen. Professionell, ohne Reputationsrisiko, für Sie kostenfrei.",
    h1: "Inkasso für Agenturen & Dienstleister",
    direkteAntwort:
      "Nota Finance holt offene Projekt- und Retainer-Rechnungen für Agenturen und Dienstleister ein — professionell kommuniziert, damit Ihr Ruf bei anderen Kunden keinen Schaden nimmt. Sie reichen die Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem bei Agenturen",
    problemText:
      "Sie arbeiten oft projektbasiert und treten dabei in Vorleistung, bevor die Rechnung beglichen ist. Ein professionelles Auftreten — auch im Mahnwesen — ist für Ihre Reputation entscheidend, kostet intern aber Zeit, die im Tagesgeschäft fehlt.",
    fallText:
      "Eine Marketingagentur stellt für einen abgeschlossenen Kampagnenmonat eine Retainer-Rechnung über 6.500 €. Der Kunde, ein Gewerbetreibender, zahlt trotz Erinnerung nicht. Er gerät automatisch in Verzug, wenn er nicht innerhalb von 30 Tagen nach Fälligkeit und Rechnungszugang zahlt (§ 286 Abs. 3 BGB).",
    faqUeberschrift: "Häufige Fragen von Agenturen",
    faq: [
      {
        frage: "Für welche Agentur- und Dienstleistungsgruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für Marketingagenturen, Werbeagenturen, PR-Agenturen, Eventagenturen und Unternehmensberatungen.",
      },
      {
        frage: "Ab wann ist mein Kunde im Verzug?",
        antwort:
          "Bei Gewerbekunden automatisch 30 Tage nach Fälligkeit und Rechnungszugang (§ 286 Abs. 3 BGB); bei Privatkunden nur mit entsprechendem Hinweis auf der Rechnung.",
      },
      {
        frage: "Was, wenn der Kunde den Leistungsumfang bestreitet?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten Auseinandersetzung über den Leistungsumfang handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Kann ich auch einzelne offene Retainer-Monate einreichen?",
        antwort:
          "Ja — jede fällige, unbestrittene Rechnung ist einreichbar, nicht nur der Gesamtvertrag.",
      },
      {
        frage: "Was, wenn der Kunde das Projekt vorzeitig kündigt, ohne die bisherige Leistung zu bezahlen?",
        antwort:
          "Bei einer freien Kündigung des Bestellers vor Fertigstellung bleibt der Vergütungsanspruch für die bereits erbrachte Leistung grundsätzlich bestehen (§ 648 BGB) — abzüglich ersparter Aufwendungen.",
      },
      {
        frage: "Kann ich auch eine Anzahlungs- oder Kick-off-Rechnung einreichen?",
        antwort:
          "Ja — jede fällige, unbestrittene Rechnung ist einreichbar, unabhängig vom Zeitpunkt im Projektverlauf.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Rechnung einreichen",
  },

  handel: {
    slug: "handel",
    branchenname: "Handel & E-Commerce",
    metaTitle: "Inkasso für Handel & E-Commerce",
    metaDescription:
      "Offene Rechnungen aus dem Kauf-auf-Rechnung-Geschäft einziehen — für Online-Shops und Händler. Für Sie kostenfrei, Marge sichern statt abschreiben.",
    h1: "Inkasso für Handel & E-Commerce",
    direkteAntwort:
      "Nota Finance holt offene Rechnungen aus dem Kauf-auf-Rechnung-Geschäft ein — für Online-Shops, Einzel- und Großhändler. Sie reichen die offene Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem im Handel",
    problemText:
      "Der Kauf auf Rechnung ist ein wichtiger Service für Ihre Kunden, birgt aber ein Ausfallrisiko: Jede unbezahlte Rechnung schmälert direkt Ihre Marge. Ein eigenes Mahnwesen soll dabei möglichst wenig interne Ressourcen binden.",
    fallText:
      "Ein Online-Shop verkauft Ware im Wert von 320 € auf Rechnung an einen Verbraucher. Trotz eines Hinweises auf der Rechnung auf die Verzugsfolgen zahlt der Kunde nach 30 Tagen nicht — er gerät damit automatisch in Verzug (§ 286 Abs. 3 BGB); es fallen Verzugszinsen in Höhe von 5 Prozentpunkten über dem Basiszinssatz an (§ 288 Abs. 1 BGB).",
    faqUeberschrift: "Häufige Fragen aus Handel & E-Commerce",
    faq: [
      {
        frage: "Für welche Handels-Gruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für Online-Shops mit Kauf auf Rechnung, Einzelhändler mit Rechnungsgeschäft, Großhändler (B2B und B2C) sowie Manufakturen.",
      },
      {
        frage: "Wie hoch sind die gesetzlichen Verzugszinsen?",
        antwort:
          "Gegenüber Verbrauchern 5 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 1 BGB), gegenüber Unternehmern 9 Prozentpunkte über dem Basiszinssatz (§ 288 Abs. 2 BGB).",
      },
      {
        frage: "Was, wenn der Kunde die Ware reklamiert?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten Reklamation handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Verjährt die Forderung irgendwann?",
        antwort: "Ja — regelmäßig nach drei Jahren (§ 195 BGB).",
      },
      {
        frage: "Kann ich eine Forderung einreichen, während die Widerrufsfrist des Kunden noch läuft?",
        antwort:
          "Bei Verbrauchern besteht bei Fernabsatzverträgen ein 14-tägiges Widerrufsrecht (§ 355 Abs. 2 BGB) — vor Fristablauf ist die Forderung nicht zweifelsfrei durchsetzbar.",
      },
      {
        frage: "Kann ich viele kleine offene Rechnungen gesammelt einreichen?",
        antwort: `Ja — ab ${faktenkern.mindestforderung} € je Forderung, auch mehrere gleichzeitig.`,
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt offene Rechnung einreichen",
  },

  gastronomie: {
    slug: "gastronomie",
    branchenname: "Hotels & Gastronomie",
    metaTitle: "Inkasso für Hotels & Gastronomie",
    metaDescription:
      "Offene Firmenkunden-Rechnungen einziehen — für Hotels, Pensionen und Caterer. Digital eingereicht, für Sie kostenfrei.",
    h1: "Inkasso für Hotels & Gastronomie",
    direkteAntwort:
      "Nota Finance holt offene Rechnungen für Hotels, Pensionen und Caterer ein — vor allem bei Firmenkunden, die trotz erbrachter Leistung nicht zahlen. Sie reichen die Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem in Hotellerie & Gastronomie",
    problemText:
      "Offene Rechnungen von Firmenkunden nach Tagungen, Veranstaltungen oder längeren Aufenthalten belasten das Ergebnis. Das Tagesgeschäft ist oft hektisch und lässt wenig Raum für ein eigenes, zeitaufwendiges Mahnwesen.",
    fallText:
      "Ein Hotel stellt einem Firmenkunden nach einer Tagungsveranstaltung eine Rechnung über 3.100 € (Zimmer, Verpflegung, Tagungsraum). Der Kunde zahlt trotz Erinnerung nicht. Als Gewerbekunde gerät er automatisch 30 Tage nach Fälligkeit und Rechnungszugang in Verzug (§ 286 Abs. 3 BGB).",
    faqUeberschrift: "Häufige Fragen aus Hotellerie & Gastronomie",
    faq: [
      {
        frage: "Für welche Gruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für Hotels, Hotelketten, Pensionen, Ferienwohnungsanbieter und Caterer.",
      },
      {
        frage: "Kann ich auch vertraglich vereinbarte Stornogebühren einreichen?",
        antwort:
          "Ja — sofern die Gebühr vertraglich vereinbart, fällig und unbestritten ist.",
      },
      {
        frage: "Ab wann ist mein Firmenkunde im Verzug?",
        antwort:
          "Automatisch 30 Tage nach Fälligkeit und Rechnungszugang (§ 286 Abs. 3 BGB).",
      },
      {
        frage: "Verjährt die Forderung irgendwann?",
        antwort: "Ja — regelmäßig nach drei Jahren (§ 195 BGB).",
      },
      {
        frage: "Was, wenn der Gast die Rechnung wegen angeblicher Mängel (z. B. Qualität) nicht zahlt?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten Beanstandung handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Lohnt sich die Einreichung auch bei kleineren Restaurantrechnungen?",
        antwort: `Ja — einreichbar ab ${faktenkern.mindestforderung} € Forderungshöhe.`,
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Rechnung einreichen",
  },

  it: {
    slug: "it",
    branchenname: "IT & Software-Services",
    metaTitle: "Inkasso für IT & Software-Services",
    metaDescription:
      "Offene Meilenstein-, Wartungs- und Lizenzrechnungen einziehen — für IT-Systemhäuser und Softwarefirmen. Für Sie kostenfrei.",
    h1: "Inkasso für IT & Software-Services",
    direkteAntwort:
      "Nota Finance holt offene Meilenstein-, Wartungs- und Lizenzrechnungen für IT-Unternehmen ein. Sie reichen die Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem in der IT-Branche",
    problemText:
      "Lange Projektlaufzeiten mit Meilensteinzahlungen, unbezahlte Wartungsverträge oder Lizenzgebühren sind an der Tagesordnung. Diskussionen über den Leistungsumfang verzögern Zahlungen zusätzlich, während Ihr Team längst am nächsten Projekt arbeitet.",
    fallText:
      "Ein IT-Systemhaus stellt nach Fertigstellung eine Meilensteinrechnung über 12.000 €. Der Kunde verzögert die Abnahme, zahlt aber auch nach Fälligkeit nicht. Nach § 640 Abs. 2 BGB gilt ein Werk auch dann als abgenommen, wenn der Besteller es nicht innerhalb einer ihm gesetzten angemessenen Frist unter Angabe mindestens eines Mangels ablehnt.",
    faqUeberschrift: "Häufige Fragen aus der IT-Branche",
    faq: [
      {
        frage: "Für welche IT-Gruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für IT-Systemhäuser, Softwareentwicklungsfirmen (SaaS), Managed Service Provider und IT-Beratungsunternehmen.",
      },
      {
        frage: "Was, wenn der Kunde die Abnahme verweigert oder hinauszögert?",
        antwort:
          "Nach § 640 Abs. 2 BGB gilt ein Werk auch als abgenommen, wenn der Besteller es nicht innerhalb einer angemessenen, gesetzten Frist unter Angabe mindestens eines konkreten Mangels ablehnt.",
      },
      {
        frage: "Sind auch laufende Wartungs- oder Lizenzgebühren einreichbar?",
        antwort: "Ja — jede fällige, unbestrittene Rechnung, nicht nur einmalige Projekte.",
      },
      {
        frage: "Was, wenn der Kunde einen Mangel behauptet?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten Mängeldiskussion handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Was, wenn der Kunde das Softwareprojekt vorzeitig beendet, ohne die bisherige Leistung zu bezahlen?",
        antwort:
          "Bei freier Kündigung des Bestellers vor Fertigstellung eines Werkvertrags bleibt der Vergütungsanspruch für die bereits erbrachte Leistung bestehen (§ 648 BGB), abzüglich ersparter Aufwendungen.",
      },
      {
        frage: "Ist eine SaaS-Lizenzgebühr rechtlich dasselbe wie eine Werklohnforderung?",
        antwort:
          "Nein — SaaS- und Lizenzverträge sind meist Dauerschuldverhältnisse mit laufender Fälligkeit, keine einmalige Werkleistung. Unabhängig davon ist jede fällige, unbestrittene Rechnung einreichbar.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Rechnung einreichen",
  },

  maschinenbau: {
    slug: "maschinenbau",
    branchenname: "Maschinenbau & Industrie",
    metaTitle: "Inkasso für Maschinenbau & Industrie",
    metaDescription:
      "Hohe B2B-Forderungen konsequent durchsetzen — für Maschinenbauunternehmen und Zulieferbetriebe. Für Sie kostenfrei.",
    h1: "Inkasso für Maschinenbau & Industrie",
    direkteAntwort:
      "Nota Finance setzt offene B2B-Forderungen für Maschinenbauunternehmen und Zulieferbetriebe durch — auch bei hohen Auftragswerten und komplexen Fällen. Sie reichen die Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem im Maschinenbau",
    problemText:
      "Hohe Auftragswerte und lange, oft individuell vereinbarte Zahlungsziele prägen das Geschäft. Ein Forderungsausfall kann hier besonders schmerzhaft sein — und die Bonität des Geschäftspartners spielt eine größere Rolle als in vielen anderen Branchen.",
    fallText:
      "Ein Zulieferbetrieb liefert Bauteile im Wert von 28.000 € an einen Industriekunden, vereinbartes Zahlungsziel 45 Tage. Der Kunde zahlt auch danach nicht. Vereinbarte Zahlungsfristen zwischen Unternehmern dürfen nach § 271a BGB grundsätzlich 60 Tage nicht überschreiten; bei Zahlungsverzug fallen Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz an (§ 288 Abs. 2 BGB).",
    faqUeberschrift: "Häufige Fragen aus Maschinenbau & Industrie",
    faq: [
      {
        frage: "Für welche Gruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für Maschinenbauunternehmen, Zulieferbetriebe, Ingenieurbüros und Industriedienstleister.",
      },
      {
        frage: "Wie lang dürfen Zahlungsfristen zwischen Unternehmern sein?",
        antwort:
          "Nach § 271a BGB grundsätzlich höchstens 60 Tage, sofern nichts ausdrücklich anderes vereinbart und dies für den Gläubiger nicht grob unbillig ist.",
      },
      {
        frage: "Wie hoch sind die Verzugszinsen zwischen Unternehmern?",
        antwort: "9 Prozentpunkte über dem jeweiligen Basiszinssatz (§ 288 Abs. 2 BGB).",
      },
      {
        frage: "Übernehmen Sie auch komplexe, hochwertige B2B-Fälle?",
        antwort:
          "Ja — bei Bedarf begleiten wir vom außergerichtlichen bis zum gerichtlichen Mahnverfahren, in enger Abstimmung mit Ihnen.",
      },
      {
        frage: "Sind auch Abschlagsrechnungen bei langen Fertigungsprojekten einreichbar?",
        antwort:
          "Ja — wie bei jedem Werkvertrag können Sie nach § 632a BGB für abgeschlossene Teilleistungen Abschlagszahlungen verlangen; auch offene Abschläge sind einreichbar.",
      },
      {
        frage: "Ist eine gesonderte Sicherheit als Nachweis für die Forderung nötig?",
        antwort:
          "Nein — für die Einreichung genügt die fällige, unbestrittene Rechnung; eine gesonderte Sicherheit ist nicht erforderlich.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Rechnung einreichen",
  },

  vermieter: {
    slug: "vermieter",
    branchenname: "Private Vermieter",
    metaTitle: "Inkasso für private Vermieter",
    metaDescription:
      "Offene Miet- und Nebenkostenforderungen einziehen — für private Vermieter. Digital eingereicht, für Sie kostenfrei.",
    h1: "Inkasso für private Vermieter",
    direkteAntwort:
      "Nota Finance holt offene Miet- und Nebenkostenforderungen für private Vermieter ein — digital eingereicht, ohne Vorkosten. Sie laden die Unterlagen hoch, wir übernehmen das außergerichtliche und bei Bedarf das gerichtliche Mahnverfahren.",
    problemUeberschrift: "Das typische Problem bei privaten Vermietern",
    problemText:
      "Ein Mieter zahlt nicht — und die Mietrendite ist sofort in Gefahr. Anders als bei einem gewerblichen Vermieter gibt es meist keine eigene Verwaltung, die sich um Mahnungen kümmert: Das übernehmen private Vermieter neben Beruf und Alltag selbst. Viele scheuen zudem die direkte Auseinandersetzung, weil das Mietverhältnis oft weiterläuft.",
    fallText:
      "Ein Mieter zahlt zwei Monatsmieten von je 850 € nicht — macht zusammen 1.700 € Rückstand. Nach zwei erfolglosen eigenen Mahnungen reicht der Vermieter den Fall bei Nota Finance ein. Bleibt der Mieter zahlungsunfähig oder -unwillig, kann der Vermieter zusätzlich kündigen: Nach § 543 Abs. 2 Nr. 3 BGB ist eine fristlose Kündigung möglich, sobald der Rückstand zwei Monatsmieten erreicht.",
    faqUeberschrift: "Häufige Fragen von privaten Vermietern",
    faq: [
      {
        frage: "Ab wann darf ich wegen Mietrückstand kündigen?",
        antwort:
          "Nach § 543 Abs. 2 Nr. 3 BGB regelmäßig, sobald der Mieter mit einem Betrag in Höhe von zwei Monatsmieten in Verzug ist.",
      },
      {
        frage: "Was, wenn der Mieter bereits ausgezogen ist?",
        antwort:
          "Wir verfolgen die Forderung weiter, solange sie nicht verjährt ist — die regelmäßige Verjährungsfrist beträgt drei Jahre (§ 195 BGB).",
      },
      {
        frage: "Kann ich auch Nebenkostennachzahlungen einreichen?",
        antwort:
          "Ja — jede fällige, unbestrittene Forderung aus dem Mietverhältnis, nicht nur rückständige Miete.",
      },
      {
        frage: "Ab wann genau ist die Miete fällig?",
        antwort:
          "Sofern nichts anderes vereinbart ist, spätestens am dritten Werktag des Monats (§ 556b Abs. 1 BGB).",
      },
      {
        frage: "Muss ich den Mieter erst mahnen, bevor Verzug eintritt?",
        antwort:
          "Nicht zwingend — ist die Miete kalendermäßig zu einem festen Termin fällig, tritt Verzug bei Nichtzahlung auch ohne vorherige Mahnung ein (§ 286 Abs. 2 Nr. 1 BGB).",
      },
      {
        frage: "Muss ich zuerst die Kaution verrechnen, bevor ich eine Forderung einreiche?",
        antwort:
          "Nein — die Kaution dient regelmäßig als Sicherheit für das Ende des Mietverhältnisses; sie muss nicht vor Einreichung eines laufenden Rückstands verrechnet werden.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Mietforderung einreichen",
  },

  hausverwaltung: {
    slug: "hausverwaltung",
    branchenname: "Hausverwaltungen",
    metaTitle: "Inkasso für Hausverwaltungen",
    metaDescription:
      "Offenes Hausgeld und Mietnebenkosten einziehen — für WEG- und Mietverwaltungen. Mahnwesen auslagern, Personal entlasten.",
    h1: "Inkasso für Hausverwaltungen",
    direkteAntwort:
      "Nota Finance holt offenes Hausgeld und offene Mietnebenkosten für Hausverwaltungen ein — Sie reichen die Forderung ein, wir übernehmen das Mahnwesen und entlasten Ihr Team.",
    problemUeberschrift: "Das typische Problem bei Hausverwaltungen",
    problemText:
      "Laufende Hausgeld- und Betriebskostenforderungen binden bei mehreren säumigen Eigentümern oder Mietern schnell spürbar Personalkapazität. Ein ausgelagertes, digitales Mahnwesen schafft Zeit für die eigentliche Verwaltungsarbeit.",
    fallText:
      "Eine Hausverwaltung verwaltet eine Wohnungseigentümergemeinschaft. Ein Eigentümer zahlt das laut Wirtschaftsplan beschlossene Hausgeld von monatlich 280 € seit vier Monaten nicht — macht 1.120 € Rückstand. Seit der WEG-Reform 2020 ist die Gemeinschaft der Wohnungseigentümer selbst rechtsfähig und Trägerin des Hausgeldanspruchs (§ 9a WEG); die Verwaltung reicht die Forderung in ihrem Namen bei Nota Finance ein.",
    faqUeberschrift: "Häufige Fragen von Hausverwaltungen",
    faq: [
      {
        frage: "Wer ist bei Hausgeldrückständen eigentlich Gläubiger — die Gemeinschaft oder die Verwaltung?",
        antwort:
          "Die Gemeinschaft der Wohnungseigentümer ist seit der WEG-Reform 2020 selbst rechtsfähig und Gläubigerin des Hausgeldanspruchs (§ 9a WEG); die Verwaltung reicht die Forderung in deren Namen ein.",
      },
      {
        frage: "Braucht die Verwaltung eine gesonderte Vollmacht, um Mietnebenkosten für einen vermietenden Eigentümer einzuziehen?",
        antwort:
          "Ja — dafür muss die Verwaltung gesondert bevollmächtigt sein. Das Hausgeld gegenüber der Gemeinschaft selbst ergibt sich dagegen bereits aus deren eigenem Beschluss.",
      },
      {
        frage: "Verjährt die Forderung irgendwann?",
        antwort: "Ja — regelmäßig nach drei Jahren (§ 195 BGB).",
      },
      {
        frage: "Wie wird die Höhe des Hausgelds rechtlich festgelegt?",
        antwort:
          "Durch Beschluss der Eigentümerversammlung über den Wirtschaftsplan (§ 28 Abs. 1 WEG); der beschlossene Betrag ist für jeden Eigentümer verbindlich fällig.",
      },
      {
        frage: "Können auch beschlossene Sonderumlagen eingereicht werden, nicht nur laufendes Hausgeld?",
        antwort:
          "Ja — eine durch Beschluss der Eigentümerversammlung fällig gestellte Sonderumlage ist wie das laufende Hausgeld einreichbar.",
      },
      {
        frage: "Muss jeder einzelne Eigentümer einem Inkassoverfahren zustimmen?",
        antwort:
          "Nein — die rechtsfähige Gemeinschaft der Wohnungseigentümer handelt im eigenen Namen, vertreten durch die Verwaltung (§ 9a i. V. m. § 27 WEG).",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Hausgeldforderung einreichen",
  },

  fitnessstudio: {
    slug: "fitnessstudio",
    branchenname: "Fitness, Abo & Mitgliedschaften",
    metaTitle: "Inkasso für Fitnessstudios & Vereine",
    metaDescription:
      "Offene Mitgliedsbeiträge einziehen — für Fitnessstudios, Vereine und Abo-Anbieter. Viele Kleinforderungen automatisiert einziehen.",
    h1: "Inkasso für Fitnessstudios & Vereine",
    direkteAntwort:
      "Nota Finance holt offene Mitgliedsbeiträge für Fitnessstudios, Vereine und Abo-Anbieter ein — auch viele kleinere Forderungen auf einmal. Sie reichen die offenen Beiträge ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem bei Mitgliedschaften",
    problemText:
      "Einzelne Beitragsausfälle wirken klein, summieren sich bei vielen Mitgliedern aber schnell zu einem echten Ausfallrisiko. Der Aufwand, jeden einzelnen Rückstand selbst zu mahnen, steht dabei oft in keinem Verhältnis zur Höhe der einzelnen Forderung.",
    fallText:
      "Ein Fitnessstudio hat mit einem Mitglied einen Vertrag mit 12 Monaten Erstlaufzeit. Der monatliche Beitrag von 39,90 € bleibt seit drei Monaten unbezahlt — macht 119,70 € Rückstand, obwohl der Vertrag weiterläuft. Nach den seit dem 1. März 2022 geltenden Regeln für Verbraucherverträge über wiederkehrende Leistungen (§ 309 Nr. 9 BGB) darf die Erstlaufzeit höchstens 24 Monate betragen; die Zahlungspflicht besteht für die gesamte vereinbarte Laufzeit fort, solange nicht wirksam gekündigt wurde.",
    faqUeberschrift: "Häufige Fragen von Fitnessstudios & Vereinen",
    faq: [
      {
        frage: "Für welche Gruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für Fitnessstudios, Sportvereine und andere Anbieter mit wiederkehrenden Mitgliedsbeiträgen.",
      },
      {
        frage: "Wie lang dürfen Mitgliedsverträge mit Verbrauchern laufen?",
        antwort:
          "Seit der Reform zum 1. März 2022 beträgt die zulässige Erstlaufzeit bei Verbraucherverträgen über wiederkehrende Leistungen höchstens 24 Monate (§ 309 Nr. 9 BGB).",
      },
      {
        frage: "Kann ich viele kleine Beitragsrückstände auf einmal einreichen?",
        antwort: `Ja — jede einzelne Forderung ab ${faktenkern.mindestforderung} € ist einreichbar, auch mehrere gleichzeitig.`,
      },
      {
        frage: "Was, wenn das Mitglied behauptet, bereits gekündigt zu haben?",
        antwort:
          "Ist die Forderung unbestritten, übernehmen wir das Mahnverfahren wie gewohnt. Bei einer echten Auseinandersetzung über die Kündigung handelt es sich um ein streitiges Verfahren mit anwaltlicher Einzelfallprüfung.",
      },
      {
        frage: "Kann das Mitglied per E-Mail kündigen, oder ist eine Unterschrift per Post nötig?",
        antwort:
          "Für Kündigungen von Verbraucherverträgen darf höchstens Textform verlangt werden (§ 309 Nr. 13 BGB) — eine E-Mail genügt grundsätzlich, eine eigenhändige Unterschrift oder Brief darf nicht vorausgesetzt werden.",
      },
      {
        frage: "Entfällt die Zahlungspflicht bei einer Pause wegen Krankheit oder Schwangerschaft?",
        antwort:
          "Eine vertraglich vereinbarte Pausierungsregelung geht vor; ohne eine solche Vereinbarung bleibt die Zahlungspflicht grundsätzlich bestehen.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Beitragsrückstand einreichen",
  },

  bildung: {
    slug: "bildung",
    branchenname: "Bildung & Freizeit",
    metaTitle: "Inkasso für Bildung & Freizeit",
    metaDescription:
      "Offene Kurs- und Beitragsforderungen einziehen — für Musikschulen, Nachhilfeinstitute und Freizeitanbieter. Auch kleine Beträge lohnen sich.",
    h1: "Inkasso für Bildung & Freizeit",
    direkteAntwort:
      "Nota Finance holt offene Kurs- und Beitragsforderungen für Bildungs- und Freizeitanbieter ein — auch kleinere Beträge, die sich sonst kaum wirtschaftlich einfordern lassen. Sie reichen die Rechnung ein, wir übernehmen die Mahnung.",
    problemUeberschrift: "Das typische Problem bei Bildungs- und Freizeitanbietern",
    problemText:
      "Kurs- und Mitgliedsbeiträge sind oft vergleichsweise klein — der Aufwand für ein eigenes Mahnwesen lohnt sich bei einzelnen Rückständen kaum. In der Summe über viele Teilnehmer hinweg sind die Ausfälle trotzdem spürbar.",
    fallText:
      "Eine Musikschule stellt für ein Schulhalbjahr Kursgebühren über 240 € in Rechnung. Der Erziehungsberechtigte zahlt trotz Erinnerung nicht. Vertragspartner und damit Schuldner ist dabei der volljährige Erziehungsberechtigte, der den Vertrag unterschrieben hat — nicht das minderjährige Kind, das mangels voller Geschäftsfähigkeit selbst keinen wirksamen Vertrag schließen kann (§§ 106 ff. BGB).",
    faqUeberschrift: "Häufige Fragen aus Bildung & Freizeit",
    faq: [
      {
        frage: "Für welche Gruppen ist Inkasso relevant?",
        antwort:
          "Unter anderem für Musikschulen, Nachhilfeinstitute, Volkshochschulen und Sportvereine mit Kurs- oder Mitgliedsbeiträgen.",
      },
      {
        frage: "Wer haftet, wenn der Vertrag für ein minderjähriges Kind geschlossen wurde?",
        antwort:
          "Der volljährige Erziehungsberechtigte, der den Vertrag unterschrieben hat — Minderjährige können mangels voller Geschäftsfähigkeit selbst keinen wirksamen Vertrag schließen (§§ 106 ff. BGB).",
      },
      {
        frage: "Lohnt sich die Einreichung auch bei kleineren Kursgebühren?",
        antwort: `Ja — einreichbar ab ${faktenkern.mindestforderung} € Forderungshöhe.`,
      },
      {
        frage: "Verjährt die Forderung irgendwann?",
        antwort: "Ja — regelmäßig nach drei Jahren (§ 195 BGB).",
      },
      {
        frage: "Gilt für eine online oder telefonisch gebuchte Kursanmeldung ein Widerrufsrecht?",
        antwort:
          "Bei Vertragsschluss im Fernabsatz besteht für Verbraucher grundsätzlich ein 14-tägiges Widerrufsrecht (§ 355 Abs. 2 BGB).",
      },
      {
        frage: "Kann ich mehrere rückständige Monatsraten gesammelt einreichen?",
        antwort:
          "Ja — jede einzelne fällige, unbestrittene Rate ist einreichbar, auch mehrere gemeinsam.",
      },
      {
        frage: "Muss ich einen Anwalt einschalten?",
        antwort: `Nein — ${faktenkern.markeMitTraeger} ist als Inkassodienstleister nach § 10 Abs. 1 Nr. 1 RDG zur außergerichtlichen und gerichtlichen Forderungseinziehung zugelassen.`,
      },
    ],
    ctaTitel: "Jetzt Kursgebühr einreichen",
  },
};
