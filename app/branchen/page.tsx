"use client";

import { useState } from "react";
import { ChevronDown, Laptop, Wrench, Heart, MessageSquare, ShoppingCart, Hotel, Server, Cog } from "lucide-react";
import CTASection from "@/components/CTASection";
import { cn } from "@/lib/utils";

interface Industry {
  id: string;
  title: string;
  icon: React.ElementType;
  subtitle: string;
  challenge: string;
  solutions: string[];
}

const industries: Industry[] = [
  {
    id: "freiberufler",
    title: "Freiberufler",
    icon: Laptop,
    subtitle: "Wir arbeiten für Grafikdesigner, Webdesigner, Texter, Berater, IT-Spezialisten, Fotografen, Musiker, Künstler, und Freiberufler aller Branchen.",
    challenge: "Sie leisten exzellente, oft projektbasierte Arbeit, doch unregelmäßige Zahlungseingänge und der administrative Aufwand des Mahnwesens rauben Zeit und Nerven. Die Sorge, durch Mahnungen die oft persönliche Kundenbeziehung zu belasten, ist groß.",
    solutions: [
      "Einfache Einreichung: Laden Sie Ihre Rechnungen (PDF, XRechnung, ZUGFeRD) in Minuten hoch – ohne Registrierung für Einzelfälle. Ideal für variable Auftragslagen.",
      "Kundenorientiertes Vorgehen: Wir mahnen professionell und fair, um Ihre wertvollen Kundenkontakte zu schützen.",
      "Digitale Effizienz: Konzentrieren Sie sich auf Ihre kreative oder beratende Tätigkeit, wir kümmern uns digital und schnell um den Rest.",
      "Forderungen ab 50€: Auch kleinere Honorare sind es wert, eingefordert zu werden."
    ]
  },
  {
    id: "handwerk",
    title: "Handwerk & Baugewerbe",
    icon: Wrench,
    subtitle: "Wir realisieren Forderungen für Kfz-Werkstätten, Maler, Elektriker, SHK-Betriebe (Sanitär-, Heizungs- und Klimatechniker), Tischler, Garten- und Landschaftsbauer, Bauunternehmen und viele weitere Betriebe.",
    challenge: "Sie erbringen handfeste Leistungen und sind oft in Vorleistung getreten. Unbezahlte Rechnungen für Material und Arbeitsstunden können die Liquidität schnell gefährden. Die Zeit für Büroarbeit und Mahnungen ist neben dem anspruchsvollen Tagesgeschäft knapp.",
    solutions: [
      "Schnelle Entlastung: Reichen Sie Ihre Forderung einfach ein, wir übernehmen den gesamten Mahnprozess.",
      "Keine Kosten im außergerichtlichen Verfahren: Sie tragen kein Kostenrisiko für die erste Mahnstufe.",
      "Klare Kommunikation: Wir sorgen für klare Ansagen gegenüber säumigen Zahlern, immer im rechtlichen Rahmen.",
      "Zuverlässigkeit: Wir setzen Ihre berechtigten Ansprüche konsequent durch."
    ]
  },
  {
    id: "gesundheit",
    title: "Gesundheitswesen & Medizin",
    icon: Heart,
    subtitle: "Wir bieten einen passgenauen Service für Zahnärzte, Ärzte, Therapeuten (z.B. Physio-, Ergo-, Logopädie), Heilpraktiker, Pflegedienste, und Tierärzte.",
    challenge: "Im Mittelpunkt Ihrer Arbeit steht das Wohl der Patienten. Offene Rechnungen, besonders bei Privatleistungen oder Selbstzahlern, erfordern ein sensibles und diskretes Vorgehen, um das Vertrauensverhältnis nicht zu beschädigen. Der administrative Aufwand soll die Praxisabläufe minimal belasten.",
    solutions: [
      "Patientenorientiertes Mahnwesen: Wir agieren mit höchster Sensibilität und Professionalität, um die Arzt-Patienten-Beziehung zu wahren.",
      "Entlastung für Ihr Praxisteam: Reduzieren Sie den administrativen Aufwand und gewinnen Sie Zeit für Ihre Patienten.",
      "Rechtssicherheit: Profitieren Sie von unserer Expertise im Umgang mit Forderungen im Gesundheitssektor.",
      "Einfache digitale Prozesse: Schnelle Einreichung, transparente Übersicht (optional mit Konto)."
    ]
  },
  {
    id: "agenturen",
    title: "Agenturen & Unternehmensdienstleister",
    icon: MessageSquare,
    subtitle: "Wir bieten modernes Forderungsmanagement für Marketingagenturen, Unternehmensberatungen, Wirtschaftsprüfer, Steuerberater, Werbeagenturen, PR-Agenturen, Eventagenturen.",
    challenge: "Sie arbeiten oft projektbasiert, treten in Vorleistung und sind auf pünktliche Zahlungen für Ihre kreativen und strategischen Dienstleistungen angewiesen. Ein professionelles Auftreten, auch im Mahnwesen, ist für den Erhalt Ihrer Reputation entscheidend.",
    solutions: [
      "Schutz Ihrer Kundenbeziehungen: Unser kundenorientierter Ansatz hilft, auch bei Mahnungen einen professionellen und fairen Ton zu wahren.",
      "Effizienz: Dank digitaler Prozesse und optionaler API-Anbindung sparen Sie wertvolle Zeit.",
      "Flexibilität: Ob einzelne Großprojekte oder mehrere kleinere Forderungen – wir bieten die passende Lösung."
    ]
  },
  {
    id: "handel",
    title: "Handel & E-Commerce",
    icon: ShoppingCart,
    subtitle: "Online-Shops (mit Kauf auf Rechnung), Einzelhändler mit Rechnungsgeschäft, Großhändler (B2B und B2C), Manufakturen und Weitere vertrauen uns Ihr Mahnwesen an.",
    challenge: "Der \"Kauf auf Rechnung\" ist ein wichtiger Service, birgt aber Risiken. Jeder Zahlungsausfall schmälert Ihre Marge. Ein effizientes Mahnwesen ist unerlässlich, darf aber nicht zu viel interne Ressourcen binden.",
    solutions: [
      "Schnelle Reaktion bei Zahlungsverzug: Durch die einfache Einreichung können Sie zeitnah auf unbezahlte Rechnungen reagieren.",
      "Automatisierung: Unsere digitalen Prozesse und die API-Option ermöglichen eine effiziente Abwicklung, von der alle profitieren: Wir, Sie, Ihre Kunden.",
      "Fokus auf Ihren Ertrag: Wir helfen Ihnen, Ausfälle zu minimieren und Ihre Erträge zu sichern.",
      "Kundenfreundlich: Auch im Mahnprozess legen wir Wert auf einen fairen Umgang mit Ihren Kunden. Ihre Kunden sollen auch in Zukunft Ihre Kunden bleiben."
    ]
  },
  {
    id: "hotel",
    title: "Hotels & Gastronomie",
    icon: Hotel,
    subtitle: "Nota Finance ist der ideale Ansprechpartner für Hotels, Hotelketten, Pensionen, Ferienwohnungsanbieter, Caterer und alle Selbstständigen und Unternehmen aus verwandten Bereichen.",
    challenge: "No-Shows, unbezahlte Stornogebühren oder offene Rechnungen von Firmenkunden können das Ergebnis belasten. Das Tagesgeschäft ist oft hektisch und lässt wenig Raum für zeitaufwendige Mahnprozesse.",
    solutions: [
      "Unkomplizierte Abwicklung: Reichen Sie Forderungen einfach online ein und überlassen Sie uns den Rest.",
      "Professionelle Kommunikation: Wir übernehmen die oft unangenehme Aufgabe, Ihre Gäste oder Firmenkunden an offene Zahlungen zu erinnern.",
      "Zeitersparnis: Mehr Zeit für Ihre Gäste und Ihr Kerngeschäft.",
      "Zuverlässigkeit: Wir setzen uns konsequent für Ihre berechtigten Ansprüche ein."
    ]
  },
  {
    id: "it",
    title: "IT & Software-Services Unternehmen",
    icon: Server,
    subtitle: "Nota Finance ist perfekt für IT-Systemhäuser, Softwareentwicklungsfirmen (SaaS, …), Managed Service Provider (MSPs), IT-Beratungsunternehmen, Telekommunikationsdienstleister und viele weitere Unternehmen.",
    challenge: "Lange Projektlaufzeiten mit Meilensteinzahlungen, unbezahlte Wartungsverträge oder Lizenzgebühren sind an der Tagesordnung. Diskussionen über den Leistungsumfang können Zahlungen zusätzlich verzögern, während Ihr Team bereits neue Projekte stemmt.",
    solutions: [
      "Digitale Einreichung & API: Übermitteln Sie Forderungen effizient per Upload (PDF, XRechnung, ZUGFeRD) oder nutzen Sie unsere API-Schnittstelle zur Anbindung Ihrer Systeme.",
      "Professionelle Kommunikation: Wir verstehen die Komplexität von IT-Projekten und kommunizieren klar und sachlich mit Ihren Kunden.",
      "Entlastung Ihres Managements: Reduzieren Sie den internen Aufwand für das Debitorenmanagement und schützen Sie Ihre Kundenbeziehungen auch bei laufenden Verträgen.",
      "Rechtssichere Durchsetzung: Bei Bedarf leiten wir nach Rücksprache das gerichtliche Mahnverfahren ein."
    ]
  },
  {
    id: "maschinenbau",
    title: "Maschinenbau & Industrie",
    icon: Cog,
    subtitle: "Kleine bis mittlere Maschinenbauunternehmen, Zulieferbetriebe, Ingenieurbüros (Planung, Konstruktion), Industriedienstleister, Energieversorger (B2B- und B2C-Forderungen) gehören zu unseren Kunden.",
    challenge: "Oft hohe Auftragswerte und lange Zahlungsziele prägen Ihr Geschäft. Komplexe Verträge und die Bonität Ihrer Geschäftspartner spielen eine große Rolle. Ein Forderungsausfall kann hier besonders schmerzhaft sein.",
    solutions: [
      "Professionelle Abwicklung: Wir behandeln auch komplexe B2B-Fälle mit hoher Sorgfalt und Expertise.",
      "Konsequente Durchsetzung: Wir begleiten Sie vom außergerichtlichen Mahnverfahren bis hin zur möglichen gerichtlichen Klärung, immer in enger Abstimmung.",
      "Individuelle Betreuung: Bei Bedarf stehen Ihnen unsere Experten für komplexere Sachverhalte zur Verfügung."
    ]
  }
];

