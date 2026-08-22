/**
 * E-Mail Utilities für Nota Finance
 * 
 * Modulare Funktionen für:
 * - URL-Generierung für Supabase Storage
 * - E-Mail-Templates für Kunden und interne Notifications
 * - Resend API Integration
 */

import { Resend } from "resend";
import { getSupabaseAdmin } from "./supabase-admin";
import { envOr, STORAGE_BUCKET, SUPPORT_EMAIL } from "./config";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

/**
 * Absender beider E-Mails. Format: `Anzeigename <adresse@domain>` oder nur `adresse@domain`.
 * Muss eine bei Resend verifizierte Domain sein (siehe P0-9).
 * Serverseitig — bewusst nicht in lib/config.ts, damit die Adresse nicht im Browser-Bundle landet.
 */
const EMAIL_FROM = envOr(
  process.env.EMAIL_FROM,
  "Nota Finance Service <service@notafinance.de>"
);

/** Empfänger der internen Benachrichtigung (Backoffice). Ebenfalls serverseitig. */
const EMAIL_INTERNAL_RECIPIENT = envOr(
  process.env.EMAIL_INTERNAL_RECIPIENT,
  "admin@notafinance.de"
);

const SIGNED_URL_EXPIRY_SECONDS = 14 * 24 * 60 * 60; // 14 Tage
const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface EmailResult {
  success: boolean;
  error?: string;
}

export interface NotificationData {
  customerEmail: string;
  filepaths: string[];
}

// ═══════════════════════════════════════════════════════════════
// STORAGE UTILITIES (serverseitig, mit Service Role Key)
// ═══════════════════════════════════════════════════════════════

/**
 * Erzeugt einen signierten, zeitlich begrenzten Download-Link.
 * Nur serverseitig aufrufen (nutzt SUPABASE_SERVICE_ROLE_KEY).
 *
 * @param filepath - Pfad im Bucket (z.B. "2026/02/abc123.pdf")
 * @returns Signierte URL (gültig 14 Tage) oder null bei Fehler
 */
async function createInternalSignedUrl(filepath: string): Promise<string | null> {
  try {
    const { data, error } = await getSupabaseAdmin().storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filepath, SIGNED_URL_EXPIRY_SECONDS);

    if (error || !data?.signedUrl) {
      console.error("[Email] Signed URL creation failed:", error?.message, filepath);
      return null;
    }

    return data.signedUrl;
  } catch (err) {
    console.error("[Email] Signed URL creation error:", err, filepath);
    return null;
  }
}

/**
 * Lädt eine Datei aus dem Storage, um sie als Mail-Anhang zu verwenden.
 * Dateien über MAX_ATTACHMENT_SIZE_BYTES werden übersprungen (nur Link).
 *
 * @param filepath - Pfad im Bucket (z.B. "2026/02/abc123.pdf")
 */
