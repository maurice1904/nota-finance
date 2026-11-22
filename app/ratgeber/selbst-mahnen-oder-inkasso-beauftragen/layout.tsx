import { ratgeberContent } from "@/lib/ratgeber-content";
import { ratgeberMetadata, ratgeberSchemas } from "@/lib/ratgeber-seo";

const content = ratgeberContent["selbst-mahnen-oder-inkasso-beauftragen"];

export const metadata = ratgeberMetadata(content);
const { articleSchema, faqSchema, breadcrumbSchema } = ratgeberSchemas(content);

export default function SelbstMahnenOderInkassoBeauftragenLayout({
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
