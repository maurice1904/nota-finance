/**
 * E-Mail Utilities für Nota Finance
 * 
 * Modulare Funktionen für:
 * - URL-Generierung für Supabase Storage
 * - E-Mail-Templates für Kunden und interne Notifications
 * - Resend API Integration
 */

import { Resend } from "resend";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const SENDER_EMAIL = "Nota Finance Service <service@notafinance.de>";
const GF_EMAIL = "admin@notafinance.de";
const SUPABASE_PROJECT_ID = "dvztledaeaxufpeyrphq";
const BUCKET_NAME = "invoices";

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
// URL UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Generiert eine öffentliche Supabase Storage URL
 * 
 * @param filepath - Pfad im Bucket (z.B. "2026/02/abc123.pdf")
 * @returns Vollständige öffentliche URL
 */
export function generatePublicUrl(filepath: string): string {
  return `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${filepath}`;
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
      E-Mail: <a href="mailto:service@notafinance.de" style="color: #021C8B;">service@notafinance.de</a>
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
  
  <div style="background: linear-gradient(135deg, #021C8B 0%, #1B52D7 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Nota Finance</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
    <h2 style="color: #021C8B; margin-top: 0;">Vielen Dank für Ihre Einreichung!</h2>
    
    <p>Wir haben Ihre Einreichung erhalten (${fileText}).</p>
    
    <h3 style="color: #021C8B; margin-top: 25px;">Nächste Schritte:</h3>
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
    <p style="margin: 5px 0;">📧 <a href="mailto:service@notafinance.de" style="color: #021C8B;">service@notafinance.de</a></p>
    
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
function getInternalNotificationHtml(customerEmail: string, filepaths: string[]): string {
  const fileLinks = filepaths.map((filepath, index) => {
    const url = generatePublicUrl(filepath);
    const fallNummer = index + 1;
    return `<a href="${url}" style="display: block; background: #021C8B; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; margin: 8px 0; font-weight: 500; text-align: center;">📄 Fall ${fallNummer}</a>`;
  }).join("");

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #021C8B; padding: 20px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">🔔 Neue Einreichung (${filepaths.length} ${filepaths.length === 1 ? "Fall" : "Fälle"})</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
    <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin: 0 0 20px 0; border-left: 4px solid #021C8B;">
      <p style="margin: 0;"><strong>Kunden-E-Mail:</strong></p>
      <p style="margin: 5px 0 0 0;">
        <a href="mailto:${customerEmail}" style="color: #021C8B; font-size: 16px;">${customerEmail}</a>
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
      from: SENDER_EMAIL,
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
    const { error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: GF_EMAIL,
      subject: `Neue Einreichung (${filepaths.length} ${filepaths.length === 1 ? "Fall" : "Fälle"})`,
      html: getInternalNotificationHtml(customerEmail, filepaths),
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
