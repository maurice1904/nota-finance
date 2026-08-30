import EinreichenContent from "@/components/EinreichenContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jetzt Fall einreichen & Rechnung hochladen",
  description:
    "Starten Sie das Inkasso in wenigen Sekunden. Rechnung per Drag & Drop hochladen, Daten prüfen, fertig. Ohne Anmeldung. Ohne Registrierung.",
  alternates: {
    canonical: "/einreichen",
  },
  openGraph: {
    title: "Jetzt Fall einreichen & Rechnung hochladen | Nota Finance",
    description:
      "Starten Sie das Inkasso in wenigen Sekunden. Rechnung per Drag & Drop hochladen, Daten prüfen, fertig. Ohne Anmeldung. Ohne Registrierung.",
    url: "https://www.notafinance.de/einreichen",
  },
};

export default function EinreichenPage() {
  return <EinreichenContent />;
}
