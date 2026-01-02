"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    acceptAGB: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptAGB) {
      alert("Bitte akzeptieren Sie die AGB.");
      return;
    }

    setIsSubmitting(true);

    // Prepare email content
    const emailBody = `
Name: ${formData.name}
Firma: ${formData.company}
Email: ${formData.email}
Telefon: ${formData.phone || "Nicht angegeben"}

Nachricht:
${formData.message}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:admin@notafinance.de?subject=Kontaktanfrage von ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        acceptAGB: false,
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface-100 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl mb-8">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-900 mb-8 leading-tight">
              Ihre Kontaktanfrage
            </h1>
            
            <p className="text-xl text-text-900/70 leading-relaxed">
              Vielen Dank für Ihr Interesse an unserem Service. Bitte füllen Sie die Informationen 
              aus und wir werden uns binnen 24h per Mail bei Ihnen melden.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          {isSuccess && (
            <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-1">
                  Vielen Dank für Ihre Nachricht!
                </h3>
                <p className="text-green-700">
                  Wir haben Ihre Kontaktanfrage erhalten und werden uns binnen 24 Stunden bei Ihnen melden.
                </p>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-8 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-900 mb-2">
                  Name des Ansprechpartners *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-border-subtle rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300"
                  placeholder="Max Mustermann"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-text-900 mb-2">
                  Name der Firma *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-border-subtle rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300"
                  placeholder="Musterfirma GmbH"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-900 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-border-subtle rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300"
                  placeholder="max@musterfirma.de"
                />
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-text-900 mb-2">
                  Telefonnummer (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-border-subtle rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300"
                  placeholder="+49 123 456789"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text-900 mb-2">
                  Ihre Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-border-subtle rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300 resize-none"
                  placeholder="Beschreiben Sie hier Ihr Anliegen..."
                />
              </div>

              {/* AGB Checkbox */}
              <div className="flex items-start gap-3 pt-4">
                <input
                  type="checkbox"
                  id="acceptAGB"
                  name="acceptAGB"
                  required
                  checked={formData.acceptAGB}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-brand-900 border-2 border-border-subtle rounded focus:ring-2 focus:ring-focus-ring transition-all duration-300"
                />
                <label htmlFor="acceptAGB" className="text-sm text-text-900/70 leading-relaxed">
                  Ich akzeptiere die{" "}
                  <a 
                    href="/agb.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-900 hover:underline font-semibold"
                  >
                    Allgemeinen Geschäftsbedingungen (AGB)
                  </a>{" "}
                  und die{" "}
                  <a 
                    href="/datenschutz.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-900 hover:underline font-semibold"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kontakt aufnehmen
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 mb-4">Oder kontaktieren Sie uns direkt per E-Mail:</p>
            <a 
              href="mailto:admin@notafinance.de" 
              className="text-brand-900 hover:underline font-semibold text-lg"
            >
              admin@notafinance.de
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
