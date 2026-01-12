"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, Linkedin, AlertCircle, ChevronDown } from "lucide-react";

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
  agb?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({});

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Clear specific error
  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Validate form
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Bitte geben Sie den Firmennamen ein.";
    }

    if (!formData.email) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Bitte geben Sie eine Nachricht ein.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Die Nachricht sollte mindestens 10 Zeichen lang sein.";
    }

    if (!formData.acceptAGB) {
      newErrors.agb = "Bitte akzeptieren Sie die AGB und Datenschutzerklärung.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
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

    // Clear error for this field
    if (name in errors) {
      clearError(name as keyof FormErrors);
    }
  };

  // Inline error component
  const FormError = ({ message }: { message: string | undefined }) => {
    if (!message) return null;
    return (
      <p className="flex items-center gap-1.5 text-sm text-error mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        {message}
      </p>
    );
  };

  return (
    <main>
      {/* Hero Section - Exact Viewport Height (minus sticky navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-surface-100/30 to-brand-700/8 min-h-[calc(100dvh-5rem)] flex flex-col justify-center py-12 sm:py-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
          style={{ backgroundImage: "url('/Hero-SubSites.png')" }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl mb-6 sm:mb-8">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-900 mb-6 sm:mb-8 leading-tight">
              Ihre Kontaktanfrage
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-text-900/70 leading-relaxed">
              Vielen Dank für Ihr Interesse an unserem Service. Bitte füllen Sie die Informationen 
              aus und wir werden uns binnen 24h per Mail bei Ihnen melden.
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce-gentle">
            <ChevronDown className="w-6 h-6 text-brand-900" strokeWidth={2.5} />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          {isSuccess && (
            <div className="mb-8 bg-success/10 border-2 border-success/30 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-text-900 mb-1">
                  Vielen Dank für Ihre Nachricht!
                </h3>
                <p className="text-text-900/70">
                  Wir haben Ihre Kontaktanfrage erhalten und werden uns binnen 24 Stunden bei Ihnen melden.
                </p>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-white to-surface-100/50 border-2 border-border-subtle rounded-2xl p-8 space-y-6 hover:border-brand-700/30 transition-all duration-300">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-900 mb-2">
                  Name des Ansprechpartners *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300 ${
                    errors.name ? "border-error" : "border-border-subtle"
                  }`}
                  placeholder="Max Mustermann"
                />
                <FormError message={errors.name} />
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
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300 ${
                    errors.company ? "border-error" : "border-border-subtle"
                  }`}
                  placeholder="Musterfirma GmbH"
                />
                <FormError message={errors.company} />
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300 ${
                    errors.email ? "border-error" : "border-border-subtle"
                  }`}
                  placeholder="max@musterfirma.de"
                />
                <FormError message={errors.email} />
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
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300 resize-none ${
                    errors.message ? "border-error" : "border-border-subtle"
                  }`}
                  placeholder="Beschreiben Sie hier Ihr Anliegen..."
                />
                <FormError message={errors.message} />
              </div>

              {/* AGB Checkbox */}
              <div className="pt-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptAGB"
                    name="acceptAGB"
                    checked={formData.acceptAGB}
                    onChange={handleChange}
                    className={`mt-1 w-5 h-5 text-brand-900 border-2 rounded focus:ring-2 focus:ring-focus-ring transition-all duration-300 ${
                      errors.agb ? "border-error" : "border-border-subtle"
                    }`}
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
                <FormError message={errors.agb} />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-brand-900 hover:bg-brand-700 hover:border-brand-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
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
          <div className="mt-12 text-center space-y-6">
            <div>
              <p className="text-neutral-500 mb-4">Oder kontaktieren Sie uns direkt per E-Mail:</p>
              <a 
                href="mailto:service@notafinance.de" 
                className="text-brand-700 hover:text-brand-900 hover:underline font-semibold text-lg transition-colors duration-300"
              >
                service@notafinance.de
              </a>
            </div>
            
            <div className="pt-4 border-t border-border-subtle">
              <p className="text-neutral-500 mb-4">Folgen Sie uns auf LinkedIn:</p>
              <a 
                href="https://www.linkedin.com/company/nota-finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-700 hover:text-brand-900 hover:underline font-semibold text-lg transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
                Nota Finance auf LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
