import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Presse",
  description:
    "Presseberichte über gerichtsmahnverfahren.de und twenty4collect GmbH, der Trägergesellschaft von Nota Finance.",
  openGraph: {
    title: "Presse | Nota Finance",
    description:
      "Presseberichte über gerichtsmahnverfahren.de und twenty4collect GmbH, der Trägergesellschaft von Nota Finance.",
    url: "https://www.notafinance.de/presse",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Presse", path: "/presse" }]);

export default function PresseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
