import { FileUp, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import UploadForm from "@/components/UploadForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jetzt Fall einreichen & Rechnung hochladen",
  description:
    "Starten Sie das Inkasso in wenigen Sekunden. Rechnung per Drag & Drop hochladen, Daten prüfen, fertig. Ohne Anmeldung. Ohne Registrierung.",
  openGraph: {
    title: "Jetzt Fall einreichen & Rechnung hochladen | Nota Finance",
    description:
      "Starten Sie das Inkasso in wenigen Sekunden. Rechnung per Drag & Drop hochladen, Daten prüfen, fertig. Ohne Anmeldung. Ohne Registrierung.",
    url: "https://www.notafinance.de/einreichen",
  },
};

export default function EinreichenPage() {
  return (
    <main className="min-h-[calc(100dvh-5rem)] bg-gradient-to-br from-white via-surface-100/30 to-brand-700/8">
      {/* Main Content Section - Two Column on Desktop */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Header & Info (sticky on desktop) */}
            <div className="lg:sticky lg:top-28">
              {/* Icon + Headline */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-900 to-brand-700 rounded-xl flex items-center justify-center">
                  <FileUp className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-900 leading-tight">
                  Fall einreichen
                </h1>
              </div>
              
              {/* Subtext */}
              <p className="text-text-900/70 leading-relaxed mb-6 lg:mb-8">
                Laden Sie Ihre Rechnung(en) hoch – als PDF, XRechnung oder ZUGFeRD. 
                Wir bestätigen den Eingang per E-Mail mit eindeutigem Aktenzeichen und starten das Inkasso direkt.
              </p>
              
              {/* Quick Links - Only visible on desktop */}
              <div className="hidden lg:flex flex-col gap-3">
                <Link
                  href="/produkt"
                  className="group inline-flex items-center gap-2 text-sm text-text-900/70 hover:text-brand-700 transition-colors duration-300"
                >
                  <HelpCircle className="w-4 h-4 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
                  Warum Nota Finance?
                </Link>
                
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 text-sm text-text-900/70 hover:text-brand-700 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
            
            {/* Right Column - Upload Form */}
            <div>
              <UploadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Links - Only visible on mobile/tablet */}
      <section className="lg:hidden py-8 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <Link
              href="/produkt"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-text-900 px-5 py-2.5 rounded-lg font-medium text-sm border border-border-subtle hover:border-brand-700/50 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <HelpCircle className="w-4 h-4 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
              Warum Nota Finance?
            </Link>
            
            <Link
              href="/kontakt"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-text-900 px-5 py-2.5 rounded-lg font-medium text-sm border border-border-subtle hover:border-brand-700/50 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <Mail className="w-4 h-4 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
