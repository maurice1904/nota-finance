/**
 * Zulässige Einreichungsformate — eine einzige Quelle für Browser und Server (P1-12)
 *
 * Grundsatz: Die Regel, welche Datei angenommen wird, darf nicht an zwei Stellen stehen.
 * Sonst weichen die Prüfung im Browser (Bequemlichkeit) und die Prüfung auf dem Server
 * (Sicherheit, siehe P1-0) irgendwann voneinander ab.
 *
 * Diese Datei enthält bewusst nur Fachregeln aus docs/produkt-spec.md und **keine**
 * Umgebungsvariablen — sie wird sowohl vom Client als auch vom Server importiert.
 */

/** Bilder: werden serverseitig zu genau einem mehrseitigen PDF zusammengeführt. */
export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png"] as const;
export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"] as const;

/** Dokumente: werden unverändert übernommen (PDF, XRechnung/ZUGFeRD als XML). */
export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/xml",
  "text/xml",
] as const;
export const DOCUMENT_EXTENSIONS = ["pdf", "xml"] as const;

/**
 * Größengrenzen.
 *
 * Fotos dürfen größer sein als Dokumente: Ein Handyfoto einer Rechnung liegt je nach Kamera
 * zwischen 2 und 12 MB. Da Bilder vor dem Einbetten ohnehin verkleinert werden, belastet ihre
 * Ausgangsgröße das erzeugte PDF nicht. Die Grenze ist auf 15 MB gesetzt, weil der Supabase-
 * Speicher im kostenlosen Tarif nur 1 GB umfasst (siehe P1-10).
 */
export const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

/** Für das `accept`-Attribut des Dateifeldes. */
export const FILE_INPUT_ACCEPT =
  ".pdf,.xml,.jpg,.jpeg,.png,application/pdf,application/xml,text/xml,image/jpeg,image/png";

/** Dateiendung in Kleinbuchstaben, ohne Punkt. Leerer String, wenn keine vorhanden ist. */
export function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

/**
 * Erkennt ein Bild.
 *
 * Der MIME-Typ hat Vorrang; manche Android-Browser liefern ihn aber leer oder als
 * `application/octet-stream`. Deshalb zusätzlich die Dateiendung als Rückfallebene.
 */
export function isImageFile(file: { name: string; type: string }): boolean {
  if ((IMAGE_MIME_TYPES as readonly string[]).includes(file.type)) return true;
  if ((DOCUMENT_MIME_TYPES as readonly string[]).includes(file.type)) return false;
  return (IMAGE_EXTENSIONS as readonly string[]).includes(getExtension(file.name));
}

/** Erkennt ein Dokument (PDF oder XML). Gleiche Rückfallebene über die Dateiendung wie bei Bildern. */
export function isDocumentFile(file: { name: string; type: string }): boolean {
  if ((DOCUMENT_MIME_TYPES as readonly string[]).includes(file.type)) return true;
  if ((IMAGE_MIME_TYPES as readonly string[]).includes(file.type)) return false;
  return (DOCUMENT_EXTENSIONS as readonly string[]).includes(getExtension(file.name));
}

/**
 * HEIC/HEIF ist das Originalformat der iPhone-Kamera. Wir lehnen es bewusst ab, statt es
 * stillschweigend zu akzeptieren: Der Server könnte es je nach Umgebung nicht lesen, und der
 * Kunde bekäme den Fehler erst nach dem Absenden. Beim üblichen Weg über die Foto-Auswahl
 * wandelt iOS ohnehin automatisch nach JPEG um.
 */
export function isHeicFile(file: { name: string; type: string }): boolean {
  if (file.type === "image/heic" || file.type === "image/heif") return true;
  return ["heic", "heif"].includes(getExtension(file.name));
}
