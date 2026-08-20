import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
  /**
   * Zugriff auf den Entwicklungsserver aus dem eigenen Netz erlauben (z. B. vom iPhone).
   *
   * Next.js blockiert im Entwicklungsmodus standardmaessig fremde Herkunft fuer interne
   * Ressourcen. Ruft man die Seite ueber die Netzwerkadresse statt ueber "localhost" auf,
   * laedt deshalb kein JavaScript - die Seite sieht fertig aus, aber keine Schaltflaeche
   * reagiert.
   *
   * Die Muster sind absichtlich als Bereiche geschrieben und nicht als eine feste Adresse:
   * Der Router vergibt bei jedem Neuverbinden eine andere Nummer. Abgedeckt sind die
   * privaten Adressbereiche, die Heimnetze praktisch immer verwenden. Reicht es einmal
   * nicht (manche Netze nutzen 172.16.*.* bis 172.31.*.*), hier einfach ergaenzen.
   *
   * "*.local" erlaubt zusaetzlich den Aufruf ueber den Rechnernamen, z. B.
   * http://mein-macbook.local:3000 - der bleibt gleich, auch wenn sich die Nummer aendert.
   *
   * WIRKT NUR IM ENTWICKLUNGSMODUS. Next.js fragt diese Einstellung ausschliesslich ab,
   * solange der Entwicklungsserver laeuft; "next build" und "next start" (und damit Vercel)
   * werten sie nie aus. Fuer die veroeffentlichte Seite aendert sich dadurch nichts.
   */
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
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
