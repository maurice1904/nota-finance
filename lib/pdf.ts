/**
 * Fotos zu genau einem mehrseitigen PDF zusammenführen (P1-12)
 *
 * Warum das existiert: Ein Handwerker fotografiert eine dreiseitige Rechnung mit dem Handy.
 * Er soll ein Dokument einreichen, nicht drei lose Bilder. Die Originalbilder bleiben im
 * Storage — sie sind der Nachweis, dieses PDF ist nur die Verpackung.
 *
 * Reine Rechenfunktion: kein Netzwerk, keine Datenbank, kein Storage. Das erleichtert das
 * Testen und hält die API-Route schlank.
 */

import sharp from "sharp";
import { PDFDocument } from "@cantoo/pdf-lib";

// ═══════════════════════════════════════════════════════════════
// SEITENMASSE
// ═══════════════════════════════════════════════════════════════

/** A4 in PDF-Punkten (1 Punkt = 1/72 Zoll): 210 × 297 mm. */
const A4_SHORT_EDGE_PT = 595.28;
const A4_LONG_EDGE_PT = 841.89;

/** Rand um das Bild, ca. 6 mm — verhindert randlose Seiten, die Drucker abschneiden. */
const PAGE_MARGIN_PT = 18;

// ═══════════════════════════════════════════════════════════════
// QUALITÄTSSTUFEN
// ═══════════════════════════════════════════════════════════════

/**
 * Obergrenze, unter der das fertige PDF bleiben soll.
 *
 * Bewusst unter den 10 MB aus lib/email.ts (MAX_ATTACHMENT_SIZE_BYTES): Wird die Grenze
 * gerissen, verschickt die interne Mail nur noch einen Link statt des Anhangs — und der
 * Anhang ist laut docs/produkt-spec.md Abschnitt 6 die einzige vom Storage unabhängige
 * Kopie der Rechnung. Genau bei Fotoeinreichungen darf das nicht passieren.
 */
const PDF_SIZE_BUDGET_BYTES = 9 * 1024 * 1024;

interface RenderSettings {
  /** Obergrenze für die längere Bildkante in Pixeln. */
  maxEdgePx: number;
  jpegQuality: number;
}

/** Stufe 1: A4 bei 150 dpi. Gut lesbar, typisch 200–400 KB je Seite. */
const STANDARD_SETTINGS: RenderSettings = { maxEdgePx: 1754, jpegQuality: 80 };

/** Stufe 2: A4 bei ca. 110 dpi. Greift nur, wenn Stufe 1 das Größenbudget reißt. */
const COMPACT_SETTINGS: RenderSettings = { maxEdgePx: 1287, jpegQuality: 60 };

// ═══════════════════════════════════════════════════════════════
// AUFBEREITUNG EINES EINZELNEN BILDES
// ═══════════════════════════════════════════════════════════════

interface PreparedImage {
  jpeg: Buffer;
  width: number;
  height: number;
}

/**
 * Bereitet ein Bild für das Einbetten auf: dreht, entfernt Transparenz, verkleinert, komprimiert.
 *
 * `.rotate()` ohne Argument wendet die EXIF-Ausrichtung an und entfernt anschließend das
 * Ausrichtungs-Kennzeichen. Ohne diesen Schritt stünden Hochkant-Fotos vieler Handys im PDF
 * auf der Seite (Anforderung 8 aus P1-12).
 *
 * `.flatten()` legt transparente PNG-Bereiche auf Weiß — im JPEG würden sie sonst schwarz.
 */
async function prepareImage(
  source: Buffer,
  settings: RenderSettings
): Promise<PreparedImage> {
  const { data, info } = await sharp(source)
    .rotate()
    .flatten({ background: "#ffffff" })
    .resize({
      width: settings.maxEdgePx,
      height: settings.maxEdgePx,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: settings.jpegQuality, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });

  return { jpeg: data, width: info.width, height: info.height };
}

// ═══════════════════════════════════════════════════════════════
// PDF-AUFBAU
// ═══════════════════════════════════════════════════════════════

/**
 * Baut das PDF mit einer festen Qualitätsstufe.
 * Je Bild eine Seite, Reihenfolge = Reihenfolge des übergebenen Arrays.
 */
async function renderPdf(
  images: Buffer[],
  settings: RenderSettings
): Promise<Buffer> {
  const doc = await PDFDocument.create();
  doc.setProducer("Nota Finance");
  doc.setCreationDate(new Date());

  for (const source of images) {
    // Bewusst nacheinander statt parallel: begrenzt den Speicherbedarf der Serverfunktion,
    // wenn jemand zwanzig Handyfotos auf einmal einreicht.
    const prepared = await prepareImage(source, settings);
    const embedded = await doc.embedJpg(prepared.jpeg);

    // Querformat-Foto bekommt eine quer liegende A4-Seite. So bleibt das Bild groß,
    // statt schmal in der Mitte einer Hochkantseite zu stehen.
    const isLandscape = prepared.width > prepared.height;
    const pageWidth = isLandscape ? A4_LONG_EDGE_PT : A4_SHORT_EDGE_PT;
    const pageHeight = isLandscape ? A4_SHORT_EDGE_PT : A4_LONG_EDGE_PT;
    const page = doc.addPage([pageWidth, pageHeight]);

    // Bild proportional in den Satzspiegel einpassen und mittig setzen.
    const scale = Math.min(
      (pageWidth - 2 * PAGE_MARGIN_PT) / prepared.width,
      (pageHeight - 2 * PAGE_MARGIN_PT) / prepared.height
    );
    const drawWidth = prepared.width * scale;
    const drawHeight = prepared.height * scale;

    page.drawImage(embedded, {
      x: (pageWidth - drawWidth) / 2,
      y: (pageHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return Buffer.from(await doc.save());
}

/**
 * Führt alle Bilder einer Einreichung zu genau einem mehrseitigen PDF zusammen.
 *
 * @param images - Bilddaten in der Auswahlreihenfolge des Kunden; diese Reihenfolge wird
 *                 zur Seitenreihenfolge (Anforderung 3 aus P1-12).
 * @returns Fertiges PDF als Buffer.
 * @throws wenn keine Bilder übergeben wurden oder ein Bild nicht lesbar ist.
 */
export async function buildPdfFromImages(images: Buffer[]): Promise<Buffer> {
  if (images.length === 0) {
    throw new Error("Keine Bilder zum Zusammenführen übergeben");
  }

  const pdf = await renderPdf(images, STANDARD_SETTINGS);
  if (pdf.length <= PDF_SIZE_BUDGET_BYTES) {
    return pdf;
  }

  // Zu groß für den Mailanhang: einmal sparsamer neu bauen. Ein zweiter Versuch genügt —
  // erst jenseits von etwa sechzig Seiten reicht auch das nicht mehr, und dann greift in
  // lib/email.ts ohnehin die Regel „nur Link".
  console.warn(
    `[PDF] ${(pdf.length / 1024 / 1024).toFixed(1)} MB bei ${images.length} Seiten - baue kompakter neu`
  );
  return renderPdf(images, COMPACT_SETTINGS);
}
