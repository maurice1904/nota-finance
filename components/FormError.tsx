import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string | undefined;
  /**
   * Kennung der Meldung. Das zugehoerige Eingabefeld verweist per aria-describedby
   * darauf - so liest ein Screenreader beim Fokussieren des Feldes gleich mit vor,
   * was falsch ist, statt nur "ungueltige Eingabe".
   */
  id?: string;
}

/**
 * Inline Form Error Message
 * 
 * Zeigt Validierungsfehler direkt unter dem Eingabefeld an.
 * Ersetzt alert() für bessere UX.
 */
export function FormError({ message, id }: FormErrorProps) {
  if (!message) return null;

  /*
    role="alert" sorgt dafuer, dass die Meldung beim Erscheinen vorgelesen wird.
    Der Fehler steht bewusst als Text da und nicht nur als rote Umrandung (WCAG 1.4.1) -
    Farbe allein ist fuer farbfehlsichtige Nutzer keine Information.
  */
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center text-sm text-error mt-2 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" style={{ marginRight: "8px" }} />
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
    <div
      role="alert"
      className="bg-error/10 border-2 border-error/30 rounded-2xl p-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" aria-hidden="true" />
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

