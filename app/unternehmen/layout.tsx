import type { Metadata } from "next";
import { faktenkern } from "@/lib/faktenkern";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Über uns - Powered by 24collect",
  description:
    "Nota Finance als Plattform verbindet über 15 Jahre Inkasso-Erfahrung von 24collect mit modernster Technologie. Seriös, empathisch und effizient. Schnell, digital, kosteneffizient.",
  openGraph: {
    title: "Über uns - Powered by 24collect | Nota Finance",
    description:
      "Nota Finance verbindet über 15 Jahre Inkasso-Erfahrung von 24collect mit modernster Technologie. Seriös, empathisch und effizient. Schnell, digital, kosteneffizient.",
    url: "https://www.notafinance.de/unternehmen",
  },
};

// Erweitert dieselbe Organization-Entitaet (gleiche @id wie in app/layout.tsx) um Adresse und
// Servicegebiet - keine zweite, konkurrierende Entitaet. Oeffnungszeiten fehlen als Faktum und
// werden nicht erfunden.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService", "LegalService", "LocalBusiness"],
  "@id": "https://www.notafinance.de/#organization",
  address: {
    "@type": "PostalAddress",
    streetAddress: faktenkern.anschrift.strasse,
    postalCode: faktenkern.anschrift.plz,
    addressLocality: faktenkern.anschrift.ort,
    addressCountry: "DE",
  },
  telephone: faktenkern.telefon,
  areaServed: {
    "@type": "Country",
    name: "Germany",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([{ name: "Unternehmen", path: "/unternehmen" }]);

export default function UnternehmenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
