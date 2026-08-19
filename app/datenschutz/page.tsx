import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung für die Serviceplattform www.notafinance.de der twenty4collect GmbH.",
  openGraph: {
    title: "Datenschutzerklärung | Nota Finance",
    description:
      "Datenschutzerklärung für die Serviceplattform www.notafinance.de der twenty4collect GmbH.",
    url: "https://www.notafinance.de/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <main className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-text-900 mb-4">Datenschutzerklärung</h1>
        <p className="text-text-900/70 mb-12">
          für die Serviceplattform www.notafinance.de der twenty4collect GmbH im Rahmen Ihrer
          Nutzung der Website https://www.notafinance.de – sowie der Nutzung der
          Rechtsdienstleistung/Inkassodienstleistung/Mahnwesen-Lösung der twenty4collect GmbH –
          Stand: 01.01.2026
        </p>

        <div className="prose prose-lg max-w-none text-text-900/70 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">1. Allgemeines</h2>
            <p className="mb-4">
              Die twenty4collect GmbH
              <br />
              In den Weiden 9
              <br />
              56729 Weiler
              <br />
              Tel.: +49 (0) 2656 / 951314
              <br />
              E-Mail: service@notafinance.de
            </p>
            <p className="mb-4">
              betreibt diese Webseite als multimodale, souveräne Serviceplattform für
              Unternehmen, Gewerbetreibende und Freiberufler. Wir nehmen den Schutz Ihrer
              persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
              dieser Datenschutzerklärung.
            </p>
            <p>
              Ihr Vertrauen ist uns wichtig. Die twenty4collect GmbH als Betreiber der Website
              https://www.notafinance.de – (nachfolgend als: „twenty4collect" oder „wir" oder
              „uns" oder „unserer" bezeichnet) schätzt Ihr Vertrauen. Uns ist selbstverständlich
              bewusst, dass Ihnen der sorgfältige Umgang mit Ihren persönlichen Daten sehr
              wichtig ist. Aufgrund der ständigen Weiterentwicklung des Internets sowie
              Änderungen der gesetzlichen Bestimmungen sind gelegentliche Anpassungen unserer
              Datenschutzerklärung notwendig. Wir behalten uns das Recht vor, von Zeit zu Zeit
              entsprechende Änderungen und Anpassungen vorzunehmen. In dieser
              Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten
              wir im Rahmen Ihrer Nutzung der Website www.notafinance.de erheben sowie der
              Nutzung der Rechtsdienstleistung/Inkassodienstleistung/Mahnwesen-Lösung der
              twenty4collect und zu welchem Zweck die Daten verwendet werden. Ihre
              personenbezogenen Daten erheben und verwenden wir ausschließlich im Rahmen der
              Bestimmungen der EU-DSGVO (Europäische Datenschutzgrundverordnung).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              2. Art der Datenerfassung und Zweck
            </h2>
            <p className="mb-2 font-semibold text-text-900">(1) Beim Besuch der Website</p>
            <p className="mb-2">
              Beim Aufrufen unserer Website https://www.notafinance.de werden durch den auf
              Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den
              Server unserer Website gesendet. Diese Informationen werden temporär
              gespeichert. Folgende Informationen werden dabei erfasst und bis zur
              automatisierten Löschung gespeichert:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP-Adresse des anfragenden Rechners,</li>
              <li>Datum und Uhrzeit des Zugriffs,</li>
              <li>Name und URL der abgerufenen Datei,</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
              <li>
                Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name
                Ihres Access-Providers.
              </li>
            </ul>
            <p className="mb-2">Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,</li>
              <li>Gewährleistung einer komfortablen Nutzung unserer Website,</li>
              <li>Auswertung der Systemsicherheit und -stabilität.</li>
            </ul>
            <p className="mb-4">
              Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.
              Unser berechtigtes Interesse folgt aus den oben aufgelisteten Zwecken zur
              Datenerhebung.
            </p>
            <p className="mb-2 font-semibold text-text-900">
              (2) Bei Nutzung der Upload-Funktion (ohne Registrierung)
            </p>
            <p className="mb-2">
              Wir bieten Ihnen die Möglichkeit, Forderungen direkt per Upload einzureichen,
              ohne ein dauerhaftes Benutzerkonto anzulegen. Hierbei erheben wir folgende
              Daten:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Ihre E-Mail-Adresse (zur Identifikation, Kommunikation und Vertragsabwicklung),</li>
              <li>
                Die hochgeladenen Dokumente (Rechnungen, Mahnungen), die personenbezogene
                Daten von Ihnen und Dritten (Schuldnern) enthalten können,
              </li>
              <li>Metadaten des Uploads (Zeitpunkt, Dateigröße).</li>
            </ul>
            <p>
              Zweck der Verarbeitung ist die Anbahnung und Durchführung des
              Inkasso-Auftrages sowie die Erfüllung gesetzlicher Pflichten. Rechtsgrundlage
              hierfür ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche
              Maßnahmen).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              3. Weitergabe von Daten und Hosting
            </h2>
            <p className="mb-2 font-semibold text-text-900">
              (1) Hosting und Infrastruktur (Vercel, Supabase & Resend)
            </p>
            <p className="mb-4">
              Wir nutzen für den Betrieb dieser Website und die Speicherung Ihrer Daten
              spezialisierte technische Dienstleister, mit denen wir
              Auftragsverarbeitungsverträge (AVV) gemäß Art. 28 DSGVO geschlossen haben.
            </p>
            <p className="mb-4">
              <strong className="text-text-900">Hosting:</strong> Unsere Website wird bei
              Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Vercel
              stellt die technische Infrastruktur bereit. Vercel ist unter dem Data Privacy
              Framework (DPF) zertifiziert.
            </p>
            <p className="mb-4">
              <strong className="text-text-900">Datenbank &amp; Dateispeicher:</strong> Ihre
              hochgeladenen Dokumente und Ihre Stammdaten werden bei Supabase Inc. gespeichert.
              Die physische Speicherung der Daten erfolgt ausschließlich in Frankfurt am Main
              (Deutschland / AWS Region eu-central-1) erfolgt.
            </p>
            <p className="mb-4">
              <strong className="text-text-900">E-Mail-Versand:</strong> Für den Versand von
              Bestätigungs- und Benachrichtigungs-E-Mails im Rahmen der Fallbearbeitung setzen
              wir den E-Mail-Dienstleister Resend ein. Hierbei werden die für den jeweiligen
              Mailversand erforderlichen Daten (z. B. Ihre E-Mail-Adresse sowie ggf. der Inhalt
              der Mitteilung und Anhänge) verarbeitet.
            </p>
            <p className="mb-2 font-semibold text-text-900">(2) Inkasso-Dienstleistung</p>
            <p>
              Soweit es für die Einziehung der Forderung erforderlich ist, übermitteln wir
              Daten an Schuldner (zur Zahlungsaufforderung), Auskunfteien (zur
              Bonitätsprüfung, bei berechtigtem Interesse), Gerichte und Gerichtsvollzieher
              (im gerichtlichen Mahnverfahren), Rechtsanwälte (falls ein streitiges Verfahren
              notwendig wird und Sie dies beauftragen).
            </p>

            {/* ============================================================
                ACHTUNG - NOCH NICHT ANWALTLICH GEPRUEFT (siehe P0-7)

                Der folgende Absatz zu Plausible Analytics wurde im Rahmen von
                P0-8 ergaenzt und muss vor dem Livegang anwaltlich geprueft und
                freigegeben werden. Alle uebrigen Texte dieser Seite sind davon
                nicht beruehrt.
                ============================================================ */}
            <p className="mb-2 font-semibold text-text-900">
              (3) Reichweitenmessung (Plausible Analytics)
            </p>
            <p>
              Zur Auswertung der Nutzung unserer Website setzen wir Plausible Analytics
              der Plausible Insights OÜ, Västriku tn 2, 50403 Tartu, Estland, ein. Die
              Verarbeitung erfolgt ausschließlich auf Servern innerhalb der Europäischen
              Union; eine Übermittlung in Drittländer findet nicht statt. Plausible
              verwendet <strong className="text-text-900">keine Cookies</strong> und legt
              keine Kennungen auf Ihrem Endgerät ab. Erfasst werden ausschließlich
              aggregierte Angaben wie aufgerufene Seite, verweisende Seite, Browser,
              Betriebssystem, Gerätetyp und Herkunftsland. Ihre IP-Adresse wird dabei
              nicht gespeichert, sondern lediglich zur Ermittlung des Herkunftslandes
              ausgewertet und sofort verworfen. Eine Zusammenführung dieser Daten mit
              anderen Datenquellen, eine Wiedererkennung einzelner Personen oder eine
              seitenübergreifende Nachverfolgung erfolgen nicht. Rechtsgrundlage ist
              Art. 6 Abs. 1 S. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der
              bedarfsgerechten Gestaltung und der statistischen Auswertung unseres
              Angebots.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">4. Verantwortliche Stelle</h2>
            <p className="mb-4">
              (1) Verantwortliche Stelle im Sinne der Datenschutzgesetze ist die twenty4collect
              GmbH, In den Weiden 9, 56729 Weiler. Für Fragen zum Datenschutz stehen wir Ihnen
              sehr gerne per E-Mail unter der Adresse service@notafinance.de zur Verfügung.
              Die Website www.notafinance.de wird von der twenty4collect GmbH betrieben und
              berücksichtigt die Bestimmungen der EU-DSGVO.
            </p>
            <p className="mb-4">
              (2) Soweit Auftraggeber (Kunde) uns personenbezogene Daten Dritter (Schuldner)
              ausschließlich zur technischen Übermittlung an twenty4collect übermitteln,
              handeln die Parteien regelmäßig wie folgt: Der Kunde ist für die Zwecke und
              Mittel der ursprünglichen Datenverarbeitung verantwortlich (Verantwortlicher
              i. S. v. Art. 4 Nr. 7 DSGVO). twenty4collect verarbeitet die übermittelten Daten
              in diesem Verarbeitungsumfang als Auftragsverarbeiter ausschließlich nach
              Weisung des Kunden. Hierzu besteht eine rechtsverbindliche
              Auftragsverarbeitungsvereinbarung (AVV).
            </p>
            <p className="mb-4">
              (3) Soweit twenty4collect aber eigenständig über Zwecke und Mittel der
              Verarbeitung entscheidet (z. B. direkte Kontaktaufnahme zum Schuldner,
              Verarbeitung zur Forderungsdurchsetzung, Durchführung außergerichtlicher
              Mahnverfahren, Einleitung gerichtlicher Maßnahmen), handelt twenty4collect als
              eigenständiger Verantwortlicher für diese Tätigkeiten. In diesem Fall begründet
              twenty4collect für diese Verarbeitungsvorgänge eigene datenschutzrechtliche
              Verantwortlichkeiten (z. B. Informationspflichten, Löschfristen,
              Reklamationsbearbeitung).
            </p>
            <p>
              (4) Die genaue Rollenabgrenzung ist in der AVV bzw. im Leistungsvertrag geregelt;
              im Zweifel gilt die vertragliche Regelung.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">5. Datensicherheit</h2>
            <p className="mb-4">
              Wir unternehmen alle Anstrengungen, dass Ihre personenbezogenen Daten vor
              Verlust, Verfälschung oder Kenntnisnahme unbefugter gesichert sind. Die
              physische Speicherung der Daten erfolgt ausschließlich in Frankfurt am Main
              (Deutschland / AWS Region eu-central-1) erfolgt. Wir unterhalten dem Stand der
              Technik entsprechende modernste technische Maßnahmen zur Gewährleistung der
              Datensicherheit. Wir überprüfen regelmäßig die von uns getroffenen technischen
              Sicherheitsmaßnahmen, um sie erforderlichenfalls dem technologischen Fortschritt
              anzupassen.
            </p>
            <p>
              Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren
              (Secure Socket Layer) in Verbindung mit der jeweils höchsten
              Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Sie erkennen die
              verschlüsselte Übertragung an der geschlossenen Darstellung des
              Schlüssel- beziehungsweise Schloss-Symbols in der unteren Statusleiste Ihres
              Browsers oder in der Adresszeile ("https://").
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">6. Cookies</h2>
            <p className="mb-4">
              Um den Besuch unserer Website attraktiv und die Nutzung bestimmter Funktionen
              nutzerfreundlicher, sicherer und effektiver zu gestalten, verwenden wir
              sogenannte Cookies. Wir setzen auf unserer Seite sogenannte „Session-Cookies"
              oder lokale Speichertechnologien (Local Storage) ein, die technisch zwingend
              erforderlich sind, um die Funktionen der Website (z. B. den sicheren
              Upload-Prozess, den Schutz vor Angriffen oder den Login-Status) zu
              gewährleisten. Diese Daten werden nach Ende Ihres Besuchs oder Schließen des
              Browsers in der Regel automatisch gelöscht. Es erfolgt keine Nutzung von
              Tracking- oder Analyse-Cookies zu Werbezwecken (wie z. B. Google Analytics).
            </p>
            <p>
              Rechtsgrundlage für diese Speicherung ist Art. 6 Abs. 1 lit. f DSGVO (unser
              berechtigtes Interesse an der technischen Funktionsfähigkeit und Sicherheit der
              Website). Eine Einwilligung (Cookie-Banner) ist für diese technisch notwendigen
              Cookies nicht erforderlich.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              7. Erhebung und Verarbeitung personenbezogener Daten bei der Nutzung unserer
              E-Mail-Adressen
            </h2>
            <p className="mb-4">
              Personenbezogene Daten werden nur erfasst, wenn Sie diese Angaben im Rahmen des
              Uploads, der Auftragserteilung oder einer Anfrage oder Nachfrage im Rahmen der
              Auftragsbearbeitung machen.
            </p>
            <p>
              Bei Fragen jeglicher Art ist eine Kontaktaufnahme über die bereitgestellten
              E-Mail-Adressen möglich. In diesem Fall werden die übermittelten
              personenbezogenen Daten gespeichert. Rechtsgrundlage für die Datenverarbeitung
              zum Zwecke der Kontaktaufnahme ist Art. 6 Abs. 1 lit. f DSGVO. Zielt die
              Kontaktaufnahme auf den Abschluss eines Vertrages ab, so ist zusätzliche
              Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO. Die von uns
              erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen
              gestellten Anfrage gelöscht, soweit wir nicht gesetzlich zur weiteren
              Verarbeitung berechtigt oder verpflichtet sind.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              8. Nutzung und Weitergabe personenbezogener Daten
            </h2>
            <p className="mb-4">
              Soweit Sie uns personenbezogene Daten freiwillig zur Verfügung gestellt haben,
              verwenden wir diese nur zur Beantwortung Ihrer Anfragen, zur Abwicklung Ihres
              Auftrages, zur Abwicklung mit Ihnen geschlossener Verträge sowie für die
              technische Administration. Ihre personenbezogenen Daten werden an Dritte nur
              weitergegeben, wenn dies zum Zwecke der Vertragsabwicklung, zu
              Abrechnungszwecken oder sonstigen zur Auftragsabwicklung und gesetzlich
              zulässigen Tätigkeiten erforderlich ist. Etwas anderes gilt nur, falls Gesetze,
              richterliche oder behördliche Verfügungen die Übermittlung erforderlich machen.
            </p>
            <p>
              Personenbezogene Daten werden nur solange von uns gespeichert, wie dies für den
              jeweiligen Zweck erforderlich ist. Sollte aus sonstigen gesetzlichen Gründen die
              Speicherung unzulässig sein, werden wir Ihre Daten unverzüglich löschen.
              Personenbezogene Daten, die für Abrechnungs- und Buchhaltungszwecke
              erforderlich sind oder der gesetzlichen Aufbewahrungspflicht unterliegen,
              bleiben hiervon unberührt. Diese werden erst bei Ablauf der steuerrechtlichen-
              und handelsrechtlichen Aufbewahrungsfristen gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              9. Rechtsgrundlage für die Verarbeitung personenbezogener Daten
            </h2>
            <p className="mb-4">
              Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines
              Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist,
              dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für
              Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen
              erforderlich sind.
            </p>
            <p className="mb-4">
              Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer
              rechtlichen Verpflichtung erforderlich ist, der twenty4collect unterliegt,
              dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.
            </p>
            <p className="mb-4">
              Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer
              anderen natürlichen Person eine Verarbeitung personenbezogener Daten
              erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
            </p>
            <p>
              Ist die Verarbeitung zur Wahrung eines berechtigten Interesses von
              twenty4collect oder eines Dritten erforderlich und überwiegen die Interessen,
              Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse
              nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die
              Verarbeitung.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-900 mb-4">
              10. Rechte der Betroffenen, Auskunftsrecht, Löschung, Datenübertragbarkeit,
              Beschwerderecht
            </h2>
            <p className="mb-4">
              Betroffene haben ein Recht auf Auskunft (Artikel 15 DS-GVO), Berichtigung
              (Artikel 16 DS-GVO), Löschung (Artikel 17 DS-GVO), Einschränkung der
              Verarbeitung (Artikel 18 DS-GVO), Datenübertragbarkeit (Artikel 20 DS-GVO) und
              Widerspruch (Artikel 21 DS-GVO) bezogen auf ihre personenbezogenen Daten.
            </p>
            <p className="mb-4">
              Betroffene können erteilte Einwilligungen zur Verarbeitung jederzeit
              widerrufen. Der Ausübung dieser Rechte kann die Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen einschränkend gegenüberstehen.
            </p>
            <p className="mb-4">
              Für eine Auskunft über Ihre personenbezogenen Daten bzw. deren Korrektur,
              kontaktieren Sie uns bitte unter folgender E-Mail-Adresse: service@notafinance.de
            </p>
            <p className="mb-4">
              Personenbezogene Daten werden nur solange von uns gespeichert, wie dies für den
              jeweiligen Zweck erforderlich ist. Sollte aus sonstigen gesetzlichen Gründen die
              Speicherung unzulässig sein, werden wir Ihre Daten unverzüglich löschen.
              Personenbezogene Daten, die für Abrechnungs- und Buchhaltungszwecke
              erforderlich sind oder der gesetzlichen Aufbewahrungspflicht unterliegen,
              bleiben hiervon unberührt. Diese werden erst bei Ablauf der steuerrechtlichen-
              und handelsrechtlichen Aufbewahrungsfristen gelöscht.
            </p>
            <p className="mb-4">
              Das Recht auf Datenübertragbarkeit erlaubt es Ihnen, Daten über Ihre Person, die
              Sie twenty4collect selbst bereitgestellt haben im von Art. 20 DSGVO vorgesehenen
              Format von twenty4collect zu erhalten und von twenty4collect übermitteln zu
              lassen.
            </p>
            <p className="mb-2">
              Zudem steht Ihnen ein Beschwerderecht bei der zuständigen Datenaufsichtsbehörde
              zu. Die Kontaktdaten der für twenty4collect zuständigen Datenaufsichtsbehörden
              lauten:
            </p>
            <p className="mb-4">
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
              Rheinland-Pfalz
              <br />
              Hintere Bleiche 34, 55116 Mainz
            </p>
            <p>
              Aufsichtsbehörde i. S. d. § 13a Abs. 1 Nr. 8 und des § 13h Abs. 1 S. 1 RDG:
              <br />
              Bundesamt für Justiz (BfJ)
              <br />
              Postanschrift: Bundesamt für Justiz, Referat VII 5 (RDG), Adenauerallee 99-103,
              53113 Bonn
              <br />
              E-Mail-Adresse: rdg@bfj.bund.de
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
