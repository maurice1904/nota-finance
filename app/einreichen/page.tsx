import { FileUp, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import UploadForm from "@/components/UploadForm";

export default function EinreichenPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0050FF] to-[#0040CC] rounded-2xl mb-8">
              <FileUp className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#0B1120] mb-8 leading-tight">
              Jetzt einen oder mehrere Fälle einreichen
            </h1>
            
            <p className="text-xl text-slate-700 leading-relaxed">
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
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/produkt"
              className="inline-flex items-center gap-2 bg-white text-[#0B1120] px-6 py-3 rounded-lg font-semibold border-2 border-slate-200 hover:border-[#0050FF] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <HelpCircle className="w-5 h-5" />
              Warum Nota Finance?
            </Link>
            
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#0B1120] px-6 py-3 rounded-lg font-semibold border-2 border-slate-200 hover:border-[#0050FF] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
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

