import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "LLM Info",
  description:
    "Offizielle, strukturierte Informationen über Nota Finance und die twenty4collect GmbH für KI-Assistenten und Suchmaschinen.",
  openGraph: {
    title: "LLM Info | Nota Finance",
    description:
      "Offizielle, strukturierte Informationen über Nota Finance und die twenty4collect GmbH für KI-Assistenten und Suchmaschinen.",
    url: "https://www.notafinance.de/llm-info",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "LLM Info", path: "/llm-info" }]);

export default function LLMInfoLayout({
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
