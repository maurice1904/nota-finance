"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { CheckCircle, AlertCircle, X, RefreshCcw, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string, action?: Toast["action"]) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    // Das Ausblenden steuert die Meldung selbst (siehe ToastItem) - nur dort laesst es
    // sich anhalten, solange Maus oder Tastaturfokus auf der Meldung stehen.
  }, []);

  const success = useCallback((title: string, message?: string, duration?: number) => {
    addToast({ type: "success", title, message, duration });
  }, [addToast]);

  const error = useCallback((title: string, message?: string, action?: Toast["action"]) => {
    addToast({ type: "error", title, message, action });
  }, [addToast]);

  const info = useCallback((title: string, message?: string) => {
    addToast({ type: "info", title, message });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

/*
  Der Container wird bewusst IMMER dargestellt, auch wenn gerade keine Meldung ansteht.
  Grund: Ein Screenreader liest eine neue Meldung nur zuverlaessig vor, wenn der Bereich
  schon vorher im Seitenaufbau stand. Wuerde er erst mit der ersten Meldung entstehen,
  bliebe genau diese erste Meldung oft stumm.
  Ohne Meldung ist er unsichtbar und faengt keine Klicks ab (pointer-events-none).
*/
function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div
      role="region"
      aria-label="Benachrichtigungen"
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-md w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

/**
 * Wie lange eine Meldung stehen bleibt.
 *
 * `null` heisst: gar nicht automatisch ausblenden. Das gilt fuer Fehler und Warnungen
 * sowie fuer jede Meldung mit einem Knopf ("Erneut versuchen") - wer erst lesen und dann
 * entscheiden soll, darf die Meldung nicht unter den Haenden verlieren (WCAG 2.2.1).
 */
function autoHideAfter(toast: Toast): number | null {
  if (toast.duration !== undefined) return toast.duration;
  if (toast.action) return null;
  if (toast.type === "error" || toast.type === "warning") return null;
  return toast.type === "success" ? 8000 : 6000;
}

/*
  Die Meldung bekommt bewusst removeToast + ihre eigene Kennung statt einer fertigen
  onClose-Funktion: removeToast aendert sich nie, die Kennung auch nicht. Damit bleibt
  handleClose ueber alle Neuzeichnungen hinweg dieselbe Funktion - sonst wuerde der
  Ausblend-Zeitgeber unten bei jeder Neuzeichnung neu starten und nie ablaufen.
*/
function ToastItem({ toast, removeToast }: { toast: Toast; removeToast: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);
  // Angehalten, solange die Maus auf der Meldung liegt oder der Tastaturfokus darin steht.
  const [isPaused, setIsPaused] = useState(false);

  const { id } = toast;

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => removeToast(id), 200);
  }, [removeToast, id]);

  const duration = autoHideAfter(toast);

  useEffect(() => {
    if (duration === null || isPaused) return;
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration, isPaused, handleClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />,
    error: <AlertCircle className="w-5 h-5 text-error" aria-hidden="true" />,
    info: <Info className="w-5 h-5 text-brand-900" aria-hidden="true" />,
    warning: <AlertCircle className="w-5 h-5 text-warning" aria-hidden="true" />,
  };

  const bgColors = {
    success: "bg-success/10 border-success/30",
    error: "bg-error/10 border-error/30",
    info: "bg-brand-900/10 border-brand-900/30",
    warning: "bg-warning/10 border-warning/30",
  };

  /*
    Fehler und Warnungen sind "alert" - sie unterbrechen und werden sofort vorgelesen.
    Erfolg und Hinweis sind "status" - sie warten hoeflich, bis der Screenreader Luft hat.
  */
  const role = toast.type === "error" || toast.type === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className={cn(
        "pointer-events-auto bg-white border-2 rounded-xl p-4 shadow-lg transition-all duration-200",
        bgColors[toast.type],
        isExiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0 animate-in slide-in-from-right-4"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text-900">{toast.title}</p>
          {toast.message && (
            <p className="text-sm text-text-900/70 mt-1">{toast.message}</p>
          )}
          {toast.action && (
            <button
              type="button"
              onClick={toast.action.onClick}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-900 hover:underline"
            >
              <RefreshCcw className="w-4 h-4" aria-hidden="true" />
              {toast.action.label}
            </button>
          )}
        </div>
        {/*
          Der Knopf zeigt nur ein Kreuz. Der Text daneben ist optisch unsichtbar (sr-only),
          steht aber wirklich im Dokument - ein Screenreader liest damit "Benachrichtigung
          schliessen" statt nur "Schaltflaeche". Echter Text ist hier besser als aria-label.
        */}
        <button
          type="button"
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-surface-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-neutral-500" aria-hidden="true" />
          <span className="sr-only">Benachrichtigung schließen</span>
        </button>
      </div>
    </div>
  );
}

