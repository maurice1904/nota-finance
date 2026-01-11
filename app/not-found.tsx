import Link from "next/link";
import { ArrowRight, Home, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Die angeforderte Seite konnte nicht gefunden werden.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="h-[calc(100dvh-5rem)] flex flex-col items-center justify-center bg-gradient-to-br from-white via-surface-100/30 to-brand-700/8 px-4">
      <div className="max-w-xl mx-auto text-center">
        {/* Error Code */}
        <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl mb-8">
          <span className="text-5xl font-bold text-white">404</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-900 mb-6 leading-tight">
          Seite nicht gefunden
        </h1>

        {/* Description */}
        <p className="text-lg text-text-900/70 mb-10 leading-relaxed">
          Die angeforderte Seite existiert nicht oder wurde verschoben. 
          Bitte überprüfen Sie die URL oder navigieren Sie zurück zur Startseite.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto group bg-brand-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-brand-900 hover:bg-brand-700 hover:border-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <Home className="w-5 h-5" />
            Zur Startseite
          </Link>

          <Link
            href="/kontakt"
            className="w-full sm:w-auto group bg-white text-text-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <HelpCircle className="w-5 h-5 text-neutral-500 group-hover:text-brand-700 transition-colors duration-300" />
            Hilfe erhalten
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <p className="text-sm text-neutral-500 mb-4">Beliebte Seiten:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/einreichen"
              className="text-text-900/70 hover:text-brand-700 font-medium text-sm flex items-center gap-1 transition-colors duration-300"
            >
              Fall einreichen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/faq"
              className="text-text-900/70 hover:text-brand-700 font-medium text-sm flex items-center gap-1 transition-colors duration-300"
            >
              FAQ
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/preise"
              className="text-text-900/70 hover:text-brand-700 font-medium text-sm flex items-center gap-1 transition-colors duration-300"
            >
              Preise
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

