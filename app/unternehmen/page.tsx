"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Heart, Zap, Shield, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

export default function UnternehmenPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const [desktopLineHeight, setDesktopLineHeight] = useState(0);
  const [mobileLineHeight, setMobileLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      
      // Desktop line calculation
      if (desktopLineRef.current) {
        const lineRect = desktopLineRef.current.getBoundingClientRect();
        const lineTopInViewport = lineRect.top;
        const heightToCenter = viewportCenter - lineTopInViewport;
        const maxHeight = lineRect.height;
        const clampedHeight = Math.min(Math.max(heightToCenter, 0), maxHeight);
        setDesktopLineHeight(clampedHeight);
      }
      
      // Mobile line calculation
      if (mobileLineRef.current) {
        const lineRect = mobileLineRef.current.getBoundingClientRect();
        const lineTopInViewport = lineRect.top;
        const heightToCenter = viewportCenter - lineTopInViewport;
        const maxHeight = lineRect.height;
        const clampedHeight = Math.min(Math.max(heightToCenter, 0), maxHeight);
        setMobileLineHeight(clampedHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-surface-100/30 to-brand-700/8 min-h-[calc(100dvh-5rem)] flex flex-col justify-center py-12 sm:py-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
          style={{ backgroundImage: "url('/Hero-SubSites.png')" }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight text-center">
              Über <span className="text-brand-900">Nota Finance</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-text-900/70">
              <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed mb-6 sm:mb-8">
                Nota Finance ist die innovative Digital-Marke der twenty4collect GmbH, einem digitalen 
                Vorreiter und BDIU-zertifizierten Inkassounternehmen mit über 15 Jahren Erfahrung im 
                Forderungsmanagement in Deutschland. Bereits 2017 konnte das Unternehmen mit Deutschlands 
                erster Mobile-Lösung im Forderungsmanagement überzeugen und auf dem G20 Young Entrepreneurs' 
                Alliance Summit in Berlin den IHK / DIHK Digital Award gewinnen.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
                Als klarer Vorreiter im digitalen Forderungsmanagement in Deutschland folgt nun die 
                Weiterentwicklung durch Nota Finance: noch einfacher, noch schneller, noch effizienter - 
                für Ihre Forderungen.
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce-gentle">
            <ChevronDown className="w-6 h-6 text-brand-900" strokeWidth={2.5} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 text-center mb-12 sm:mb-20">
            Unsere Geschichte
          </h2>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto">
            {/* Desktop: Vertical Timeline Line with Scroll Animation (center) */}
            <div 
              ref={desktopLineRef}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 overflow-hidden"
            >
              {/* Background line (subtle) */}
              <div className="absolute inset-0 bg-border-subtle rounded-full" />
              {/* Animated line (brand gradient) */}
              <div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-900 via-brand-700 to-brand-900 rounded-full"
                style={{ height: `${desktopLineHeight}px` }}
              />
            </div>
            
            {/* Mobile: Vertical Timeline Line with Scroll Animation (left side) */}
            <div 
              ref={mobileLineRef}
              className="md:hidden absolute left-2 top-4 bottom-4 w-0.5 overflow-hidden"
            >
              {/* Background line (subtle) */}
              <div className="absolute inset-0 bg-border-subtle rounded-full" />
              {/* Animated line (brand gradient) */}
              <div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-900 via-brand-700 to-brand-900 rounded-full"
                style={{ height: `${mobileLineHeight}px` }}
              />
            </div>

            {/* Timeline Items */}
            {/* Circle top position: Year badge (~40px) + mb-4 (16px) + half of h3 line height (~16px) - half circle (12px) = ~60px */}
            <div className="space-y-12 md:space-y-16">
              {/* 2008 */}
              <div className="relative pl-6 md:pl-0">
                {/* Mobile circle - centered on line (left-2 + w-0.5/2 = 8px + 1px = 9px, minus half circle width) */}
                <div className="md:hidden absolute top-2 w-4 h-4 bg-brand-900 rounded-full border-2 border-white shadow-sm" style={{ left: '1px' }} />
                <div className="md:flex">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-base md:text-xl mb-3 md:mb-4">
                      2008
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-2 md:mb-3">
                      Die Gründung
                    </h3>
                    <p className="text-text-900/70 leading-relaxed text-sm md:text-base">
                      Gründung der twenty4collect GmbH als kundenorientiertes, digitales Inkasso-Unternehmen
                    </p>
                  </div>
                  {/* Desktop circle aligned with h3 heading */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-900 rounded-full border-4 border-white shadow-lg" style={{ top: '66px' }} />
                  <div className="md:w-1/2" />
                </div>
              </div>

              {/* 2017 */}
              <div className="relative pl-6 md:pl-0">
                {/* Mobile circle - centered on line */}
                <div className="md:hidden absolute top-2 w-4 h-4 bg-brand-900 rounded-full border-2 border-white shadow-sm" style={{ left: '1px' }} />
                <div className="md:flex">
                  <div className="md:w-1/2" />
                  {/* Desktop circle aligned with h3 heading */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-900 rounded-full border-4 border-white shadow-lg" style={{ top: '66px' }} />
                  <div className="md:w-1/2 md:pl-12">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-base md:text-xl mb-3 md:mb-4">
                      2017
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-2 md:mb-3">
                      IHK / DIHK Digital Award
                    </h3>
                    <p className="text-text-900/70 leading-relaxed text-sm md:text-base">
                      Gewinn des IHK / DIHK Digital Award 2017 mit Deutschlands erster Mobile Lösung 
                      im Forderungsmanagement (24collect.de)
                    </p>
                  </div>
                </div>
              </div>

              {/* 2025 - gerichtsmahnverfahren.de */}
              <div className="relative pl-6 md:pl-0">
                {/* Mobile circle - centered on line */}
                <div className="md:hidden absolute top-2 w-4 h-4 bg-brand-900 rounded-full border-2 border-white shadow-sm" style={{ left: '1px' }} />
                <div className="md:flex">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-base md:text-xl mb-3 md:mb-4">
                      2025
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-2 md:mb-3">
                      Expansion: gerichtsmahnverfahren.de
                    </h3>
                    <p className="text-text-900/70 leading-relaxed text-sm md:text-base">
                      Expansion mit der ersten zentralen, medienbruchfreien Plattform gerichtsmahnverfahren.de 
                      als All-in-One Lösung im Mahnverfahren mit Deutschlands zentralen Mahngerichten
                    </p>
                  </div>
                  {/* Desktop circle aligned with h3 heading */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-900 rounded-full border-4 border-white shadow-lg" style={{ top: '66px' }} />
                  <div className="md:w-1/2" />
                </div>
              </div>

              {/* 2026 - Nota Finance Launch */}
              <div className="relative pl-6 md:pl-0">
                {/* Mobile circle - slightly larger, centered on line */}
                <div className="md:hidden absolute top-2 w-5 h-5 bg-gradient-to-br from-brand-900 to-brand-700 rounded-full border-2 border-white shadow-md" style={{ left: '-1px' }} />
                <div className="md:flex">
                  <div className="md:w-1/2" />
                  {/* Desktop circle aligned with h3 heading - no animate-pulse, slightly larger */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-brand-900 to-brand-700 rounded-full border-4 border-white shadow-2xl" style={{ top: '62px' }} />
                  <div className="md:w-1/2 md:pl-12">
                    <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-base md:text-xl mb-3 md:mb-4">
                      2026
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-900 mb-2 md:mb-3">
                      Launch von Nota Finance
                    </h3>
                    <p className="text-text-900/70 leading-relaxed font-semibold text-sm md:text-base">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-6 sm:mb-8">
              Unsere Mission
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed mb-8 sm:mb-10">
              Wir machen Inkasso so einfach wie möglich und revolutionieren das Forderungsmanagement 
              für Selbstständige, Freiberufler sowie kleine und mittlere Unternehmen. Unternehmen 
              jeder Größe können bei uns direkt offene Rechnungen ohne umständlichen Anmeldeprozess 
              einreichen. Unser Ziel ist es, Ihnen eine einfache, digitale und kundenorientierte 
              Lösung zu bieten, damit Sie schnell und unkompliziert an Ihr verdientes Geld kommen 
              und sich wieder voll auf Ihr Geschäft konzentrieren können.
            </p>

            <Link
              href="/produkt"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-text-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              So funktioniert es
              <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-brand-700 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Unsere Werte Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
              Unsere Werte
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 max-w-3xl mx-auto">
              Unser Handeln bei Nota Finance wird von klaren Prinzipien geleitet, die darauf 
              ausgerichtet sind, Ihnen den bestmöglichen Inkasso-Service zu bieten:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Wert 1 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
                Maximale Einfachheit
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Von der unkomplizierten Einreichung Ihrer Forderung – auch ohne Registrierung – 
                bis hin zu einer klaren und verständlichen Kommunikation. Wir machen es Ihnen leicht.
              </p>
            </div>

            {/* Wert 2 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
                Digitale Intelligenz
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Wir setzen auf innovative Technologien und smarte Automatisierung, um an sinnvollen 
                Stellen Prozesse zu beschleunigen, die Effizienz zu steigern und Ihnen wertvolle Zeit zu sparen.
              </p>
            </div>

            {/* Wert 3 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
                Volle Kundenorientierung
              </h3>
              <p className="text-text-900/70 leading-relaxed">
                Der Erhalt Ihrer Geschäftsbeziehungen liegt uns am Herzen. Wir agieren stets professionell, 
                fair und lösungsorientiert im Umgang mit Ihren Kunden.
              </p>
            </div>

            {/* Wert 4 */}
            <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-3 sm:mb-4">
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
      <CTASection
        title="Jetzt digitales Inkasso beauftragen"
        subtitle="Reichen Sie jetzt direkt einen Fall oder mehrere Fälle ein. Oder nehmen Sie mit uns Kontakt auf, wenn Sie Fragen haben oder eine individuelle Beratung wünschen."
        buttons={[
          { text: "Kontakt aufnehmen", href: "/kontakt" },
          { text: "Fall einreichen", href: "/einreichen", primary: true },
        ]}
      />
    </main>
  );
}
