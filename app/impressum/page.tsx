export default function ImpressumPage() {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-[#0B1120] mb-12">Impressum</h1>
        
        <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Nota Finance</strong>
              <br />
              Ein Service der 24collect GmbH
              <br />
              Musterstraße 123
              <br />
              12345 Musterstadt
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">Kontakt</h2>
            <p>
              Telefon: +49 (0) 123 456789
              <br />
              E-Mail: admin@notafinance.de
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">Vertreten durch</h2>
            <p>Geschäftsführer: Max Mustermann</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister
              <br />
              Registergericht: Amtsgericht Musterstadt
              <br />
              Registernummer: HRB 12345
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              DE123456789
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Max Mustermann
              <br />
              Musterstraße 123
              <br />
              12345 Musterstadt
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              https://ec.europa.eu/consumers/odr/.
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-[#0B1120] mb-4">
              Verbraucher­streit­beilegung/Universal­schlichtungs­stelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

