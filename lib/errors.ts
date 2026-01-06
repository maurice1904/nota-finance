/**
 * Error Handling Utilities
 * 
 * - Strukturiertes Error Handling für Supabase und andere externe Services
 * - Retry-Logik für transiente Fehler
 * - User-freundliche Fehlermeldungen (keine technischen Details)
 * - Server-side Logging (keine sensiblen Daten an den Client)
 */

// Bekannte transiente Fehler, die einen Retry rechtfertigen
const TRANSIENT_ERROR_CODES = [
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "ENETUNREACH",
  "EAI_AGAIN",
  "503",
  "502",
  "504",
  "429", // Rate limit
];

// Supabase-spezifische Fehlercodes
const SUPABASE_TRANSIENT_ERRORS = [
  "storage/object-not-found", // Manchmal temporär bei hoher Last
  "storage/unknown-error",
];

export interface ErrorDetails {
  /** User-freundliche Fehlermeldung (sicher für UI) */
  userMessage: string;
  /** Technische Details (nur für Logging) */
  technicalMessage: string;
  /** Ist der Fehler transient (Retry sinnvoll)? */
  isRetryable: boolean;
  /** Original Error Code */
  code?: string;
}

/**
 * Analysiert einen Fehler und gibt strukturierte Details zurück
 */
export function analyzeError(error: unknown): ErrorDetails {
  // Supabase Error
  if (isSupabaseError(error)) {
    return analyzeSupabaseError(error);
  }

  // Network/Fetch Error
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return {
      userMessage: "Verbindungsproblem. Bitte prüfen Sie Ihre Internetverbindung.",
      technicalMessage: `Network error: ${error.message}`,
      isRetryable: true,
      code: "NETWORK_ERROR",
    };
  }

  // Standard Error
  if (error instanceof Error) {
    const isTransient = TRANSIENT_ERROR_CODES.some(
      (code) => error.message.includes(code) || error.name.includes(code)
    );

    return {
      userMessage: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      technicalMessage: `${error.name}: ${error.message}`,
      isRetryable: isTransient,
      code: error.name,
    };
  }

  // Unknown Error
  return {
    userMessage: "Ein unerwarteter Fehler ist aufgetreten.",
    technicalMessage: `Unknown error: ${String(error)}`,
    isRetryable: false,
    code: "UNKNOWN",
  };
}

interface SupabaseError {
  message: string;
  statusCode?: string | number;
  error?: string;
  name?: string;
}

function isSupabaseError(error: unknown): error is SupabaseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  );
}

function analyzeSupabaseError(error: SupabaseError): ErrorDetails {
  const message = error.message || "";
  const statusCode = String(error.statusCode || "");

  // Bucket/Permission Errors
  if (message.includes("Bucket not found") || message.includes("not found")) {
    return {
      userMessage: "Der Upload-Service ist temporär nicht verfügbar. Bitte versuchen Sie es später erneut.",
      technicalMessage: `Supabase bucket error: ${message}`,
      isRetryable: true,
      code: "BUCKET_ERROR",
    };
  }

  // Auth/Permission Errors
  if (message.includes("not authorized") || message.includes("permission")) {
    return {
      userMessage: "Der Upload konnte nicht durchgeführt werden. Bitte kontaktieren Sie den Support.",
      technicalMessage: `Supabase auth error: ${message}`,
      isRetryable: false,
      code: "AUTH_ERROR",
    };
  }

  // File too large
  if (message.includes("too large") || message.includes("size")) {
    return {
      userMessage: "Die Datei ist zu groß. Maximale Dateigröße ist 10 MB.",
      technicalMessage: `File size error: ${message}`,
      isRetryable: false,
      code: "FILE_SIZE",
    };
  }

  // Rate Limiting
  if (statusCode === "429" || message.includes("rate limit")) {
    return {
      userMessage: "Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.",
      technicalMessage: `Rate limit error: ${message}`,
      isRetryable: true,
      code: "RATE_LIMIT",
    };
  }

  // Service Unavailable
  if (["502", "503", "504"].includes(statusCode)) {
    return {
      userMessage: "Der Service ist vorübergehend nicht erreichbar. Bitte versuchen Sie es in wenigen Minuten erneut.",
      technicalMessage: `Service unavailable (${statusCode}): ${message}`,
      isRetryable: true,
      code: `HTTP_${statusCode}`,
    };
  }

  // Check for transient Supabase errors
  const isTransient = SUPABASE_TRANSIENT_ERRORS.some((code) => message.includes(code));

  return {
    userMessage: "Der Upload konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
    technicalMessage: `Supabase error: ${message}`,
    isRetryable: isTransient || ["502", "503", "504", "429"].includes(statusCode),
    code: error.error || "SUPABASE_ERROR",
  };
}

/**
 * Sichere Server-Side Logging (keine sensiblen Daten an Client)
 */
export function logError(context: string, error: unknown, metadata?: Record<string, unknown>): void {
  const details = analyzeError(error);
  
  // In Development: Volle Details
  // In Production: Würde an Sentry/LogDrain gesendet werden
  if (typeof window === "undefined") {
    // Server-side logging
    console.error(`[${context}] ${details.technicalMessage}`, {
      code: details.code,
      isRetryable: details.isRetryable,
      ...metadata,
    });
  } else {
    // Client-side: Nur minimale Info (keine sensiblen Details)
    console.error(`[${context}] Error occurred`, { code: details.code });
  }
}

/**
 * Retry-Wrapper mit exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    onRetry?: (attempt: number, error: ErrorDetails) => void;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, baseDelay = 1000, onRetry } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const details = analyzeError(error);

      // Log the error
      logError("withRetry", error, { attempt, maxAttempts });

      // Don't retry if not retryable or last attempt
      if (!details.isRetryable || attempt === maxAttempts) {
        throw error;
      }

      // Notify about retry
      if (onRetry) {
        onRetry(attempt, details);
      }

      // Exponential backoff: 1s, 2s, 4s...
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Kontakt-Info für Support
 */
export const SUPPORT_EMAIL = "service@notafinance.de";

export function getSupportMessage(): string {
  return `Sollte das Problem weiterhin bestehen, kontaktieren Sie uns unter ${SUPPORT_EMAIL}`;
}

