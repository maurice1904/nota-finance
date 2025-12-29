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

  return (
    <nav className="sticky top-0 z-50 glass border-b border-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/logo.png"
              alt="Nota Finance Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-primary">
              Nota Finance
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-signal relative",
                  pathname === link.href 
                    ? "text-signal" 
                    : "text-primary/70"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-signal" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/einreichen"
            className="bg-signal text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-signal/80 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Fall einreichen
          </Link>
        </div>
      </div>
    </nav>
  );
}
