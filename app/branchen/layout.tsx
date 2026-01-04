import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inkasso-Lösungen für Ihre Branche",
  description:
    "Spezialisiertes Forderungsmanagement für Steuerberater, Handwerk, Ärzte, Agenturen, E-Commerce und Dienstleister sowie alle weiteren kleinen und mittleren Unternehmen. Wir verstehen Ihr Business und helfen Ihnen mit ihren offenen Forderungen.",
  openGraph: {
    title: "Inkasso-Lösungen für Ihre Branche | Nota Finance",
    description:
      "Spezialisiertes Forderungsmanagement für Steuerberater, Handwerk, Ärzte, Agenturen, E-Commerce und Dienstleister sowie alle weiteren kleinen und mittleren Unternehmen. Wir verstehen Ihr Business und helfen Ihnen mit ihren offenen Forderungen.",
    url: "https://www.notafinance.de/branchen",
  },
};

export default function BranchenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

