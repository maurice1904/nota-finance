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

  /**
   * notafinance.vercel.app ist zusaetzlich zu www.notafinance.de als Production erreichbar
   * (Vercels automatische Projekt-Domain) und liefert exakt denselben Inhalt - ohne
   * Weiterleitung waere das doppelter Inhalt unter zwei Domains (30.08.2026).
   *
   * Redirects aus next.config.ts laufen VOR proxy.ts (Next.js-Ausfuehrungsreihenfolge:
   * 1. headers, 2. redirects, 3. Proxy). Der Passwortschutz bleibt dadurch unberuehrt: Fuer
   * www.notafinance.de greift ohnehin keine Regel hier, dort prueft proxy.ts wie bisher.
   * Nur wer ueber die Vercel-Adresse kommt, wird zuerst - noch vor jeder Passwortabfrage -
   * auf www.notafinance.de umgeleitet und durchlaeuft proxy.ts dort ganz normal erneut.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "notafinance.vercel.app" }],
        destination: "https://www.notafinance.de/:path*",
        permanent: true,
      },
    ];
  },
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
