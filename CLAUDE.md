# Nota Finance

Digitale Inkasso-Marke der **twenty4collect GmbH**. Kernversprechen für den Gläubiger:
**Rechnung hochladen — sonst nichts.**

Phase: **MVP, noch nicht live.** Ziel dieser Phase ist ausschließlich zu testen, ob über die Website
Gläubiger gewonnen werden. Die Fallbearbeitung erfolgt danach **manuell** im Backoffice.

---

## Harte Regeln (nicht ohne Rückfrage abweichen)

1. **`SUPABASE_SERVICE_ROLE_KEY` niemals im Client.** Nur in API-Routen. Nie mit `NEXT_PUBLIC_` prefixen.
2. **Keine öffentlichen Storage-URLs.** Downloads nur über serverseitig erzeugte signierte Links mit Ablaufdatum.
   (Rechnungen enthalten personenbezogene Daten Dritter.)
3. **Upload-Flow bleibt bei drei Elementen:** Datei, E-Mail, Zustimmung. Kein zusätzliches Pflichtfeld
   ohne ausdrückliche Freigabe des Auftraggebers.
4. **Kein Bestätigungsschritt für extrahierte Rechnungsdaten im Kundenfunnel.** Wurde bewusst verworfen
   (Begründung: `docs/entscheidungen.md`).
5. **Kein Fall darf still verloren gehen.** Datenbankeintrag vor Mailversand; scheitert die interne
   Benachrichtigung, muss das sichtbar werden.
6. **twenty4collect GmbH muss als registrierter Rechtsdienstleister erkennbar bleiben** (Impressum + Fußzeile).
7. **`proxy.ts` (Passwortschutz) nicht deaktivieren**, solange P0-Aufgaben offen sind.
8. **Zielgruppen nie auf eine kurze Liste verengen** — siehe „Zielgruppen" unten.
9. Keine neuen Abhängigkeiten ohne Not. **Nie `npm audit fix --force`.**
10. Website-Sprache: **Deutsch, Sie-Ansprache.**

## Nicht anfassen ohne expliziten Auftrag

- `proxy.ts` (Passwortschutz)
- Impressum und Rechtstexte (juristisch geprüfte Formulierungen)
- Bestehende Optik/Farben bei funktionalen Aufgaben
- Supabase-Policies (macht der Auftraggeber selbst im Dashboard)
- Keine ungefragten Refactorings über die gestellte Aufgabe hinaus

---

## Zielgruppen — häufigster Fehler

Nota richtet sich an **kleine Gläubiger aller Branchen**, nicht an eine feste Auswahl.
Es gelten **zwei getrennte Ebenen**:

- **Website (breit):** 12 Branchen bekommen eine eigene Seite, dazu programmatische Seiten
  `/inkasso-[branche]-[stadt]`. Mehr Fläche = mehr Uploads.
- **Aktiver Vertrieb (schmal):** 2–3 Segmente, weil Zeit und Budget knapp sind.

**Konsequenz:** Bei Aufgaben zu Branchenseiten, Navigation, SEO oder Texten immer die **vollständige
Liste aus `docs/seiten-und-zielgruppen.md`** verwenden — nie auf die Vertriebs-Prioritäten kürzen.

---

## Befehle

```
npm install      # Abhängigkeiten
npm run dev      # Entwicklung → http://localhost:3000
npm run build    # muss vor jedem Commit fehlerfrei laufen
npm run lint     # Linter
```

## Fertig ist eine Aufgabe erst, wenn

1. `npm run build` fehlerfrei durchläuft
2. Der betroffene Ablauf lokal getestet wurde (bei Upload-Änderungen: echte Testdatei einreichen)
3. Dem Auftraggeber in einfacher Sprache gesagt wurde, **was er manuell prüfen soll**
4. Keine Regel oben verletzt wurde

---

## Stack und Repo

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Supabase (Storage + Tabelle `uploads`,
Region `eu-central-1`) · Resend (E-Mail) · Vercel

| Datei | Zweck |
|---|---|
| `components/UploadForm.tsx` | Kern des Produkts: der Einreichungsvorgang |
| `app/api/send-notification/route.ts` | Serverroute: verschickt Bestätigung + interne Mail |
| `lib/email.ts` | Mailvorlagen und Versand (enthält P0-Problem: öffentliche URLs) |
| `lib/storage.ts` | Upload nach Supabase, Pfadschema `YYYY/MM/<uuid>` |
| `lib/supabase.ts` | Client-Initialisierung |
| `proxy.ts` | Passwortschutz der Vorschau |
| `app/*/page.tsx` | Seiten (startseite, produkt, branchen, preise, faq, einreichen, …) |

---

## Welches Dokument wann lesen

| Aufgabe betrifft … | zuerst lesen |
|---|---|
| Upload, E-Mails, Aktenzeichen, Fehlerfälle | @docs/produkt-spec.md |
| Texte, Claims, Logos, Farben, Tonalität | @docs/marke-und-texte.md |
| Branchenseiten, Navigation, SEO, Städte-Seiten | @docs/seiten-und-zielgruppen.md |
| Datenschutz, RDG, Pflichtangaben, Automatisierungsgrenzen | @docs/recht-und-datenschutz.md |
| „Warum ist das so?" / etwas scheint unlogisch | @docs/entscheidungen.md |
| Was als Nächstes zu tun ist | @docs/aufgabenliste.md |
| SEO, Ratgeber-Seiten, Städteseiten, AI-Sichtbarkeit | @docs/SEO_Umsetzungskonzept.md |

**Vor dem Vorschlagen einer Änderung an bestehendem Verhalten immer `docs/entscheidungen.md` prüfen** —
dort stehen bewusst verworfene Ansätze, die nicht erneut eingebaut werden sollen.

---

## Fachbegriffe

- **Gläubiger** = unser Kunde, der Geld bekommt · **Schuldner** = wer nicht zahlt
- **Verzug** = Zahlungsfrist überschritten, Voraussetzung fürs Inkasso
- **RDG** = Rechtsdienstleistungsgesetz; Inkasso ist erlaubnispflichtig
- **§ 13a RDG** = Pflichtangaben in Mahnschreiben an Schuldner
- **§ 367 BGB** = Teilzahlungen tilgen erst Kosten, dann Zinsen, zuletzt Hauptforderung
- **Aktenzeichen** = `NF-JJJJ-####`, gemeinsame Referenz für Kunde und Backoffice
- **Realisierungsquote** = Anteil der Fälle, bei denen Geld fließt

---

## Zusammenarbeit

Der Auftraggeber ist **kein Entwickler** (BWL-Hintergrund).

- Vor jeder Änderung in ein bis zwei Sätzen erklären, was und warum — ohne Fachjargon.
- **Eine Aufgabe pro Durchgang.** Nicht mehrere P0-Punkte gleichzeitig.
- Bei größeren Aufgaben zuerst einen Plan zeigen und bestätigen lassen.
- Nach der Änderung immer sagen, was manuell zu testen ist.
- Bei Unklarheit über Geschäftslogik, Recht oder Priorität: **nachfragen statt annehmen.**
- Einfachste tragfähige Lösung bevorzugen. Kein Over-Engineering.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
