"use client";

import { useState } from "react";
import { Euro, CheckCircle, TrendingUp, ChevronDown, Info, X, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import RevealOnScroll from "@/components/RevealOnScroll";

// Beispielrechnung data
const calculationRows = [
  {
    label: "Ihre Ausgangsrechnung",
    amount: "199,18 €",
    prefix: "",
    tooltip: "Das ist der ursprüngliche Rechnungsbetrag (Hauptforderung).",
    highlight: false,
    isYourMoney: true,
  },
  {
    label: "Ihre Mahnkosten",
    amount: "20,00 €",
    prefix: "+",
    tooltip: "Pauschale für Mahnschreiben / außergerichtliche Erinnerungen; wird dem Schuldner zusätzlich berechnet.",
    highlight: false,
    isYourMoney: true,
  },
  {
    label: "Verzugszinsen",
    amount: "2,56 €",
    prefix: "+",
    tooltip: "Zinsen wegen Zahlungsverzugs; abhängig von Forderung, Zinssatz und Verzugsdauer.",
    highlight: false,
    isYourMoney: true,
  },
  {
    label: "Gebührenforderung Nota Finance gemäß RDGEG i.V.m. dem RVG, gesetzlich geregelt",
    amount: "49,00 €",
    prefix: "+",
    tooltip: "Gesetzlich geregelte Inkassogebühr (RDGEG / RVG-orientiert) – Betrag wird dem Schuldner in Rechnung gestellt.",
    highlight: false,
    isYourMoney: false,
  },
  {
    label: "zuzügl. Auslagenpauschale, gesetzlich geregelt",
    amount: "11,70 €",
    prefix: "+",
    tooltip: "Pauschale für Auslagen (Porto etc.), gesetzlich vorgesehen und dem Schuldner berechnbar.",
    highlight: false,
    isYourMoney: false,
  },
  {
    label: "Gesamtzahlungsaufforderung an Ihren Kunden",
    amount: "282,44 €",
    prefix: "=",
    tooltip: "Summe aller Posten: das ist der Gesamtbetrag, den der Schuldner zahlen soll.",
    highlight: true,
    isYourMoney: false,
  },
  {
    label: "Ihr Kunde zahlt an uns",
    amount: "282,44 €",
    prefix: "",
    tooltip: "Der Schuldner begleicht die vollständige Forderung inklusive Gebühren und Auslagen an das Inkassounternehmen.",
    highlight: false,
    isYourMoney: false,
  },
  {
    label: "Wir zahlen an Sie aus",
    amount: "221,74 €",
    prefix: "+",
    tooltip: "Ausgezahlter Betrag an den Auftraggeber: Rechnungsbetrag + Mahnkosten + Verzugszinsen = 221,74 €. Inkassogebühr + Auslagenpauschale werden einbehalten (60,70 €).",
    isPayout: true,
    isYourMoney: true,
  },
  {
    label: "Ihre Kosten",
    amount: "0,00 €",
    prefix: "",
    tooltip: "Im außergerichtlichen Verfahren entstehen dem Auftraggeber in der Regel keine Kosten – die gesetzlichen Inkassokosten trägt der Schuldner bei Zahlung.",
    isFinal: true,
  },
];

function TooltipRow({ 
  label, 
  amount,
  prefix,
  tooltip, 
  highlight, 
  isFinal,
  isPayout,
  isYourMoney,
  activeTooltip,
  setActiveTooltip,
  index
}: {
  label: string;
  amount: string;
  prefix?: string;
  tooltip: string;
  highlight?: boolean;
  isFinal?: boolean;
  isPayout?: boolean;
  isYourMoney?: boolean;
  activeTooltip: number | null;
  setActiveTooltip: (index: number | null) => void;
  index: number;
}) {
  const isActive = activeTooltip === index;
  
  return (
    <div className={`
      relative py-4 px-4 sm:px-6 rounded-xl transition-all duration-200
      ${isFinal ? 'bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/30' : ''}
      ${isPayout ? 'bg-gradient-to-r from-brand-900 to-brand-700 text-white' : ''}
      ${highlight && !isFinal && !isPayout ? 'bg-gradient-to-r from-brand-700/10 to-brand-700/5 border border-brand-700/20' : ''}
      ${!highlight && !isFinal && !isPayout ? 'border-b border-border-subtle' : ''}
    `}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        {/* Label with info icon */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            onClick={() => setActiveTooltip(isActive ? null : index)}
            className={`flex-shrink-0 p-1 -ml-1 rounded-full transition-colors duration-200 group ${isPayout ? 'hover:bg-white/20' : isFinal ? 'hover:bg-success/10' : 'hover:bg-brand-700/10'}`}
            aria-label={`Info zu ${label}`}
          >
            <Info className={`w-4 h-4 transition-colors duration-200 ${isPayout ? 'text-white/80 group-hover:text-white' : isFinal ? 'text-success group-hover:text-success' : isActive ? 'text-brand-900' : 'text-brand-700 group-hover:text-brand-900'}`} />
          </button>
          <span className={`
            text-sm sm:text-base leading-snug break-words
            ${isFinal ? 'font-bold text-success' : ''}
            ${isPayout ? 'font-bold text-white' : ''}
            ${highlight && !isFinal && !isPayout ? 'font-semibold text-text-900' : ''}
            ${!highlight && !isFinal && !isPayout ? 'text-text-900/80' : ''}
            ${isYourMoney && !isFinal && !highlight && !isPayout ? 'text-text-900' : ''}
          `}>
            {label}
          </span>
        </div>
        
        {/* Amount with prefix */}
        <span className={`
          text-sm sm:text-base font-mono whitespace-nowrap text-right ml-auto
          ${isFinal ? 'text-lg sm:text-xl font-bold text-success' : ''}
          ${isPayout ? 'text-lg sm:text-xl font-bold text-white' : ''}
          ${highlight && !isFinal && !isPayout ? 'text-lg font-bold text-text-900' : ''}
          ${!highlight && !isFinal && !isPayout ? 'font-semibold text-text-900' : ''}
        `}>
          {prefix && <span className="mr-1">{prefix}</span>}{amount}
        </span>
      </div>
      
      {/* Tooltip */}
      {isActive && (
        <div className={`mt-3 p-3 text-sm rounded-lg relative animate-fade-in ${isPayout ? 'bg-white/20 text-white' : 'bg-text-900 text-white'}`}>
          <button
            onClick={() => setActiveTooltip(null)}
            className="absolute top-2 right-2 p-0.5 hover:bg-white/20 rounded transition-colors duration-200"
            aria-label="Tooltip schließen"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="pr-6 leading-relaxed">{tooltip}</p>
        </div>
      )}
    </div>
  );
}

export default function PreisePage() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-gradient-to-br from-brand-900 to-brand-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8">
              0€
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Kosten für Sie als Auftraggeber
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Unser Service ist für Sie als Auftraggeber in der Regel kostenfrei, entstehende 
              Kosten und Gebühren sind gesetzlich geregelt und vom Schuldner zu tragen.
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

      {/* Details Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="prose prose-lg max-w-none text-text-900/70">
                <p className="text-lg text-text-900/70 leading-relaxed mb-8">
                  Für Sie als Auftraggeber ist das <span className="font-bold text-text-900">außergerichtliche Mahnverfahren</span> bei Nota Finance 
                  in der Regel kostenfrei. Die anfallenden Inkassokosten sowie Verzugszinsen 
                  sind gesetzlich geregelt und werden von Ihrem säumigen Kunden (Schuldner) getragen. 
                  Sie erhalten im Erfolgsfall 100% Ihrer ursprünglichen Hauptforderung.
                </p>
                <p className="text-lg text-text-900/70 leading-relaxed">
                  Sollte ein <span className="font-bold text-text-900">gerichtliches Mahnverfahren</span> notwendig werden, informieren wir Sie im Vorfeld 
                  transparent über eventuell anfallende Gerichtskosten. Auch diese sind im Erfolgsfall von 
                  Ihrem Schuldner zu tragen. Unser Ziel ist es, Ihre Kostenrisiken stets so gering wie 
                  möglich zu halten.
                </p>
              </div>
            </RevealOnScroll>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <RevealOnScroll delay={0}>
                <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 hover:shadow-lg hover:border-brand-700/30 transition-all duration-300">
                  <CheckCircle className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg sm:text-xl font-bold text-text-900 mb-2">Außergerichtlich</h3>
                  <p className="text-text-900/70">Für Sie als Auftraggeber kostenfrei</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 hover:shadow-lg hover:border-brand-700/30 transition-all duration-300">
                  <Euro className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg sm:text-xl font-bold text-text-900 mb-2">100% Auszahlung</h3>
                  <p className="text-text-900/70">Sie erhalten Ihren vollen Rechnungsbetrag</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="group bg-gradient-to-br from-white to-surface-100/50 border border-border-subtle rounded-2xl p-6 hover:shadow-lg hover:border-brand-700/30 transition-all duration-300">
                  <TrendingUp className="w-12 h-12 text-brand-700 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg sm:text-xl font-bold text-text-900 mb-2">Plus Nebenforderungen</h3>
                  <p className="text-text-900/70">Mahnkosten & Verzugszinsen zusätzlich</p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Beispielrechnung Section */}
      <section className="py-24 bg-gradient-to-br from-surface-100/50 via-white to-brand-700/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6 text-center">
                Beispielrechnung
              </h2>
              
              <p className="text-base sm:text-lg text-text-900/70 mb-8 sm:mb-12 text-center leading-relaxed">
                Anhand eines konkreten Beispiels zeigen wir Ihnen transparent, wie sich die Zahlungsströme 
                im außergerichtlichen Mahnverfahren zusammensetzen. Klicken Sie auf die Info-Icons für Details.
              </p>
            </RevealOnScroll>

            {/* Calculation Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-border-subtle overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-900 to-brand-700 px-4 sm:px-6 py-5 text-white">
                <p className="text-base sm:text-lg font-medium text-center">
                  Beispiel: Sie haben eine <span className="font-bold">offene Forderung von 199,18 €</span> an uns geschickt.
                </p>
              </div>
              
              {/* Rows */}
              <div className="p-4 sm:p-6 space-y-1">
                {calculationRows.map((row, index) => (
                  <>
                    <TooltipRow
                      key={index}
                      index={index}
                      label={row.label}
                      amount={row.amount}
                      prefix={row.prefix}
                      tooltip={row.tooltip}
                      highlight={row.highlight}
                      isFinal={row.isFinal}
                      isPayout={row.isPayout}
                      isYourMoney={row.isYourMoney}
                      activeTooltip={activeTooltip}
                      setActiveTooltip={setActiveTooltip}
                    />
                    {/* Subtle Arrow after "Ihr Kunde zahlt an uns" (index 6) */}
                    {index === 6 && (
                      <div className="flex justify-center py-3">
                        <div className="w-8 h-8 bg-surface-100 rounded-full flex items-center justify-center border border-border-subtle rotate-90">
                          <ArrowRight className="w-4 h-4 text-brand-700" />
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
              
              {/* Footer Note */}
              <div className="bg-surface-100/50 px-4 sm:px-6 py-4 border-t border-border-subtle">
                <p className="text-xs sm:text-sm text-neutral-500 text-center leading-relaxed">
                  * Gebühren entsprechen der Gebührentabelle nach §13 RVG. Verzugszinsen werden 
                  nach den gesetzlichen Bestimmungen berechnet. Gebühren variieren je nach Größe der Forderung. Änderungen vorbehalten.
                </p>
              </div>
            </div>
            
            {/* Visual Summary */}
            <div className="mt-10">
              <p className="text-center text-sm font-semibold text-text-900/60 uppercase tracking-wider mb-4">
                Zusammenfassung
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Ihre Forderung */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border-subtle shadow-md text-center">
                  <p className="text-base font-bold text-text-900 mb-2">Ihre Forderung</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-text-900">199,18 €</p>
                  <p className="text-xs text-text-900/60 mt-1">Ursprünglicher Rechnungsbetrag</p>
                </div>
                {/* Sie erhalten */}
                <div className="bg-gradient-to-br from-brand-700/10 to-brand-700/5 rounded-2xl p-5 sm:p-6 border border-brand-700/20 shadow-md text-center">
                  <p className="text-base font-bold text-brand-900 mb-2">Sie erhalten</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-brand-900">+221,74 €</p>
                  <p className="text-xs text-text-900/60 mt-1">+ Mahnkosten + Verzugszinsen</p>
                </div>
                {/* Ihre Kosten */}
                <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-5 sm:p-6 border-2 border-success/30 shadow-md text-center">
                  <p className="text-base font-bold text-success mb-2">Ihre Kosten</p>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-success">0,00 €</p>
                  <p className="text-xs text-text-900/60 mt-1">Gebühren zahlt der Schuldner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
