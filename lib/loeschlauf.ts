/**
 * Automatischer Löschlauf (P1-4)
 *
 * Löscht Einreichungen, die älter als die Aufbewahrungsfrist sind — **Datei im Storage UND
 * Eintrag in der Tabelle `uploads`**. Ein Rest in einem der beiden wäre ein Fehler.
 *
 * ── Warum das nicht in SQL steht ───────────────────────────────────────────────────────────
 * Supabase führt zu jeder Datei eine Zeile in `storage.objects`, die Datei selbst liegt im
 * S3-Speicher dahinter. Ein `delete` per SQL entfernt nur die Zeile — die Datei bliebe liegen,
 * unsichtbar und über die Oberfläche nicht mehr löschbar. Wirklich entfernt wird sie nur über
 * die Storage-Schnittstelle (`storage.remove()`). Deshalb Code statt pg_cron.
 *
 * ── Reihenfolge: erst Datei, dann Eintrag ──────────────────────────────────────────────────
 * Bricht es dazwischen ab, findet der nächste Lauf den Eintrag wieder, versucht die schon
 * gelöschte Datei erneut zu löschen (harmlos — die Schnittstelle meckert bei unbekannten Pfaden
 * nicht) und räumt den Eintrag ab. Der Lauf repariert sich selbst. Andersherum entstünde eine
 * Datei ohne Eintrag. Aus demselben Grund braucht es keine Sperre gegen gleichzeitige Läufe:
 * Vercel sagt ausdrücklich, dass ein Cron-Lauf ausfallen oder doppelt kommen kann; beides ist
 * hier folgenlos, weil jeder Schritt beliebig oft wiederholbar ist.
 *
 * Voraussetzung: das SQL aus docs/aufgabenliste.md (P1-4) wurde im Supabase SQL Editor
 * ausgeführt — Spalte `aufbewahren`, Tabelle `loeschlaeufe`, Funktionen `faellige_uploads`
 * und `verwaiste_dateien`.
 */

import { getSupabaseAdmin } from "./supabase-admin";
import { STORAGE_BUCKET } from "./config";
import { logError } from "./errors";

// ═══════════════════════════════════════════════════════════════
// FACHREGELN
// ═══════════════════════════════════════════════════════════════

/**
 * Aufbewahrungsfrist in Tagen für Uploads ohne Beauftragung bzw. abgelehnte Fälle
 * (docs/recht-und-datenschutz.md, Abschnitt 2.5).
 *
 * Bewusst eine Konstante und keine Umgebungsvariable: Das ist eine Fachregel, keine
 * Betriebseinstellung — dieselbe Begründung wie in lib/config.ts. Eine versehentlich falsch
 * gesetzte Variable würde hier Daten vernichten.
 */
export const AUFBEWAHRUNG_TAGE = 90;

/** Höchstzahl der Einträge, die ein einzelner Lauf betrachtet. */
const MAX_EINTRAEGE_JE_LAUF = 2000;

/** Höchstzahl der Reste, die ein einzelner Lauf aufräumt. */
const MAX_RESTE_JE_LAUF = 500;

/**
 * Wie viele Pfade die Storage-Schnittstelle pro Aufruf bekommt. Ein Aufruf mit tausenden
 * Pfaden läuft ins Zeitlimit; kleinere Häppchen sind zudem einzeln wiederholbar.
 */
const LOESCH_HAEPPCHEN = 100;

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface LoeschlaufOptionen {
  /** Frist in Tagen. Standard: AUFBEWAHRUNG_TAGE. */
  fristTage: number;
  /** true = nur zählen und protokollieren, nichts löschen. */
  probelauf: boolean;
}

export interface LoeschlaufErgebnis {
  probelauf: boolean;
  fristTage: number;
  stichtag: string;
  eintraegeGeloescht: number;
  dateienGeloescht: number;
  resteGeloescht: number;
  aufbewahrt: number;
  fehler: number;
  /** Ergebnis in einem Satz, im Klartext — steht so auch in der Protokolltabelle. */
  ergebnis: string;
  fehlermeldungen: string[];
}

