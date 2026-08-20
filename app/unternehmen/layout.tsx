import type { Metadata } from "next";

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

export default function UnternehmenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
