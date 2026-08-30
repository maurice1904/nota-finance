import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/faktenkern";

/**
 * KI-Crawler, die ausdrücklich erlaubt sein müssen (docs/SEO_Umsetzungskonzept.md Teil 8.3) —
 * sonst kann Nota Finance von KI-Systemen nicht zitiert werden. Recherchiert (Stand 30.08.2026,
 * u. a. Anthropics eigene Crawler-Dokumentation und das Community-Verzeichnis
 * github.com/ai-robots-txt/ai.robots.txt), nicht aus dem Gedächtnis übernommen. Deckt alle vier
 * in Teil 7.3 monatlich gemessenen Systeme ab (ChatGPT, Claude, Perplexity, Gemini) plus
 * Common Crawl (Trainingsdaten vieler Modelle), Apple, Amazon und Meta.
 */
const KI_CRAWLER = [
  "GPTBot", // OpenAI, Training
  "OAI-SearchBot", // OpenAI, ChatGPT-Suche/Zitate
  "ChatGPT-User", // OpenAI, nutzerausgelöster Abruf
  "ClaudeBot", // Anthropic, Training
  "Claude-User", // Anthropic, nutzerausgelöster Abruf
  "Claude-SearchBot", // Anthropic, Suche/Zitate
  "PerplexityBot", // Perplexity, Crawling/Indexierung
  "Perplexity-User", // Perplexity, nutzerausgelöster Abruf
  "Google-Extended", // Google, Training (u. a. Gemini)
  "CCBot", // Common Crawl - Trainingsdatenquelle vieler LLMs
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Amazon/Alexa
  "meta-externalagent", // Meta AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ["*", ...KI_CRAWLER],
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