/** Eine Zeile aus der SQL-Funktion `faellige_uploads`. */
interface FaelligeZeile {
  id: string;
  filepath: string | null;
  geschuetzt: boolean;
}

// ═══════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════

function haeppchen<T>(werte: T[], groesse: number): T[][] {
  const teile: T[][] = [];
  for (let i = 0; i < werte.length; i += groesse) {
    teile.push(werte.slice(i, i + groesse));
  }
  return teile;
}

/**
 * Formuliert das Ergebnis in einem Satz.
 *
 * Bei einem Probelauf muss unmissverständlich dastehen, dass NICHTS gelöscht wurde — sonst liest
 * man später „3 Einträge" und hält den Fall für erledigt.
 */
function formuliereErgebnis(e: Omit<LoeschlaufErgebnis, "ergebnis">): string {
  const nichtsPassiert =
    e.eintraegeGeloescht === 0 && e.resteGeloescht === 0 && e.aufbewahrt === 0;

  if (nichtsPassiert) {
    // Wichtig zu unterscheiden: Es war nichts fällig — oder der Lauf konnte gar nicht
    // feststellen, was fällig ist. „Nichts zu tun" bei gescheitertem Lesen wäre eine
    // falsche Entwarnung im Protokoll.
    if (e.fehler > 0) {
      return (
        `Lauf mit Fehlern beendet — es konnte nicht festgestellt oder nicht durchgeführt ` +
        `werden, was fällig ist. Es wurde nichts gelöscht. Einzelheiten in der Fehlerliste.`
      );
    }
    return `Keine Einträge älter als ${e.fristTage} Tage — nichts zu tun.`;
  }

  const teile: string[] = [];

  if (e.probelauf) {
    teile.push(
      `${e.eintraegeGeloescht} ${e.eintraegeGeloescht === 1 ? "Eintrag" : "Einträge"} und ` +
        `${e.dateienGeloescht} ${e.dateienGeloescht === 1 ? "Datei" : "Dateien"} wären gelöscht worden`
    );
    if (e.resteGeloescht > 0) {
      teile.push(
        `${e.resteGeloescht} ${e.resteGeloescht === 1 ? "Rest wäre" : "Reste wären"} entfernt worden`
      );
    }
    if (e.aufbewahrt > 0) {
      teile.push(
        `${e.aufbewahrt} ${e.aufbewahrt === 1 ? "Eintrag wäre" : "Einträge wären"} wegen Aufbewahrungs-Haken erhalten geblieben`
      );
    }
    return `Probelauf — es wurde nichts gelöscht. ${teile.join(", ")}.`;
  }

  teile.push(
    `${e.eintraegeGeloescht} ${e.eintraegeGeloescht === 1 ? "Eintrag" : "Einträge"} und ` +
      `${e.dateienGeloescht} ${e.dateienGeloescht === 1 ? "Datei" : "Dateien"} gelöscht`
  );
  if (e.resteGeloescht > 0) {
    teile.push(`${e.resteGeloescht} ${e.resteGeloescht === 1 ? "Rest" : "Reste"} entfernt`);
  }
  if (e.aufbewahrt > 0) {
    teile.push(
      `${e.aufbewahrt} ${e.aufbewahrt === 1 ? "Eintrag" : "Einträge"} wegen Aufbewahrungs-Haken behalten`
    );
  }
  return `${teile.join(", ")}.`;
}

// ═══════════════════════════════════════════════════════════════
// HAUPTFUNKTION
// ═══════════════════════════════════════════════════════════════

