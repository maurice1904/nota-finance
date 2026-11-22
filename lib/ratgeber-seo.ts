import type { Metadata } from "next";
import { BASE_URL } from "@/lib/faktenkern";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";
import type { RatgeberContent } from "@/lib/ratgeber-content";

/**
 * Metadata und strukturierte Daten für eine Ratgeber-Seite - analog zu lib/branchen-seo.ts
 * (SEO-4). Zusaetzlich zu FAQPage/BreadcrumbList hier ein Article-Schema mit
 * datePublished/dateModified, bewusst OHNE author (kein Autorenprofil, docs/entscheidungen.md
 * Nr. 32).
 */
export function ratgeberMetadata(content: RatgeberContent): Metadata {
  const pfad = `/ratgeber/${content.slug}`;
  return {
    title: content.frage,
    description: content.metaDescription,
    alternates: {
      canonical: pfad,
    },
    openGraph: {
      title: `${content.frage} | Nota Finance`,
      description: content.metaDescription,
      url: `${BASE_URL}${pfad}`,
    },
  };
}

export function ratgeberSchemas(content: RatgeberContent) {
  const pfad = `/ratgeber/${content.slug}`;
  const url = `${BASE_URL}${pfad}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}/#article`,
    headline: content.frage,
    description: content.metaDescription,
    datePublished: content.publishedAt,
    dateModified: content.updatedAt ?? content.publishedAt,
    mainEntityOfPage: url,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "de-DE",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faqpage`,
    mainEntity: content.faq.map((eintrag) => ({
      "@type": "Question",
      name: eintrag.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: eintrag.antwort,
      },
    })),
  };

  // Kein Zwischenschritt "Ratgeber" - dafuer gibt es (noch) keine eigene Uebersichtsseite wie
  // /branchen. Sobald eine solche Seite existiert, hier ergaenzen.
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: content.frage, path: pfad }]);

  return { articleSchema, faqSchema, breadcrumbSchema };
}
