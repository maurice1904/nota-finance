/**
 * Supabase Admin Client — NUR serverseitig verwenden!
 *
 * Verwendet den SUPABASE_SERVICE_ROLE_KEY, der Zugriff auf alle Daten hat
 * und deshalb niemals im Browser landen darf (kein NEXT_PUBLIC_-Präfix).
 * Wird u.a. genutzt, um signierte Download-Links für die interne
 * Benachrichtigungsmail zu erzeugen.
 *
 * **Verzögerte Erzeugung (P0-10):** Der Client entsteht erst beim ersten Aufruf innerhalb einer
 * Anfrage, nicht beim Laden des Moduls. Sonst genügt eine Seite, die diese Datei mitlädt, damit
 * bereits der Build an fehlenden Laufzeit-Secrets scheitert — obwohl zur Bauzeit gar keine
 * Datenbankverbindung gebraucht wird. Das Ergebnis wird gemerkt, es entsteht also weiterhin nur
 * ein Client je Serverprozess.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  // Zusätzliche Sicherung zur Namensregel: Landet dieses Modul je in einem Client-Bündel,
  // scheitert es hörbar, statt still mit undefiniertem Schlüssel weiterzulaufen.
  if (typeof window !== "undefined") {
    throw new Error(
      "getSupabaseAdmin() darf nur serverseitig aufgerufen werden (Service-Role-Key)."
    );
  }

  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file."
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return cachedClient;
}
