import { branchenContent } from "@/lib/branchen-content";
import { branchenMetadata, branchenSchemas } from "@/lib/branchen-seo";

const content = branchenContent.agenturen;

export const metadata = branchenMetadata(content);
const { faqSchema, breadcrumbSchema } = branchenSchemas(content);

export default function InkassoAgenturenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
