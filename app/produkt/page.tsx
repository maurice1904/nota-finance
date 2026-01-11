import { Upload, CheckCircle, Users, Shield, Zap, Target, Clock } from "lucide-react";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "So funktioniert digitales Forderungsmanagement",
  description:
    "Von Upload bis Auszahlung: Unser transparenter Inkasso-Prozess. Wir kümmern uns um Mahnungen und Kommunikation, damit Sie Ihr Geld erhalten.",
  openGraph: {
    title: "So funktioniert digitales Forderungsmanagement | Nota Finance",
    description:
      "Von Upload bis Auszahlung: Unser transparenter Inkasso-Prozess. Wir kümmern uns um Mahnungen und Kommunikation, damit Sie Ihr Geld erhalten.",
    url: "https://www.notafinance.de/produkt",
  },
};

export default function ProduktPage() {
  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface-100 min-h-[calc(100dvh-5rem)] flex flex-col justify-center py-12 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Nota Finance: Ihr Forderungsmanagement –{" "}
              <span className="text-brand-900">Einfach. Effektiv. Fair.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Erfahren Sie im Detail, wie Nota Finance Ihnen hilft, offene Forderungen schnell 
              und unkompliziert zu realisieren. Wir kombinieren digitale Effizienz mit individueller 
              Betreuung und der Sicherheit von über 20 Jahren Inkasso-Erfahrung durch 24collect.
            </p>
          </div>
        </div>
      </section>

      {/* Das Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
              Ausbleibende Zahlungen? Eine Herausforderung für jedes Unternehmen.
            </h2>
            <div className="prose prose-lg max-w-none text-text-900/70">
              <p className="text-base sm:text-lg leading-relaxed">
                Sie haben Ihre Leistung erbracht, die Rechnung gestellt – doch die Zahlung bleibt aus. 
                Unbezahlte Rechnungen binden Kapital, verursachen administrativen Aufwand und können die 
                Liquidität Ihres Unternehmens empfindlich stören. Gerade für Selbstständige, kleine und 
                mittlere Unternehmen ist ein zuverlässiger Zahlungseingang existenziell. Die manuelle 
                Verfolgung offener Posten kostet wertvolle Zeit, die Ihnen für Ihr Kerngeschäft fehlt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Lösung Section */}
      <section className="py-24 bg-gradient-to-br from-white to-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
              Mit Nota Finance Ihr Geld einfach, sicher und schnell zurückerhalten.
            </h2>
            <p className="text-base sm:text-lg text-text-900/70 leading-relaxed">
              Nota Finance nimmt Ihnen den gesamten Prozess des Forderungseinzugs ab – von der ersten 
              Mahnung bis hin zur möglichen gerichtlichen Durchsetzung. Unser Ziel ist es, Ihre offenen 
              Forderungen ab 50€ Forderungshöhe effizient zu realisieren, während wir gleichzeitig darauf 
              achten, Ihre Kundenbeziehungen zu schonen.
            </p>
          </div>

          {/* Schritt 1: Falleinreichung */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-900 mb-4 sm:mb-6">
                  Die einfache Falleinreichung
                </h3>
                <div className="space-y-4 text-text-900/70">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">Einfach & Unkompliziert:</h4>
                    <p className="leading-relaxed">
                      Sie reichen Ihre offenen Rechnungen einfach per Upload (PDF, XRechnung, ZUGFeRD) 
                      oder Drag & Drop auf unserer Website ein. Alternativ können Sie uns die Unterlagen 
                      per E-Mail senden. Für Unternehmen mit vielen Fällen bieten wir zudem eine sichere 
                      API-Schnittstelle zur direkten Anbindung Ihrer Systeme.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">Ohne Registrierungszwang:</h4>
                    <p className="leading-relaxed">
                      Für die Einreichung einzelner Fälle ist keine vorherige Registrierung notwendig. 
                      Sie können sofort loslegen. Wenn Sie möchten, können Sie sich natürlich gerne 
                      registrieren und sparen bei der Einreichung weiterer Fälle wertvolle Zeit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">Automatische Prüfung & Bestätigung:</h4>
                    <p className="leading-relaxed">
                      Nach dem Upload prüfen wir die Unterlagen umgehend. Sie erhalten automatisch eine 
                      Eingangsbestätigung inklusive Ihres Aktenzeichens per E-Mail.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schritt 2: Das Nota-Inkasso */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-900 mb-4 sm:mb-6">
                  Das Nota-Inkasso
                </h3>
                
                {/* A) Außergerichtliches Mahnverfahren */}
                <div className="mb-8">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
                    A) Das außergerichtliche Mahnverfahren – konsequent und kundenorientiert
                  </h4>
                  <div className="space-y-4 text-text-900/70">
                    <div>
                      <h5 className="font-bold text-base sm:text-lg text-text-900 mb-2">Professionelle Kommunikation:</h5>
                      <p className="leading-relaxed">
                        Wir nehmen Kontakt zu Ihren säumigen Kunden auf und erinnern sie freundlich, 
                        aber bestimmt an die offene Zahlung. Unsere Kommunikation ist darauf ausgelegt, 
                        eine schnelle Zahlung zu erwirken und gleichzeitig die Kundenbeziehung nicht zu belasten.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-base sm:text-lg text-text-900 mb-2">Individuelle Strategie:</h5>
                      <p className="leading-relaxed">
                        Je nach Fall und Reaktion des Schuldners passen wir unsere Vorgehensweise an. 
                        Wir setzen auf Dialog und suchen nach gemeinsamen Lösungen.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-base sm:text-lg text-text-900 mb-2">Keine Kosten für Sie:</h5>
                      <p className="leading-relaxed">
                        Im gesamten außergerichtlichen Mahnverfahren entstehen Ihnen als Auftraggeber 
                        keinerlei Kosten. Die gesetzlich festgelegten Mahngebühren trägt der Schuldner.
                      </p>
                    </div>
                  </div>
                </div>

                {/* B) Gerichtliches Mahnverfahren */}
                <div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
                    B) Das gerichtliche Mahnverfahren – Wenn es nötig wird
                  </h4>
                  <div className="space-y-4 text-text-900/70">
                    <div>
                      <h5 className="font-bold text-base sm:text-lg text-text-900 mb-2">Nur nach Rücksprache:</h5>
                      <p className="leading-relaxed">
                        Sollte das außergerichtliche Verfahren nicht zum Erfolg führen, besprechen wir 
                        mit Ihnen das weitere Vorgehen. Erst nach Rücksprache leiten wir das gerichtliche 
                        Mahnverfahren (die Erstellung eines Mahnbescheids) ein.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-base sm:text-lg text-text-900 mb-2">Transparente Kosten:</h5>
                      <p className="leading-relaxed">
                        Für das gerichtliche Mahnverfahren fallen gesetzlich festgelegte Gebühren an. 
                        Im Erfolgsfall werden auch diese Kosten vom Schuldner getragen. Über alle eventuellen 
                        Kostenrisiken klären wir Sie im Vorfeld transparent auf.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schritt 3: Zahlungseingang */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-900 mb-4 sm:mb-6">
                  Zahlungseingang & Auszahlung
                </h3>
                <div className="space-y-4 text-text-900/70">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">100% für Sie:</h4>
                    <p className="leading-relaxed">
                      Sobald Ihr Kunde die Forderung (inklusive der gesetzlichen Mahngebühren und 
                      Verzugszinsen) begleicht, erhalten Sie 100% des ursprünglichen Rechnungsbetrages 
                      Ihrer Ausgangsrechnung. Die Ihnen zustehenden Nebenforderungen wie Mahnkosten und 
                      Verzugszinsen leiten wir ebenfalls an Sie weiter.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">Schnelle Abwicklung:</h4>
                    <p className="leading-relaxed">
                      Wir sorgen für eine zügige Überweisung der eingegangenen Gelder auf Ihr Konto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Die Vorteile Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 text-center mb-12 sm:mb-16">
            Warum Nota Finance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vorteil 1 */}
            <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Zap className="w-12 h-12 text-brand-900 mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Maximale Einfachheit</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Intuitive Online-Einreichung Ihrer Rechnungen in wenigen Minuten.</li>
                <li>• Keine komplizierten Formulare, keine Registrierung für Einzelfälle.</li>
                <li>• Unterstützung aller gängigen Rechnungsformate (PDF, XRechnung, ZUGFeRD).</li>
              </ul>
            </div>

            {/* Vorteil 2 */}
            <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Clock className="w-12 h-12 text-brand-900 mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Digitale Effizienz</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Automatisierte Prozesse für schnelle Bearbeitung und kurze Reaktionszeiten.</li>
                <li>• Weniger Papierkram, mehr Zeit für Ihr Kerngeschäft.</li>
                <li>• Optionale API-Schnittstelle für nahtlose Integration.</li>
              </ul>
            </div>

            {/* Vorteil 3 */}
            <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Users className="w-12 h-12 text-brand-900 mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Absolute Kundenorientierung</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Wir behandeln Ihre Kunden stets respektvoll und fair, um Ihre Geschäftsbeziehungen zu schützen.</li>
                <li>• Persönliche Ansprechpartner bei Bedarf und individuelle Fallbearbeitung.</li>
              </ul>
            </div>

            {/* Vorteil 4 */}
            <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-brand-900 mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Volle Kostentransparenz & Fairness</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Keine Kosten für Sie im außergerichtlichen Mahnverfahren.</li>
                <li>• Im Erfolgsfall erhalten Sie 100% Ihrer Hauptforderung plus Nebenforderungen.</li>
                <li>• Klare Kommunikation über alle eventuellen Kosten.</li>
              </ul>
            </div>

            {/* Vorteil 5 */}
            <div className="bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <Shield className="w-12 h-12 text-brand-900 mb-4" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Zuverlässigkeit & Sicherheit</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Profitieren Sie von über 15 Jahren Erfahrung und der etablierten Infrastruktur von 24collect.de, einem etablierten und zertifizierten Inkasso-Unternehmen.</li>
                <li>• Rechtssichere Abwicklung und Einhaltung aller Datenschutzrichtlinien (DSGVO-konform).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Jetzt digitales Inkasso beauftragen"
        subtitle="Reichen Sie jetzt direkt einen Fall oder mehrere Fälle ein. Oder nehmen Sie mit uns Kontakt auf, wenn Sie Fragen haben oder eine individuelle Beratung wünschen."
        buttons={[
          { text: "Kontakt aufnehmen", href: "/kontakt" },
          { text: "Häufig gestellte Fragen", href: "/faq" },
          { text: "Fall einreichen", href: "/einreichen", primary: true },
        ]}
      />
    </main>
  );
}
