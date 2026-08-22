import { NextRequest, NextResponse } from "next/server";
import { AUFBEWAHRUNG_TAGE, fuehreLoeschlaufAus } from "@/lib/loeschlauf";
import { sendLoeschlaufWarnung } from "@/lib/email";
import { logError } from "@/lib/errors";

/**
 * API Route: GET /api/cron/loeschlauf
 *
 * Täglicher Löschlauf (P1-4). Wird von Vercel-Cron aufgerufen (siehe vercel.json) und kann
 * zum Prüfen von Hand aufgerufen werden.
 *
 * ── Warum die Absicherung zwingend ist ────────────────────────────────────────────────────
 * `proxy.ts` nimmt `/api/*` ausdrücklich vom Passwortschutz aus. Diese Route ist also auch vor
 * dem Livegang von außen erreichbar — und sie löscht Daten. Ohne Geheimwort könnte sie jeder
 * auslösen.
 *
 * ── Schalter ──────────────────────────────────────────────────────────────────────────────
 * - CRON_SECRET       Vercel sendet den Wert automatisch als `Authorization: Bearer …`.
 * - LOESCHLAUF_AKTIV  Fehlt die Variable oder steht sie nicht auf "true", läuft JEDER Lauf als
 *                     Probelauf: zählen und protokollieren, nichts löschen. Scharfgeschaltet
 *                     wird erst, wenn es Sicherungen gibt (P1-10).
 * - ?probelauf=1      erzwingt einen Probelauf, auch wenn scharf geschaltet ist.
 * - ?tage=N           überschreibt die Frist für diesen einen Aufruf (zum Prüfen).
 */

export const runtime = "nodejs";

/**
 * Ein Lauf ist normalerweise in Sekunden erledigt. Die Reserve deckt den Fall ab, dass sich
 * nach längerer Pause viele Einträge angesammelt haben; was ein Lauf nicht schafft, erledigt
 * der nächste — jeder Schritt ist wiederholbar.
 */
export const maxDuration = 60;

/** Frist aus der Adresszeile lesen. Ungültige Angaben werden ignoriert, nicht geraten. */
function leseFrist(request: NextRequest): number {
  const roh = request.nextUrl.searchParams.get("tage");
  if (roh === null) return AUFBEWAHRUNG_TAGE;

  const tage = Number(roh);
  if (!Number.isInteger(tage) || tage < 0 || tage > 3650) return AUFBEWAHRUNG_TAGE;

  return tage;
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const scharf = process.env.LOESCHLAUF_AKTIV?.trim().toLowerCase() === "true";
  const probelaufErzwungen = request.nextUrl.searchParams.get("probelauf") === "1";

  try {
    const ergebnis = await fuehreLoeschlaufAus({
      fristTage: leseFrist(request),
      probelauf: !scharf || probelaufErzwungen,
    });

    if (ergebnis.fehler > 0) {
      // Nur bei Fehlern melden. Schlägt auch die Warnung fehl, bleibt sie im Log — das
      // Ergebnis des Laufs steht ohnehin in der Tabelle `loeschlaeufe`.
      await sendLoeschlaufWarnung(ergebnis.ergebnis, ergebnis.fehlermeldungen);
    }

    return NextResponse.json({ success: true, ...ergebnis });
  } catch (error) {
    logError("CronLoeschlauf", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}
