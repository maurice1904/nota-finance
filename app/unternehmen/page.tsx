import { Target, Heart, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UnternehmenPage() {
  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface-100 h-[calc(100dvh-5rem)] flex flex-col justify-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-text-900 mb-8 leading-tight text-center">
              Über <span className="text-brand-900">Nota Finance</span>
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-text-900/70 leading-relaxed mb-8">
                Nota Finance ist die innovative Digital-Marke der twenty4collect GmbH, einem digitalen 
                Vorreiter und BDIU-zertifizierten Inkassounternehmen mit über 15 Jahren Erfahrung im 
                Forderungsmanagement in Deutschland. Bereits 2017 konnte das Unternehmen mit Deutschlands 
                erster Mobile-Lösung im Forderungsmanagement überzeugen und auf dem G20 Young Entrepreneurs' 
                Alliance Summit in Berlin den IHK / DIHK Digital Award gewinnen.
              </p>
              <p className="text-xl text-text-900/70 leading-relaxed">
                Als klarer Vorreiter im digitalen Forderungsmanagement in Deutschland folgt nun die 
                Weiterentwicklung durch Nota Finance: noch einfacher, noch schneller, noch effizienter - 
                für Ihre Forderungen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-text-900 text-center mb-20">
            Unsere Geschichte
          </h2>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-900 via-brand-700 to-surface-100 transform -translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* 2008 */}
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-6 py-2 rounded-full font-bold text-xl mb-4">
                      2008
                    </div>
                    <h3 className="text-2xl font-bold text-text-900 mb-3">
                      Die Gründung
                    </h3>
                    <p className="text-text-900/70 leading-relaxed">
                      Gründung der twenty4collect GmbH als kundenorientiertes Inkasso-Unternehmen
                    </p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-900 rounded-full border-4 border-white shadow-lg" />
                  <div className="md:w-1/2" />
                </div>
              </div>

              {/* 2017 */}
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2" />
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-900 rounded-full border-4 border-white shadow-lg" />
                  <div className="md:w-1/2 md:pl-12">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-6 py-2 rounded-full font-bold text-xl mb-4">
                      2017
                    </div>
                    <h3 className="text-2xl font-bold text-text-900 mb-3">
                      IHK / DIHK Digital Award
                    </h3>
                    <p className="text-text-900/70 leading-relaxed">
                      Gewinn des IHK / DIHK Digital Award 2017 mit Deutschlands erster Mobile Lösung 
                      im Forderungsmanagement (24collect.de)
                    </p>
                  </div>
                </div>
              </div>

              {/* 2025 - gerichtsmahnverfahren.de */}
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-6 py-2 rounded-full font-bold text-xl mb-4">
                      2025
                    </div>
                    <h3 className="text-2xl font-bold text-text-900 mb-3">
                      Expansion: gerichtsmahnverfahren.de
                    </h3>
                    <p className="text-text-900/70 leading-relaxed">
                      Expansion mit der ersten zentralen, medienbruchfreien Plattform gerichtsmahnverfahren.de 
                      als All-in-One Lösung im Mahnverfahren mit Deutschlands zentralen Mahngerichten
                    </p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-900 rounded-full border-4 border-white shadow-lg" />
                  <div className="md:w-1/2" />
                </div>
              </div>

              {/* 2025 - Nota Finance Launch */}
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2" />
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-brand-900 to-brand-700 rounded-full border-4 border-white shadow-2xl animate-pulse" />
                  <div className="md:w-1/2 md:pl-12">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-6 py-2 rounded-full font-bold text-xl mb-4">
                      2025
                    </div>
                    <h3 className="text-2xl font-bold text-brand-900 mb-3">
                      Launch von Nota Finance
                    </h3>
                    <p className="text-text-900/70 leading-relaxed font-semibold">
                      Launch von Nota Finance als moderne Weiterentwicklung der langjährigen Inkasso-Erfahrung, 
                      um Selbstständigen sowie kleinen und mittleren Unternehmen aller Branchen die bestmögliche 
                      Lösung zu bieten
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Mission Section */}
      <section className="py-24 bg-gradient-to-br from-white to-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text-900 mb-8">
              Unsere Mission
            </h2>
            
            <p className="text-xl text-text-900/70 leading-relaxed mb-10">
              Wir machen Inkasso so einfach wie möglich und revolutionieren das Forderungsmanagement 
              für Selbstständige, Freiberufler sowie kleine und mittlere Unternehmen. Unternehmen 
              jeder Größe können bei uns direkt offene Rechnungen ohne umständlichen Anmeldeprozess 
              einreichen. Unser Ziel ist es, Ihnen eine einfache, digitale und kundenorientierte 
              Lösung zu bieten, damit Sie schnell und unkompliziert an Ihr verdientes Geld kommen 
              und sich wieder voll auf Ihr Geschäft konzentrieren können.
            </p>

            <Link
              href="/produkt"
              className="inline-flex items-center gap-2 bg-brand-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              So funktioniert es
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Unsere Werte Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-900 mb-6">
              Unsere Werte
            </h2>
            <p className="text-xl text-text-900/70 max-w-3xl mx-auto">
              Unser Handeln bei Nota Finance wird von klaren Prinzipien geleitet, die darauf 
              ausgerichtet sind, Ihnen den bestmöglichen Service zu bieten:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Wert 1 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-brand-900 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-900 mb-4">
                Maximale Einfachheit
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Von der unkomplizierten Einreichung Ihrer Forderung – auch ohne Registrierung – 
                bis hin zu einer klaren und verständlichen Kommunikation. Wir machen es Ihnen leicht.
              </p>
            </div>

            {/* Wert 2 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-brand-900 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-900 mb-4">
                Digitale Intelligenz
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Wir setzen auf innovative Technologien und smarte Automatisierung, um an sinnvollen 
                Stellen Prozesse zu beschleunigen, die Effizienz zu steigern und Ihnen wertvolle Zeit zu sparen.
              </p>
            </div>

            {/* Wert 3 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-brand-900 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-900 mb-4">
                Volle Kundenorientierung
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Der Erhalt Ihrer Geschäftsbeziehungen liegt uns am Herzen. Wir agieren stets professionell, 
                fair und lösungsorientiert im Umgang mit Ihren Kunden.
              </p>
            </div>

            {/* Wert 4 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:border-brand-900 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-900 mb-4">
                Absolute Verlässlichkeit
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Wir arbeiten sorgfältig, rechtssicher und mit höchstem Anspruch an die Qualität unserer 
                Dienstleistung, um Ihre Interessen optimal zu vertreten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-white to-surface-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-900 mb-6">
            Bereit für digitales Forderungsmanagement mit Nota Finance?
          </h2>
          
          <p className="text-lg text-text-900/70 mb-10">
            Erleben Sie den Unterschied und reichen Sie Ihre erste Forderung noch heute ein. 
            Unser Team steht Ihnen bei Fragen jederzeit gerne zur Verfügung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/einreichen"
              className="group bg-brand-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Fall einreichen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/kontakt"
              className="group bg-white text-text-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-border-subtle hover:border-brand-900 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Kontakt aufnehmen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