async function downloadForAttachment(
  filepath: string
): Promise<{ filename: string; content: Buffer } | null> {
  try {
    const { data, error } = await getSupabaseAdmin().storage
      .from(STORAGE_BUCKET)
      .download(filepath);

    if (error || !data) {
      console.error("[Email] Attachment download failed:", error?.message, filepath);
      return null;
    }

    if (data.size > MAX_ATTACHMENT_SIZE_BYTES) {
      return null;
    }

    const content = Buffer.from(await data.arrayBuffer());
    const filename = filepath.split("/").pop() || filepath;

    return { filename, content };
  } catch (err) {
    console.error("[Email] Attachment download error:", err, filepath);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// IMPRESSUM FOOTER (wiederverwendbar)
// ═══════════════════════════════════════════════════════════════

function getImpressumFooterHtml(): string {
  return `
  <!-- Impressum Footer -->
  <div style="background: #f8f9fa; padding: 25px; margin-top: 20px; border-radius: 8px; font-size: 11px; color: #666; line-height: 1.5;">
    <p style="margin: 0 0 15px 0; font-weight: 600; color: #333; font-size: 12px;">Impressum</p>
    <p style="margin: 0 0 10px 0;">Nota Finance ist ein Geschäftsfeld der twenty4collect GmbH</p>
    
    <p style="margin: 15px 0 5px 0; font-weight: 600; color: #444;">Verantwortliche juristische Person nach § 5 Abs. 1 TMG</p>
    <p style="margin: 0;">
      twenty4collect GmbH<br>
      In den Weiden 9<br>
      56729 Weiler<br>
      Deutschland
    </p>
    
    <p style="margin: 15px 0 5px 0; font-weight: 600; color: #444;">Kontakt</p>
    <p style="margin: 0;">
      Telefon: +49 (0) 2656 / 951 314<br>
      E-Mail: <a href="mailto:${SUPPORT_EMAIL}" style="color: #0524b0;">${SUPPORT_EMAIL}</a>
    </p>
    
    <p style="margin: 15px 0 5px 0; font-weight: 600; color: #444;">Handelsregister</p>
    <p style="margin: 0;">Amtsgericht Koblenz HRB 21094</p>
    
    <p style="margin: 15px 0 5px 0; font-weight: 600; color: #444;">Umsatzsteuer-Identifikationsnummer</p>
    <p style="margin: 0;">DE259631557</p>
  </div>
  
  <div style="text-align: center; padding: 20px; font-size: 11px; color: #999;">
    <p style="margin: 0;">© ${new Date().getFullYear()} Nota Finance – Ein Service der twenty4collect GmbH</p>
  </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// EMAIL TEMPLATES
// ═══════════════════════════════════════════════════════════════

/**
 * Generiert HTML für die Kunden-Bestätigungs-E-Mail
 */
function getCustomerEmailHtml(fileCount: number): string {
  const fileText = fileCount === 1 ? "1 Datei" : `${fileCount} Dateien`;
  
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Preheader Text (wird in Mail-Vorschau angezeigt) -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Wir haben Ihre Einreichung erhalten, nach Prüfung startet der Inkassoprozess.
  </div>
  
  <div style="background: linear-gradient(135deg, #0524b0 0%, #1B52D7 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Nota Finance</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
    <h2 style="color: #0524b0; margin-top: 0;">Vielen Dank für Ihre Einreichung!</h2>
    
    <p>Wir haben Ihre Einreichung erhalten (${fileText}).</p>
    
    <h3 style="color: #0524b0; margin-top: 25px;">Nächste Schritte:</h3>
    <ul style="padding-left: 0; list-style: none; margin: 15px 0;">
      <li style="margin: 10px 0; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0;">✓</span>
        Wir prüfen Ihre Unterlagen und melden uns bei Rückfragen
      </li>
      <li style="margin: 10px 0; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0;">✓</span>
        Nach Prüfung erhalten Sie eine Bestätigung mit eindeutigem Aktenzeichen
      </li>
      <li style="margin: 10px 0; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0;">✓</span>
        Der Inkassoprozess startet anschließend automatisch
      </li>
    </ul>
    
    <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung:</p>
    <p style="margin: 5px 0;">📧 <a href="mailto:${SUPPORT_EMAIL}" style="color: #0524b0;">${SUPPORT_EMAIL}</a></p>
    
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #666;">
      Diese E-Mail wurde automatisch generiert.
    </p>
  </div>
  
  ${getImpressumFooterHtml()}
</body>
</html>
  `.trim();
}

/**
 * Generiert HTML für die interne Admin-Notification
 */
function getInternalNotificationHtml(
  customerEmail: string,
  filepaths: string[],
  signedUrls: (string | null)[]
): string {
  const fileLinks = filepaths.map((filepath, index) => {
    const url = signedUrls[index];
    const fallNummer = index + 1;

    if (!url) {
      return `<p style="margin: 8px 0; color: #E11D48;">⚠️ Fall ${fallNummer}: Link konnte nicht erzeugt werden (Datei ggf. als Anhang beigefügt)</p>`;
    }

    return `<a href="${url}" style="display: block; background: #0524b0; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; margin: 8px 0; font-weight: 500; text-align: center;">📄 Fall ${fallNummer} (Link, 14 Tage gültig)</a>`;
  }).join("");

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0524b0; padding: 20px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">🔔 Neue Einreichung (${filepaths.length} ${filepaths.length === 1 ? "Fall" : "Fälle"})</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
    <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin: 0 0 20px 0; border-left: 4px solid #0524b0;">
      <p style="margin: 0;"><strong>Kunden-E-Mail:</strong></p>
      <p style="margin: 5px 0 0 0;">
        <a href="mailto:${customerEmail}" style="color: #0524b0; font-size: 16px;">${customerEmail}</a>
      </p>
    </div>
    
    <p style="margin: 0 0 15px 0; font-weight: 600; color: #333;">Dateien herunterladen:</p>
    <div style="margin: 0 0 20px 0;">
      ${fileLinks}
    </div>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        <strong>Zeitpunkt:</strong> ${new Date().toLocaleString("de-DE", { 
          dateStyle: "full", 
          timeStyle: "short",
          timeZone: "Europe/Berlin"
        })}
      </p>
    </div>
  </div>
  
  ${getImpressumFooterHtml()}
</body>
</html>
  `.trim();
}

// ═══════════════════════════════════════════════════════════════
// EMAIL FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Sendet Bestätigungs-E-Mail an den Kunden
 */
export async function sendCustomerConfirmation(
  resend: Resend,
  customerEmail: string,
  fileCount: number
): Promise<EmailResult> {
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: customerEmail,
      subject: "Ihre Einreichung bei Nota Finance",
      html: getCustomerEmailHtml(fileCount),
    });

    if (error) {
      console.error("[Email] Customer confirmation failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Email] Customer confirmation error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Sendet interne Notification an Admin
 */
export async function sendInternalNotification(
  resend: Resend,
  customerEmail: string,
  filepaths: string[]
): Promise<EmailResult> {
  try {
    const signedUrls = await Promise.all(
      filepaths.map((filepath) => createInternalSignedUrl(filepath))
    );

    const attachmentResults = await Promise.all(
      filepaths.map((filepath) => downloadForAttachment(filepath))
    );
    const attachments = attachmentResults.filter(
      (a): a is { filename: string; content: Buffer } => a !== null
    );

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_INTERNAL_RECIPIENT,
      subject: `Neue Einreichung (${filepaths.length} ${filepaths.length === 1 ? "Fall" : "Fälle"})`,
      html: getInternalNotificationHtml(customerEmail, filepaths, signedUrls),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("[Email] Internal notification failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Email] Internal notification error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Sendet beide E-Mails (Kunde + Admin) nach erfolgreichem Upload
 */
export async function sendUploadNotifications(
  data: NotificationData
): Promise<{ customer: EmailResult; internal: EmailResult }> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    const error = "RESEND_API_KEY not configured";
    console.error("[Email]", error);
    return {
      customer: { success: false, error },
      internal: { success: false, error },
    };
  }

  const resend = new Resend(apiKey);

  // Beide E-Mails parallel senden für bessere Performance
  const [customerResult, internalResult] = await Promise.all([
    sendCustomerConfirmation(resend, data.customerEmail, data.filepaths.length),
    sendInternalNotification(resend, data.customerEmail, data.filepaths),
  ]);

  return {
    customer: customerResult,
    internal: internalResult,
  };
}

/**
 * Warnt das Backoffice, wenn der automatische Löschlauf auf Fehler gestoßen ist (P1-4).
 *
 * Bewusst **nur** bei Fehlern: Eine tägliche Erfolgsmeldung wären 365 Nachrichten im Jahr, die
 * niemand liest — und in denen die eine wichtige untergeht. Ein stiller erfolgreicher Lauf ist
 * über die Tabelle `loeschlaeufe` jederzeit nachvollziehbar.
 *
 * Enthält bewusst keine personenbezogenen Daten: nur Anzahlen, Fristen und Fehlertexte.
 */
export async function sendLoeschlaufWarnung(
  ergebnis: string,
  fehlermeldungen: string[]
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    const error = "RESEND_API_KEY not configured";
    console.error("[Email]", error);
    return { success: false, error };
  }

  try {
    const resend = new Resend(apiKey);

    const liste = fehlermeldungen
      .map((m) => `<li style="margin-bottom: 6px;">${m}</li>`)
      .join("");

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_INTERNAL_RECIPIENT,
      subject: "Löschlauf mit Fehlern beendet",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #b00020; font-size: 18px;">Der automatische Löschlauf ist auf Fehler gestoßen</h2>
          <p style="line-height: 1.6;">Ergebnis des Laufs:</p>
          <p style="background: #f8f9fa; padding: 12px 16px; border-radius: 6px; line-height: 1.6;">${ergebnis}</p>
          <p style="line-height: 1.6;">Aufgetretene Fehler:</p>
          <ul style="line-height: 1.6; padding-left: 20px;">${liste}</ul>
          <p style="line-height: 1.6; font-size: 13px; color: #666;">
            Nichts ist verloren gegangen: Was nicht gelöscht werden konnte, bleibt liegen und wird
            beim nächsten Lauf erneut versucht. Alle Läufe stehen in der Supabase-Tabelle
            <strong>loeschlaeufe</strong>.
          </p>
          ${getImpressumFooterHtml()}
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Löschlauf-Warnung failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Email] Löschlauf-Warnung error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
