import Link from "next/link";
import { Upload, Search, Euro } from "lucide-react";
import CTASection from "@/components/CTASection";
import RevealOnScroll from "@/components/RevealOnScroll";
import { faktenkern } from "@/lib/faktenkern";
import type { BranchenContent } from "@/lib/branchen-content";

/**
 * Gemeinsames Layout aller Branchenseiten (SEO-4, docs/SEO_Umsetzungskonzept.md Teil 5.2).
 * Reines Praesentations-Bauteil - die eigentlichen, branchenspezifischen Texte kommen
 * ausschliesslich aus lib/branchen-content.ts. Ablauf und Kosten sind bewusst NICHT Teil des
 * Content-Objekts: Das sind identische, wahre Fakten fuer jede Branche, keine Textbausteine,
 * die zufaellig gleich klingen.
 */
export default function BranchenSeite({ content }: { content: BranchenContent }) {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-900 mb-6">{content.h1}</h1>
          <p className="text-lg sm:text-xl text-text-900/70 leading-relaxed mb-16">
            {content.direkteAntwort}
          </p>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-4">
              {content.problemUeberschrift}
            </h2>
            <p className="text-text-900/70 leading-relaxed">{content.problemText}</p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-12 bg-surface-100/50 rounded-2xl p-6 sm:p-8 border border-border-subtle">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-4">
              Ein typischer Fall
            </h2>
            <p className="text-text-900/70 leading-relaxed">{content.fallText}</p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-6">
              So läuft es bei Nota Finance
            </h2>
            <ol className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Upload,
                  titel: "Einreichen",
                  text: "Rechnung und bisherige Mahnungen hochladen — als PDF, XRechnung, ZUGFeRD oder Foto.",
                },
                {
                  icon: Search,
                  titel: "Prüfen",
                  text: "Nota Finance prüft den Fall.",
                },
                {
                  icon: Euro,
                  titel: "Einziehen",
                  text: "Außergerichtliches Mahnverfahren startet; bleibt es erfolglos, auf Wunsch das gerichtliche Mahnverfahren.",
                },
              ].map((schritt, index) => (
                <li key={schritt.titel} className="bg-white rounded-xl p-6 border border-border-subtle">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-900 to-brand-700 rounded-lg flex items-center justify-center mb-4">
                    <schritt.icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold text-brand-700 mb-1">
                    Schritt {index + 1}
                  </p>
                  <h3 className="text-lg font-bold text-text-900 mb-2">{schritt.titel}</h3>
                  <p className="text-text-900/70 text-sm leading-relaxed">{schritt.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-4">Was es kostet</h2>
            <p className="text-text-900/70 leading-relaxed">
              {faktenkern.kostenmodellSieAnsprache} Einreichbar ab {faktenkern.mindestforderung} €
              Forderungshöhe.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-6">
              {content.faqUeberschrift}
            </h2>
            <div className="space-y-6">
              {content.faq.map((eintrag) => (
                <div key={eintrag.frage}>
                  <h3 className="text-lg font-bold text-text-900 mb-2">{eintrag.frage}</h3>
                  <p className="text-text-900/70 leading-relaxed">{eintrag.antwort}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-16 bg-gradient-to-br from-brand-900 to-text-900 text-white rounded-2xl p-6 sm:p-8">
            <p className="text-sm text-surface-100">
              {faktenkern.markeMitTraeger}, gegründet {faktenkern.gegruendet} · registrierter
              Rechtsdienstleister nach RDG, Aktenzeichen {faktenkern.rdg.aktenzeichen} · Mitglied
              im {faktenkern.bdiu}
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <nav aria-label="Weiterführende Links" className="flex flex-wrap gap-6 text-sm">
            <Link href="/preise" className="text-brand-900 hover:underline font-medium">
              Was kostet das genau? →
            </Link>
            <Link href="/faq" className="text-brand-900 hover:underline font-medium">
              Häufige Fragen →
            </Link>
            <Link href="/branchen" className="text-brand-900 hover:underline font-medium">
              Alle Branchen →
            </Link>
          </nav>
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div className="mt-16">
          <CTASection
            title={content.ctaTitel ?? "Jetzt Forderung einreichen"}
            subtitle="Rechnung hochladen — den Rest übernehmen wir."
            buttons={[
              { text: "Kontakt aufnehmen", href: "/kontakt" },
              { text: "Fall einreichen", href: "/einreichen", primary: true },
            ]}
          />
        </div>
      </RevealOnScroll>
    </main>
  );
}
