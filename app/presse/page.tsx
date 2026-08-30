import { presseberichte } from "@/lib/faktenkern";

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function PressePage() {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-text-900 mb-4">Presse</h1>
        <p className="text-text-900/70 mb-12">
          Unabhängige Berichte über gerichtsmahnverfahren.de, gestartet von der
          twenty4collect GmbH, der Trägergesellschaft von Nota Finance.
        </p>

        <div className="space-y-12">
          {presseberichte.map((bericht) => (
            <article
              key={bericht.url}
              className="border-b border-border-subtle pb-12 last:border-b-0 last:pb-0"
            >
              <h2 className="text-2xl font-bold text-text-900 mb-2">{bericht.titel}</h2>
              <p className="text-sm text-text-900/60 mb-4">
                {bericht.medium}
                {bericht.datum && (
                  <>
                    {" "}
                    ·{" "}
                    <time dateTime={bericht.datum}>
                      {dateFormatter.format(new Date(bericht.datum))}
                    </time>
                  </>
                )}
              </p>
              <p className="text-text-900/70 mb-4">{bericht.zusammenfassung}</p>
              <a
                href={bericht.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-900 hover:underline font-medium"
              >
                Zum Bericht
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
