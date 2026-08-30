import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "@/components/Providers";
import PlausibleProvider from "next-plausible";
import { faktenkern, sameAs } from "@/lib/faktenkern";

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
  // Kanonische URL fuer alle Seiten ohne eigene alternates.canonical (30.08.2026):
  // notafinance.vercel.app ist ebenfalls live erreichbar - ohne canonical koennte Google diese
  // Adresse statt www.notafinance.de als massgeblich waehlen (Duplicate Content).
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon1.png", sizes: "32x32", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
  // "LegalService" ergaenzt: Inkasso ist nach RDG eine Rechtsdienstleistung, keine reine
  // Finanzdienstleistung (docs/recht-und-datenschutz.md Abschnitt 1).
  "@type": ["Organization", "FinancialService", "LegalService"],
  "@id": "https://www.notafinance.de/#organization",
  name: "Nota Finance",
  alternateName: "Nota Finance by twenty4collect",
  url: "https://www.notafinance.de",
  logo: {
    "@type": "ImageObject",
    url: "https://www.notafinance.de/logo.png",
    // Tatsaechliche Masse von public/logo.png. Falsche Angaben hier fuehren dazu, dass
    // Suchmaschinen das Logo verzerrt oder gar nicht uebernehmen.
    width: 144,
    height: 147,
  },
  image: "https://www.notafinance.de/logo.png",
  description:
    "Digitales Inkasso und Forderungsmanagement für Freelancer, Selbstständige und KMU. Ohne Registrierung, ohne Vertragsbindung, ab 50€.",
  // Gruendungsjahr der twenty4collect GmbH laut Handelsregister. Muss zu den
  // Erfahrungsangaben auf der Website passen (P1-6: "ueber 15 Jahren Erfahrung").
  foundingDate: "2008",
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
  // Registrierung nach RDG (docs/recht-und-datenschutz.md Abschnitt 1), aus dem Impressum.
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Rechtsdienstleistungsregister-Aktenzeichen",
    value: faktenkern.rdg.aktenzeichen,
  },
  memberOf: {
    "@type": "Organization",
    name: faktenkern.bdiu,
  },
  award: faktenkern.award,
  sameAs,
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
  const inhalt = (
    <Providers>
      <ScrollToTop />
      {/*
        Sprunglink: muss die ERSTE Station beim Tabben sein, steht deshalb vor der
        Navigationsleiste. Sichtbar wird er nur, solange er den Fokus hat
        (Gestaltung: .skip-link in app/globals.css).
      */}
      <a href="#hauptinhalt" className="skip-link">
        Zum Inhalt springen
      </a>
      <Navbar />
      {/*
        Ziel des Sprunglinks. tabIndex={-1} macht den Bereich programmatisch
        fokussierbar - ohne das wuerde der Browser nur scrollen, der Fokus bliebe
        oben, und die naechste Tabulator-Taste faenge wieder bei der Leiste an.
        Der Bereich bleibt aus der normalen Tabulator-Reihenfolge heraus.
      */}
      <div id="hauptinhalt" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </Providers>
  );

  // Sanftes Scrollen stand hier bis August 2026 als Klasse "scroll-smooth".
  // Es steht jetzt in app/globals.css - nur dort laesst es sich fuer Menschen
  // abschalten, die "Bewegung reduzieren" eingestellt haben (Begruendung dort).
  // data-scroll-behavior="smooth": seit dem Next-Update (P1-8, 16.3.1) noetig,
  // sonst warnt der Router im Dev-Modus - siehe docs/aufgabenliste.md P1-3.
  return (
    <html lang="de" data-scroll-behavior="smooth">
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
        {/*
          Plausible: cookiefreie, EU-gehostete Statistik ohne personenbezogene Daten.
          Die Skript-URL kommt aus PLAUSIBLE_SRC (siehe next.config.ts); fehlt sie,
          wird die Statistik einfach weggelassen.

          enabled: bewusst an NODE_ENV geknuepft statt am Standard von next-plausible.
          So misst auch die Vercel-Vorschau mit (dort ist der Standard aus), waehrend
          "npm run dev" nichts sendet.
        */}
        {process.env.PLAUSIBLE_SRC ? (
          <PlausibleProvider enabled={process.env.NODE_ENV === "production"}>
            {inhalt}
          </PlausibleProvider>
        ) : (
          inhalt
        )}
      </body>
    </html>
  );
}
