/**
 * Supabase Admin Client — NUR serverseitig verwenden!
 *
 * Verwendet den SUPABASE_SERVICE_ROLE_KEY, der Zugriff auf alle Daten hat
 * und deshalb niemals im Browser landen darf (kein NEXT_PUBLIC_-Präfix).
 * Wird u.a. genutzt, um signierte Download-Links für die interne
 * Benachrichtigungsmail zu erzeugen.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

function createSupabaseAdminClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export const supabaseAdmin = createSupabaseAdminClient();
