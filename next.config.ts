import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
  /* config options here */
};

/**
 * Plausible (Statistik) laeuft ueber die eigene Domain statt ueber plausible.io,
 * damit Werbeblocker die Messung nicht abschneiden.
 *
 * PLAUSIBLE_SRC ist die seitenspezifische Skript-URL aus dem Plausible-Dashboard,
 * z. B. https://plausible.io/js/pa-XXXXX.js
 *
 * Ist die Variable nicht gesetzt (z. B. bei einem Build ohne Secrets), bleibt der
 * Build gruen und die Messung einfach aus.
 */
const plausibleSrc = process.env.PLAUSIBLE_SRC;

export default plausibleSrc
  ? withPlausibleProxy({ src: plausibleSrc })(nextConfig)
  : nextConfig;
