import { ratgeberContent } from "@/lib/ratgeber-content";
import { ratgeberMetadata, ratgeberSchemas } from "@/lib/ratgeber-seo";

const content = ratgeberContent["serioeses-inkassounternehmen-erkennen"];

export const metadata = ratgeberMetadata(content);
const { articleSchema, faqSchema, breadcrumbSchema } = ratgeberSchemas(content);

export default function SerioesesInkassounternehmenErkennenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
