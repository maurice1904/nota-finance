import Link from "next/link";
import { Upload, CheckCircle, Euro, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">
              Ihre Forderung.
              <br />
              <span className="text-signal">Unsere Mission.</span>
          </h1>
            
            <p className="text-xl md:text-2xl text-primary/70 mb-12 leading-relaxed">
              Inkasso der neusten Generation: Einfach, digital, kundenorientiert, zuverlässig. 
              Laden Sie ihre Rechnung hoch und wir kümmern uns um den Rest. Die effizienteste 
              Inkasso-Lösung für Selbstständige sowie kleine und mittlere Unternehmen aller 
              Branchen mit Forderungshöhen ab 50€.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="group bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg border-2 border-muted hover:border-signal hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Kontakt aufnehmen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/einreichen"
                className="group bg-signal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-signal/80 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Fall einreichen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Slider */}
        <div className="mt-24 border-t border-muted pt-12">
          <p className="text-center text-sm font-medium text-primary/50 mb-8 uppercase tracking-wide">
            Vertrauenspartner & Zertifizierungen
          </p>
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale">
            <div className="text-2xl font-bold text-primary/70">BDIU</div>
            <div className="text-2xl font-bold text-primary/70">SCHUFA</div>
            <div className="text-2xl font-bold text-primary/70">Wolters Kluwer</div>
            <div className="text-2xl font-bold text-primary/70">GeoTrust</div>
            <div className="text-2xl font-bold text-primary/70">GDD</div>
          </div>
        </div>
      </section>

      {/* Erklärung Section - So einfach ist es */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-16">
            So einfach ist es
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Schritt 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-signal to-signal/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Fall einreichen
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Reichen Sie Ihren Fall oder mehrere Fälle direkt per Upload oder Drag-&-Drop ein. 
                Als PDF-Datei, als E-Rechnung im XRechnungs Format oder als E-Rechnung im ZUGFeRD 
                Format. Sie können Ihre Fälle alternativ auch per Mail einreichen.
              </p>
            </div>

            {/* Schritt 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-signal to-signal/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Wir übernehmen
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Den Eingang inklusive Aktenzeichen bestätigen wir automatisch nach Prüfung der 
                Dokumente per Bestätigungs-E-Mail. Wir führen das außergerichtliche Mahnverfahren 
                durch und leiten bei Bedarf nach Rücksprache mit Ihnen auch das gerichtliche 
                Mahnverfahren ein.
              </p>
            </div>

            {/* Schritt 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-signal to-signal/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <Euro className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Zahlung erhalten
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Sobald der Kunde die Forderung beglichen hat, erhalten Sie 100% des Rechnungsbetrages. 
                Die gesetzlich festgelegten Gebühren sind nicht von Ihnen, sondern vom Schuldner zu tragen.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/einreichen"
              className="inline-flex items-center gap-2 bg-signal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-signal/80 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Jetzt Fall einreichen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Unser Service Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Unser Service für Sie
            </h2>
            <p className="text-xl text-primary/70 max-w-3xl mx-auto">
              Wir geben alles, damit Sie Ihr verdientes Geld erhalten.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-signal to-muted transform -translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* Punkt 1 */}
              <div className="relative flex items-center">
                <div className="md:w-1/2 md:pr-12 text-right">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Außergerichtliches Mahnverfahren
                  </h3>
                  <p className="text-primary/70 leading-relaxed">
                    Wir erinnern Ihre Kunden an offene Rechnungen und führen das außergerichtliche 
                    Mahnverfahren durch. Im außergerichtlichen Mahnverfahren entstehen Ihnen als 
                    Auftraggeber dabei keinerlei Kosten. Ihre säumigen Kunden zahlen gesetzlich 
                    festgelegte Gebühren.
                  </p>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-signal rounded-full items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="md:w-1/2" />
              </div>

              {/* Punkt 2 */}
              <div className="relative flex items-center">
                <div className="md:w-1/2" />
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-signal rounded-full items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Gerichtliches Mahnverfahren
                  </h3>
                  <p className="text-primary/70 leading-relaxed">
                    Sollten Ihre Kunden auch nach 10 Tagen nicht zahlen, führen wir nach Rücksprache 
                    mit Ihnen das gerichtliche Mahnverfahren zur finalen Klärung durch. Dabei entstehen 
                    transparente, gesetzlich festgelegte Gebühren, welche im Erfolgsfall nicht von Ihnen, 
                    sondern vom säumigen Kunden zu zahlen sind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Versprechen Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Unser Versprechen
            </h2>
            <p className="text-xl text-primary/70 max-w-3xl mx-auto font-semibold">
              Im Erfolgsfall erhalten Sie 100% Ihrer Forderung plus gesetzlich festgelegte 
              Mahnkosten und Verzugszinsen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Kachel 1 */}
            <div className="group bg-gradient-to-br from-slate-50 to-white border border-muted rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-signal to-signal/70 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Wahrung Ihrer Kundenbeziehung
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Wir behandeln Ihren Kunden als Kunden und beschädigen nicht Ihre Kundenbeziehung.
              </p>
            </div>

            {/* Kachel 2 */}
            <div className="group bg-gradient-to-br from-slate-50 to-white border border-muted rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-signal to-signal/70 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Euro className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Keine Kosten
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Für Sie als Auftraggeber ist das außergerichtliche Mahnverfahren im Erfolgsfall in 
                der Regel kostenfrei. Die anfallenden Inkassokosten sind gesetzlich geregelt und werden 
                von Ihrem säumigen Kunden (Schuldner) getragen. Sollte ein gerichtliches Mahnverfahren 
                notwendig werden, informieren wir Sie im Vorfeld transparent über eventuell anfallende 
                Gerichtskosten. Auch diese sind im Erfolgsfall von Ihrem Schuldner zu tragen.
              </p>
            </div>

            {/* Kachel 3 */}
            <div className="group bg-gradient-to-br from-slate-50 to-white border border-muted rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-signal to-signal/70 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Volle Rechnungsbegleichung
              </h3>
              <p className="text-primary/70 leading-relaxed">
                Im Erfolgsfall erhalten Sie 100% des Rechnungsbetrages Ihrer Ausgangsrechnung 
                zuzüglich der Ihnen zustehenden, gesetzlich festgeschriebenen Kosten für Mahnungen 
                und Verzugszinsen bei Zahlung durch Ihren Kunden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Jetzt digitales Inkasso beauftragen"
        subtitle="Reichen Sie jetzt direkt einen Fall oder mehrere Fälle ein. Oder nehmen Sie mit uns Kontakt auf."
        buttons={[
          { text: "Kontakt aufnehmen", href: "/kontakt" },
          { text: "Häufig gestellte Fragen", href: "/faq" },
          { text: "Fall einreichen", href: "/einreichen", primary: true },
        ]}
      />
      </main>
  );
}
