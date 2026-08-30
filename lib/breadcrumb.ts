import { BASE_URL } from "@/lib/faktenkern";

/** Ein Navigationsschritt: sichtbarer Name und Pfad ab der Domain (z. B. "/agb"). */
export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Baut ein BreadcrumbList-JSON-LD (docs/SEO_Umsetzungskonzept.md Teil 1.5) aus einer Liste von
 * Wegpunkten. Die Startseite muss nicht mit übergeben werden — sie wird immer vorangestellt.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const alle = [{ name: "Startseite", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: alle.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}
