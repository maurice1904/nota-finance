import { Euro, CheckCircle, TrendingUp } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function PreisePage() {
  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface-100 h-[calc(100dvh-5rem)] flex flex-col justify-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-8 py-3 rounded-full text-6xl font-bold mb-8">
              0€
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-900 mb-6 leading-tight">
              Kosten für Sie als Auftraggeber: <span className="text-brand-900">0€</span>
            </h1>
            
            <p className="text-2xl text-text-900/70 font-semibold leading-relaxed">
              Unser Service ist für Sie als Auftraggeber in der Regel kostenfrei, entstehende 
              Kosten und Gebühren sind gesetzlich geregelt und vom Schuldner zu tragen.
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-900/70 leading-relaxed mb-8">
                Für Sie als Auftraggeber ist das außergerichtliche Mahnverfahren bei Nota Finance 
                im Erfolgsfall in der Regel kostenfrei. Die anfallenden Inkassokosten sowie Verzugszinsen 
                sind gesetzlich geregelt und werden von Ihrem säumigen Kunden (Schuldner) getragen. 
                Sie erhalten im Erfolgsfall 100% Ihrer ursprünglichen Hauptforderung.
              </p>
              <p className="text-lg text-text-900/70 leading-relaxed">
                Sollte ein gerichtliches Mahnverfahren notwendig werden, informieren wir Sie im Vorfeld 
                transparent über eventuell anfallende Gerichtskosten. Auch diese sind im Erfolgsfall von 
                Ihrem Schuldner zu tragen. Unser Ziel ist es, Ihre Kostenrisiken stets so gering wie 
                möglich zu halten.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <CheckCircle className="w-12 h-12 text-brand-900 mb-4" />
                <h3 className="text-xl font-bold text-text-900 mb-2">Außergerichtlich</h3>
                <p className="text-text-900/70">Im Erfolgsfall für Sie kostenfrei</p>
              </div>

              <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <Euro className="w-12 h-12 text-brand-900 mb-4" />
                <h3 className="text-xl font-bold text-text-900 mb-2">100% Auszahlung</h3>
                <p className="text-text-900/70">Sie erhalten Ihren vollen Rechnungsbetrag</p>
              </div>

              <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-brand-900 mb-4" />
                <h3 className="text-xl font-bold text-text-900 mb-2">Plus Nebenforderungen</h3>
                <p className="text-text-900/70">Mahnkosten & Verzugszinsen zusätzlich</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beispielrechnung Section */}
      <section className="py-24 bg-gradient-to-br from-white to-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-900 mb-6 text-center">
              Beispielrechnung
            </h2>
            
            <p className="text-lg text-text-900/70 mb-12 text-center leading-relaxed">
              Anhand eines Beispiels zeigen wir Ihnen, welchen Betrag Sie von Ihrer offenen und 
              angemahnten Ausgangsrechnung bei Zahlung durch Ihren Kunden überwiesen bekommen. 
              Unsere Gebühren werden von Ihrem Kunden bezahlt, da er sich im Verzug befindet und 
              den Verzugsschaden entsprechend den gesetzlichen Bestimmungen tragen muss. Diese 
              entsprechen der Gebührentabelle nach §13 aus dem Rechtsanwaltsvergütungsgesetz (RVG) 
              für die jeweilige Rechnungshöhe.
            </p>

            {/* Calculation Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border-subtle">
              <div className="space-y-8">
                {/* Original Invoice */}
                <div className="pb-6 border-b border-border-subtle">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-text-900">Ihre Ausgangsrechnung</h3>
                      <p className="text-neutral-500 mt-1">Ursprünglicher Rechnungsbetrag</p>
                    </div>
                    <div className="text-3xl font-bold text-text-900">1.000,00 €</div>
                  </div>
                </div>

                {/* What Customer Pays */}
                <div className="bg-gradient-to-br from-brand-900/10 to-surface-100/50 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-text-900 mb-4">Ihr Kunde zahlt zusätzlich:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-900/70">Inkassogebühren (nach RVG §13)</span>
                      <span className="font-semibold text-text-900">+ 70,00 €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-900/70">Verzugszinsen (5% über Basiszinssatz)</span>
                      <span className="font-semibold text-text-900">+ 15,00 €</span>
                    </div>
                    <div className="pt-3 border-t border-border-subtle flex justify-between items-center">
                      <span className="font-bold text-text-900">Gesamtzahlung Ihres Kunden</span>
                      <span className="text-xl font-bold text-text-900">1.085,00 €</span>
                    </div>
                  </div>
                </div>

                {/* What You Receive */}
                <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl p-8 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Sie erhalten:</h3>
                      <p className="text-white/80">100% Ihrer Forderung + Nebenforderungen</p>
                    </div>
                    <CheckCircle className="w-16 h-16" />
                  </div>
                  <div className="space-y-2 pt-4 border-t border-white/30">
                    <div className="flex justify-between items-center text-lg">
                      <span>Hauptforderung</span>
                      <span className="font-semibold">1.000,00 €</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span>Mahnkosten</span>
                      <span className="font-semibold">+ 70,00 €</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span>Verzugszinsen</span>
                      <span className="font-semibold">+ 15,00 €</span>
                    </div>
                    <div className="pt-4 border-t border-white/30 flex justify-between items-center">
                      <span className="text-2xl font-bold">Auszahlung an Sie</span>
                      <span className="text-4xl font-bold">1.085,00 €</span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="text-center text-sm text-neutral-500 italic pt-4">
                  * Dies ist ein vereinfachtes Beispiel. Die tatsächlichen Gebühren richten sich nach 
                  §13 RVG und können je nach Forderungshöhe variieren. Verzugszinsen werden nach den 
                  gesetzlichen Bestimmungen berechnet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Bereit für digitales Forderungsmanagement mit Nota Finance?"
        subtitle="Erleben Sie den Unterschied und reichen Sie Ihre erste Forderung noch heute ein. Unser Team steht Ihnen bei Fragen jederzeit gerne zur Verfügung."
        buttons={[
          { text: "Kontakt aufnehmen", href: "/kontakt" },
          { text: "Häufig gestellte Fragen", href: "/faq" },
          { text: "Fall einreichen", href: "/einreichen", primary: true },
        ]}
      />
    </main>
  );
}
