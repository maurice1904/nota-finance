import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

// Eigene Datei statt Aenderung an app/agb/page.tsx: page.tsx ist ein gesperrter Rechtstext
// (CLAUDE.md, "Nicht anfassen ohne expliziten Auftrag") - hier wird nur unsichtbares
// Navigations-Markup ergaenzt, der geprüfte Text bleibt unberührt.
const breadcrumbSchema = buildBreadcrumbSchema([{ name: "AGB", path: "/agb" }]);

export default function AGBLayout({
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
