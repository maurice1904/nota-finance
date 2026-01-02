"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * ScrollToTop – Robuster Scroll-Reset bei Client-Navigation

 */

// SSR-safe useLayoutEffect
const useIsomorphicLayoutEffect = 
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    // Scroll to top on pathname change
    // Using instant behavior to avoid conflicts with scroll-smooth
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

