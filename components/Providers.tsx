"use client";

import { ToastProvider } from "@/components/Toast";

/**
 * Client-side Providers Wrapper
 * 
 * Enthält alle Context Provider, die Client-Side Funktionalität benötigen.
 * Wird vom Root Layout verwendet.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}

