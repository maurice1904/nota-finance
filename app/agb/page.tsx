import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) inkl. Vereinbarung zur Auftragsverarbeitung (AVV) für die Serviceplattform notafinance.de der twenty4collect GmbH.",
  openGraph: {
    title: "AGB | Nota Finance",
    description:
      "Allgemeine Geschäftsbedingungen (AGB) inkl. Vereinbarung zur Auftragsverarbeitung (AVV) für die Serviceplattform notafinance.de der twenty4collect GmbH.",
    url: "https://www.notafinance.de/agb",
  },
};

export default function AGBPage() {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-text-900 mb-4">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="text-text-900/70 mb-12">
          inkl. Vereinbarung zur Auftragsverarbeitung (AVV) für die Serviceplattform{" "}
          www.notafinance.de der twenty4collect GmbH. Stand 01.01.2026
        </p>

        <div className="prose prose-lg max-w-none text-text-900/70 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 1 Präambel</h2>
            <p>
              Die twenty4collect GmbH ist ein nach dem Rechtsdienstleistungsgesetz (RDG)
              tätiges Inkassounternehmen mit dem Schwerpunkt auf außergerichtlichem Inkasso
              und gerichtlicher Titulierung. Die twenty4collect GmbH bietet Unternehmen,
              Gewerbetreibenden und Freiberuflern (nachfolgend als „Kunde" bezeichnet) über
              die multimodale Serviceplattform notafinance.de eine digitale Lösung für das
              Forderungsmanagement an. Der Fokus liegt auf einer medienbruchfreien, sofortigen
              Einreichung offener Forderungen ohne vorherige Registrierungshürden, um den
              Einzug kaufmännisch angemahnter Forderungen (außergerichtlich und gerichtlich)
              zu beschleunigen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 2 Gegenstand – und Geltungsbereich
            </h2>
            <p className="mb-4">
              (1) Die twenty4collect GmbH ist ein auf den Einzug und die Realisierung
              kaufmännisch angemahnter Forderungen spezialisiertes Unternehmen und entwickelt
              Lösungen für das außergerichtliche und das gerichtliche Mahnverfahren. Die
              twenty4collect GmbH ist Betreiber der Webseite www.notafinance.de.
            </p>
            <p className="mb-4">
              (2) Diese Allgemeinen Geschäftsbedingungen regeln die Rechte und Pflichten im
              Zusammenhang mit der Nutzung der Serviceplattform des Anbieters twenty4collect
              GmbH, In den Weiden 9, 56729 Weiler (nachfolgend „twenty4collect", „Betreiber",
              „wir" oder „Diensteanbieter") und des Kunden. Es gelten ausschließlich diese
              AGB. Entgegenstehende oder von diesen AGB abweichende Bedingungen des Kunden
              werden nicht anerkannt, es sei denn, twenty4collect hat ihrer Geltung
              ausdrücklich schriftlich zugestimmt. Die Dienste und Dienstleistungen werden
              angeboten unter der Internetadresse https://www.notafinance.de sowie allgemein
              zugänglich gemacht unter verschiedenen Subdomains, Webservices und über
              Hintergrund-Applikationen.
            </p>
            <p className="mb-4">
              (3) Das Angebot richtet sich ausschließlich an Kunden, die als Unternehmer (§ 14
              BGB) in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit in
              Deutschland handeln. Unternehmer ist eine natürliche oder juristische Person
              oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines
              Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen
              Tätigkeit handelt, sowie Freiberufler. Ein Vertragsschluss mit Verbrauchern
              (§ 13 BGB) ist ausgeschlossen.
            </p>
            <p>
              (4) Die AGB gelten in der jeweiligen, zum Zeitpunkt des Vertragsschlusses
              aktuellen Fassung und gelten für Kunden aus Deutschland. Die ausschließliche
              Vertragssprache ist Deutsch.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 3 Nutzung ohne Registrierung (Gast-Upload)
            </h2>
            <p className="mb-4">
              (1) Die Nutzung der Serviceplattform notafinance.de zur Einreichung von
              Forderungen ist ohne das Anlegen eines dauerhaften Benutzerkontos (Registrierung)
              möglich. Der Kunde kann den Prozess unmittelbar durch den Upload von Dokumenten
              (Rechnungen/Forderungen) starten.
            </p>
            <p className="mb-4">
              (2) Die Identifikation des Kunden und die Zuordnung der Fälle erfolgt über die im
              Upload-Prozess angegebene E-Mail-Adresse sowie die in den Rechnungsunterlagen
              enthaltenen Firmendaten. Der Kunde wird darauf hingewiesen, dass die alleinige
              Angabe einer E-Mail-Adresse nur eine Vor-Legitimation darstellt. twenty4collect
              kann zur Identitätsfeststellung und Legitimation weitere Nachweise (z. B.
              Handelsregisterauszug, Vollmachtsformular) anfordern.
            </p>
            <p className="mb-4">
              (3) Der Kunde sichert zu, dass die angegebene E-Mail-Adresse zutreffend ist und
              er über diese erreichbar ist. Die Kommunikation (inklusive
              Vertragsbestätigungen, Sachstandsmeldungen und Abrechnungen) erfolgt primär
              elektronisch über diese E-Mail-Adresse.
            </p>
            <p>
              (4) Der den Upload durchführende Nutzer versichert, dass er berechtigt ist, den
              Kunden (das Unternehmen/den Gläubiger) zu vertreten und rechtsgeschäftlich zu
              verpflichten (Vertretungsberechtigung).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 4 Vertragsschluss und Inkassovollmacht
            </h2>
            <p className="mb-4">
              (1) Die Darstellung der Dienstleistungen auf notafinance.de stellt kein
              rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe eines
              Angebots durch den Kunden dar (invitatio ad offerendum).
            </p>
            <p className="mb-2">(2) Der Vertragsschluss erfolgt in folgenden technischen Schritten:</p>
            <p className="mb-4">
              a) Der Kunde lädt die betreffenden Rechnungen/Dokumente auf der Plattform Nota
              Finance als PDF-Datei, als E-Rechnung im XRechnungs Format oder als E-Rechnung im
              ZUGFeRD Format hoch.
              <br />
              b) Der Kunde gibt seine korrekten Kontaktdaten (E-Mail-Adresse) ein.
              <br />
              c) Der Kunde bestätigt durch Aktivieren der entsprechenden Checkbox die Geltung
              dieser AGB, nimmt die Datenschutzerklärung zur Kenntnis und schließt die
              Vereinbarung zur Auftragsverarbeitung (AVV) ab.
              <br />
              d) Durch Klicken des Buttons „Fall einreichen" oder „Jetzt einreichen" auf der
              Upload-Seite von Nota Finance gibt der Kunde ein verbindliches Angebot auf
              Abschluss eines Geschäftsbesorgungsvertrages (Inkassoauftrag) ab.
            </p>
            <p className="mb-4">
              (3) Mit dem Absenden dieses Angebots erteilt der Kunde der twenty4collect GmbH
              ausdrücklich die Inkassovollmacht zum Einzug der übermittelten Forderung. Der
              Kunde bestätigt, dass er berechtigt ist, diese Vollmacht zu erteilen. Auf
              Anforderung von twenty4collect ist der Kunde verpflichtet, eine separate
              schriftliche Vollmachtsurkunde nachzureichen, sofern dies für gerichtliche
              Maßnahmen oder durch Einwände Dritter erforderlich wird. Die Vollmacht umfasst
              das Einholen und Weitergeben von Informationen, das Erheben von Mahngebühren,
              das Empfangnehmen von Zahlungen, sowie die Einleitung des Mahnverfahrens.
              twenty4collect ist berechtigt, einzelne oder alle Rechte zur Durchsetzung der
              Forderung Dritten (einschließlich Rechtsanwälten) zu übertragen.
            </p>
            <p className="mb-4">
              (4) Eingangsbestätigung: Die twenty4collect GmbH sendet dem Kunden unmittelbar
              nach Upload der Rechnungen/Forderungen eine automatische Eingangsbestätigung per
              E-Mail an die angegebene E-Mail-Adresse zu. Diese E-Mail dokumentiert lediglich
              den Zugang der Daten und stellt noch keine Annahme des Angebots des Kunden dar.
            </p>
            <p>
              (5) Zustandekommen des Vertrages: Der Vertrag kommt erst zustande, wenn
              twenty4collect das Angebot des Kunden durch eine separate E-Mail
              (Auftragsbestätigung) mit gleichzeitiger Bekanntgabe des Inkassoaktenzeichens
              annimmt. twenty4collect behält sich das Recht vor, Aufträge ohne Angabe von
              Gründen abzulehnen (z. B. bei erkennbar unberechtigten, verjährten oder
              sittenwidrigen Forderungen). In diesem Fall kommt kein Vertrag zustande; bereits
              übermittelte Daten werden gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 5 Auftragsgegenstand und Auftragsverarbeitung
            </h2>
            <p className="mb-4">
              (1) Der Kunde beauftragt twenty4collect über die Serviceplattform
              notafinance.de mit dem Einzug seiner fälligen, kaufmännisch angemahnten und noch
              nicht gerichtlich geltend gemachten Kundenrechnung/Forderung bzw.
              Kundenrechnungen/Forderungen.
            </p>
            <p className="mb-4">
              (2) twenty4collect bietet die Möglichkeit, Forderungsdaten elektronisch als
              PDF, E-Rechnung (XRechnung) oder im ZUGFeRD-Format zu übermitteln.
            </p>
            <p className="mb-4">
              (3) Soweit der Kunde im Rahmen des Uploads personenbezogene Daten Dritter
              (seiner Schuldner) an twenty4collect übermittelt, agiert twenty4collect als
              Auftragsverarbeiter gemäß Art. 28 DSGVO. Die Parteien schließen hierzu die
              Vereinbarung zur Auftragsverarbeitung (AVV), die Bestandteil des Upload-Prozesses
              ist. Der Kunde versichert, dass er zur Weitergabe dieser Daten an einen
              Inkassodienstleister berechtigt ist (z. B. aufgrund von § 286 BGB / Verzug oder
              berechtigtem Interesse). Der Kunde bestätigt mit der Beauftragung (Upload der
              Forderung/Rechnung), dass er diese Vereinbarung zur Kenntnis genommen hat.
            </p>
            <p>
              (4) Die Ausführungen in diesen AGB stellen eine verbindliche
              Leistungsbeschreibung dar. Durch die elektronische Übermittlung der im Verzug
              befindlichen Kundenrechnung/Forderung bzw. Kundenrechnungen/Forderungen und
              falls gesetzlich erforderlich der letzten Mahnung, erklärt der Kunde eine
              verbindliche Beauftragung (Angebot) gegenüber twenty4collect. Damit ist die zur
              Legitimation erforderliche Inkassovollmacht durch den Kunden erteilt, der Kunde
              stimmt dies explizit zu. Im Einzelfall kann die Vollmacht gemäß Vorlage von
              twenty4collect auch beim Kunden angefordert werden.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 6 Leistungsumfang</h2>
            <p className="mb-4">
              (1) Zunächst erfolgt die Kontaktaufnahme mit dem Schuldner schriftlich, per
              Brief. Dies ist gesetzlich geregelt und vorgeschrieben. Der Schuldner erhält von
              twenty4collect eine schriftliche Zahlungsaufforderung mit Fristsetzung inklusive
              Forderungsaufstellung gemäß den gesetzlichen Anforderungen und den gesetzlichen
              Informationspflichten. Der Schuldner hat nunmehr gemäß vorgegebener Fristsetzung
              Zeit, die offenstehende Forderung, die schriftliche Zahlungsaufforderung
              inklusive Forderungsaufstellung sowie die Rechtmäßigkeit der gesetzlich
              geregelten Verzugsgebühren zu prüfen und an twenty4collect zu bezahlen.
            </p>
            <p className="mb-4">
              (2) Bei Nichtzahlung des Schuldners gemäß vorgegebener Fristsetzung wird das
              gerichtliche Mahnverfahren (Beantragung Mahnbescheid, Vollstreckungsbescheid)
              bezüglich der übermittelten Kundenrechnung/Forderung bzw.
              Kundenrechnungen/Forderungen eingeleitet. Im Einzelfall und auf Anforderung
              stellt der Auftraggeber twenty4collect die zur Legitimation erforderliche
              Inkassovollmacht gemäß Vorlage von twenty4collect zur Verfügung.
            </p>
            <p className="mb-4">
              (3) twenty4collect erbringt die angebotenen Leistungen gegenüber Schuldnern in
              Deutschland, der EU und nach Absprache in weiteren Ländern außerhalb der EU.
            </p>
            <p className="mb-4">
              (4) Wird bei einem Schuldner ein Insolvenzverfahren festgestellt, führen wir
              kein gerichtliches Mahnverfahren durch. Hierüber erhält der Kunde von
              twenty4collect eine Mitteilung per E-Mail.
            </p>
            <p className="mb-4">
              (5) Wird bei einem Schuldner (nur bei Privatpersonen/Verbraucher) festgestellt,
              dass eine Vermögensauskunft abgegeben wurde, wird die Forderung tituliert
              (Beantragung Mahnbescheid/Vollstreckungsbescheid), damit keine Verjährung mehr
              eintreten kann. Wir nehmen diese Vorgänge in die Überwachung. Sobald geeignete
              Vollstreckungsmaßnahmen zum Erfolg führen, wird die Zwangsvollstreckung
              eingeleitet. Über das Ergebnis dieser Maßnahmen erhält der Kunde von
              twenty4collect eine Benachrichtigung per E-Mail.
            </p>
            <p className="mb-4">
              (6) In den Fällen in denen das gerichtliche Mahnverfahren durchgeführt wird,
              wird twenty4collect bevollmächtigt in Vertretung des Kunden das automatisierte
              gerichtliche Mahnverfahren durchzuführen um die Titulierung (einen
              vollstreckbaren Titel) der Kundenrechnung/Forderung bzw.
              Kundenrechnungen/Forderungen für den Kunden zu erwirken.
            </p>
            <p className="mb-4">
              (7) twenty4collect macht im gerichtlichen Mahnverfahren gegenüber dem Schuldner
              die Hauptforderung nebst Zinsen und Mahnkosten, sowie die Gebühren und Auslagen
              gemäß dem RDG (Rechtsdienstleistungsgesetz) als Verzugsschaden des Kunden
              geltend.
            </p>
            <p className="mb-4">
              (8) In den Fällen, in denen das gerichtliche Mahnverfahren aufgrund
              Widerspruch/Einspruch des Schuldners gegen den Mahnbescheid oder
              Vollstreckungsbescheid nicht zur rechtskräftigen Titulierung der betreffenden
              Kundenrechnung/Forderung bzw. Kundenrechnungen/Forderungen führt, erhält der
              Kunde hierüber von twenty4collect eine Benachrichtigung per E-Mail. Der Kunde
              entscheidet jetzt ob er das streitige Verfahren durchführen möchte, ob er für
              das streitige Verfahren einen eigenen Rechtsanwalt benennen möchte oder ob er
              twenty4collect und deren Vertragsanwälte mit der Durchführung des notwendigen
              streitigen Verfahrens beauftragen möchte. Ein Mandatsverhältnis kommt dann direkt
              zwischen dem Auftraggeber und dem Rechtsanwalt zustande.
            </p>
            <p>
              (9) Nicht zum Aufgabenbereich von twenty4collect gehören die Bestimmung und
              Überwachung bzw. Kontrolle der Verjährungsfristen der vom Kunden zum Einzug an
              twenty4collect übermittelten Kundenrechnung/Forderung bzw.
              Kundenrechnungen/Forderungen. twenty4collect haftet nicht für eine eintretende
              Verjährung.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 7 Obliegenheiten des Kunden
            </h2>
            <p className="mb-4">
              (1) Der Kunde darf nur rechtmäßige, unbestrittene Kundenrechnungen/Forderungen
              an twenty4collect übergeben.
            </p>
            <p className="mb-4">
              (2) Der Kunde verpflichtet sich nach Auftragserteilung an twenty4collect zur
              Vermeidung einer Parallelbearbeitung weder selbst mit dem Schuldner in
              Verhandlung einzutreten oder gegen den Schuldner – unmittelbar oder mittelbar
              durch Dritte – vorzugehen. Soweit derartige Handlungen im Einzelfall
              erforderlich sind, stimmt der Kunde diese mit twenty4collect ab.
            </p>
            <p className="mb-4">
              (3) Falls erforderlich stellt der Kunde auf Anforderung von twenty4collect alle
              weiteren die Kundenrechnung/Forderung betreffenden Unterlagen zur Verfügung.
            </p>
            <p className="mb-4">
              (4) Direkt beim Kunden eingehende Zahlungen oder erfolgte Gutschriften in den
              einzelnen Angelegenheiten sind twenty4collect unverzüglich mitzuteilen.
            </p>
            <p className="mb-4">
              (5) Der Kunde verpflichtet sich, die zum Einzug übergebene/übergebenen
              Kundenrechnung/Forderung bzw. Kundenrechnungen/Forderungen weiterhin zu
              überwachen. Eingehende Zahlungen oder Einsprüche/Widersprüche zu der übergebenen
              Kundenrechnung/Forderung bzw. Kundenrechnungen/Forderungen an den Kunden direkt,
              sind twenty4collect unverzüglich zu melden.
            </p>
            <p>
              (6) Bei der Geltendmachung des an Erfüllung statt abgetretenen
              Verzugsschadenersatzanspruchs wird der Kunde twenty4collect im erforderlichen
              Maß unterstützen. Insbesondere ist der Kunde damit einverstanden, dass die bei
              der Bearbeitung erlangten Informationen hierfür genutzt werden dürfen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 8 Dauer eines Auftrages</h2>
            <p className="mb-4">
              (1) Der Inkassovertrag jeder einzelnen übernommenen Kundenrechnung/Forderung
              endet, wenn die Kundenrechnung/Forderung ausgeglichen ist
              (Voll-/Zahlung/Teil-Zahlung/Verzicht) oder twenty4collect nach pflichtgemäßem
              Ermessen die Aussichtslosigkeit der Beitreibung feststellt.
            </p>
            <p>
              (2) twenty4collect ist berechtigt, bei Unmöglichkeit des Forderungseinzugs bzw.
              Negativbewertung der Erfolgsaussicht den Auftrag abzuschließen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 9 Gebühren außergerichtliches Mahnverfahren
            </h2>
            <p className="mb-4">
              (1) Der Kunde ist berechtigt die Gebührenforderung/Geschäftsgebühr von
              twenty4collect gemäß RDG-Gebührenordnung dem Schuldner als Verzugsschaden gemäß
              § 286 BGB in Erstattung zu stellen und ermächtigt hierzu twenty4collect.
            </p>
            <p className="mb-4">
              (2) Die Kosten und Auslagen werden allein gegenüber dem Schuldner geltend
              gemacht. Der Kunde tritt den gegen den Schuldner bestehenden Anspruch auf
              Erstattung sämtlicher im Rahmen der außergerichtlichen Einziehung anfallenden
              Gebühren und Auslagen (Verzugsschadenersatzanspruch) an twenty4collect an
              Erfüllung statt ab. Die Abtretung wird bei Erlös beim Schuldner aufgelöst.
              twenty4collect nimmt die Abtretung an.
            </p>
            <p className="mb-4">
              (3) Für die Tätigkeit von twenty4collect wird die Anwendung der
              RDG-Gebührenordnung (Rechtsdienstleistungsgesetz) vereinbart.
            </p>
            <p className="mb-4">
              (4) Werden die Gebühren der twenty4collect nicht als Verzugsschaden vom
              Schuldner erstattet, so tritt der Kunde im Falle des Nichterfolgs seinen
              Verzugsschadenersatzanspruch, welchen er gegenüber dem Schuldner hat, in Höhe der
              nicht durch Zahlung erfüllten RDG-Gebühren an twenty4collect an Erfüllung statt
              bereits jetzt ab. twenty4collect nimmt die Abtretung an.
            </p>
            <p>
              (5) Gemäß Beschluss des Bundesfinanzhofes darf Mehrwertsteuer auf Inkasso- und
              Anwaltskosten dem Schuldner nicht in Rechnung gestellt werden, sofern der
              Gläubiger vorsteuerabzugsberechtigt ist. Sind Sie als Kunde
              vorsteuerabzugsberechtigt wird vom Auszahlungsbetrag der Mehrwertsteuer Betrag in
              Abzug gebracht. Den Mehrwertsteuer Betrag können Sie als Gläubiger als Vorsteuer
              beim Finanzamt geltend machen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 10 Gerichtsgebühren/Vergütungspauschale gerichtliches Mahnverfahren
            </h2>
            <p className="mb-4">
              (1) Die Gerichtsgebühr gemäß § 34 i. V. m. Nr. 1100 KV GKG für das gerichtliche
              Mahnverfahren (Beantragung Mahnbescheid, Vollstreckungsbescheid) sowie die
              Vergütungspauschale gemäß § 4 Abs. 4 Satz 2 RDG muss der Schuldner dem Kunden
              erstatten, hierzu ist er gesetzlich nach §§ 286 Abs. 1 Satz 1, 288 Abs. 4, 249
              Abs. 1 BGB verpflichtet.
            </p>
            <p className="mb-4">
              (2) Die Gerichtsgebühr, die das Amtsgericht für den Erlass eines Mahnbescheides
              verlangt richtet sich nach der Forderungssumme. Folgt auf den Mahnbescheid ein
              Vollstreckungsbescheid, wird für den Erlass des Vollstreckungsbescheides keine
              weitere Gerichtsgebühr vom Amtsgericht erhoben.
            </p>
            <p className="mb-2">
              Auszug aus der Gebührentabelle bezüglich der Gerichtsgebühren der Zentralen
              Mahngerichte/Amtsgerichte für den Erlass eines Mahnbescheids/Vollstreckungsbescheids:
            </p>
            <div className="overflow-x-auto mb-4 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-text-900/20">
                    <th className="text-left py-2 pr-4 font-semibold text-text-900">
                      Forderungssumme
                    </th>
                    <th className="text-left py-2 font-semibold text-text-900">
                      Gerichtsgebühr
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-900/70">
                  {[
                    ["0,01 bis 1.000,00 Euro", "36,00 Euro"],
                    ["1.000,01 bis 1.500,00 Euro", "39,00 Euro"],
                    ["1.500,01 bis 2.000,00 Euro", "49,00 Euro"],
                    ["2.000,01 bis 3.000,00 Euro", "59,50 Euro"],
                    ["3.000,01 bis 4.000,00 Euro", "70,00 Euro"],
                    ["4.000,01 bis 5.000,00 Euro", "80,50 Euro"],
                    ["5.000,01 bis 6.000,00 Euro", "91,00 Euro"],
                    ["6.000,01 bis 7.000,00 Euro", "101,50 Euro"],
                    ["7.000,01 bis 8.000,00 Euro", "112,00 Euro"],
                    ["8.001,01 bis 9.000,00 Euro", "122,50 Euro"],
                    ["9.000,01 bis 10.000,00 Euro", "133,00 Euro"],
                    ["10.000,01 bis 13.000,00 Euro", "147,50 Euro"],
                    ["13.000,01 bis 16.000,00 Euro", "162,00 Euro"],
                    ["16.000,01 bis 19.000,00 Euro", "176,50 Euro"],
                    ["19.000,01 bis 22.000,00 Euro", "191,00 Euro"],
                    ["22.000,01 bis 25.000,00 Euro", "205,50 Euro"],
                  ].map(([sum, fee]) => (
                    <tr key={sum} className="border-b border-text-900/10">
                      <td className="py-2 pr-4">{sum}</td>
                      <td className="py-2">{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-4">
              Grundsätzlich gilt: Je höher die Forderungssumme umso höher die Gerichtsgebühr.
              Auf Nachfrage teilen wir dem Kunden die Gerichtsgebühr für die nicht aufgeführten
              Forderungssummen ab 25.000,00 Euro per E-Mail mit.
            </p>
            <p className="mb-4">
              (3) Bezüglich der Gerichtsgebühr ist twenty4collect berechtigt je nach Höhe der
              Forderungssumme einen Gerichtskostenvorschuss zu verlangen. Als Beleg und
              Kostenrechnung dient die Gebühren- und Kostenrechnung des jeweils zuständigen
              Zentralen Mahngerichts/Amtsgerichts.
            </p>
            <p className="mb-4">
              (4) Die Vergütung für die Durchführung des gerichtlichen Mahnverfahrens (§ 13e
              RDG) - Beantragung Mahnbescheid/Vollstreckungsbescheid - beträgt bei Forderungen
              bis 500,00 Euro 45,00 Euro für die Beantragung des Mahnbescheids und weitere
              27,00 Euro für die Beantragung des Vollstreckungsbescheids, d. h. insgesamt
              Gebühren von 72,00 Euro. Diese Gebühr erhöht sich dann bei Forderungen zwischen
              500,00 und 1.000,00 Euro auf 166,60 Euro und bei Forderungen zwischen 1.000,00
              und 1.500,00 Euro auf 229,08 Euro. Es kommt dann zu einer kontinuierlichen
              Steigerung. Auf Nachfrage teilen wir dem Kunden die Gebühren für die nicht
              aufgeführten Forderungssummen per E-Mail mit.
            </p>
            <p className="mb-4">
              (5) Erfolgt nach Abschluss des gerichtlichen Mahnverfahrens und rechtskräftiger
              Titulierung keine Zahlung durch den Schuldner trägt der Kunde lediglich die
              Gerichtsgebühr gemäß § 34 i. V. m. Nr. 1100 KV GKG und die Vergütungspauschale
              gemäß § 4 Abs. 4 Satz 2 RDG.
            </p>
            <p>
              (6) Werden bei Nichtzahlung des Schuldners Zwangsvollstreckungsmaßnahmen von
              twenty4collect durch die Beauftragung des Gerichtsvollziehers eingeleitet, z. B.
              eine Lohnpfändung, Kontenpfändung etc. wird der Kunde hierüber von twenty4collect
              ebenfalls per E-Mail entsprechend informiert. Diese Maßnahmen werden in
              Abstimmung mit dem Kunden von twenty4collect eingeleitet.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 11 Vereinbarungen mit dem Schuldner über Nachlässe/Vergleiche/Ratenzahlungen
            </h2>
            <p className="mb-4">
              (1) Vergleichsangebote des Schuldners und Angebote über Nachlässe werden nur in
              Abstimmung und nach Rücksprache mit dem Kunden geführt.
            </p>
            <p>
              (2) twenty4collect ist befugt, mit dem Schuldner sowohl im vorgerichtlichen als
              auch im gerichtlichen Mahnverfahren Ratenzahlungsvereinbarungen ohne vorherige
              Abstimmung mit dem Kunden zu schließen.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 12 Datenschutz/Meldeverkehr mit Auskunfteien
            </h2>
            <p className="mb-4">
              (1) twenty4collect wird im Rahmen des Forderungseinzugs elektronisch
              gespeicherte Daten und Unterlagen nach den Grundsätzen einer ordnungsgemäßen
              Datensicherung und den Bestimmungen des BDSG verarbeiten. Die mit dem
              Forderungseinzug befassten Mitarbeiter der twenty4collect sind auf das
              Datengeheimnis gemäß BDSG verpflichtet.
            </p>
            <p>
              (2) Soweit nichts Gegenteiliges vereinbart ist, ist twenty4collect berechtigt,
              bonitätsrelevante Informationen des Schuldners an Auskunfteien zu übermitteln,
              soweit dies datenschutzrechtlich zulässig ist.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 13 Abrechnung und Auszahlung eingehender Zahlungen des Schuldners
            </h2>
            <p className="mb-4">
              (1) Nach vollständig erfolgtem Zahlungseingang durch den Schuldner erhält der
              Kunde unmittelbar und zeitnah die Abrechnung per E-Mail und die Auszahlung von
              100 % des Rechnungsbetrages seiner Ausgangsrechnung zuzüglich Verzugszinsen und
              Mahnkosten.
            </p>
            <p className="mb-4">
              (2) Die Abrechnung der eingehenden Gelder bei twenty4collect erfolgt
              grundsätzlich zeitnah auf das Konto des Kunden, nachdem der Kunde die Abrechnung
              per E-Mail von twenty4collect erhalten hat.
            </p>
            <p className="mb-4">
              (3) Die bei twenty4collect eingehenden Zahlungen werden zuerst auf die bis dahin
              entstandenen Vergütungs- und Auslagenerstattungsansprüche angerechnet (vgl. § 367
              BGB), danach auf die Zinsen, Mahnkosten und die Hauptforderung des Kunden.
            </p>
            <p>
              (4) Die Zahlungen des Schuldners an twenty4collect werden über ein
              Fremdgeldkonto abgewickelt. Dieses Fremdgeldkonto wird unverzinslich geführt.
              Dadurch hat der Kunde keinen Zinsanspruch zwischen Eingang der Gelder auf dem
              Fremdgeldkonto und der Abrechnung und Überweisung/Auszahlung an ihn.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 14 Aufbewahrungspflicht Originalunterlagen, Handakten
            </h2>
            <p className="mb-4">
              (1) Originalunterlagen, die für Abrechnungs- und Buchhaltungszwecke
              erforderlich sind oder der gesetzlichen Aufbewahrungspflicht unterliegen, werden
              bei Ablauf der steuerrechtlichen- und handelsrechtlichen Aufbewahrungsfristen
              vernichtet.
            </p>
            <p>
              (2) twenty4collect ist berechtigt 24 Monate nach Beendigung des Auftrages die
              Handakte zu vernichten.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 15 Haftung</h2>
            <p>
              (1) twenty4collect führt alle Aufträge nach bestem Wissen und Gewissen durch.
              Schadensersatzansprüche des Kunden wegen Unmöglichkeit, Verzug, positiver
              Forderungsverletzung, Verschulden beim Vertragsschluss und unerlaubter Handlung
              sind sowohl gegen twenty4collect als auch gegen Erfüllungsgehilfen- bzw.
              Verrichtungsgehilfen ausgeschlossen, soweit die Schadensverursachung nicht auf
              grob fahrlässigen oder vorsätzlichen Pflichtverletzungen der gesetzlichen
              Vertreter oder leitenden Angestellten von twenty4collect beruht. Bei
              vorsätzlichem oder grob fahrlässigem Verhalten einfacher Erfüllungsgehilfen von
              twenty4collect ist die Haftung auf Fälle der Verletzung wesentlicher
              Vertragspflichten beschränkt. Soweit die Schadensverursachung auf einer leicht
              fahrlässigen Pflichtverletzung beruht, ist die Haftung von twenty4collect auf
              Fälle der Verletzung wesentlicher Vertragspflichten beschränkt und in diesen
              Fällen auf vertragstypische und vorhersehbare Schäden.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 16 Elektronische Kommunikation
            </h2>
            <p className="mb-4">
              (1) Der Kunde erklärt sein Einverständnis, dass die vertragsbezogene
              Kommunikation per E-Mail erfolgen kann, es sei denn zwingend anzuwendende
              gesetzliche Vorschriften erfordern eine andere Form der Kommunikation.
            </p>
            <p>
              (2) Der Verwender einer nicht mit der elektronischen Signatur versehenen E-Mail
              muss sich den Inhalt der Erklärung als richtig entgegenhalten lassen und
              verzichtet im Falle einer gerichtlichen Auseinandersetzung auf den Einwand, dass
              die Erklärung nicht von ihm mit dem betreffenden Inhalt an den in der Erklärung
              genannten Adressaten zu dem in der Erklärung ausgewiesenen Zeitpunkt abgegeben
              wurde.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 17 Streitschlichtung</h2>
            <p className="mb-4">
              (1) Hinweis auf Online-Streitbeilegung gemäß Art. 14 der ODR-Verordnung:
              Plattform der EU-Kommission zur Online-Streitbeilegung: www.ec.europa.eu/consumers/odr
            </p>
            <p>
              (2) Allgemeine Informationspflicht nach § 36 Verbraucherstreitbeilegungsgesetz
              (VSBG): twenty4collect ist nicht bereit und verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              Es besteht diesbezüglich keine gesetzliche Verpflichtung.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              § 18 Erfüllungsort, Gerichtsstand
            </h2>
            <p>
              (1) Es gilt deutsches Recht, Erfüllungsort und Gerichtsstand ist der Hauptsitz
              von twenty4collect.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 19 Anwendbares Recht</h2>
            <p>
              (1) Für die Rechtsbeziehungen des Kunden und twenty4collect gilt deutsches
              Recht ohne die Verweisungsnormen des Internationalen Privatrechts und unter
              Ausschluss des UN-Kaufrechts.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">§ 20 Salvatorische Klausel</h2>
            <p>
              (1) Sollte eine Bestimmung dieser AGB aus irgendeinem Grund nichtig sein oder
              werden, so bleibt die Gültigkeit der übrigen Bestimmungen unberührt. An die
              Stelle der unwirksamen Bestimmung tritt die jeweils einschlägige gesetzliche
              Regelung.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
