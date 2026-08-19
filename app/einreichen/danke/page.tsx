import EinreichenContent from "@/components/EinreichenContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Einreichung erfolgreich",
  description:
    "Ihre Unterlagen wurden erfolgreich hochgeladen und werden jetzt von uns bearbeitet.",
  // Die Seite ist inhaltlich fast identisch mit /einreichen. Ohne noindex wuerden
  // beide Seiten bei Google gegeneinander antreten. Sie dient allein der Messung
  // des erfolgreichen Abschlusses.
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/einreichen",
  },
};

export default function EinreichenDankePage() {
  return <EinreichenContent showSuccess />;
}
