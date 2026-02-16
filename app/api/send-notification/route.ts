import { NextRequest, NextResponse } from "next/server";
import { sendUploadNotifications } from "@/lib/email";

/**
 * API Route: POST /api/send-notification
 * 
 * Sendet E-Mail-Benachrichtigungen nach erfolgreichem Upload:
 * 1. Bestätigungs-E-Mail an den Kunden
 * 2. Interne Notification an den Geschäftsführer
 * 
 * Request Body:
 * {
 *   email: string;      // Kunden-E-Mail
 *   filepaths: string[]; // Array der hochgeladenen Dateipfade
 * }
 */

interface NotificationRequest {
  email: string;
  filepaths: string[];
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateRequest(body: unknown): { valid: true; data: NotificationRequest } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { email, filepaths } = body as Record<string, unknown>;

  if (!email || typeof email !== "string") {
    return { valid: false, error: "Missing or invalid email" };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  if (!filepaths || !Array.isArray(filepaths) || filepaths.length === 0) {
    return { valid: false, error: "Missing or invalid filepaths" };
  }

  if (!filepaths.every((fp) => typeof fp === "string" && fp.length > 0)) {
    return { valid: false, error: "Invalid filepath format" };
  }

  return {
    valid: true,
    data: { email, filepaths },
  };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Request Body parsen
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON" },
        { status: 400 }
      );
    }

    // 2. Validierung
    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { email, filepaths } = validation.data;

    // 3. E-Mails senden
    const results = await sendUploadNotifications({
      customerEmail: email,
      filepaths,
    });

    // 4. Ergebnis prüfen
    const allSuccessful = results.customer.success && results.internal.success;

    if (!allSuccessful) {
      // Mindestens eine E-Mail fehlgeschlagen - serverseitig loggen
      if (!results.customer.success) {
        console.error("[API] Customer email failed:", results.customer.error);
      }
      if (!results.internal.success) {
        console.error("[API] Internal email failed:", results.internal.error);
      }

      // Wenn Kunden-Mail erfolgreich war, geben wir trotzdem Success zurück
      // (interne Fehler sollten den Kunden nicht betreffen)
      if (results.customer.success) {
        return NextResponse.json({
          success: true,
          message: "Bestätigung wurde gesendet",
        });
      }

      // Kunden-Mail fehlgeschlagen - generische Fehlermeldung
      return NextResponse.json(
        { 
          success: false, 
          error: "E-Mail konnte nicht gesendet werden. Bitte kontaktieren Sie uns direkt." 
        },
        { status: 500 }
      );
    }

    // 5. Erfolg
    return NextResponse.json({
      success: true,
      message: "Benachrichtigungen wurden gesendet",
    });
  } catch (error) {
    // Unerwarteter Fehler - serverseitig loggen
    console.error("[API] Unexpected error in send-notification:", error);

    // Generische Fehlermeldung an Client
    return NextResponse.json(
      { 
        success: false, 
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." 
      },
      { status: 500 }
    );
  }
}
