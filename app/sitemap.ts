import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { BASE_URL } from "@/lib/faktenkern";

const APP_DIR = join(process.cwd(), "app");

/**
 * Seiten mit `robots: { index: false }` im eigenen page.tsx - gehören nicht in die Sitemap.
 * Bewusst die einzige Handpflege hier: welche Seiten *nicht* indexiert werden, lässt sich nicht
 * automatisch aus dem Dateisystem ableiten.
 */
const NICHT_INDEXIERT = new Set(["/einreichen/danke"]);

/**
 * Durchsucht app/ nach `page.tsx`-Dateien und leitet daraus die URL-Pfade ab - neue Seiten
 * erscheinen automatisch in der Sitemap, ohne dass diese Datei angefasst werden muss.
 * Übersprungen werden: API-Routen, der `/llms.txt`-Route-Handler (keine Inhaltsseite), Next-interne
 * Ordner, Next.js-Routengruppen `(name)` sowie dynamische Segmente `[slug]` - letztere brauchen
 * eine eigene, parametrisierte Sitemap-Logik, sobald es sie gibt (z. B. SEO-6).
 */
function findeSeitenPfade(verzeichnis: string, basisPfad = ""): string[] {
  const pfade: string[] = [];

  for (const eintrag of readdirSync(verzeichnis, { withFileTypes: true })) {
    if (
      eintrag.name === "api" ||
      eintrag.name === "llms.txt" ||
      eintrag.name.startsWith("_") ||
      eintrag.name.startsWith(".") ||
      eintrag.name.startsWith("[")
    ) {
      continue;
    }

    const vollerPfad = join(verzeichnis, eintrag.name);

    if (eintrag.isDirectory()) {
      // Routengruppen "(name)" tauchen nicht in der URL auf.
      const istRoutengruppe = eintrag.name.startsWith("(") && eintrag.name.endsWith(")");
      const naechsterBasisPfad = istRoutengruppe ? basisPfad : `${basisPfad}/${eintrag.name}`;
      pfade.push(...findeSeitenPfade(vollerPfad, naechsterBasisPfad));
    } else if (eintrag.name === "page.tsx") {
      pfade.push(basisPfad || "/");
    }
  }

  return pfade;
}

/** Datum der letzten Änderung aus der Git-Historie - übersteht anders als das Dateisystem-Datum
 * einen frischen Checkout beim Deployment (Vercel setzt sonst für jede Datei "jetzt"). */
function letzteAenderung(dateiPfad: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${dateiPfad}"`, {
      cwd: process.cwd(),
      encoding: "utf-8",
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    // Kein Git verfügbar oder Datei (noch) nicht versioniert.
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const seitenPfade = findeSeitenPfade(APP_DIR).filter((pfad) => !NICHT_INDEXIERT.has(pfad));

  return seitenPfade.map((pfad) => {
    const pageDatei = join(APP_DIR, pfad === "/" ? "" : pfad, "page.tsx");
    return {
      url: pfad === "/" ? BASE_URL : `${BASE_URL}${pfad}`,
      lastModified: letzteAenderung(relative(process.cwd(), pageDatei)),
    };
  });
}
