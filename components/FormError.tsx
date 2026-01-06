import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string | undefined;
}

/**
 * Inline Form Error Message
 * 
 * Zeigt Validierungsfehler direkt unter dem Eingabefeld an.
 * Ersetzt alert() für bessere UX.
 */
export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className="flex items-center text-sm text-error mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ marginRight: "8px" }} />
      <span>{message}</span>
    </p>
  );
}

/**
 * Form Error Summary
 * 
 * Zeigt eine Zusammenfassung aller Fehler oben im Formular.
 */
export function FormErrorSummary({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-error/10 border-2 border-error/30 rounded-2xl p-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-text-900 mb-1">
            Bitte korrigieren Sie folgende Fehler:
          </p>
          <ul className="text-sm text-text-900/70 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

