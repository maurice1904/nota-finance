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
| 17 | **Kein Aktenzeichen im Nota-System** — der Vater vergibt seine eigene Fallreferenz im bestehenden Backoffice-Prozess | zwei parallele Nummernkreise für denselben Fall stiften Verwirrung; Nota ist im MVP ohnehin nur Frontend/Akquise, die eigentliche Fallführung bleibt beim Backoffice | falls Nota-Fälle direkt ins Backoffice-System übernommen werden und eine gemeinsame ID sinnvoll wird |
| 18 | **Die interne Mail mit PDF-Anhang ist das eigentliche Backup** (einzige vom Storage unabhängige Kopie); DB-Eintrag ist nur Wegweiser/Übersicht, kein Sicherheitsnetz für die Datei | DB-Eintrag speichert nur den Pfad — fällt der Storage aus, sind Datei und Eintrag betroffen; die Mail-Kopie liegt physisch getrennt | wenn Volumen automatisierte Überwachung nötig macht |
| 19 | **Keine Ratenbegrenzung und keine Obergrenze der Datei-Anzahl** | der Vater hat legitime Kunden, die viele Rechnungen auf einmal hochladen — eine Grenze träfe echte Nutzer | bei nachgewiesenem Missbrauch |
| 20 | **Upload-Endpunkt-Absicherung erst vor Go-live**, reduziert auf serverseitige Typ-/Größenprüfung | solange der Passwortschutz aktiv ist, ist der Endpunkt nicht öffentlich | — |
| 21 | **Hochgeladene Datei wird nie automatisch gelöscht; Kunden-Erfolg hängt nur am Datei-Upload** | die Datei ist der Fall — sie zu löschen (z. B. bei DB-Fehler) würde den Fall zerstören; ein interner Fehler darf den Kunden nicht mit einer Fehlermeldung bestrafen | — |
| 22 | **Interne Mail bei Mehrfach-Upload: ausgelöst sobald ≥1 Datei erfolgreich**, unabhängig von anderen fehlgeschlagenen Dateien im selben Vorgang | sonst würde ein Fehlschlag die Backup-Kopie für alle anderen erfolgreichen Dateien im selben Vorgang unterdrücken | — |
| 23 | **Zweites E-Mail-Bestätigungsfeld bleibt** | verhindert, dass Kunden versehentlich eine falsche Adresse angeben — ohne gültige Adresse keine Statuskommunikation | wenn Conversion-Daten zeigen, dass das Feld stark abbrechen lässt |
| 24 | **Trust-Logos bleiben (mit Vorbehalt Nachweis)** | Nutzung laut Vater mit den Unternehmen abgestimmt; schriftliche Bestätigung je Logo noch zu sichern | falls kein Nachweis beibringbar |

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
