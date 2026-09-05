import type { Metadata } from "next";
import { BASE_URL } from "@/lib/faktenkern";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import type { BranchenContent } from "@/lib/branchen-content";

/**
 * Metadata und strukturierte Daten für eine Branchenseite - an einer Stelle, damit sich das
 * Next.js-/JSON-LD-Muster nicht in zwölf fast identischen layout.tsx-Dateien wiederholt. Die
 * eigentlichen, branchenspezifischen Texte kommen ausschließlich aus lib/branchen-content.ts.
 */
export function branchenMetadata(content: BranchenContent): Metadata {
  const pfad = `/inkasso-${content.slug}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: pfad,
    },
    openGraph: {
      title: `${content.metaTitle} | Nota Finance`,
      description: content.metaDescription,
      url: `${BASE_URL}${pfad}`,
    },
  };
}

export function branchenSchemas(content: BranchenContent) {
  const pfad = `/inkasso-${content.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}${pfad}/#faqpage`,
    mainEntity: content.faq.map((eintrag) => ({
      "@type": "Question",
      name: eintrag.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: eintrag.antwort,
      },
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Branchen", path: "/branchen" },
    { name: content.branchenname, path: pfad },
  ]);

  return { faqSchema, breadcrumbSchema };
}
