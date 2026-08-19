"use client";

import { useEffect } from "react";
import { usePlausible } from "next-plausible";

/**
 * Zaehlt Klicks auf "Fall einreichen"-Buttons (Ereignis: cta_einreichen_klick).
 *
 * Statt jeden einzelnen Button anzufassen, horcht diese Komponente einmal zentral
 * auf Klicks. Damit zaehlen alle heutigen CTAs (Navbar, CTASection, Startseite,
 * FAQ, 404) und automatisch auch jeder kuenftige Link auf /einreichen -
 * etwa auf den geplanten Branchen- und Staedte-Seiten.
 *
 * Es wird ausschliesslich der Ereignisname gesendet, keine personenbezogenen Daten.
 * Rendert nichts.
 */
export default function PlausibleCTATracking() {
  const plausible = usePlausible();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const ziel = event.target as Element | null;
      if (ziel?.closest?.('a[href="/einreichen"]')) {
        plausible("cta_einreichen_klick");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [plausible]);

  return null;
}