export async function fuehreLoeschlaufAus(
  optionen: LoeschlaufOptionen
): Promise<LoeschlaufErgebnis> {
  const { fristTage, probelauf } = optionen;
  const supabase = getSupabaseAdmin();

  const gestartetAm = new Date();
  const stichtag = new Date(gestartetAm.getTime() - fristTage * 24 * 60 * 60 * 1000);

  const fehlermeldungen: string[] = [];
  const geloeschtePfade: string[] = [];
  const aufbewahrtePfade: string[] = [];
  const restePfade: string[] = [];
  let eintraegeGeloescht = 0;

  // ── 1) Fällige Einträge holen, inklusive Schutz-Markierung ──────────────────────────────
  // Die Gruppierung (Foto-PDF und Originalbilder gehören zusammen) steckt in der SQL-Funktion:
  // ein Eintrag gilt als geschützt, wenn er selbst oder eine andere Datei derselben Einreichung
  // den Haken trägt.
  const { data: faellige, error: leseFehler } = await supabase.rpc("faellige_uploads", {
    p_stichtag: stichtag.toISOString(),
    p_limit: MAX_EINTRAEGE_JE_LAUF,
  });

  if (leseFehler) {
    logError("Loeschlauf.faelligeUploads", leseFehler, { stichtag: stichtag.toISOString() });
    fehlermeldungen.push(`Fällige Einträge nicht lesbar: ${leseFehler.message}`);
  }

  const zeilen: FaelligeZeile[] = faellige ?? [];
  const geschuetzte = zeilen.filter((z) => z.geschuetzt);
  const zuLoeschen = zeilen.filter((z) => !z.geschuetzt);

  for (const zeile of geschuetzte) {
    if (zeile.filepath) aufbewahrtePfade.push(zeile.filepath);
  }

  // ── 2) Löschen: erst die Datei, dann der Eintrag ────────────────────────────────────────
  if (!probelauf && zuLoeschen.length > 0) {
    // Einträge ohne Pfad kann es geben (filepath ist in der Tabelle optional). Für sie gibt es
    // nichts im Speicher zu löschen — der Eintrag verschwindet trotzdem.
    const mitDatei = zuLoeschen.filter((z) => !!z.filepath);
    const ohneDatei = zuLoeschen.filter((z) => !z.filepath);

    for (const teil of haeppchen(mitDatei, LOESCH_HAEPPCHEN)) {
      const pfade = teil.map((z) => z.filepath as string);
      const { error: storageFehler } = await supabase.storage.from(STORAGE_BUCKET).remove(pfade);

      if (storageFehler) {
        // Einträge dieses Häppchens bleiben stehen und werden beim nächsten Lauf erneut
        // versucht. Auf keinen Fall den Eintrag löschen, solange die Datei liegt — das wäre
        // genau der verwaiste Rest, den es nicht geben darf.
        logError("Loeschlauf.storageRemove", storageFehler, { anzahl: pfade.length });
        fehlermeldungen.push(`Dateien nicht löschbar (${pfade.length} Stück): ${storageFehler.message}`);
        continue;
      }

      geloeschtePfade.push(...pfade);

      const { error: dbFehler } = await supabase
        .from("uploads")
        .delete()
        .in("id", teil.map((z) => z.id));

      if (dbFehler) {
        // Die Datei ist weg, der Eintrag nicht. Der nächste Lauf findet ihn wieder und räumt
        // ihn ab; das erneute Löschen der bereits entfernten Datei ist folgenlos.
        logError("Loeschlauf.deleteRows", dbFehler, { anzahl: teil.length });
        fehlermeldungen.push(`Einträge nicht löschbar (${teil.length} Stück): ${dbFehler.message}`);
        continue;
      }

      eintraegeGeloescht += teil.length;
    }

    if (ohneDatei.length > 0) {
      const { error: dbFehler } = await supabase
        .from("uploads")
        .delete()
        .in("id", ohneDatei.map((z) => z.id));

      if (dbFehler) {
        logError("Loeschlauf.deleteRowsOhneDatei", dbFehler, { anzahl: ohneDatei.length });
        fehlermeldungen.push(`Einträge ohne Datei nicht löschbar: ${dbFehler.message}`);
      } else {
        eintraegeGeloescht += ohneDatei.length;
      }
    }
  }

  // ── 3) Reste: Dateien im Bucket ohne zugehörigen Eintrag ────────────────────────────────
  // Entstehen, wenn der Datenbank-Eintrag beim Upload fehlschlug (bewusst nur geloggt, damit
  // der Kunde davon nichts merkt — Entscheidung 21). Ohne diesen Schritt bliebe die Datei für
  // immer liegen.
  const { data: reste, error: resteFehler } = await supabase.rpc("verwaiste_dateien", {
    p_bucket: STORAGE_BUCKET,
    p_stichtag: stichtag.toISOString(),
    p_limit: MAX_RESTE_JE_LAUF,
  });

  if (resteFehler) {
    logError("Loeschlauf.verwaisteDateien", resteFehler, { bucket: STORAGE_BUCKET });
    fehlermeldungen.push(`Reste nicht ermittelbar: ${resteFehler.message}`);
  }

  const resteGefunden: string[] = (reste ?? []).map((r: { pfad: string }) => r.pfad);

  if (probelauf) {
    restePfade.push(...resteGefunden);
  } else {
    for (const teil of haeppchen(resteGefunden, LOESCH_HAEPPCHEN)) {
      const { error: storageFehler } = await supabase.storage.from(STORAGE_BUCKET).remove(teil);

      if (storageFehler) {
        logError("Loeschlauf.resteRemove", storageFehler, { anzahl: teil.length });
        fehlermeldungen.push(`Reste nicht löschbar (${teil.length} Stück): ${storageFehler.message}`);
        continue;
      }

      restePfade.push(...teil);
    }
  }

  // ── 4) Ergebnis zusammenstellen ─────────────────────────────────────────────────────────
  const rohergebnis: Omit<LoeschlaufErgebnis, "ergebnis"> = {
    probelauf,
    fristTage,
    stichtag: stichtag.toISOString(),
    // Im Probelauf zählt, was passiert wäre.
    eintraegeGeloescht: probelauf ? zuLoeschen.length : eintraegeGeloescht,
    dateienGeloescht: probelauf ? zuLoeschen.filter((z) => !!z.filepath).length : geloeschtePfade.length,
    resteGeloescht: restePfade.length,
    aufbewahrt: geschuetzte.length,
    fehler: fehlermeldungen.length,
    fehlermeldungen,
  };

  const ergebnis: LoeschlaufErgebnis = {
    ...rohergebnis,
    ergebnis: formuliereErgebnis(rohergebnis),
  };

  // ── 5) Protokollieren — der DSGVO-Nachweis ──────────────────────────────────────────────
  // Bewusst ohne E-Mail-Adressen: Das Protokoll darf die eben gelöschten personenbezogenen
  // Daten nicht an anderer Stelle wieder aufbauen. Speicherpfade sind zufällige UUIDs.
  const { error: protokollFehler } = await supabase.from("loeschlaeufe").insert({
    gestartet_am: gestartetAm.toISOString(),
    beendet_am: new Date().toISOString(),
    probelauf,
    frist_tage: fristTage,
    stichtag: stichtag.toISOString(),
    ergebnis: ergebnis.ergebnis,
    eintraege_geloescht: ergebnis.eintraegeGeloescht,
    dateien_geloescht: ergebnis.dateienGeloescht,
    reste_geloescht: ergebnis.resteGeloescht,
    aufbewahrt: ergebnis.aufbewahrt,
    fehler: ergebnis.fehler,
    details: {
      geloeschte_pfade: geloeschtePfade,
      aufbewahrte_pfade: aufbewahrtePfade,
      reste_pfade: restePfade,
      fehlermeldungen,
    },
  });

  if (protokollFehler) {
    // Ohne Protokoll fehlt der Nachweis — das muss sichtbar werden, auch wenn das Löschen
    // selbst geklappt hat.
    logError("Loeschlauf.protokoll", protokollFehler, { ergebnis: ergebnis.ergebnis });
    ergebnis.fehlermeldungen.push(`Protokollzeile nicht schreibbar: ${protokollFehler.message}`);
    ergebnis.fehler += 1;
  }

  return ergebnis;
}
