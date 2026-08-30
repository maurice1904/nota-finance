/**
 * Veröffentlichungs-/Aktualisierungsdatum für künftige Fachseiten (SEO-5, Ratgeber-Seiten).
 * Bewusst ohne Namensnennung - kein Autorenprofil (docs/entscheidungen.md Nr. 32).
 *
 * Noch ungenutzt: Es gibt noch keine Ratgeber-Seiten. Liegt bereit, damit SEO-5 sie direkt
 * importieren kann, statt das Muster dort neu zu erfinden.
 */

type ArticleMetaProps = {
  /** ISO-Datum, z. B. "2026-09-01". */
  publishedAt: string;
  /** ISO-Datum; nur setzen, wenn tatsächlich aktualisiert wurde. */
  updatedAt?: string;
};

const formatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function ArticleMeta({ publishedAt, updatedAt }: ArticleMetaProps) {
  return (
    <p className="text-sm text-text-900/60">
      Veröffentlicht am{" "}
      <time dateTime={publishedAt}>{formatter.format(new Date(publishedAt))}</time>
      {updatedAt && (
        <>
          {" "}
          · Aktualisiert am{" "}
          <time dateTime={updatedAt}>{formatter.format(new Date(updatedAt))}</time>
        </>
      )}
    </p>
  );
}
