import Link from "next/link";
import {
  ChevronDown,
  Laptop,
  Wrench,
  Heart,
  MessageSquare,
  ShoppingCart,
  Hotel,
  Server,
  Cog,
  Home,
  Building2,
  Dumbbell,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import RevealOnScroll from "@/components/RevealOnScroll";

/**
 * Reine Navigations-Hub-Seite (SEO-4, Umbau 01.09.2026): Icon + Name + ein Satz Kernbotschaft
 * je Branche, dann Link zur jeweiligen /inkasso-[branche]-Seite. Bewusst OHNE Fließtext -
 * die inhaltliche Tiefe (Problem, Fallbeispiel, FAQ) lebt ausschließlich auf den Unterseiten,
 * sonst konkurrieren Hub und Unterseite um dieselben Suchanfragen (docs/aufgabenliste.md, SEO-4).
 * Kernbotschaften wörtlich aus docs/seiten-und-zielgruppen.md Abschnitt 3.
 */
const branchen = [
  {
    slug: "freiberufler",
    name: "Freiberufler & Kreative",
    icon: Laptop,
    kernbotschaft: "Geld holen, ohne den Kunden zu verlieren",
  },
  {
    slug: "handwerk",
    name: "Handwerk & Baugewerbe",
    icon: Wrench,
    kernbotschaft: "Material vorfinanziert — Liquidität zurückholen",
  },
  {
    slug: "gesundheitswesen",
    name: "Gesundheitswesen & Heilberufe",
    icon: Heart,
    kernbotschaft: "diskret und patientenschonend",
  },
  {
    slug: "agenturen",
    name: "Agenturen & Dienstleister",
    icon: MessageSquare,
    kernbotschaft: "professionell mahnen ohne Reputationsschaden",
  },
  {
    slug: "handel",
    name: "Handel & E-Commerce",
    icon: ShoppingCart,
    kernbotschaft: "Ausfälle senken, Marge sichern",
  },
  {
    slug: "gastronomie",
    name: "Hotels & Gastronomie",
    icon: Hotel,
    kernbotschaft: "unkompliziert, ohne Zeitaufwand",
  },
  {
    slug: "it",
    name: "IT & Software-Services",
    icon: Server,
    kernbotschaft: "sachlich klären, Beziehung erhalten",
  },
  {
    slug: "maschinenbau",
    name: "Maschinenbau & Industrie",
    icon: Cog,
    kernbotschaft: "komplexe Fälle konsequent durchsetzen",
  },
  {
    slug: "vermieter",
    name: "Private Vermieter",
    icon: Home,
    kernbotschaft: "Rendite sichern, ohne Vorkosten",
  },
  {
    slug: "hausverwaltung",
    name: "Hausverwaltungen",
    icon: Building2,
    kernbotschaft: "Mahnwesen auslagern, Personal entlasten",
  },
  {
    slug: "fitnessstudio",
    name: "Fitness, Abo & Mitgliedschaften",
    icon: Dumbbell,
    kernbotschaft: "viele Kleinforderungen automatisiert einziehen",
  },
  {
    slug: "bildung",
    name: "Bildung & Freizeit",
    icon: GraduationCap,
    kernbotschaft: "kleine Beträge lohnen sich wieder",
  },
];

export default function BranchenPage() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Für jede Branche die passende Lösung:{" "}
              <span className="text-brand-900">Nota Finance versteht Ihre Bedürfnisse.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Ob Freiberufler, kleines Handwerksunternehmen, moderne Agentur oder etablierte Arztpraxis –
              jede Branche hat ihre eigenen Abläufe und Herausforderungen, besonders wenn es um offene
              Forderungen geht. Wählen Sie Ihre Branche für den passenden Ablauf, typische Fälle und
              häufige Fragen.
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

      {/* Branchen-Raster */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchen.map((branche, index) => {
              const Icon = branche.icon;
              return (
                <RevealOnScroll key={branche.slug} delay={index * 40}>
                  <Link
                    href={`/inkasso-${branche.slug}`}
                    className="group flex flex-col h-full bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-6 hover:shadow-lg hover:border-brand-700/30 transition-all duration-300"
                  >
                    <span className="w-14 h-14 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center flex-shrink-0 mb-4">
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </span>
                    <h2 className="text-lg font-bold text-text-900 mb-2">{branche.name}</h2>
                    <p className="text-text-900/70 leading-relaxed mb-4 flex-grow">
                      {branche.kernbotschaft}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-brand-900 font-semibold text-sm">
                      Mehr erfahren
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </RevealOnScroll>
              );
            })}
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
