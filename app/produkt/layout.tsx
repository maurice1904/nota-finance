import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "So funktioniert digitales Forderungsmanagement",
  description:
    "Von Upload bis Auszahlung: Unser transparenter Inkasso-Prozess. Wir kümmern uns um Mahnungen und Kommunikation, damit Sie Ihr Geld erhalten.",
  openGraph: {
    title: "So funktioniert digitales Forderungsmanagement | Nota Finance",
    description:
      "Von Upload bis Auszahlung: Unser transparenter Inkasso-Prozess. Wir kümmern uns um Mahnungen und Kommunikation, damit Sie Ihr Geld erhalten.",
    url: "https://www.notafinance.de/produkt",
  },
};

// JSON-LD Service Schema for SEO
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.notafinance.de/produkt/#service",
  name: "Digitales Forderungsmanagement",
  alternateName: "Online Inkasso Service",
  description:
    "Professionelles Inkasso und Forderungsmanagement für Unternehmen. Von der Forderungseinreichung bis zur Auszahlung – digital, schnell und transparent.",
  url: "https://www.notafinance.de/produkt",
  provider: {
    "@id": "https://www.notafinance.de/#organization",
  },
  areaServed: {
    "@type": "Country",
    name: "Germany",
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType: [
      "Freelancer",
      "Selbstständige",
      "Kleinunternehmen",
      "Mittelständische Unternehmen",
      "Steuerberater",
      "Handwerker",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 250,
    },
  },
  serviceType: "Inkasso und Forderungsmanagement",
  termsOfService: "https://www.notafinance.de/agb.pdf",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Inkasso-Prozess",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Forderungseinreichung",
        description: "Upload per PDF, XRechnung oder ZUGFeRD – ohne Registrierung.",
      },
      {
        "@type": "Offer",
        name: "Außergerichtliches Mahnverfahren",
        description:
          "Professionelle Mahnschreiben und Schuldnerkommunikation. Im Erfolgsfall für den Gläubiger kostenfrei.",
      },
      {
        "@type": "Offer",
        name: "Gerichtliches Mahnverfahren",
        description:
          "Vollstreckbarer Titel durch gerichtliches Mahnverfahren bei Bedarf.",
      },
    ],
  },
  serviceOutput: {
    "@type": "Thing",
    name: "Einzug offener Forderungen",
    description:
      "100% der Hauptforderung wird an den Gläubiger ausgezahlt. Inkassokosten trägt der Schuldner.",
  },
};

export default function ProduktLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {children}
    </>
  );
}
