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

// FAQ data for JSON-LD (Google Rich Snippets)
const faqItems = [
  {
    question: "Was kostet mich die Beauftragung von Nota Finance?",
    answer:
      "Für Sie als Auftraggeber ist das außergerichtliche Mahnverfahren bei Nota Finance im Erfolgsfall in der Regel kostenfrei. Die anfallenden Inkassokosten sowie Verzugszinsen sind gesetzlich geregelt und werden von Ihrem säumigen Kunden (Schuldner) getragen. Sie erhalten im Erfolgsfall 100% Ihrer ursprünglichen Hauptforderung.",
  },
  {
    question: "Muss ich mich registrieren, um eine Forderung einzureichen?",
    answer:
      "Nein, für die Einreichung einzelner Forderungen ist bei Nota Finance keine vorherige Registrierung notwendig. Sie können Ihre Rechnung(en) direkt und unkompliziert per Drag & Drop oder Upload auf unserer Website einreichen oder uns per E-Mail zukommen lassen.",
  },
  {
    question: "Wie reiche ich eine Forderung ein? Welche Formate werden unterstützt?",
    answer:
      "Die Einreichung Ihrer Forderung ist denkbar einfach: Nutzen Sie den Upload-Bereich auf unserer Website. Sie können Ihre Rechnung als PDF-Datei, als E-Rechnung im XRechnungs-Format oder als E-Rechnung im ZUGFeRD-Format hochladen. Alternativ per E-Mail oder API-Schnittstelle.",
  },
  {
    question: "Was passiert, nachdem ich eine Forderung eingereicht habe?",
    answer:
      "Nachdem Sie Ihre Forderung bei uns eingereicht haben, prüfen wir Ihre Unterlagen umgehend. Sie erhalten automatisch eine Eingangsbestätigung inklusive Ihres Aktenzeichens per E-Mail. Wir starten das außergerichtliche Mahnverfahren und halten Sie über wesentliche Entwicklungen auf dem Laufenden.",
  },
  {
    question: "Wie lange dauert es, bis ich mein Geld erhalte?",
    answer:
      "Die Dauer bis zum Zahlungseingang kann variieren und hängt von der Zahlungsbereitschaft des Schuldners ab. Dank unserer digitalen Prozesse erzielen wir im außergerichtlichen Verfahren oft innerhalb weniger Wochen Ergebnisse.",
  },
  {
    question: "Was passiert, wenn der Schuldner trotz Mahnung nicht zahlt?",
    answer:
      "Sollte Ihr Kunde im außergerichtlichen Mahnverfahren nicht zahlen, analysieren wir den Fall und besprechen mit Ihnen die weiteren Optionen. Mit Ihrer Zustimmung leiten wir das gerichtliche Mahnverfahren ein, um einen vollstreckbaren Titel zu erwirken.",
  },
  {
    question: "Wie wirkt sich das Inkassoverfahren auf meine Kundenbeziehung aus?",
    answer:
      "Der Erhalt Ihrer guten Kundenbeziehungen ist uns sehr wichtig. Wir kommunizieren professionell, respektvoll und fair mit Ihren Schuldnern. Nota Finance agiert als externe, neutrale Stelle, was oft hilft, die direkte Konfrontation zu vermeiden.",
  },
  {
    question: "Können auch Kleinstbeträge (z.B. unter 100€) eingereicht werden?",
    answer:
      "Ja, bei Nota Finance können Sie Forderungen bereits ab einer Höhe von 50€ einreichen. Unser effizienter digitaler Prozess ermöglicht es uns, auch Kleinforderungen wirtschaftlich sinnvoll für Sie zu bearbeiten.",
  },
  {
    question: "Wer ist Nota Finance? Wie sicher sind meine Daten?",
    answer:
      "Nota Finance ist die digitale Marke der twenty4collect GmbH, einem BDIU-zertifizierten Inkassounternehmen mit über 15 Jahren Erfahrung. Der Schutz Ihrer Daten hat höchste Priorität. Wir arbeiten streng nach den Richtlinien der DSGVO.",
  },
];

// JSON-LD FAQPage Schema for Google Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.notafinance.de/faq/#faqpage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {children}
    </>
  );
}

