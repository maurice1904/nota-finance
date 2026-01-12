import { FileUp, HelpCircle, Mail, ChevronDown } from "lucide-react";
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
              <FileUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Jetzt einen oder mehrere Fälle einreichen
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Reichen Sie Ihren Fall oder mehrere Fälle direkt per Upload oder Drag-&-Drop ein. 
              Als PDF-Datei, als E-Rechnung im XRechnungs Format oder als E-Rechnung im ZUGFeRD Format. 
              Wir prüfen Ihre Dokumente, bestätigen den Eingang automatisch inkl. eindeutigem Aktenzeichen 
              per E-Mail. Das Inkasso-Verfahren wird anschließend direkt gestartet.
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

      {/* Upload Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UploadForm />
        </div>
      </section>

      {/* Bottom Links */}
      <section className="py-16 bg-gradient-to-br from-surface-100/30 via-white to-brand-700/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Link
              href="/produkt"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-text-900 px-6 sm:px-6 py-3 sm:py-3 rounded-lg font-semibold text-base border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <HelpCircle className="w-5 h-5 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
              Warum Nota Finance?
            </Link>
            
            <Link
              href="/kontakt"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-text-900 px-6 sm:px-6 py-3 sm:py-3 rounded-lg font-semibold text-base border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <Mail className="w-5 h-5 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
