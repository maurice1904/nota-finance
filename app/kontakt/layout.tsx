import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

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

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Kontakt", path: "/kontakt" }]);

export default function KontaktLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}

