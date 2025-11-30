import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0B1120] to-[#1E293B] text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Copyright */}
          <div className="space-y-2">
            <p className="text-sm text-slate-300">
              © 2025 Nota Finance. Ein Service der 24collect GmbH.
            </p>
          </div>

          {/* Right Side - Links */}
          <div className="flex flex-wrap gap-6 md:justify-end items-center">
            <Link 
              href="/impressum" 
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300"
            >
              Impressum
            </Link>
            <a 
              href="/datenschutz.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300"
            >
              Datenschutz
            </a>
            <a 
              href="/agb.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300"
            >
              AGB
            </a>
            <Link 
              href="/kontakt" 
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

