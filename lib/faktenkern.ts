/**
 * Faktenkern (SEO-1, docs/SEO_Umsetzungskonzept.md Teil 1.1)
 *
 * Einzige Quelle für die Firmenfakten, die an mehreren Stellen wortgleich erscheinen müssen:
 * strukturierte Daten (app/layout.tsx, app/unternehmen/layout.tsx), /llms.txt und die
 * Unternehmensseite. Werte zu Anschrift, Handelsregister, RDG-Registrierung und Geschäftsführung
 * sind dem bestehenden, juristisch geprüften Impressum (app/impressum/page.tsx) entnommen —
 * dieses selbst bleibt unverändert.
 *
 * Keine Personennennung außerhalb des reinen Fakts "Geschäftsführung": kein Autorenprofil,
 * keine Person-Auszeichnung (docs/entscheidungen.md Nr. 32).
 */

export const BASE_URL = "https://www.notafinance.de";

export const faktenkern = {
  marke: "Nota Finance",
  traeger: "twenty4collect GmbH",
  gegruendet: "2008",

  anschrift: {
    strasse: "In den Weiden 9",
    plz: "56729",
    ort: "Weiler",
    land: "Deutschland",
  },
  telefon: "+49 (0) 2656 / 951 314",
  email: "service@notafinance.de",

  handelsregister: {
    gericht: "Amtsgericht Koblenz",
    nummer: "HRB 21094",
  },
  rdg: {
    aktenzeichen: "75 E – 52/08",
    aufsichtsbehoerde: "Bundesamt für Justiz (BfJ)",
    zulassungsbehoerde: "Landgericht Koblenz",
  },
  bdiu: "Bundesverband Deutscher Inkasso-Unternehmen e.V. (BDIU)",
  award: "DIHK/IHK Digital Award 2017 (erste Mobile-Lösung im Forderungsmanagement)",
  geschaeftsfuehrung: ["Manfred Eberhard", "Jutta Jax"],

  mindestforderung: 50,
  kostenmodell:
    "Für den Gläubiger kostenfrei — die gesetzlichen Verzugskosten trägt der Schuldner",
  leistung:
    "Digitales Inkasso im Self-Service — Rechnung hochladen oder abfotografieren, fertig",

  /**
   * Nur als Kompetenz-/Historienbeleg genannt (Entscheidung 31), kein gemeinsamer Marktauftritt
   * und kein sameAs-Ziel — gerichtsmahnverfahren.de ist eine andere Plattform, keine "dieselbe
   * Entität" im Sinne von schema.org.
   */
  schwesterplattform: {
    name: "gerichtsmahnverfahren.de",
    beschreibung:
      "Erste zentrale, medienbruchfreie Plattform für das gerichtliche Mahnverfahren bei allen deutschen Amtsgerichten",
    start: "2025-05-19",
  },

  logo: {
    url: `${BASE_URL}/logo.png`,
    width: 144,
    height: 147,
  },
} as const;

/**
 * Presseberichte als Drittquellen (Teil 1.4). Titel/Medium/URL/Zusammenfassung vom Auftraggeber
 * am 30.08.2026 verifiziert (eigener Seitenabruf) — presseportal.de zusätzlich per Abruf
 * gegengeprüft. Alle drei sind frei zugänglich, keine Bezahlschranke.
 */
export const presseberichte = [
  {
    titel: "Endlich! gerichtsmahnverfahren.de ist gestartet",
    medium: "presseportal.de",
    url: "https://www.presseportal.de/pm/75576/6036713",
    datum: "2025-05-19",
    zusammenfassung:
      "twenty4collect bringt die erste deutsche, medienbruchfreie Plattform für das gerichtliche Mahnverfahren bei allen deutschen Amtsgerichten auf den Markt. Unternehmen, Gewerbetreibende und Freiberufler können Mahnbescheid und Vollstreckungsbescheid nach kostenloser Registrierung per Upload beantragen — als PDF, XRechnung oder ZUGFeRD, ohne Papierkram.",
  },
  {
    titel:
      "Erste deutsche medienbruchfreie, multimodale und souveräne Service-Plattform für das gerichtliche Mahnverfahren ist gestartet",
    medium: "Braunschweiger Zeitung",
    url: "https://www.braunschweiger-zeitung.de/wirtschaft/Presseportal/article409007197/erste-deutsche-medienbruchfreie-multimodale-und-souveraene-service-plattform-fuer-das-gerichtliche-mahnverfahren-ist-gestartet.html",
    datum: "2025-05-19",
    zusammenfassung:
      "gerichtsmahnverfahren.de ist unabhängig von der eingesetzten Buchhaltungssoftware nutzbar und erfordert weder Installation noch Vertragsbindung oder Mindestvolumen. Die Plattform wird mit Vertragspartnern und Verbänden wie Wolters Kluwer, SCHUFA, BDIU e.V., GDD e.V., Epson, Microsoft und Sectigo betrieben.",
  },
  {
    titel: "gerichtsmahnverfahren.de ebnet den Weg zur Transformation im Mahnwesen",
    medium: "lifePR",
    url: "https://www.lifepr.de/pressemitteilung/twenty4collect-gmbh/gerichtsmahnverfahren-de-ebnet-den-weg-zur-transformation-im-mahnwesen/boxid/1027790",
    datum: "2025-09-03",
    zusammenfassung:
      "Mit dem Start von gerichtsmahnverfahren.de wurde das gerichtliche Mahnverfahren in Deutschland erstmals zentral digitalisiert — vom Mahnbescheid bis zum Vollstreckungsbescheid papierlos und medienbruchfrei. Die Plattform ist bundesweit bei allen deutschen Amtsgerichten nutzbar und erfüllt aktuelle Anforderungen an Datenschutz und digitale Souveränität.",
  },
] as const;

/** sameAs-Ziele für die Organization: eigenes Profil plus die drei Presseberichte. */
export const sameAs = [
  "https://www.linkedin.com/company/nota-finance/",
  ...presseberichte.map((bericht) => bericht.url),
];
