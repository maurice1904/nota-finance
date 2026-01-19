import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preise & Kosten – 0€ für Gläubiger",
  description:
    "Keine versteckten Kosten: Das außergerichtliche Inkasso ist für Sie als Gläubiger im Erfolgsfall kostenfrei. Die Inkassokosten trägt der Schuldner.",
  openGraph: {
    title: "Preise & Kosten – 0€ für Gläubiger | Nota Finance",
    description:
      "Keine versteckten Kosten: Das außergerichtliche Inkasso ist für Sie als Gläubiger im Erfolgsfall kostenfrei. Die Inkassokosten trägt der Schuldner.",
    url: "https://www.notafinance.de/preise",
  },
};

// JSON-LD Offer Schema for Pricing Page
const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "https://www.notafinance.de/preise/#offer",
  name: "Außergerichtliches Inkasso",
  description:
    "Professionelles Forderungsmanagement und Inkasso. Im außergerichtlichen Verfahren für den Gläubiger im Erfolgsfall kostenfrei – die gesetzlichen Inkassokosten trägt der Schuldner.",
  url: "https://www.notafinance.de/preise",
  price: "0",
  priceCurrency: "EUR",
  priceValidUntil: "2026-12-31",
  availability: "https://schema.org/InStock",
  validFrom: "2024-01-01",
  seller: {
    "@id": "https://www.notafinance.de/#organization",
  },
  eligibleRegion: {
    "@type": "Country",
    name: "Germany",
  },
  category: "Inkasso & Forderungsmanagement",
  itemOffered: {
    "@type": "Service",
    name: "Digitales Forderungsmanagement",
    description:
      "Von der Forderungseinreichung bis zur Auszahlung. 100% der Hauptforderung wird an den Gläubiger ausgezahlt.",
    provider: {
      "@id": "https://www.notafinance.de/#organization",
    },
    serviceOutput: {
      "@type": "MonetaryAmount",
      name: "Auszahlung an Gläubiger",
      description: "Sie erhalten 100% Ihrer ursprünglichen Hauptforderung.",
    },
  },
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: 0,
      currency: "EUR",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 7,
        maxValue: 42,
        unitCode: "DAY",
      },
    },
  },
};

// Additional PriceSpecification for transparency
const priceSchema = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "@id": "https://www.notafinance.de/preise/#pricespec",
  price: "0",
  priceCurrency: "EUR",
  name: "Kosten für Gläubiger im außergerichtlichen Verfahren",
  description:
    "Das außergerichtliche Inkasso ist für den Gläubiger im Erfolgsfall kostenfrei. Die gesetzlich geregelten Inkassokosten (gemäß RDGEG/RVG) werden dem Schuldner in Rechnung gestellt.",
  valueAddedTaxIncluded: true,
  eligibleTransactionVolume: {
    "@type": "MonetaryAmount",
    minValue: 50,
    currency: "EUR",
    description: "Mindestforderungsbetrag: 50€",
  },
};

export default function PreiseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(priceSchema),
        }}
      />
      {children}
    </>
  );
}
