"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Upload, CheckCircle, Euro, ArrowRight, Handshake } from "lucide-react";
import CTASection from "@/components/CTASection";
import TrustSlider from "@/components/TrustSlider";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const stepsVerticalLineRef = useRef<HTMLDivElement>(null);
  const [desktopLineHeight, setDesktopLineHeight] = useState(0);
  const [mobileLineHeight, setMobileLineHeight] = useState(0);
  const [horizontalLineWidth, setHorizontalLineWidth] = useState(0);
  const [stepsVerticalLineHeight, setStepsVerticalLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      // Service Timeline - Desktop Line Calculation
      if (desktopLineRef.current) {
        const lineRect = desktopLineRef.current.getBoundingClientRect();
        const lineTopInViewport = lineRect.top;
        const heightToCenter = viewportCenter - lineTopInViewport;
        const maxHeight = lineRect.height;
        setDesktopLineHeight(Math.min(Math.max(heightToCenter, 0), maxHeight));
      }

      // Service Timeline - Mobile Line Calculation
      if (mobileLineRef.current) {
        const lineRect = mobileLineRef.current.getBoundingClientRect();
        const lineTopInViewport = lineRect.top;
        const heightToCenter = viewportCenter - lineTopInViewport;
        const maxHeight = lineRect.height;
        setMobileLineHeight(Math.min(Math.max(heightToCenter, 0), maxHeight));
      }

      // Horizontal Line Calculation ("So einfach ist es" - Desktop)
      // Uses a longer scroll distance for a slower, smoother fill
      if (horizontalLineRef.current) {
        const lineRect = horizontalLineRef.current.getBoundingClientRect();
        const lineWidth = lineRect.width;
        
        // The line starts filling when it enters the viewport (bottom 20%)
        // and completes when it reaches the top 40% of the viewport
        const startPoint = window.innerHeight * 0.8; // Start at 80% down the viewport
        const endPoint = window.innerHeight * 0.3;   // Complete at 30% down the viewport
        const scrollRange = startPoint - endPoint;   // Total scroll distance for animation
        
        const lineCenterY = lineRect.top + lineRect.height / 2;
        const progress = (startPoint - lineCenterY) / scrollRange;
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        
        setHorizontalLineWidth(clampedProgress * lineWidth);
      }

      // Steps Vertical Line Calculation ("So einfach ist es" - Mobile/Tablet)
      if (stepsVerticalLineRef.current) {
        const lineRect = stepsVerticalLineRef.current.getBoundingClientRect();
        const lineTopInViewport = lineRect.top;
        const heightToCenter = viewportCenter - lineTopInViewport;
        const maxHeight = lineRect.height;
        setStepsVerticalLineHeight(Math.min(Math.max(heightToCenter, 0), maxHeight));
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
      <section className="relative overflow-hidden min-h-[calc(100dvh-5rem)] flex flex-col">
        {/* Background Image with Slow Zoom Effect */}
        {/* Mobile: Show left edge (more interesting), Desktop: Center */}
        <div 
          className="absolute inset-0 bg-cover bg-[left_25%_center] sm:bg-center bg-no-repeat animate-slow-zoom"
          style={{ backgroundImage: "url('/hero-bg-2.jpeg')" }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.75),rgba(255,255,255,0.3)_50%,rgba(27,82,215,0.05)_100%)]" />
        
        {/* Main Hero Content - Centered */}
        <div className="relative flex-1 flex flex-col justify-center py-12 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto">
              {/* Headline - immediate fade-in */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight animate-fade-in-up">
                Ihre Forderung.
                <br />
                <span className="text-brand-900">Unsere Mission.</span>
              </h1>
              
              {/* Description - delayed 200ms */}
              <p className="text-base sm:text-lg md:text-xl text-text-900/70 mb-8 sm:mb-12 leading-relaxed animate-fade-in-up-delay-1">
                Inkasso der neusten Generation: Einfach, digital, zuverlässig. 
                Laden Sie einfach Ihre Rechnung hoch und wir kümmern uns um den Rest. Die effizienteste 
                Inkasso-Lösung für Selbstständige sowie kleine und mittlere Unternehmen aller 
                Branchen mit Forderungshöhen ab 50€.
              </p>

              {/* CTA Buttons - delayed 400ms */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
                <Link
                  href="/kontakt"
                  className="group bg-white/50 backdrop-blur-sm text-text-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-border-subtle hover:bg-white/80 hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring flex-1 sm:flex-initial sm:min-w-[240px]"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-brand-700 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
                
                <Link
                  href="/einreichen"
                  className="group bg-brand-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-brand-900 hover:bg-brand-700 hover:border-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring flex-1 sm:flex-initial sm:min-w-[240px]"
                >
                  Fall einreichen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Slider - Separate Section with Fade-in */}
      <TrustSlider />

      {/* Erklärung Section - So einfach ist es */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 text-center mb-12 sm:mb-16">
              So einfach ist es
            </h2>
          </RevealOnScroll>

          <div className="relative">
            {/* Horizontal Connecting Line (Desktop only) */}
            {/* Line starts at center of icon 1 and ends at center of icon 3 */}
            {/* Each column is 33.33%, so centers are at 16.666% and 83.333% */}
            <div 
              ref={horizontalLineRef}
              className="hidden md:block absolute top-10 left-[16.666%] right-[16.666%] h-1 overflow-hidden"
            >
              {/* Background line (subtle) */}
              <div className="absolute inset-0 bg-border-subtle rounded-full" />
              {/* Animated line (brand gradient) */}
              <div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-brand-900 via-brand-700 to-brand-900 rounded-full"
                style={{ width: `${horizontalLineWidth}px` }}
              />
            </div>

            {/* Vertical Connecting Line (Mobile/Tablet only) */}
            <div 
              ref={stepsVerticalLineRef}
              className="md:hidden absolute left-6 top-10 bottom-10 w-1 overflow-hidden"
            >
              {/* Background line (subtle) */}
              <div className="absolute inset-0 bg-border-subtle rounded-full" />
              {/* Animated line (brand gradient) */}
              <div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-900 via-brand-700 to-brand-900 rounded-full"
                style={{ height: `${stepsVerticalLineHeight}px` }}
              />
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-12">
              {/* Schritt 1 */}
              <RevealOnScroll delay={0}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-4">
                    Fall einreichen
                  </h3>
                  <p className="text-sm md:text-base text-text-900/70 leading-relaxed">
                    Reichen Sie Ihren Fall oder mehrere Fälle direkt per Upload oder Drag-&-Drop ein. 
                    Als PDF-Datei, als E-Rechnung im XRechnungs Format oder als E-Rechnung im ZUGFeRD 
                    Format. Sie können Ihre Fälle alternativ auch per Mail einreichen.
                  </p>
                </div>
              </RevealOnScroll>

              {/* Schritt 2 */}
              <RevealOnScroll delay={100}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-4">
                    Wir übernehmen
                  </h3>
                  <p className="text-sm md:text-base text-text-900/70 leading-relaxed">
                    Den Eingang inklusive Aktenzeichen bestätigen wir automatisch nach Prüfung der 
                    Dokumente per Bestätigungs-E-Mail. Wir führen das außergerichtliche Mahnverfahren 
                    durch und leiten bei Bedarf nach Rücksprache mit Ihnen auch das gerichtliche 
                    Mahnverfahren ein.
                  </p>
                </div>
              </RevealOnScroll>

              {/* Schritt 3 */}
              <RevealOnScroll delay={200}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <Euro className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-4">
                    Zahlung erhalten
                  </h3>
                  <p className="text-sm md:text-base text-text-900/70 leading-relaxed">
                    Sobald der Kunde die Forderung beglichen hat, erhalten Sie 100% des Rechnungsbetrages. 
                    Die gesetzlich festgelegten Gebühren sind nicht von Ihnen, sondern vom Schuldner zu tragen.
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            {/* Mobile/Tablet Layout with left-aligned timeline */}
            <div className="md:hidden space-y-8">
              {/* Schritt 1 */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center shadow-lg z-10">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="pl-6 flex-1">
                  <h3 className="text-lg font-bold text-text-900 mb-2">
                    Fall einreichen
                  </h3>
                  <p className="text-sm text-text-900/70 leading-relaxed">
                    Reichen Sie Ihren Fall oder mehrere Fälle direkt per Upload oder Drag-&-Drop ein. 
                    Als PDF-Datei, als E-Rechnung im XRechnungs Format oder als E-Rechnung im ZUGFeRD 
                    Format. Sie können Ihre Fälle alternativ auch per Mail einreichen.
                  </p>
                </div>
              </div>

              {/* Schritt 2 */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center shadow-lg z-10">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="pl-6 flex-1">
                  <h3 className="text-lg font-bold text-text-900 mb-2">
                    Wir übernehmen
                  </h3>
                  <p className="text-sm text-text-900/70 leading-relaxed">
                    Den Eingang inklusive Aktenzeichen bestätigen wir automatisch nach Prüfung der 
                    Dokumente per Bestätigungs-E-Mail. Wir führen das außergerichtliche Mahnverfahren 
                    durch und leiten bei Bedarf nach Rücksprache mit Ihnen auch das gerichtliche 
                    Mahnverfahren ein.
                  </p>
                </div>
              </div>

              {/* Schritt 3 */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center shadow-lg z-10">
                  <Euro className="w-6 h-6 text-white" />
                </div>
                <div className="pl-6 flex-1">
                  <h3 className="text-lg font-bold text-text-900 mb-2">
                    Zahlung erhalten
                  </h3>
                  <p className="text-sm text-text-900/70 leading-relaxed">
                    Sobald der Kunde die Forderung beglichen hat, erhalten Sie 100% des Rechnungsbetrages. 
                    Die gesetzlich festgelegten Gebühren sind nicht von Ihnen, sondern vom Schuldner zu tragen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <RevealOnScroll delay={300}>
            <div className="text-center mt-16 px-4 sm:px-0">
              <Link
                href="/einreichen"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
              >
                Fall einreichen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Unser Service Section */}
      <section className="py-24 bg-gradient-to-br from-surface-100/50 via-white to-brand-700/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
                Unser Service für Sie
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-900/70 max-w-3xl mx-auto">
                Wir geben alles, damit Sie Ihr verdientes Geld erhalten.
              </p>
            </div>
          </RevealOnScroll>

          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Desktop Timeline Line (center) - with Scroll Animation */}
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

            {/* Mobile Timeline Line (left side) - with Scroll Animation */}
            <div 
              ref={mobileLineRef}
              className="md:hidden absolute left-6 top-6 bottom-6 w-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-border-subtle rounded-full" />
              <div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-900 via-brand-700 to-brand-900 rounded-full"
                style={{ height: `${mobileLineHeight}px` }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {/* Punkt I - Außergerichtlich */}
              <div className="relative flex items-start md:items-center">
                {/* Mobile: Number circle on left */}
                <div className="md:hidden flex-shrink-0 w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                  <span className="text-white font-bold">I</span>
                </div>
                
                {/* Mobile: Content on right */}
                <div className="md:hidden pl-6 flex-1">
                  <h3 className="text-lg font-bold text-text-900 mb-2">
                    Außergerichtliches Mahnverfahren
                  </h3>
                  <p className="text-text-900/70 leading-relaxed text-sm">
                    Wir erinnern Ihre Kunden an offene Rechnungen und führen das außergerichtliche 
                    Mahnverfahren durch. Im außergerichtlichen Mahnverfahren entstehen Ihnen als 
                    Auftraggeber dabei keinerlei Kosten. Ihre säumigen Kunden zahlen gesetzlich 
                    festgelegte Gebühren.
                  </p>
                </div>

                {/* Desktop: Content on left */}
                <div className="hidden md:block md:w-1/2 md:pr-12 text-right">
                  <h3 className="text-xl md:text-2xl font-bold text-text-900 mb-3">
                    Außergerichtliches Mahnverfahren
                  </h3>
                  <p className="text-text-900/70 leading-relaxed">
                    Wir erinnern Ihre Kunden an offene Rechnungen und führen das außergerichtliche 
                    Mahnverfahren durch. Im außergerichtlichen Mahnverfahren entstehen Ihnen als 
                    Auftraggeber dabei keinerlei Kosten. Ihre säumigen Kunden zahlen gesetzlich 
                    festgelegte Gebühren.
                  </p>
                </div>
                
                {/* Desktop: Center circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-brand-700 rounded-full items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white font-bold">I</span>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>

              {/* Punkt II - Gerichtlich */}
              <div className="relative flex items-start md:items-center">
                {/* Mobile: Number circle on left */}
                <div className="md:hidden flex-shrink-0 w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                  <span className="text-white font-bold">II</span>
                </div>
                
                {/* Mobile: Content on right */}
                <div className="md:hidden pl-6 flex-1">
                  <h3 className="text-lg font-bold text-text-900 mb-2">
                    Gerichtliches Mahnverfahren
                  </h3>
                  <p className="text-text-900/70 leading-relaxed text-sm">
                    Sollten Ihre Kunden auch nach 10 Tagen nicht zahlen, führen wir nach Rücksprache 
                    mit Ihnen das gerichtliche Mahnverfahren zur finalen Klärung durch. Dabei entstehen 
                    transparente, gesetzlich festgelegte Gebühren, welche im Erfolgsfall nicht von Ihnen, 
                    sondern vom säumigen Kunden zu zahlen sind.
                  </p>
                </div>

                {/* Desktop: Empty left side */}
                <div className="hidden md:block md:w-1/2" />
                
                {/* Desktop: Center circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-brand-700 rounded-full items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white font-bold">II</span>
                </div>
                
                {/* Desktop: Content on right */}
                <div className="hidden md:block md:w-1/2 md:pl-12">
                  <h3 className="text-xl md:text-2xl font-bold text-text-900 mb-3">
                    Gerichtliches Mahnverfahren
                  </h3>
                  <p className="text-text-900/70 leading-relaxed">
                    Sollten Ihre Kunden auch nach 10 Tagen nicht zahlen, führen wir nach Rücksprache 
                    mit Ihnen das gerichtliche Mahnverfahren zur finalen Klärung durch. Dabei entstehen 
                    transparente, gesetzlich festgelegte Gebühren, welche im Erfolgsfall nicht von Ihnen, 
                    sondern vom säumigen Kunden zu zahlen sind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Versprechen Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
                Unser Versprechen
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-text-900/70 max-w-3xl mx-auto font-semibold">
                Im Erfolgsfall erhalten Sie 100% Ihrer Forderung plus gesetzlich festgelegte 
                Mahnkosten und Verzugszinsen.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Kachel 1 */}
            <RevealOnScroll delay={0}>
              <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300 h-full">
                <Handshake className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-4">
                  Wahrung Ihrer Kundenbeziehung
                </h3>
                <p className="text-sm md:text-base text-text-900/70 leading-relaxed">
                  Wir behandeln Ihren Kunden als Kunden und beschädigen nicht Ihre Kundenbeziehung. Ihre Kunden sollen Ihre Kunden bleiben.
                </p>
              </div>
            </RevealOnScroll>

            {/* Kachel 2 */}
            <RevealOnScroll delay={100}>
              <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300 h-full">
                <Euro className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-4">
                  Keine Kosten
                </h3>
                <p className="text-sm md:text-base text-text-900/70 leading-relaxed">
                  Für Sie  ist das außergerichtliche Mahnverfahren im Erfolgsfall in 
                  der Regel kostenfrei. Inkassokosten sind gesetzlich geregelt und werden 
                  von Ihrem säumigen Kunden (Schuldner) getragen. Sollte ein gerichtliches Mahnverfahren 
                  notwendig werden, informieren wir Sie im Vorfeld transparent über eventuell anfallende 
                  Gerichtskosten. Auch diese sind im Erfolgsfall von Ihrem Schuldner zu tragen.
                </p>
              </div>
            </RevealOnScroll>

            {/* Kachel 3 */}
            <RevealOnScroll delay={200}>
              <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-8 hover:shadow-xl hover:border-brand-700/30 transition-all duration-300 h-full">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-brand-700 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-900 mb-4">
                  Volle Rechnungsbegleichung
                </h3>
                <p className="text-sm md:text-base text-text-900/70 leading-relaxed">
                  Im Erfolgsfall erhalten Sie 100% des Rechnungsbetrages Ihrer Ausgangsrechnung 
                  zuzüglich der Ihnen zustehenden, gesetzlich festgeschriebenen Kosten für Mahnungen 
                  und Verzugszinsen bei Zahlung durch Ihren Kunden.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <RevealOnScroll>
        <CTASection
          title="Jetzt digitales Inkasso beauftragen"
          subtitle="Reichen Sie jetzt direkt einen Fall oder mehrere Fälle ein. Oder nehmen Sie mit uns Kontakt auf, wenn Sie Fragen haben oder eine individuelle Beratung wünschen."
          buttons={[
            { text: "Kontakt aufnehmen", href: "/kontakt" },
          
            { text: "Fall einreichen", href: "/einreichen", primary: true },
          ]}
        />
      </RevealOnScroll>
      </main>
  );
}
