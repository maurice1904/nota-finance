import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "@/components/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.notafinance.de"),
  title: {
    default: "Digitales Inkasso ohne Registrierung | Nota Finance",
    template: "%s | Nota Finance",
  },
  description:
    "Fordern Sie offene Rechnungen einfach online ein. Sofortiger Start per Upload, ohne Vertragsbindung, ab 50€. Die Lösung für Freelancer & KMU.",
  keywords: [
    // Core Services
    "Inkasso",
    "Forderung",
    "Forderungsmanagement",
    "Mahnwesen outsourcen",
    "Online Inkasso",
    "Inkasso Einfach",
    "Inkasso schnell",
    "Digitales Inkasso",
    "Inkasso digital",
    // USPs
    "Inkasso ohne Registrierung",
    "Inkasso ohne Mitgliedschaft",
    "Rechnung sofort einreichen",
    "Inkasso ab 50 Euro",
    // Zielgruppen
    "Inkasso für Selbstständige",
    "Inkasso für Freelancer",
    "Inkasso Steuerberater",
    "Inkasso Deutschland",
    "Inkasso München",
    "Inkasso Berlin",
    "Inkasso Köln",
    "Inkasso Hamburg",
    "Inkasso für Kleinunternehmer",
    "Inkasso für Handwerker",
    "B2B Inkasso Service",
    // Pain Points
    "Kunde zahlt Rechnung nicht",
    "Offene Forderungen eintreiben",
    "Kunde zahlt nicht was tun",
    "Kunde zahlt Rechnung nicht was tun",
    "außergerichtliches Mahnverfahren schnell",
    "außergerichtliches Mahnverfahren einfach",
    "Mahnverfahren einleiten",
    "Zahlungsausfall",
    // Brand & Trust
    "Nota Finance",
    "24collect",
    "Seriöses Inkasso",
  ],
  authors: [{ name: "Nota Finance" }],
  creator: "twenty4collect GmbH",
  publisher: "twenty4collect GmbH",
  // Apple Web App Title (für "Zum Home-Bildschirm hinzufügen")
  appleWebApp: {
    title: "Nota Finance",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.notafinance.de",
    siteName: "Nota Finance",
    title: "Digitales Inkasso ohne Registrierung | Nota Finance",
    description:
      "Fordern Sie offene Rechnungen einfach online ein. Sofortiger Start per Upload, ohne Vertragsbindung, ab 50€. Die Lösung für Freelancer & KMU.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  "@id": "https://www.notafinance.de/#organization",
  name: "Nota Finance",
  alternateName: "Nota Finance by twenty4collect",
  url: "https://www.notafinance.de",
  logo: {
    "@type": "ImageObject",
    url: "https://www.notafinance.de/logo.png",
    width: 512,
    height: 512,
  },
  image: "https://www.notafinance.de/logo.png",
  description:
    "Digitales Inkasso und Forderungsmanagement für Freelancer, Selbstständige und KMU. Ohne Registrierung, ohne Vertragsbindung, ab 50€.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "Germany",
  },
  serviceType: [
    "Inkasso",
    "Forderungsmanagement",
    "Mahnwesen",
    "Digitales Inkasso",
  ],
  slogan: "Digitales Inkasso. Schnell. Einfach. Effektiv.",
  knowsLanguage: "de",
  email: "service@notafinance.de",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "service@notafinance.de",
    availableLanguage: "German",
  },
  parentOrganization: {
    "@type": "Organization",
    "@id": "https://www.notafinance.de/#parent-organization",
    name: "twenty4collect GmbH",
    description:
      "BDIU-zertifiziertes Inkassounternehmen mit über 15 Jahren Erfahrung im Forderungsmanagement in Deutschland.",
  },
  sameAs: ["https://www.linkedin.com/company/notafinance"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Inkasso-Dienstleistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Außergerichtliches Mahnverfahren",
          description:
            "Professionelles Mahnwesen ohne Gerichtskosten. Im Erfolgsfall für den Gläubiger kostenfrei.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gerichtliches Mahnverfahren",
          description:
            "Rechtssichere Durchsetzung Ihrer Forderungen mit vollstreckbarem Titel.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.notafinance.de/#website",
  name: "Nota Finance",
  url: "https://www.notafinance.de",
  publisher: {
    "@id": "https://www.notafinance.de/#organization",
  },
  inLanguage: "de-DE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.notafinance.de/faq?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} antialiased font-sans`}
      >
        <Providers>
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
