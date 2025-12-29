"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

interface UploadedFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

export default function UploadForm() {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [acceptAGB, setAcceptAGB] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // File validation
  const isValidFile = (file: File): { valid: boolean; error?: string } => {
    const validTypes = ["application/pdf", "application/xml", "text/xml"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return { valid: false, error: "Nur PDF und XML Dateien sind erlaubt" };
    }

    if (file.size > maxSize) {
      return { valid: false, error: "Datei ist zu groß (max. 10MB)" };
    }

    return { valid: true };
  };

  // Handle file selection
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(selectedFiles).forEach((file) => {
      const validation = isValidFile(file);
      newFiles.push({
        id: uuidv4(),
        file,
        status: validation.valid ? "pending" : "error",
        error: validation.error,
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  // Handle drag and drop
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  }, []);

  // Remove file
  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Upload files to Supabase
  const uploadFiles = async () => {
    const validFiles = files.filter((f) => f.status === "pending");
    
    for (const uploadedFile of validFiles) {
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id ? { ...f, status: "uploading" } : f
        )
      );

      try {
        const fileExt = uploadedFile.file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("invoices")
          .upload(filePath, uploadedFile.file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Update status to success
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, status: "success" } : f
          )
        );
      } catch (error) {
        console.error("Upload error:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? { ...f, status: "error", error: "Upload fehlgeschlagen" }
              : f
          )
        );
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (files.length === 0) {
      alert("Bitte laden Sie mindestens eine Datei hoch.");
      return;
    }

    if (!acceptAGB) {
      alert("Bitte akzeptieren Sie die AGB.");
      return;
    }

    setIsSubmitting(true);

    try {
      await uploadFiles();
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setFiles([]);
        setAcceptAGB(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-green-900 mb-1">
              Erfolgreich eingereicht!
            </h3>
            <p className="text-green-700">
              Ihre Fälle wurden erfolgreich hochgeladen. Sie erhalten in Kürze eine 
              Bestätigungs-E-Mail mit Ihrem Aktenzeichen.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Input */}
        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-muted rounded-2xl p-8">
          <label htmlFor="email" className="block text-lg font-semibold text-primary mb-3">
            Ihre E-Mail-Adresse *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-4 bg-white border-2 border-muted rounded-lg focus:border-signal focus:ring-2 focus:ring-signal/20 outline-none transition-all duration-300 text-lg"
            placeholder="ihre.email@beispiel.de"
          />
          <p className="text-sm text-primary/60 mt-2">
            Ohne E-Mail-Adresse ist kein Upload möglich. Sie erhalten die Bestätigung an diese Adresse.
          </p>
        </div>

        {/* File Upload Area */}
        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-muted rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Dateien hochladen *
          </h3>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300
              ${isDragging 
                ? "border-signal bg-signal/10" 
                : "border-muted hover:border-signal hover:bg-slate-50"
              }
            `}
          >
            <input
              type="file"
              id="fileInput"
              multiple
              accept=".pdf,.xml"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              disabled={!email || !isValidEmail(email)}
            />

            <Upload className="w-16 h-16 text-muted mx-auto mb-4" />
            
            <h4 className="text-xl font-bold text-primary mb-2">
              Dateien hier ablegen oder auswählen
            </h4>
            
            <p className="text-primary/60 mb-6">
              Unterstützte Formate: PDF, XRechnung (XML), ZUGFeRD (XML/PDF)
              <br />
              Maximale Dateigröße: 10 MB pro Datei
            </p>

            <label
              htmlFor="fileInput"
              className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
                ${email && isValidEmail(email)
                  ? "bg-signal text-white hover:bg-signal/80 hover:shadow-lg cursor-pointer"
                  : "bg-muted text-primary/50 cursor-not-allowed"
                }
              `}
            >
              <Upload className="w-5 h-5" />
              Dateien auswählen
            </label>

            {!email && (
              <p className="text-sm text-primary/50 mt-4">
                Bitte geben Sie zuerst Ihre E-Mail-Adresse ein
              </p>
            )}
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-primary">Hochgeladene Dateien:</h4>
              {files.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className="flex items-center gap-3 p-4 bg-white border border-muted rounded-lg"
                >
                  <FileText className="w-8 h-8 text-signal flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-sm text-primary/50">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {uploadedFile.error && (
                      <p className="text-sm text-red-600 mt-1">{uploadedFile.error}</p>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {uploadedFile.status === "pending" && (
                      <div className="w-6 h-6 border-2 border-muted rounded-full" />
                    )}
                    {uploadedFile.status === "uploading" && (
                      <div className="w-6 h-6 border-2 border-signal border-t-transparent rounded-full animate-spin" />
                    )}
                    {uploadedFile.status === "success" && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {uploadedFile.status === "error" && (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  {/* Remove Button */}
                  {uploadedFile.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="flex-shrink-0 p-1 hover:bg-slate-100 rounded transition-colors duration-300"
                    >
                      <X className="w-5 h-5 text-primary/50" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* AGB Checkbox */}
          <div className="flex items-start gap-3 mt-6 pt-6 border-t border-muted">
            <input
              type="checkbox"
              id="acceptAGB"
              checked={acceptAGB}
              onChange={(e) => setAcceptAGB(e.target.checked)}
              required
              className="mt-1 w-5 h-5 text-signal border-2 border-muted rounded focus:ring-2 focus:ring-signal/20 transition-all duration-300"
            />
            <label htmlFor="acceptAGB" className="text-sm text-primary/70 leading-relaxed">
              Ich akzeptiere die{" "}
              <a
                href="/agb.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal hover:underline font-semibold"
              >
                Allgemeinen Geschäftsbedingungen (AGB)
              </a>{" "}
              und die{" "}
              <a
                href="/datenschutz.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal hover:underline font-semibold"
              >
                Datenschutzerklärung
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !email ||
                !isValidEmail(email) ||
                files.length === 0 ||
                !acceptAGB
              }
              className="w-full bg-signal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-signal/80 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Wird eingereicht...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Jetzt einreichen
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Alternative Email Option */}
      <div className="mt-8 p-6 bg-slate-100 rounded-xl text-center border border-muted">
        <Mail className="w-8 h-8 text-primary/60 mx-auto mb-3" />
        <p className="text-sm text-primary/70 mb-2">
          Sie können ihre Fälle natürlich auch per Mail einreichen.
        </p>
        <p className="text-sm">
          Senden Sie dazu einfach eine Mail an{" "}
          <a
            href="mailto:fall@notafinance.de"
            className="text-signal hover:underline font-semibold"
          >
            fall@notafinance.de
          </a>
        </p>
      </div>
    </div>
  );
}
