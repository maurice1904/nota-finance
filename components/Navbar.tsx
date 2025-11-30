"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/produkt", label: "Produkt" },
  { href: "/branchen", label: "Branchen" },
  { href: "/preise", label: "Preise" },
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-[#0B1120] hover:text-[#0050FF] transition-colors duration-300"
          >
            Nota Finance
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-[#0050FF] relative",
                  pathname === link.href 
                    ? "text-[#0050FF]" 
                    : "text-[#334155]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-[#0050FF]" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/einreichen"
            className="bg-[#0050FF] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#0040CC] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Fall einreichen
          </Link>
        </div>
      </div>
    </nav>
  );
}

