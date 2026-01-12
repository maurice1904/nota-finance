import { Upload, CheckCircle, Users, Shield, Zap, Target, Clock, ChevronDown, AlertCircle } from "lucide-react";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-surface-100/30 to-brand-700/8 min-h-[calc(100dvh-5rem)] flex flex-col justify-center py-12 sm:py-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
          style={{ backgroundImage: "url('/Hero-SubSites3.png')" }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Digitales Inkasso<br />
              <span className="text-brand-900">Schnell. Einfach. Effektiv.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Jetzt Ihre offene Rechnung direkt als PDF, XRechnung oder ZUGFeRD hochladen und wir kümmern uns um den Rest.
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce-gentle">
            <ChevronDown className="w-6 h-6 text-brand-900" strokeWidth={2.5} />
          </div>
        </div>
      </section>

      {/* Das Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-900/5 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-brand-900" strokeWidth={2} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-700 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
                  Ausbleibende Zahlungen?
                </h2>
                <div className="prose prose-lg max-w-none text-text-900/70">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Sie haben Ihre Leistung erbracht, die Rechnung gestellt – doch die Zahlung bleibt aus. 
                    Unbezahlte Rechnungen binden Kapital, verursachen administrativen Aufwand und können die 
                    Liquidität Ihres Unternehmens empfindlich stören. Die manuelle 
                    Verfolgung offener Posten kostet wertvolle Zeit, die Ihnen für Ihr Kerngeschäft fehlt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Lösung Section */}
      <section className="py-24 bg-gradient-to-br from-surface-100/50 via-white to-brand-700/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
              Mit Nota Finance erhalten Sie Ihr Geld einfach, sicher und schnell zurück.
            </h2>
            <p className="text-base sm:text-lg text-text-900/70 leading-relaxed">
              Nota Finance nimmt Ihnen den gesamten Prozess des Forderungseinzugs ab – von der ersten 
              Mahnung bis hin zur möglichen gerichtlichen Durchsetzung. Unser Ziel ist es, Ihre offenen 
              Forderungen effizient zu realisieren, während wir gleichzeitig darauf 
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
                      Sie können sofort loslegen. 
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
                  Das Nota-Inkasso: wir übernehmen.
                </h3>
                
                {/* A) Außergerichtliches Mahnverfahren */}
                <div className="mb-8">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
                    Das außergerichtliche Mahnverfahren – konsequent und kundenorientiert
                  </h4>
                  <div className="space-y-4 text-text-900/70">
                    <div>
                      <h5 className="font-bold text-base sm:text-lg text-text-900 mb-2">Professionelle Kommunikation:</h5>
                      <p className="leading-relaxed">
                        Wir nehmen Kontakt zu Ihren säumigen Kunden auf und erinnern sie freundlich, 
                        aber bestimmt an die offene Zahlung. Unsere Kommunikation ist darauf ausgelegt, 
                        eine schnelle Zahlung zu erwirken und gleichzeitig Ihre Kundenbeziehung nicht zu belasten.
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
                    Das gerichtliche Mahnverfahren – Wenn es nötig wird
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
                  Zahlung erhalten
                </h3>
                <div className="space-y-4 text-text-900/70">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">100% für Sie:</h4>
                    <p className="leading-relaxed">
                      Sobald Ihr Kunde die Forderung begleicht, erhalten Sie 100% des ursprünglichen Rechnungsbetrages 
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
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 hover:border-brand-700/30 transition-all duration-300">
              <Zap className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Maximale Einfachheit</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Intuitive Online-Einreichung Ihrer Rechnungen in wenigen Minuten.</li>
                <li>• Keine komplizierten Formulare, keine Registrierung für Einzelfälle.</li>
                <li>• Unterstützung aller gängigen Rechnungsformate (PDF, XRechnung, ZUGFeRD).</li>
              </ul>
            </div>

            {/* Vorteil 2 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 hover:border-brand-700/30 transition-all duration-300">
              <Clock className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Digitale Effizienz</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Automatisierte Prozesse für schnelle Bearbeitung und kurze Reaktionszeiten.</li>
                <li>• Weniger Papierkram, mehr Zeit für Ihr Kerngeschäft.</li>
                <li>• Optionale API-Schnittstelle für nahtlose Integration.</li>
              </ul>
            </div>

            {/* Vorteil 3 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 hover:border-brand-700/30 transition-all duration-300">
              <Users className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Absolute Kundenorientierung</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Wir behandeln Ihre Kunden stets respektvoll und fair, um Ihre Geschäftsbeziehungen zu schützen.</li>
                <li>• Persönliche Ansprechpartner bei Bedarf und individuelle Fallbearbeitung.</li>
              </ul>
            </div>

            {/* Vorteil 4 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 hover:border-brand-700/30 transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Volle Kostentransparenz & Fairness</h3>
              <ul className="space-y-2 text-text-900/70">
                <li>• Keine Kosten für Sie im außergerichtlichen Mahnverfahren.</li>
                <li>• Im Erfolgsfall erhalten Sie 100% Ihrer Hauptforderung plus Nebenforderungen.</li>
                <li>• Klare Kommunikation über alle eventuellen Kosten.</li>
              </ul>
            </div>

            {/* Vorteil 5 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:scale-105 hover:border-brand-700/30 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <Shield className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
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
