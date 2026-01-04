import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt aufnehmen",
  description:
    "Haben Sie Fragen oder benötigen Sie Hilfe? Unser Support-Team steht Ihnen zur Verfügung.",
  openGraph: {
    title: "Kontakt aufnehmen | Nota Finance",
    description:
      "Haben Sie Fragen oder benötigen Sie Hilfe? Unser Support-Team steht Ihnen zur Verfügung.",
    url: "https://www.notafinance.de/kontakt",
  },
};

export default function KontaktLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

