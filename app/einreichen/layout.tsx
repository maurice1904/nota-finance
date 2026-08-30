import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Fall einreichen", path: "/einreichen" }]);

export default function EinreichenLayout({
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
