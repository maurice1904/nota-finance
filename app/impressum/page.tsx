import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Rechtliche Informationen und Anbieterkennzeichnung der Nota Finance Website.",
  openGraph: {
    title: "Impressum | Nota Finance",
    description:
      "Rechtliche Informationen und Anbieterkennzeichnung der Nota Finance Website.",
    url: "https://www.notafinance.de/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-text-900 mb-12">Impressum</h1>
        
        <div className="prose prose-lg max-w-none text-text-900/70 space-y-8">
          <section>
            <p className="text-lg font-medium">
              <a 
                href="https://www.notafinance.de" 
                className="text-brand-900 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.notafinance.de
              </a>{" "}
              ist ein Geschäftsfeld der twenty4collect GmbH
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              Verantwortliche juristische Person nach § 5 Abs. 1 TMG
            </h2>
            <p>
              <strong className="text-text-900">twenty4collect GmbH</strong>
              <br />
              In den Weiden 9
              <br />
              56729 Weiler
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">Kontakt</h2>
            <p>
              Telefon: +49 (0) 2656 / 951 314
              <br />
              E-Mail:{" "}
              <a 
                href="mailto:service@notafinance.de" 
                className="text-brand-900 hover:underline"
              >
                service@notafinance.de
              </a>
              <br />
              Web:{" "}
              <a 
                href="https://www.notafinance.de" 
                className="text-brand-900 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.notafinance.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              Vertretungsberechtigte Geschäftsführer
            </h2>
            <p>
              Manfred Eberhard
              <br />
              Jutta Jax
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">Handelsregister</h2>
            <p>Amtsgericht Koblenz HRB 21094</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p>DE259631557</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">Zulassungsbehörde</h2>
            <p className="mb-4">
              <strong className="text-text-900">Landgericht Koblenz</strong>
              <br />
              Durch den Präsidenten des Landgerichts Koblenz als Inkassounternehmen zugelassen.
            </p>
            <p className="mb-4">
              <strong className="text-text-900">
                Aufsichtsbehörde i.S.d. § 13a Abs. 1 Nr. 8 und des § 13h Abs. 1 S. 1 RDG:
              </strong>
              <br />
              Bundesamt für Justiz (BfJ)
            </p>
            <p className="mb-4">
              <strong className="text-text-900">Postanschrift:</strong>
              <br />
              Bundesamt für Justiz, Referat VII 5 (RDG), Adenauerallee 99-103, 53113 Bonn
              <br />
              E-Mail:{" "}
              <a 
                href="mailto:rdg@bfj.bund.de" 
                className="text-brand-900 hover:underline"
              >
                rdg@bfj.bund.de
              </a>
            </p>
            <p>
              Eingetragen im Rechtsdienstleistungsregister Aktenzeichen 75 E – 52/08
              <br />
              Nach § 10 Abs. 1 Nr. 1 i.V.m. § 2 Abs. 2 S. 1 RDG zugelassener Inkassodienstleister
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">Mitgliedschaft</h2>
            <p>
              Mitglied im Bundesverband Deutscher Inkasso-Unternehmen e.V. (BDIU)
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              Berufshaftpflichtversicherung
            </h2>
            <p>
              Die innerhalb der BRD geltende Berufshaftpflichtversicherung gemäß § 12 Abs. 1 Nr. 3 RDG 
              besteht bei der: ERGO Versicherungs AG, Düsseldorf
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">Rechtshinweis</h2>
            <p className="mb-4">
              Die twenty4collect GmbH prüft und aktualisiert die Informationen auf ihrem 
              Internetauftritt regelmäßig. Trotz aller Sorgfalt können sich die Daten 
              zwischenzeitlich verändert haben. Eine Haftung oder Garantie für die Aktualität, 
              Richtigkeit und Vollständigkeit der Informationen kann daher nicht übernommen werden.
            </p>
            <p className="mb-4">
              Bei direkten oder indirekten Verweisen (so genannten Hyperlinks) auf Internetseiten 
              Dritter hat die twenty4collect GmbH keinen Einfluss auf deren Inhalte und deren 
              Gestaltung. Deshalb kann die twenty4collect GmbH für diese fremden Inhalte und die 
              Gestaltung auch keine Gewähr übernehmen. Für die Inhalte und die Gestaltung der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten 
              verantwortlich.
            </p>
            <p>
              Weiterhin behält sich die twenty4collect GmbH das Recht vor, Änderungen oder 
              Ergänzungen der bereitgestellten Informationen vorzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              Hinweis auf Online-Streitbeilegung
            </h2>
            <p className="mb-4">
              Hinweis auf Online-Streitbeilegung gemäß Art. 14 der ODR – Verordnung:
              <br />
              Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
              <a 
                href="https://www.ec.europa.eu/consumers/odr" 
                className="text-brand-900 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mb-4">
              <strong className="text-text-900">
                Allgemeine Informationspflicht nach § 36 Verbraucherstreitbeilegungsgesetz (VSBG):
              </strong>
            </p>
            <p>
              Die twenty4collect GmbH ist nicht bereit und verpflichtet, an 
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. 
              Es besteht diesbezüglich keine gesetzliche Verpflichtung.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">Copyright</h2>
            <p>
              © Copyright twenty4collect GmbH
              <br />
              Alle Rechte vorbehalten. Text, Bilder und Grafiken sowie deren Gestaltung und die 
              Struktur der Websites unterliegen dem Schutz des Urheberrechts und anderer 
              Schutzgesetze. Vervielfältigung nur mit Genehmigung der twenty4collect GmbH.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
