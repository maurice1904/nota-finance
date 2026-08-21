import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { STORAGE_BUCKET } from "@/lib/config";
import { buildPdfFromImages } from "@/lib/pdf";
import { generateStoragePath } from "@/lib/storage";

/**
 * API Route: POST /api/merge-images-to-pdf
 *
 * Führt die Fotos einer Einreichung zu genau einem mehrseitigen PDF zusammen (P1-12).
 *
 * Warum der Umweg über Storage-Pfade statt der Bilder selbst: Vercel begrenzt den Körper einer
 * Anfrage auf ca. 4,5 MB — ein einziges Handyfoto sprengt das. Der Browser lädt die Originale
 * deshalb wie bisher direkt zu Supabase und schickt hier nur die Pfade; die Route holt die Bilder
 * mit dem Service-Role-Key selbst.
 *
 * Die Originalbilder bleiben unangetastet im Storage (docs/entscheidungen.md, Nr. 21 und 26) —
 * sie sind der Nachweis, das erzeugte PDF ist nur die Verpackung.
 *
 * Request Body:
 * {
 *   imagePaths: string[];  // Storage-Pfade, Reihenfolge = Seitenreihenfolge im PDF
 * }
 */

export const runtime = "nodejs";

/**
 * Der Hobby-Tarif von Vercel erlaubt bis zu 300 s. Bewusst deutlich darunter: Alles darüber
 * hieße, dass ein Kunde minutenlang vor einem Ladebalken sitzt. Zur Einordnung — ein
 * 12-Megapixel-Foto braucht rund 0,2 s, fünf Fotos inklusive Herunterladen etwa 3–5 s,
 * dreißig Fotos etwa 20–25 s. Wird die Grenze doch gerissen, greift im Browser die
 * Rückfallebene: Die Originalbilder gehen in die interne Mail, der Fall geht nicht verloren.
 */
export const maxDuration = 60;

/**
 * Erlaubt sind ausschließlich Bildpfade im bekannten Schema YYYY/MM/<uuid>.<ext>.
 * Das verhindert, dass über diese Route beliebige andere Inhalte des Buckets gelesen werden.
 */
const IMAGE_PATH_PATTERN =
  /^\d{4}\/\d{2}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpe?g|png)$/i;

function validateRequest(
  body: unknown
): { valid: true; imagePaths: string[] } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { imagePaths } = body as Record<string, unknown>;

  if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
    return { valid: false, error: "Missing or invalid imagePaths" };
  }

  if (!imagePaths.every((p) => typeof p === "string" && IMAGE_PATH_PATTERN.test(p))) {
    return { valid: false, error: "Invalid image path format" };
  }

  return { valid: true, imagePaths };
}

/** Lädt ein Bild aus dem Storage. Wirft, damit ein fehlendes Bild nicht zu einer leeren Seite führt. */
async function downloadImage(path: string): Promise<Buffer> {
  const { data, error } = await getSupabaseAdmin().storage.from(STORAGE_BUCKET).download(path);

  if (error || !data) {
    throw new Error(`Bild nicht ladbar: ${path} (${error?.message ?? "unbekannt"})`);
  }

  return Buffer.from(await data.arrayBuffer());
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
    }

    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    // Reihenfolge bleibt erhalten: Promise.all liefert die Ergebnisse in der Reihenfolge der
    // Eingabe, unabhängig davon, welcher Download zuerst fertig ist.
    const images = await Promise.all(validation.imagePaths.map(downloadImage));

    const pdf = await buildPdfFromImages(images);

    // Gleiches Pfadschema wie die Originale (YYYY/MM/...), aber mit dem Vorsatz "fotos-",
    // damit das erzeugte Dokument in Storage, Tabelle und Mailanhang sofort erkennbar ist.
    const target = generateStoragePath("zusammengefuehrt.pdf", new Date(), "fotos-");

    const { error: uploadError } = await getSupabaseAdmin().storage
      .from(STORAGE_BUCKET)
      .upload(target.fullPath, pdf, {
        cacheControl: "3600",
        upsert: false,
        contentType: "application/pdf",
      });

    if (uploadError) {
      throw new Error(`PDF-Upload fehlgeschlagen: ${uploadError.message}`);
    }

    console.log(
      `[MergePDF] ${images.length} Bild(er) -> ${target.fullPath} (${(pdf.length / 1024).toFixed(0)} KB)`
    );

    return NextResponse.json({
      success: true,
      path: target.fullPath,
      filename: target.filename,
      pageCount: images.length,
    });
  } catch (error) {
    // Nur serverseitig loggen. Der Browser braucht keine Details — er fällt bei einem Fehler
    // ohnehin auf die Originalbilder zurück, damit kein Fall verloren geht.
    console.error("[MergePDF] Zusammenführung fehlgeschlagen:", error);

    return NextResponse.json(
      { success: false, error: "PDF konnte nicht erzeugt werden" },
      { status: 500 }
    );
  }
}
