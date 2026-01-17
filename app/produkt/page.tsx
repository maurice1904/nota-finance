import { Upload, CheckCircle, Users, Shield, Zap, Target, Clock, ChevronDown, AlertCircle, Check } from "lucide-react";
import CTASection from "@/components/CTASection";
import ProcessTimeline from "@/components/ProcessTimeline";
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

          <ProcessTimeline />
        </div>
      </section>

      {/* Die Vorteile Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 text-center mb-12 sm:mb-16">
            Warum Nota Finance
          </h2>

          {/* Erste Reihe: 3 Boxen auf Desktop, 2+1 auf Tablet, gestapelt auf Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Vorteil 1 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Maximale Einfachheit</h3>
              <ul className="space-y-2.5 text-text-900/70 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Intuitive Online-Einreichung Ihrer Rechnungen in wenigen Minuten.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Keine komplizierten Formulare, keine Registrierung für Einzelfälle.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Unterstützung aller gängigen Rechnungsformate (PDF, XRechnung, ZUGFeRD).</span>
                </li>
              </ul>
            </div>

            {/* Vorteil 2 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Digitale Effizienz</h3>
              <ul className="space-y-2.5 text-text-900/70 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Automatisierte Prozesse für schnelle Bearbeitung und kurze Reaktionszeiten.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Weniger Papierkram, mehr Zeit für Ihr Kerngeschäft.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Optionale API-Schnittstelle für nahtlose Integration.</span>
                </li>
              </ul>
            </div>

            {/* Vorteil 3 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300 md:col-span-2 md:max-w-md md:justify-self-center lg:col-span-1 lg:max-w-none lg:justify-self-auto">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Absolute Kundenorientierung</h3>
              <ul className="space-y-2.5 text-text-900/70 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Wir behandeln Ihre Kunden stets respektvoll und fair, um Ihre Geschäftsbeziehungen zu schützen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Persönliche Ansprechpartner bei Bedarf und individuelle Fallbearbeitung.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Zweite Reihe: 2 Boxen zentriert auf Desktop & Tablet */}
          <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-8 mt-6 lg:mt-8">
            {/* Vorteil 4 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.333rem)]">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Volle Kostentransparenz & Fairness</h3>
              <ul className="space-y-2.5 text-text-900/70 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Keine Kosten für Sie im außergerichtlichen Mahnverfahren.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Im Erfolgsfall erhalten Sie 100% Ihrer Hauptforderung plus Nebenforderungen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Klare Kommunikation über alle eventuellen Kosten.</span>
                </li>
              </ul>
            </div>

            {/* Vorteil 5 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.333rem)]">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">Zuverlässigkeit & Sicherheit</h3>
              <ul className="space-y-2.5 text-text-900/70 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Profitieren Sie von über 15 Jahren Erfahrung und der etablierten Infrastruktur von 24collect.de, einem etablierten und zertifizierten Inkasso-Unternehmen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-700 flex-shrink-0 mt-1" strokeWidth={2.5} />
                  <span>Rechtssichere Abwicklung und Einhaltung aller Datenschutzrichtlinien (DSGVO-konform).</span>
                </li>
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
