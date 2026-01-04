import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Häufige Fragen zu Inkasso & Ablauf",
  description:
    "Antworten auf Ihre Fragen: Kosten, Ablauf, Datensicherheit und Erfolgsaussichten. Alles, was Sie wissen müssen.",
  openGraph: {
    title: "Häufige Fragen zu Inkasso & Ablauf | Nota Finance",
    description:
      "Antworten auf Ihre Fragen: Kosten, Ablauf, Datensicherheit und Erfolgsaussichten. Alles, was Sie wissen müssen.",
    url: "https://www.notafinance.de/faq",
  },
};

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

