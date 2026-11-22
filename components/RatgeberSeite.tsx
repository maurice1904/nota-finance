import Link from "next/link";
import CTASection from "@/components/CTASection";
import RevealOnScroll from "@/components/RevealOnScroll";
import ArticleMeta from "@/components/ArticleMeta";
import type { RatgeberContent } from "@/lib/ratgeber-content";

/**
 * Gemeinsames Layout aller Ratgeber-Seiten (SEO-5, docs/SEO_Umsetzungskonzept.md Teil 5.1).
 * Reines Praesentations-Bauteil, analog zu components/BranchenSeite.tsx (SEO-4) - die
 * eigentlichen Texte kommen ausschliesslich aus lib/ratgeber-content.ts.
 *
 * Reihenfolge ist absichtlich fest: direkte Antwort zuerst, ohne Einleitung - das ist der
 * Absatz, den ein Sprachmodell zitiert.
 */
export default function RatgeberSeite({ content }: { content: RatgeberContent }) {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-900 mb-6">{content.frage}</h1>
          <p className="text-lg sm:text-xl text-text-900/70 leading-relaxed mb-4">
            {content.direkteAntwort}
          </p>
          <div className="mb-16">
            <ArticleMeta publishedAt={content.publishedAt} updatedAt={content.updatedAt} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-4">
              {content.erklaerungUeberschrift}
            </h2>
            <div className="space-y-4">
              {content.erklaerungText.map((absatz) => (
                <p key={absatz} className="text-text-900/70 leading-relaxed">
                  {absatz}
                </p>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-12 bg-surface-100/50 rounded-2xl p-6 sm:p-8 border border-border-subtle">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-4">
              {content.beispielUeberschrift}
            </h2>
            <div className="space-y-4">
              {content.beispielText.map((absatz) => (
                <p key={absatz} className="text-text-900/70 leading-relaxed">
                  {absatz}
                </p>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {content.ausnahme && (
          <RevealOnScroll>
            <section className="mb-12 border-l-4 border-brand-700 pl-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-4">
                {content.ausnahme.ueberschrift}
              </h2>
              <div className="space-y-4">
                {content.ausnahme.text.map((absatz) => (
                  <p key={absatz} className="text-text-900/70 leading-relaxed">
                    {absatz}
                  </p>
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}

        <RevealOnScroll>
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-900 mb-6">
              {content.tabelleUeberschrift}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border-subtle">
                    {content.tabelle.kopfzeile.map((spalte) => (
                      <th key={spalte} className="text-left py-3 pr-4 font-bold text-text-900">
                        {spalte}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.tabelle.zeilen.map((zeile) => (
                    <tr key={zeile.join("-")} className="border-b border-border-subtle">
                      {zeile.map((zelle, i) => (
                        <td
                          key={i}
                          className={
                            i === 0
                              ? "py-3 pr-4 text-text-900 font-medium"
                              : "py-3 pr-4 text-text-900/70"
                          }
                        >
                          {zelle}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <p className="text-base leading-relaxed">{content.handlungsaufforderung}</p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <nav aria-label="Verwandte Themen" className="flex flex-wrap gap-6 text-sm">
            {content.verwandteThemen.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-900 hover:underline font-medium"
              >
                {link.label} →
              </Link>
            ))}
          </nav>
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div className="mt-16">
          <CTASection
            title="Jetzt Forderung einreichen"
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
