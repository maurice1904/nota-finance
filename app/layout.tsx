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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
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
