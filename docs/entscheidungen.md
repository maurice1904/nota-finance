# Entscheidungslog

Zweck: festhalten, **was entschieden wurde** und **was bewusst verworfen wurde** — damit
Diskussionen nicht neu geführt und verworfene Ansätze nicht versehentlich wieder eingebaut werden.

**Regel:** Vor dem Vorschlagen einer Änderung an bestehendem Verhalten zuerst hier prüfen.
Neue Entscheidungen werden hier ergänzt, nicht ersetzt. Stand: August 2026.

---

## Getroffene Entscheidungen

| # | Entscheidung | Begründung | Überprüfen wenn … |
|---|---|---|---|
| 1 | Upload-Flow auf **drei Elemente** (Datei, E-Mail, Zustimmung) | Aktivierungsbarriere ist der Engpass im Long-Tail, nicht die fehlende Forderung | Abbruchquote > 30 % oder Rückfragequote > 20 % |
| 2 | Datenextraktion **im Hintergrund**, nicht im Kundenfunnel | Nutzen ist intern (kein Abtippen), nicht extern | — |
| 3 | Marken bleiben **getrennt**: 24collect, gerichtsmahnverfahren.de, Nota | eigenständige Marke für eigenständigen Zielkundenkreis | Cross-Sell-Test zeigt starke Verwässerung |
| 4 | Operations im MVP **manuell** über twenty4collect | rechtliche Prüfung ist ohnehin Pflicht; jeder Fall ist Spezifikation für die Automatisierung | Kapazitätsgrenze des Backoffice erreicht |
| 5 | **Breite Branchenfläche**, schmaler aktiver Vertrieb | Grenzkosten der Seiten nahe null; Vertriebszeit ist knapp | — |
| 6 | **Programmatic SEO** als primärer Traffic-Motor | kompoundiert, passt zum kleinen Budget | nach 6 Monaten ohne Wirkung |
| 7 | **Steuerberater als Multiplikator** | sehen OPOS-Listen, dürfen nach RDG nicht selbst einziehen — strukturelle Symbiose | — |
| 8 | Bezahlte Anzeigen **erst nach der Lernphase** | hohe Klickpreise im Finanz-/Rechtsumfeld, kleines Budget | genug Daten über konvertierende Begriffe |
| 9 | Energie-/Abrechnungskanal bleibt bei **24collect** | Massengeschäft mit Verbraucherschuldnern, Klumpenrisiko | — |
| 10 | **Signierte Links** statt öffentlicher URLs | personenbezogene Daten Dritter, Art. 32 DSGVO | nie — Sicherheitsentscheidung |
| 11 | Passwortschutz bleibt bis Abschluss der P0-Aufgaben | schützt, solange Storage-Rechte offen sind | alle P0 erledigt |
| 12 | **WCAG 2.1 AA als Baustandard**, auch wenn die BFSG-Kleinstunternehmens-Ausnahme greift | geringer Mehraufwand jetzt, teure Nachrüstung später; verbessert Nutzbarkeit und SEO | — |
| 13 | **Audit-Log von Beginn an** (nur anfügen) | regulierter Sektor; Nachweisbarkeit lässt sich nicht rückwirkend herstellen | — |
| 14 | **Differenziertes Löschkonzept** statt einheitlicher Frist | HGB/AO-Aufbewahrung verdrängt die Löschpflicht nur für bestimmte Kategorien | Änderung der Rechtslage |
| 15 | **Mehrere Dateien = ein Fall** | typisch sind Rechnung + Mahnung + Vertrag zur selben Forderung | Auswertung zeigt häufig unabhängige Forderungen |
| 16 | **`consent_version` wird gespeichert** | ohne sie ist später nicht belegbar, welchen Text der Kunde akzeptiert hat | — |
| 17 | **Aktenzeichen vorerst nicht an den Kunden kommunizieren** | solange die Fallprüfung manuell erfolgt, würde ein sofortiges Aktenzeichen Verbindlichkeit vor der Prüfung suggerieren; Kunde erhält es separat, sobald der Vater den Fall geprüft hat | Fallprüfung wird automatisiert / beschleunigt |

---

## Bewusst verworfen — nicht wieder einbauen

| Verworfen | Warum |
|---|---|
| **Bestätigungsschritt für extrahierte Rechnungsdaten** im Funnel | kein Kundennutzen (Daten stehen in seiner Rechnung), Vertrauensrisiko bei Fehlerkennung, doppelte Arbeit zur ohnehin nötigen fachlichen Prüfung |
| **Zweite E-Mail-Eingabe zur Bestätigung** | Reibung; Tippfehlerschutz entsteht über Anzeige + Bestätigungsmail |
| **Fokus auf nur vier Zielgruppen auf der Website** | verwechselt Vertriebsfokus mit Marketingfläche |
| **Automatisierte LinkedIn-/E-Mail-Kaltakquise** | nach § 7 UWG ohne vorherige Einwilligung unzulässig, auch B2B |
| **Google Ads als erster Kanal** | bei ca. 3.000 € Budget der teuerste und langsamste Lernkanal |
| **Forderungskauf / Debt Purchase** | kapitalintensiv, Skalenspiel der Großen; zöge zusätzliche Regulierung nach sich |
| **Vollautomatische rechtliche Fallprüfung** | RDG knüpft die Erlaubnis an die Sachkunde einer Person; Art. 22 DSGVO |
| **Aussage „Sie erhalten 100 %" ohne Einschränkung** | bei Ratenzahlung erst am Ende zutreffend (§ 367 BGB) |
| **Rechtstexte nur als PDF** | Pflichtinformationen müssen leicht zugänglich, durchsuchbar und barrierefrei sein |
| **Massenhafte Städteseiten ohne eigenen Inhalt** | dünne Inhalte werden entwertet und beschädigen die Domain |
| **Aktenzeichen per „höchsten Wert lesen und erhöhen"** | Race Condition bei gleichzeitigen Uploads — Sequenz verwenden |

---

## Offene Fragen

| Frage | Warum wichtig | Status |
|---|---|---|
| **Realer Erlös je erfolgreichem Fall** (45 € vs. 150 €) | bestimmt das benötigte Fallvolumen um den Faktor 3 | wartet auf BWA/Falldaten |
| Verrechnung bei Teilzahlungen in der Praxis | bestimmt die tatsächliche Marge | wartet auf Backoffice |
| Anteil Verbraucher- vs. Geschäftsschuldner | bestimmt Gebührendeckel und Compliance-Last | wird ab Fall 1 gemessen |
| Rollenverteilung Gläubiger/Inkasso nach DSGVO | entscheidet, ob AVV mit Gläubigern nötig ist | **[ANWALT]** |
| Anwendbarkeit BFSG | bestimmt Pflicht zur Barrierefreiheitserklärung | **[ANWALT]** |
| Datenschutzbeauftragter erforderlich? | § 38 BDSG | **[ANWALT]** |
| Nutzungsrechte an den Trust-Logos | Abmahnrisiko | zu klären |
| Kapazitätsgrenze des Backoffice (Fälle/Woche) | Engpass bei Erfolg der Akquise | zu klären |
| Eigentums-/Beteiligungsregelung an Nota | Grundlage für die Exit-Perspektive | Absichtserklärung empfohlen |
