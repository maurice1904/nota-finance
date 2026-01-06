"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, Mail } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary
 * 
 * DSGVO-konform:
 * - Keine Stacktraces an den Nutzer
 * - Keine sensiblen Daten
 * - Error-Digest nur für interne Referenz (kein technischer Inhalt)
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Fehler nur serverseitig loggen (nicht an den Client senden)
    // In Produktion: An Error-Tracking-Service senden (z.B. Sentry)
    console.error("Application Error:", error.digest || "Unknown error");
  }, [error]);

  return (
    <main className="min-h-[calc(100dvh-5rem)] flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-surface-100 px-4">
      <div className="max-w-xl mx-auto text-center">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-error/10 rounded-2xl mb-8">
          <AlertCircle className="w-12 h-12 text-error" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-900 mb-6 leading-tight">
          Ein Fehler ist aufgetreten
        </h1>

        {/* Description - DSGVO-konform: Keine technischen Details */}
        <p className="text-lg text-text-900/70 mb-4 leading-relaxed">
          Es tut uns leid, aber bei der Verarbeitung Ihrer Anfrage ist ein 
          unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </p>

        {/* Error Reference - Nur Digest, keine sensiblen Daten */}
        {error.digest && (
          <p className="text-sm text-neutral-500 mb-8">
            Fehler-Referenz: <code className="bg-surface-100 px-2 py-1 rounded text-xs">{error.digest}</code>
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={reset}
            className="group bg-brand-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Erneut versuchen
          </button>

          <Link
            href="/"
            className="group bg-white text-text-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-border-subtle hover:border-brand-900 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            <Home className="w-5 h-5" />
            Zur Startseite
          </Link>
        </div>

        {/* Support Info */}
        <div className="bg-surface-100/50 border border-border-subtle rounded-2xl p-6">
          <p className="text-text-900/70 mb-3">
            Sollte das Problem weiterhin bestehen, kontaktieren Sie uns bitte:
          </p>
          <a
            href="mailto:service@notafinance.de"
            className="inline-flex items-center gap-2 text-brand-900 hover:underline font-semibold"
          >
            <Mail className="w-5 h-5" />
            service@notafinance.de
          </a>
        </div>
      </div>
    </main>
  );
}

