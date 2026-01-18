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

export default function ProduktLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
