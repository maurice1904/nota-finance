"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqs: FAQItem[] = [
  {
    question: "Was kostet mich die Beauftragung von Nota Finance?",
    answer: [
      "Für Sie als Auftraggeber ist das außergerichtliche Mahnverfahren bei Nota Finance im Erfolgsfall in der Regel kostenfrei. Die anfallenden Inkassokosten sowie Verzugszinsen sind gesetzlich geregelt und werden von Ihrem säumigen Kunden (Schuldner) getragen. Sie erhalten im Erfolgsfall 100% Ihrer ursprünglichen Hauptforderung.",
      "Sollte ein gerichtliches Mahnverfahren notwendig werden, informieren wir Sie im Vorfeld transparent über eventuell anfallende Gerichtskosten. Auch diese sind im Erfolgsfall von Ihrem Schuldner zu tragen. Unser Ziel ist es, Ihre Kostenrisiken stets so gering wie möglich zu halten."
    ]
  },
  {
    question: "Muss ich mich registrieren, um eine Forderung einzureichen?",
    answer: [
      "Nein, für die Einreichung einzelner Forderungen ist bei Nota Finance keine vorherige Registrierung notwendig. Sie können Ihre Rechnung(en) direkt und unkompliziert per Drag & Drop oder Upload auf unserer Website einreichen oder uns per E-Mail zukommen lassen.",
      "Eine freiwillige Registrierung ist jedoch möglich und das Nota Konto bietet weitere Zeitersparnisse, wenn Sie regelmäßig Forderungen einreichen."
    ]
  },
  {
    question: "Wie reiche ich eine Forderung ein? Welche Formate werden unterstützt?",
    answer: [
      "Die Einreichung Ihrer Forderung ist denkbar einfach:",
      "• Online-Upload: Nutzen Sie den Upload-Bereich auf unserer Website. Sie können Ihre Rechnung als PDF-Datei, als E-Rechnung im XRechnungs-Format oder als E-Rechnung im ZUGFeRD-Format hochladen.",
      "• E-Mail: Sie können uns Ihre Unterlagen auch per E-Mail zusenden.",
      "• API-Schnittstelle: Für Unternehmen mit vielen Fällen bieten wir eine sichere API-Schnittstelle zur direkten Anbindung Ihrer Systeme.",
      "Wichtig ist, dass die Rechnung alle notwendigen Angaben (Ihre Daten, Daten des Schuldners, Rechnungsnummer, Datum, Leistungsbeschreibung, Forderungsbetrag) enthält."
    ]
  },
  {
    question: "Was passiert, nachdem ich eine Forderung eingereicht habe? Wie ist der Ablauf?",
    answer: [
      "Nachdem Sie Ihre Forderung bei uns eingereicht haben, durchläuft der Fall folgende Schritte:",
      "• Prüfung & Bestätigung: Wir prüfen Ihre Unterlagen umgehend. Sie erhalten automatisch eine Eingangsbestätigung inklusive Ihres Aktenzeichens per E-Mail.",
      "• Außergerichtliches Mahnverfahren: Wir nehmen Kontakt zu Ihrem Schuldner auf und starten das professionelle Mahnverfahren. Unser Ziel ist eine schnelle und gütliche Einigung.",
      "• Kommunikation: Wir halten Sie über wesentliche Entwicklungen auf dem Laufenden.",
      "• Zahlungseingang: Bei erfolgreichem Einzug leiten wir Ihnen 100% Ihrer Hauptforderung umgehend weiter.",
      "• Gerichtliches Mahnverfahren (optional): Sollte das außergerichtliche Verfahren nicht erfolgreich sein, besprechen wir mit Ihnen das weitere Vorgehen und leiten nur nach Ihrer Zustimmung das gerichtliche Mahnverfahren ein."
    ]
  },
  {
    question: "Wie lange dauert es, bis ich mein Geld erhalte?",
    answer: [
      "Die Dauer bis zum Zahlungseingang kann variieren und hängt von verschiedenen Faktoren ab, wie der Zahlungsbereitschaft des Schuldners und der Komplexität des Falls.",
      "Dank unserer digitalen Prozesse und der umgehenden Bearbeitung nach Forderungseinreichung setzen wir alles daran, Ihr Geld so schnell wie möglich zu realisieren. Im außergerichtlichen Verfahren erzielen wir oft innerhalb weniger Wochen Ergebnisse. Über Ihr optionales Kundenkonto können Sie den Fortschritt transparent verfolgen."
    ]
  },
  {
    question: "Was passiert, wenn der Schuldner trotz Mahnung nicht zahlt?",
    answer: [
      "Sollte Ihr Kunde im außergerichtlichen Mahnverfahren nicht zahlen, lassen wir Sie nicht allein. Wir analysieren den Fall und besprechen mit Ihnen die weiteren Optionen.",
      "Mit Ihrer Zustimmung leiten wir das gerichtliche Mahnverfahren ein, um einen vollstreckbaren Titel (z.B. Vollstreckungsbescheid) zu erwirken. Auch in dieser Phase stehen wir Ihnen zur Seite, um Ihre Ansprüche konsequent und rechtssicher durchzusetzen. Über alle Schritte und eventuelle Kostenrisiken informieren wir Sie stets transparent."
    ]
  },
  {
    question: "Wie wirkt sich das Inkassoverfahren auf meine Kundenbeziehung aus?",
    answer: [
      "Der Erhalt Ihrer guten Kundenbeziehungen ist uns sehr wichtig. Unser Ansatz ist daher konsequent kundenorientiert:",
      "• Wir kommunizieren professionell, respektvoll und fair mit Ihren Schuldnern.",
      "• Unser Ziel ist es, eine Lösung zu finden und die Zahlung zu realisieren, ohne die Beziehung unnötig zu belasten.",
      "• Wir verstehen uns als Vermittler und versuchen, auch in schwierigen Situationen einen konstruktiven Dialog zu führen.",
      "• Nota Finance agiert als externe, neutrale Stelle, was oft hilft, die direkte Konfrontation zwischen Ihnen und Ihrem Kunden zu vermeiden."
    ]
  },
  {
    question: "Können auch Kleinstbeträge (z.B. unter 100€) eingereicht werden?",
    answer: "Ja, bei Nota Finance können Sie Forderungen bereits ab einer Höhe von 50€ einreichen. Wir wissen, dass sich auch viele kleine unbezahlte Rechnungen summieren und Ihre Liquidität belasten können. Unser effizienter digitaler Prozess ermöglicht es uns, auch solche Kleinforderungen wirtschaftlich sinnvoll für Sie zu bearbeiten. Auch Kleinforderungen sind von Ihnen erbrachte Leistungen, für die Sie Ihr Geld verdient haben."
  },
  {
    question: "Wer ist Nota Finance? Wie sicher sind meine Daten?",
    answer: "Nota Finance ist die innovative digitale Marke der twenty4collect GmbH, einem etablierten und BDIU-zertifizierten Inkassounternehmen mit über 15 Jahren Erfahrung im Forderungsmanagement in Deutschland. Mit Nota Finance profitieren Sie von dieser langjährigen Expertise, kombiniert mit einer modernen, schnellen und unkomplizierten Online-Lösung. Der Schutz Ihrer Daten und der Daten Ihrer Kunden hat für uns höchste Priorität. Wir arbeiten streng nach den Richtlinien der DSGVO. Unsere Systeme sind sicher, und wir gewährleisten einen vertraulichen Umgang mit allen Informationen."
  }
];

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl mb-6 sm:mb-8">
              <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Häufig gestellte Fragen
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Hier finden Sie Antworten auf die wichtigsten Fragen rund um Nota Finance und 
              unseren Service. Klicken Sie auf eine Frage, um die Antwort zu sehen.
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

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFAQ === index;

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-700/30 transition-all duration-300"
                >
                  {/* Question - Always Visible */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-100/30 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-900 to-brand-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-900 pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-6 h-6 text-brand-700 transition-transform duration-300 flex-shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Answer - Expandable */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 pb-6 pl-[72px]">
                      {Array.isArray(faq.answer) ? (
                        <div className="space-y-3">
                          {faq.answer.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-text-900/70 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-text-900/70 leading-relaxed">{faq.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-white to-surface-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-900 mb-4 sm:mb-6">
            Ihre Fragen blieben unbeantwortet?
          </h2>
          
          <p className="text-base sm:text-lg text-text-900/70 mb-8 sm:mb-10">
            Das tut uns Leid. Nehmen Sie gerne mit uns Kontakt auf und wir beantworten Ihre Fragen 
            persönlich und individuell. Oder reichen Sie jetzt direkt und unkompliziert einen Fall 
            oder mehrere Fälle ein.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="w-full sm:w-auto group bg-white text-text-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Kontakt aufnehmen
              <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-brand-700 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
            
            <Link
              href="/einreichen"
              className="w-full sm:w-auto group bg-brand-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-brand-900 hover:bg-brand-700 hover:border-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Fall einreichen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
