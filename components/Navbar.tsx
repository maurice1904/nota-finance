"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Same-Page-Navigation: Scroll to top wenn bereits auf der Zielseite
  const scrollToTopIfSamePage = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={() => scrollToTopIfSamePage("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300 z-10"
          >
            <Image
              src="/logo.png"
              alt="Nota Finance Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-text-900">
              Nota Finance
            </span>
          </Link>

          {/* Navigation Links - Absolutely Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => scrollToTopIfSamePage(link.href)}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-brand-900 relative",
                  pathname === link.href 
                    ? "text-brand-900" 
                    : "text-text-900/70"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-brand-900" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Primary: bg-brand-900 + text-white, Hover: bg-brand-700 */}
          <Link
            href="/einreichen"
            onClick={() => scrollToTopIfSamePage("/einreichen")}
            className="bg-brand-900 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand-700 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            Fall einreichen
          </Link>
        </div>
      </div>
    </nav>
  );
}