export default function BranchenPage() {
  const [openIndustry, setOpenIndustry] = useState<string | null>(null);

  const toggleIndustry = (id: string) => {
    setOpenIndustry(openIndustry === id ? null : id);
  };

  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface-100 h-[calc(100dvh-5rem)] flex flex-col justify-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-text-900 mb-8 leading-tight">
              Für jede Branche die passende Lösung:{" "}
              <span className="text-brand-900">Nota Finance versteht Ihre Bedürfnisse.</span>
            </h1>
            
            <p className="text-xl text-text-900/70 leading-relaxed">
              Ob Freiberufler, kleines Handwerksunternehmen, moderne Agentur oder etablierte Arztpraxis – 
              jede Branche hat ihre eigenen Abläufe und Herausforderungen, besonders wenn es um offene 
              Forderungen geht. Bei Nota Finance haben wir es uns zur Aufgabe gemacht, Ihnen ein 
              Forderungsmanagement zu bieten, das nicht nur branchenübergreifend effektiv, sondern auch 
              auf Ihre spezifischen Anforderungen zugeschnitten ist. Wir helfen Ihnen, Ihre Liquidität 
              zu sichern, sodass Sie sich wieder voll auf Ihr Kerngeschäft konzentrieren können.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isOpen = openIndustry === industry.id;

              return (
                <div
                  key={industry.id}
                  className="bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Header - Always Visible */}
                  <button
                    onClick={() => toggleIndustry(industry.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-100/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-text-900">
                        {industry.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-6 h-6 text-brand-900 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 pb-6 space-y-6">
                      {/* Subtitle */}
                      <div className="pl-[72px]">
                        <p className="text-text-900/70 leading-relaxed font-medium">
                          {industry.subtitle}
                        </p>
                      </div>

                      {/* Challenge */}
                      <div className="bg-white rounded-xl p-6 border border-border-subtle">
                        <h4 className="text-lg font-bold text-text-900 mb-3">
                          Ihre Herausforderung:
                        </h4>
                        <p className="text-text-900/70 leading-relaxed">
                          {industry.challenge}
                        </p>
                      </div>

                      {/* Solutions */}
                      <div className="bg-white rounded-xl p-6 border border-border-subtle">
                        <h4 className="text-lg font-bold text-text-900 mb-4">
                          Unsere Lösung für Sie:
                        </h4>
                        <ul className="space-y-3">
                          {industry.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-brand-900 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-text-900/70 leading-relaxed">
                                {solution}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
