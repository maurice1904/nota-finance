/**
 * Storage Utilities für Supabase File Uploads
 * 
 * Modulare Funktionen für:
 * - Dynamische Pfad-Generierung (YYYY/MM/filename.ext)
 * - Type-safe Upload mit korrektem Content-Type
 * - Error Handling
 */

import { supabase } from "./supabase";
import { STORAGE_BUCKET } from "./config";
import { v4 as uuidv4 } from "uuid";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface UploadResult {
  success: boolean;
  /** Vollständiger Pfad im Bucket (z.B. "2026/02/abc123.pdf") */
  path: string | null;
  /** Nur der Dateiname ohne Pfad (z.B. "abc123.pdf") */
  filename: string | null;
  /** Fehlermeldung falls Upload fehlgeschlagen */
  error: string | null;
}

export interface StoragePath {
  /** Jahr (z.B. "2026") */
  year: string;
  /** Monat mit führender Null (z.B. "02") */
  month: string;
  /** Vollständiger Ordnerpfad (z.B. "2026/02") */
  folder: string;
  /** Vollständiger Dateipfad (z.B. "2026/02/abc123.pdf") */
  fullPath: string;
  /** Nur der Dateiname (z.B. "abc123.pdf") */
  filename: string;
}

// ═══════════════════════════════════════════════════════════════
// PATH UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Generiert einen zeitbasierten Storage-Pfad
 * 
 * @param originalFilename - Ursprünglicher Dateiname (für Extension)
 * @param date - Optionales Datum (Standard: jetzt)
 * @param filenamePrefix - Optionaler Namensvorsatz, um erzeugte Dateien erkennbar zu machen
 *                         (z.B. "fotos-" für das aus Fotos zusammengeführte PDF, siehe P1-12)
 * @returns StoragePath mit allen Pfad-Komponenten
 * 
 * @example
 * generateStoragePath("rechnung.pdf")
 * // Returns: { year: "2026", month: "02", folder: "2026/02", fullPath: "2026/02/a1b2c3.pdf", filename: "a1b2c3.pdf" }
 */
export function generateStoragePath(
  originalFilename: string,
  date: Date = new Date(),
  filenamePrefix: string = ""
): StoragePath {
  // Jahr und Monat extrahieren
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  
  // Dateiendung extrahieren und sicherstellen
  const extension = originalFilename.split(".").pop()?.toLowerCase() || "pdf";
  
  // Eindeutigen Dateinamen generieren
  const uniqueId = uuidv4();
  const filename = `${filenamePrefix}${uniqueId}.${extension}`;
  
  // Pfade zusammenbauen
  const folder = `${year}/${month}`;
  const fullPath = `${folder}/${filename}`;
  
  return {
    year,
    month,
    folder,
    fullPath,
    filename,
  };
}

/**
 * Ermittelt den korrekten Content-Type für eine Datei
 * 
 * @param filename - Dateiname oder Dateiendung
 * @returns MIME-Type String
 */
export function getContentType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    xml: "application/xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    txt: "text/plain",
    csv: "text/csv",
    json: "application/json",
  };
  
  return mimeTypes[extension || ""] || "application/octet-stream";
}

// ═══════════════════════════════════════════════════════════════
// UPLOAD FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Lädt eine Rechnung/Datei in den Supabase Storage hoch
 * 
 * Dateien werden automatisch in einer zeitbasierten Ordnerstruktur abgelegt:
 * invoices/YYYY/MM/filename.ext
 * 
 * @param file - Die hochzuladende Datei
 * @param bucketName - Name des Supabase Buckets (Standard: STORAGE_BUCKET aus lib/config.ts)
 * @returns UploadResult mit Pfad oder Fehler
 * 
 * @example
 * const result = await uploadInvoice(file);
 * if (result.success) {
 *   console.log("Uploaded to:", result.path); // "2026/02/abc123.pdf"
 * }
 */
export async function uploadInvoice(
  file: File,
  bucketName: string = STORAGE_BUCKET
): Promise<UploadResult> {
  try {
    // 1. Zeitbasierten Pfad generieren
    const storagePath = generateStoragePath(file.name);
    
    // 2. Content-Type ermitteln (wichtig für Browser-Vorschau von PDFs)
    const contentType = getContentType(file.name);
    
    // 3. Upload zu Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(storagePath.fullPath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType, // Setzt den korrekten MIME-Type
      });
    
    if (uploadError) {
      // Spezifische Fehlermeldungen
      if (uploadError.message.includes("already exists")) {
        return {
          success: false,
          path: null,
          filename: null,
          error: "Eine Datei mit diesem Namen existiert bereits.",
        };
      }
      
      if (uploadError.message.includes("Bucket not found")) {
        return {
          success: false,
          path: null,
          filename: null,
          error: "Der Upload-Service ist temporär nicht verfügbar.",
        };
      }
      
      return {
        success: false,
        path: null,
        filename: null,
        error: uploadError.message,
      };
    }
    
    // 4. Erfolg
    return {
      success: true,
      path: storagePath.fullPath,
      filename: storagePath.filename,
      error: null,
    };
  } catch (error) {
    // Unerwarteter Fehler
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler beim Upload";
    
    return {
      success: false,
      path: null,
      filename: null,
      error: errorMessage,
    };
  }
}

/**
 * Generiert eine signierte URL für eine Datei im Storage
 * 
 * @param path - Vollständiger Pfad im Bucket
 * @param bucketName - Name des Buckets
 * @param expiresIn - Gültigkeit in Sekunden (Standard: 1 Stunde)
 * @returns Signierte URL oder null bei Fehler
 */
export async function getSignedUrl(
  path: string,
  bucketName: string = STORAGE_BUCKET,
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresIn);
    
    if (error || !data?.signedUrl) {
      return null;
    }
    
    return data.signedUrl;
  } catch {
    return null;
  }
}
