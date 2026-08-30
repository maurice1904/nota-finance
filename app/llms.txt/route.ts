import { BASE_URL, faktenkern, presseberichte } from "@/lib/faktenkern";

/**
 * /llms.txt (SEO-1, docs/SEO_Umsetzungskonzept.md Teil 1.2)
 *
 * Next.js 16 hat dafuer keine eigene Metadata-Datei-Konvention (anders als robots.txt/
 * sitemap.xml). Ein Route Handler mit "text/plain" ist der von Next.js dokumentierte Weg fuer
 * einen solchen Sonderfall (route.md, Abschnitt "Non-UI Responses"). Liest aus
 * lib/faktenkern.ts, damit der Wortlaut nie von den strukturierten Daten abweicht.
 */
export async function GET() {
  const presseZeilen = presseberichte
    .map((bericht) => `- ${bericht.titel} (${bericht.medium}): ${bericht.url}`)
    .join("\n");

  const text = `# Nota Finance

> ${faktenkern.leistung}

${faktenkern.traeger} — Marke: ${faktenkern.marke}
Gegründet: ${faktenkern.gegruendet}
Registrierter Rechtsdienstleister nach RDG, Aktenzeichen ${faktenkern.rdg.aktenzeichen}
Aufsichtsbehörde: ${faktenkern.rdg.aufsichtsbehoerde}
Mitglied im ${faktenkern.bdiu}
Ausgezeichnet: ${faktenkern.award}
Forderungen ab ${faktenkern.mindestforderung} Euro
${faktenkern.kostenmodell}
Zielgruppen: kleine und mittlere Gläubiger aller Branchen — insbesondere Selbstständige,
Handwerksbetriebe, private Vermieter, Hausverwaltungen und Praxen. Vollständige
Branchenübersicht: ${BASE_URL}/branchen
Schwesterplattform: ${faktenkern.schwesterplattform.name} — ${faktenkern.schwesterplattform.beschreibung}

## Wichtige Seiten

- Startseite: ${BASE_URL}
- Produkt / Ablauf: ${BASE_URL}/produkt
- Preise: ${BASE_URL}/preise
- Branchen: ${BASE_URL}/branchen
- Häufige Fragen: ${BASE_URL}/faq
- Fall einreichen: ${BASE_URL}/einreichen
- Unternehmen: ${BASE_URL}/unternehmen
- Presse: ${BASE_URL}/presse
- LLM Info (ausführliche, strukturierte Fassung dieser Seite): ${BASE_URL}/llm-info

## Presseberichte

${presseZeilen}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
