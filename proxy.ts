import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic Auth Proxy für temporären Passwortschutz
 * 
 * ═══════════════════════════════════════════════════════════════
 * AKTIVIEREN:
 *   In .env.local hinzufügen: SITE_PASSWORD=deinPasswort
 * 
 * DEAKTIVIEREN:
 *   SITE_PASSWORD aus .env.local entfernen oder leer lassen
 * 
 * LOGIN-DATEN:
 *   Benutzername: nota
 *   Passwort: [Wert von SITE_PASSWORD]
 * ═══════════════════════════════════════════════════════════════
 */

const USERNAME = "nota";

export function proxy(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;

  // Kein Passwort gesetzt = öffentlicher Zugang
  if (!sitePassword || sitePassword.trim() === "") {
    return NextResponse.next();
  }

  // Authorization Header auslesen
  const authHeader = request.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Basic ")) {
    try {
      // Base64-Teil extrahieren und dekodieren
      const base64Credentials = authHeader.slice(6); // "Basic " entfernen
      const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
      
      // Format: "username:password"
      const separatorIndex = credentials.indexOf(":");
      if (separatorIndex !== -1) {
        const username = credentials.substring(0, separatorIndex);
        const password = credentials.substring(separatorIndex + 1);

        // Credentials validieren
        if (username === USERNAME && password === sitePassword) {
          return NextResponse.next();
        }
      }
    } catch {
      // Bei Dekodierungsfehler: Auth anfordern
    }
  }

  // 401 Unauthorized - Browser zeigt Login-Dialog
  return new NextResponse("Authentifizierung erforderlich", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Nota Finance", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: [
    /*
     * Alle Pfade AUSSER:
     * - api (API-Routen)
     * - _next (Next.js Internals: static, image, etc.)
     * - Statische Dateien mit Dateiendungen (.ico, .png, .jpg, .svg, .css, .js, .pdf, etc.)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|css|js|pdf|woff|woff2|ttf|eot)$).*)",
  ],
};
