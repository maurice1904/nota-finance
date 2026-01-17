"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, CheckCircle, Target, FileText, Scale, ArrowRight } from "lucide-react";

export default function ProcessTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !lineRef.current) return;

      const lineRect = lineRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      // Calculate line height: from line top to viewport center
      // Line top position relative to viewport
      const lineTopInViewport = lineRect.top;
      
      // Distance from line top to viewport center
      const heightToCenter = viewportCenter - lineTopInViewport;
      
      // Clamp between 0 and full line height
      const maxHeight = lineRect.height;
      const clampedHeight = Math.min(Math.max(heightToCenter, 0), maxHeight);
      
      setLineHeight(clampedHeight);
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
    <div ref={timelineRef} className="relative max-w-4xl mx-auto">
      {/* Vertical Timeline Line with Scroll Animation */}
      {/* Line starts at center of circle 1 and ends at center of circle 3 */}
      {/* Line is 2x thick (w-1) and animated edge always at viewport center */}
      {/* Mobile: left-8 = center of 16w circle. Desktop (sm+): same position */}
      {/* Top: mt-4 (16px) + circle radius (32px) = 48px on mobile, sm:mt-6 (24px) + 32px = 56px on desktop */}
      {/* Bottom: same calculation for step 3 */}
      <div 
        ref={lineRef}
        className="absolute left-8 w-1 overflow-hidden" 
        style={{ top: 'calc(1rem + 2rem)', bottom: 'calc(1rem + 2rem)' }}
      >
        {/* Background line (subtle) */}
        <div className="absolute inset-0 bg-border-subtle rounded-full" />
        {/* Animated line (brand gradient) - bottom edge fixed at viewport center */}
        <div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-900 via-brand-700 to-brand-900 rounded-full"
          style={{ height: `${lineHeight}px` }}
        />
      </div>
      
      {/* ===== SCHRITT 1: Falleinreichung ===== */}
      <div className="relative mb-8 sm:mb-0">
        <div className="flex items-start gap-4 sm:gap-8">
          {/* Timeline Node - centered with icon inside card */}
          {/* Mobile: p-6 (24px) + h-12/2 (24px) = 48px icon center. Circle h-16/2 = 32px. mt = 48-32 = 16px = mt-4 */}
          {/* Desktop: p-8 (32px) + h-12/2 (24px) = 56px icon center. Circle h-16/2 = 32px. mt = 56-32 = 24px = sm:mt-6 */}
          <div className="relative z-10 flex-shrink-0 mt-4 sm:mt-6">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-white font-bold text-xl">1</span>
            </div>
          </div>
          
          {/* Content Card */}
          <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border-subtle sm:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-brand-700/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-900">
                Die einfache Falleinreichung
              </h3>
            </div>
            
            <div className="space-y-4 text-text-900/70">
              <div>
                <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">Einfach & Unkompliziert:</h4>
                <p className="leading-relaxed">
                  Sie reichen Ihre offenen Rechnungen einfach per Upload (PDF, XRechnung, ZUGFeRD) 
                  oder Drag & Drop auf unserer Website, per E-Mail, oder API-Anbindung ein.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">Ohne Registrierungszwang:</h4>
                <p className="leading-relaxed">
                  Für die Einreichung einzelner Fälle ist keine vorherige Registrierung notwendig. 
                 
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

      {/* ===== SCHRITT 2: Das Nota-Inkasso ===== */}
      <div className="relative mb-8 sm:mb-0">
        <div className="flex items-start gap-4 sm:gap-8">
          {/* Timeline Node - centered with icon inside card */}
          <div className="relative z-10 flex-shrink-0 mt-4 sm:mt-6">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-white font-bold text-xl">2</span>
            </div>
          </div>
          
          {/* Content Card */}
          <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border-subtle sm:mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-700/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-900">
                Wir übernehmen
              </h3>
            </div>
            
            {/* Sub-Process: Außergerichtlich → Gerichtlich */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Sub-Step I: Außergerichtliches Mahnverfahren */}
              <div className="relative bg-gradient-to-br from-white to-surface-100/50 rounded-xl p-5 sm:p-6 border border-border-subtle hover:border-brand-700/30 hover:shadow-lg transition-all duration-300">
                {/* Sub-step badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    I
                  </div>
                  <FileText className="w-5 h-5 text-brand-700 flex-shrink-0" />
                </div>
                
                <h4 className="text-lg sm:text-xl font-bold text-text-900 mb-3 min-h-[3.5rem] flex items-center">
                  Das außergerichtliche Mahnverfahren
                </h4>
                
                <div className="space-y-3 text-text-900/70 text-sm md:text-base">
                  <div>
                    <h5 className="font-bold text-text-900 mb-1 text-sm md:text-base">Professionelle Kommunikation:</h5>
                    <p className="leading-relaxed">
                      Wir nehmen Kontakt zu Ihren säumigen Kunden auf und erinnern sie freundlich, 
                      aber bestimmt an die offene Zahlung und bewahren dabei Ihre Kundenbeziehung.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-text-900 mb-1 text-sm md:text-base">Individuelle Strategie:</h5>
                    <p className="leading-relaxed">
                      Je nach Fall und Reaktion des Schuldners passen wir unsere Vorgehensweise an. 
                      Wir setzen auf Dialog und suchen nach gemeinsamen Lösungen.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-text-900 mb-1 text-sm md:text-base">Keine Kosten für Sie:</h5>
                    <p className="leading-relaxed">
                      Im gesamten außergerichtlichen Mahnverfahren entstehen Ihnen als Auftraggeber 
                      keinerlei Kosten. Die gesetzlich festgelegten Mahngebühren trägt der Schuldner.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Arrow for mobile only (between cards) */}
              <div className="flex md:hidden justify-center -my-2">
                <div className="w-8 h-8 bg-surface-100 rounded-full flex items-center justify-center border border-border-subtle rotate-90">
                  <ArrowRight className="w-4 h-4 text-brand-700" />
                </div>
              </div>
              
              {/* Sub-Step II: Gerichtliches Mahnverfahren */}
              <div className="relative bg-gradient-to-br from-white to-surface-100/50 rounded-xl p-5 sm:p-6 border border-border-subtle hover:border-brand-700/30 hover:shadow-lg transition-all duration-300">
                {/* Sub-step badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    II
                  </div>
                  <Scale className="w-5 h-5 text-brand-700 flex-shrink-0" />
                </div>
                
                <h4 className="text-lg sm:text-xl font-bold text-text-900 mb-3 min-h-[3.5rem] flex items-center">
                  Das gerichtliche Mahnverfahren
                </h4>
                
                <div className="space-y-3 text-text-900/70 text-sm md:text-base">
                  <div>
                    <h5 className="font-bold text-text-900 mb-1 text-sm md:text-base">Nur nach Rücksprache:</h5>
                    <p className="leading-relaxed">
                      Sollte das außergerichtliche Verfahren nicht zum Erfolg führen, besprechen wir 
                      mit Ihnen das weitere Vorgehen. Erst nach Rücksprache leiten wir das gerichtliche 
                      Mahnverfahren ein.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-text-900 mb-1 text-sm md:text-base">Transparente Prozesse:</h5>
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
      </div>

      {/* ===== SCHRITT 3: Zahlung erhalten ===== */}
      <div className="relative">
        <div className="flex items-start gap-4 sm:gap-8">
          {/* Timeline Node - centered with icon inside card */}
          <div className="relative z-10 flex-shrink-0 mt-4 sm:mt-6">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-900 to-brand-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-white font-bold text-xl">3</span>
            </div>
          </div>
          
          {/* Content Card */}
          <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border-subtle">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-900">
                Zahlung erhalten
              </h3>
            </div>
            
            <div className="space-y-4 text-text-900/70">
              <div>
                <h4 className="font-bold text-base sm:text-lg text-text-900 mb-2">100% für Sie:</h4>
                <p className="leading-relaxed">
                  Sobald Ihr Kunde die Forderung begleicht, erhalten Sie 100% des ursprünglichen Rechnungsbetrages 
                  Ihrer Ausgangsrechnung.
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
  );
}
