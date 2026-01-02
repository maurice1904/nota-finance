import { FileUp, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import UploadForm from "@/components/UploadForm";

export default function EinreichenPage() {
  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface-100 h-[calc(100dvh-5rem)] flex flex-col justify-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl mb-8">
              <FileUp className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-text-900 mb-8 leading-tight">
              Jetzt einen oder mehrere Fälle einreichen
            </h1>
            
            <p className="text-xl text-text-900/70 leading-relaxed">
              Reichen Sie Ihren Fall oder mehrere Fälle direkt per Upload oder Drag-&-Drop ein. 
              Als PDF-Datei, als E-Rechnung im XRechnungs Format oder als E-Rechnung im ZUGFeRD Format. 
              Wir prüfen Ihre Dokumente, bestätigen den Eingang automatisch inkl. eindeutigem Aktenzeichen 
              per E-Mail. Das Inkasso-Verfahren wird anschließend direkt gestartet.
            </p>
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
      <section className="py-16 bg-gradient-to-br from-white to-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/produkt"
              className="inline-flex items-center gap-2 bg-white text-text-900 px-6 py-3 rounded-lg font-semibold border-2 border-border-subtle hover:border-brand-900 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <HelpCircle className="w-5 h-5" />
              Warum Nota Finance?
            </Link>
            
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-text-900 px-6 py-3 rounded-lg font-semibold border-2 border-border-subtle hover:border-brand-900 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <Mail className="w-5 h-5" />
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
