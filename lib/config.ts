/**
 * Zentrale Konfiguration für Adressen und Kennungen (P1-7)
 *
 * Grundsatz: Werte, die sich ohne Code-Änderung ändern können sollen, stehen an genau einer
 * Stelle und lassen sich über Umgebungsvariablen überschreiben. Fehlt eine Variable, greift
 * der bisherige Wert — nichts bricht.
 *
 * **Nur Werte, die auch im Browser erscheinen dürfen.** Diese Datei wird von Client-Code
 * importiert (lib/errors.ts, lib/storage.ts); alles hier landet im JavaScript-Bundle.
 * Serverseitige Adressen (Absender, interner Empfänger) stehen deshalb in lib/email.ts.
 *
 * Bewusst NICHT konfigurierbar:
 * - `CONSENT_VERSION` (components/UploadForm.tsx): Rechtsnachweis, muss zum ausgelieferten
 *   AGB-Text passen. Als Umgebungsvariable könnte versehentlich eine falsche Version
 *   protokolliert werden.
 * - Fristen und Grenzwerte (Linkgültigkeit, Anhanggröße): Fachregeln aus docs/produkt-spec.md,
 *   keine Deployment-Konfiguration.
 */

/** Liefert den Wert der Variablen; leere oder nur aus Leerzeichen bestehende Werte gelten als nicht gesetzt. */
export function envOr(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/**
 * Kontaktadresse für Kunden — erscheint in der Bestätigungsmail und in Fehlerhinweisen
 * im Browser.
 */
export const SUPPORT_EMAIL = envOr(
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  "service@notafinance.de"
);

/**
 * Supabase-Storage-Bucket für die hochgeladenen Rechnungen.
 * Upload (Client) und signierter Download-Link (Server) müssen denselben Bucket nutzen —
 * deshalb nur diese eine Quelle.
 */
export const STORAGE_BUCKET = envOr(
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET,
  "invoices"
);
