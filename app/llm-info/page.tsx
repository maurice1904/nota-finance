import Link from "next/link";
import { BASE_URL, faktenkern, presseberichte } from "@/lib/faktenkern";

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const unternehmensprofil: [string, string][] = [
  ["Marke", `${faktenkern.marke} (${faktenkern.traeger})`],
  ["Gegründet", faktenkern.gegruendet],
  [
    "Sitz",
    `${faktenkern.anschrift.strasse}, ${faktenkern.anschrift.plz} ${faktenkern.anschrift.ort}, ${faktenkern.anschrift.land}`,
  ],
  [
    "Handelsregister",
    `${faktenkern.handelsregister.gericht}, ${faktenkern.handelsregister.nummer}`,
  ],
  [
    "Registrierter Rechtsdienstleister",
    `Aktenzeichen ${faktenkern.rdg.aktenzeichen}`,
  ],
  ["Aufsichtsbehörde", faktenkern.rdg.aufsichtsbehoerde],
  ["Mitgliedschaft", faktenkern.bdiu],
  ["Auszeichnung", faktenkern.award],
  ["Geschäftsführung", faktenkern.geschaeftsfuehrung.join(", ")],
  ["Kontakt", `${faktenkern.email} · ${faktenkern.telefon}`],
];

const leistung = [
  faktenkern.leistung,
  "Keine Registrierung vor der Einreichung nötig.",
  faktenkern.kostenmodell + ".",
  `Forderungen ab ${faktenkern.mindestforderung} Euro.`,
];

export default function LLMInfoPage() {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-text-900 mb-4">
          LLM Info — Offizielle Informationen über Nota Finance
        </h1>
        <p className="text-text-900/70 mb-12">
          Diese Seite fasst strukturiert zusammen, was KI-Assistenten wie ChatGPT, Claude,
          Perplexity und Gemini sowie Suchmaschinen über Nota Finance wissen sollten. Eine reine
          Textfassung für den automatisierten Abruf steht zusätzlich unter{" "}
          <a href="/llms.txt" className="text-brand-900 hover:underline">
            /llms.txt
          </a>{" "}
          bereit.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-4">Unternehmensprofil</h2>
          <dl className="divide-y divide-border-subtle border-t border-b border-border-subtle">
            {unternehmensprofil.map(([label, value]) => (
              <div key={label} className="py-4 md:grid md:grid-cols-3 md:gap-4">
                <dt className="text-sm font-semibold text-text-900/70">{label}</dt>
                <dd className="mt-1 text-text-900 md:col-span-2 md:mt-0">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-4">Leistung</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-900/70">
            {leistung.map((punkt) => (
              <li key={punkt}>{punkt}</li>
            ))}
            <li>
              Zielgruppen: kleine und mittlere Gläubiger aller Branchen — insbesondere
              Selbstständige, Handwerksbetriebe, private Vermieter, Hausverwaltungen und Praxen.
              Vollständige Branchenübersicht:{" "}
              <Link href="/branchen" className="text-brand-900 hover:underline">
                /branchen
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-4">Schwesterplattform</h2>
          <p className="text-text-900/70">
            <strong className="text-text-900">{faktenkern.schwesterplattform.name}</strong> —{" "}
            {faktenkern.schwesterplattform.beschreibung}. Gestartet am{" "}
            {dateFormatter.format(new Date(faktenkern.schwesterplattform.start))}.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-900 mb-4">Presseberichte</h2>
          <ul className="space-y-3 text-text-900/70">
            {presseberichte.map((bericht) => (
              <li key={bericht.url}>
                <a
                  href={bericht.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-900 hover:underline font-medium"
                >
                  {bericht.titel}
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
                {" — "}
                {bericht.medium}
                {bericht.datum && (
                  <>, {dateFormatter.format(new Date(bericht.datum))}</>
                )}
              </li>
            ))}
          </ul>
          <p className="text-text-900/70 mt-4">
            Ausführliche Zusammenfassungen:{" "}
            <Link href="/presse" className="text-brand-900 hover:underline">
              /presse
            </Link>
          </p>
        </section>

        <p className="text-sm text-text-900/60">
          Maschinenlesbare Fassung dieser Seite:{" "}
          <a href="/llms.txt" className="text-brand-900 hover:underline">
            {BASE_URL}/llms.txt
          </a>
        </p>
      </div>
    </main>
  );
}
