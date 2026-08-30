import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand-900 to-text-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Copyright & Social */}
          <div className="space-y-4">
            <p className="text-sm text-surface-100">
              © 2026 Nota Finance. Ein Service der twenty4collect GmbH.
            </p>
            <a
              href="https://www.linkedin.com/company/nota-finance/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5 group-hover:text-brand-700 transition-colors duration-300" />
              Folgen Sie uns auf LinkedIn
              {/* Der Link oeffnet einen neuen Tab. Ohne Hinweis ist das fuer
                  Screenreader-Nutzer ein unerwarteter Kontextwechsel (WCAG 3.2.5). */}
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>

          {/* Right Side - Links */}
          <nav
            aria-label="Rechtliches und Kontakt"
            className="flex flex-wrap gap-6 md:justify-end items-center"
          >
            <Link 
              href="/impressum" 
              className="text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              Datenschutz
            </Link>
            <Link
              href="/agb"
              className="text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              AGB
            </Link>
            <Link
              href="/kontakt"
              className="text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              Kontakt
            </Link>
            <Link
              href="/presse"
              className="text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              Presse
            </Link>
            <Link
              href="/llm-info"
              className="text-sm text-surface-100 hover:text-white transition-colors duration-300"
            >
              LLM Info
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
