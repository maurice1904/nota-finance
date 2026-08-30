import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Inkasso-Lösungen für Ihre Branche",
  description:
    "Spezialisiertes Forderungsmanagement für Steuerberater, Handwerk, Ärzte, Agenturen, E-Commerce und Dienstleister sowie alle weiteren kleinen und mittleren Unternehmen. Wir verstehen Ihr Business und helfen Ihnen mit ihren offenen Forderungen.",
  alternates: {
    canonical: "/branchen",
  },
  openGraph: {
    title: "Inkasso-Lösungen für Ihre Branche | Nota Finance",
    description:
      "Spezialisiertes Forderungsmanagement für Steuerberater, Handwerk, Ärzte, Agenturen, E-Commerce und Dienstleister sowie alle weiteren kleinen und mittleren Unternehmen. Wir verstehen Ihr Business und helfen Ihnen mit ihren offenen Forderungen.",
    url: "https://www.notafinance.de/branchen",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Branchen", path: "/branchen" }]);

export default function BranchenLayout({
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

