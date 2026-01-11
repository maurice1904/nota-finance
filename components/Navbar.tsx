"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/produkt", label: "Produkt" },
  { href: "/branchen", label: "Branchen" },
  { href: "/preise", label: "Preise" },
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on Escape key and handle focus trap
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      // Focus Trap: Tab-Navigation im Menu einschließen
      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Focus first focusable element in menu
    const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Same-Page-Navigation: Scroll to top wenn bereits auf der Zielseite
  const scrollToTopIfSamePage = useCallback((href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  const handleLinkClick = useCallback((href: string) => {
    scrollToTopIfSamePage(href);
    setIsMenuOpen(false);
  }, [scrollToTopIfSamePage]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 glass" aria-label="Hauptnavigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo + Brand Name */}
          <Link 
            href="/" 
              onClick={() => handleLinkClick("/")}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src="/logo.png"
              alt="Nota Finance Logo"
              width={40}
              height={40}
              className="object-contain"
            />
              {/* Mobile: Stacked brand name */}
              <span className="sm:hidden text-base font-bold text-text-900 leading-tight">
                Nota<br />Finance
              </span>
              {/* Desktop/Tablet: Single line brand name */}
              <span className="hidden sm:block text-2xl font-bold text-text-900 leading-none">
              Nota Finance
            </span>
          </Link>

            {/* Desktop Navigation Links - Centered, visible on lg+ */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-brand-700 relative leading-none",
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

            {/* Right side: CTA + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile CTA Button - Stacked text, visible only on mobile (<sm) */}
              <Link
                href="/einreichen"
                onClick={() => handleLinkClick("/einreichen")}
                className="sm:hidden bg-brand-900 text-white px-3 py-2 rounded-lg font-semibold text-xs text-center leading-tight hover:bg-brand-700 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
              >
                Fall<br />einreichen
              </Link>

              {/* Desktop/Tablet CTA Button - Single line, visible on sm+ */}
          <Link
            href="/einreichen"
                onClick={() => handleLinkClick("/einreichen")}
                className="hidden sm:inline-flex bg-brand-900 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand-700 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring leading-none items-center"
          >
            Fall einreichen
          </Link>

              {/* Hamburger Button - Only visible below lg breakpoint */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={toggleMenu}
                className="flex lg:hidden items-center justify-center w-11 h-11 rounded-lg hover:bg-surface-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-text-900" />
                ) : (
                  <Menu className="w-6 h-6 text-text-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Rendered outside nav for proper z-index stacking */}
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-text-900/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] lg:hidden shadow-2xl transition-transform duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal={isMenuOpen}
        aria-label="Mobile Navigation"
        aria-hidden={!isMenuOpen}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-border-subtle">
          <span className="text-lg font-bold text-text-900">Menü</span>
          <button
            type="button"
            onClick={closeMenu}
            className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-surface-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            aria-label="Menü schließen"
          >
            <X className="w-6 h-6 text-text-900" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-[calc(100%-5rem)] overflow-y-auto">
          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6" role="navigation" aria-label="Mobile Navigation">
            <ul className="space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-300",
                      pathname === link.href
                        ? "bg-brand-900/10 text-brand-900"
                        : "text-text-900 hover:bg-surface-100"
                    )}
                  >
                    {link.label}
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      pathname === link.href ? "text-brand-900" : "text-neutral-500"
                    )} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom CTA Section */}
          <div className="p-6 border-t border-border-subtle bg-gradient-to-t from-surface-100/50 to-transparent">
            <Link
              href="/einreichen"
              onClick={() => handleLinkClick("/einreichen")}
              className="flex items-center justify-center gap-2 w-full bg-brand-900 text-white px-6 py-4 rounded-xl font-semibold text-base hover:bg-brand-700 hover:shadow-lg active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Fall einreichen
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/kontakt"
              onClick={() => handleLinkClick("/kontakt")}
              className="flex items-center justify-center gap-2 w-full mt-3 bg-white text-text-900 px-6 py-4 rounded-xl font-semibold text-base border-2 border-border-subtle hover:border-brand-700/50 hover:shadow-lg active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
