"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle, Mail, RefreshCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { FormError, FormErrorSummary } from "@/components/FormError";
import { useToast } from "@/components/Toast";
import { analyzeError, logError, withRetry, getSupportMessage } from "@/lib/errors";

interface UploadedFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error" | "retrying";
  error?: string;
  retryCount?: number;
}

interface FormErrors {
  email?: string;
  files?: string;
  agb?: string;
  submit?: string;
}

export default function UploadForm() {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [acceptAGB, setAcceptAGB] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const toast = useToast();
  const successRef = useRef<HTMLDivElement>(null);

  // Email validation - comprehensive check
  const validateEmail = (email: string): { valid: boolean; error?: string } => {
    if (!email || email.trim() === "") {
      return { valid: false, error: "Bitte geben Sie Ihre E-Mail-Adresse ein." };
    }

    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: "Ungültiges E-Mail-Format." };
    }

    // Check for common typos in domains
    const commonDomainTypos: Record<string, string> = {
      "gmial.com": "gmail.com",
      "gmal.com": "gmail.com",
      "gamil.com": "gmail.com",
      "gmil.com": "gmail.com",
      "gmaill.com": "gmail.com",
      "hotmal.com": "hotmail.com",
      "hotmai.com": "hotmail.com",
      "outlok.com": "outlook.com",
      "outloo.com": "outlook.com",
      "yahooo.com": "yahoo.com",
      "yahho.com": "yahoo.com",
    };

    const domain = email.split("@")[1]?.toLowerCase();
    if (domain && commonDomainTypos[domain]) {
      return { 
        valid: false, 
        error: `Meinten Sie ...@${commonDomainTypos[domain]}?` 
      };
    }

    // Check for valid TLD (at least 2 characters)
    const tld = domain?.split(".").pop();
    if (!tld || tld.length < 2) {
      return { valid: false, error: "Ungültige Domain-Endung." };
    }

    // Check for disposable/temporary email domains
    const disposableDomains = [
      "tempmail.com", "throwaway.com", "mailinator.com", "guerrillamail.com",
      "10minutemail.com", "temp-mail.org", "fakeinbox.com", "trashmail.com"
    ];
    if (domain && disposableDomains.includes(domain)) {
      return { valid: false, error: "Bitte verwenden Sie keine Wegwerf-E-Mail-Adresse." };
    }

    return { valid: true };
  };

  // Legacy helper for simple checks
  const isValidEmail = (email: string) => validateEmail(email).valid;

  // Handle email change with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    clearError("email");
    
    // Validate on change if user has already typed something
    if (value.length > 0) {
      const validation = validateEmail(value);
      if (!validation.valid && value.includes("@")) {
        // Only show error after @ is typed to avoid premature errors
        setErrors((prev) => ({ ...prev, email: validation.error }));
      }
    }
  };

  // Validate email on blur (when user leaves the field)
  const handleEmailBlur = () => {
    if (email.length > 0) {
      const validation = validateEmail(email);
      if (!validation.valid) {
        setErrors((prev) => ({ ...prev, email: validation.error }));
      }
    }
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

    // Reset success state when user starts new upload
    if (submitSuccess) {
      setSubmitSuccess(false);
    }

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
    clearError("files");
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

  // Upload a single file to Supabase with retry logic
  // Returns the generated filename on success, null on failure
  const uploadSingleFile = async (uploadedFile: UploadedFile, userEmail: string): Promise<string | null> => {
    const fileExt = uploadedFile.file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // Step 1: Upload file to Storage
      await withRetry(
        async () => {
          const { error: uploadError } = await supabase.storage
            .from("invoices")
            .upload(filePath, uploadedFile.file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            throw uploadError;
          }
        },
        {
          maxAttempts: 3,
          baseDelay: 1000,
          onRetry: (attempt) => {
            // Update UI to show retry status
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, status: "retrying", retryCount: attempt }
                  : f
              )
            );
            toast.info(
              `Erneuter Versuch (${attempt}/3)`,
              `Upload von "${uploadedFile.file.name}" wird wiederholt...`
            );
          },
        }
      );

      // Step 2: Save metadata to database (only if storage upload succeeded)
      const { error: dbError } = await supabase
        .from("uploads")
        .insert({
          email: userEmail,
          filename: fileName,
        });

      if (dbError) {
        // Log database error but don't fail the upload
        // The file is already in storage, so we consider this a partial success
        logError("UploadForm.uploadSingleFile.dbInsert", dbError, {
          fileName,
          email: userEmail,
        });
        // Note: In production, you might want to implement a cleanup or retry mechanism
      }

      return fileName;
    } catch (error) {
      const errorDetails = analyzeError(error);
      logError("UploadForm.uploadSingleFile", error, {
        fileName: uploadedFile.file.name,
        fileSize: uploadedFile.file.size,
      });

      // Update file status with user-friendly error
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? { ...f, status: "error", error: errorDetails.userMessage }
            : f
        )
      );

      return null;
    }
  };

  // Retry a failed upload
  const retryUpload = async (fileId: string) => {
    const fileToRetry = files.find((f) => f.id === fileId);
    if (!fileToRetry || fileToRetry.status !== "error") return;

    // Reset to uploading status
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "uploading", error: undefined, retryCount: 0 } : f
      )
    );

    const uploadedFileName = await uploadSingleFile(fileToRetry, email);
    if (uploadedFileName) {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "success" } : f))
      );
      toast.success("Upload erfolgreich", `"${fileToRetry.file.name}" wurde hochgeladen.`);
    }
  };

  // Upload all files to Supabase (Storage + Database)
  const uploadFiles = async (): Promise<{ success: number; failed: number; filenames: string[] }> => {
    const validFiles = files.filter((f) => f.status === "pending");
    let successCount = 0;
    let failedCount = 0;
    const uploadedFilenames: string[] = [];

    for (const uploadedFile of validFiles) {
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id ? { ...f, status: "uploading" } : f
        )
      );

      const uploadedFileName = await uploadSingleFile(uploadedFile, email);
      
      if (uploadedFileName) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, status: "success" } : f
          )
        );
        successCount++;
        uploadedFilenames.push(uploadedFileName);
      } else {
        failedCount++;
      }
    }

    return { success: successCount, failed: failedCount, filenames: uploadedFilenames };
  };

  // Clear specific error when user starts typing/interacting
  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Validate form and return errors
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Use comprehensive email validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error;
    }

    if (files.length === 0) {
      newErrors.files = "Bitte laden Sie mindestens eine Datei hoch.";
    } else if (files.every((f) => f.status === "error")) {
      newErrors.files = "Alle hochgeladenen Dateien sind ungültig.";
    }

    if (!acceptAGB) {
      newErrors.agb = "Bitte akzeptieren Sie die AGB und Datenschutzerklärung.";
    }

    return newErrors;
  };

  // Handle form submission
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

    try {
      const result = await uploadFiles();
      
      // Handle results based on success/failure counts
      if (result.failed === 0 && result.success > 0) {
        // All files uploaded successfully
        setSubmitSuccess(true);
        setSuccessCount(result.success);
        setErrors({});
        
        // Reset form fields but keep success message visible
        setEmail("");
        setFiles([]);
        setAcceptAGB(false);
        
        // Scroll to success message (with offset for navbar)
        setTimeout(() => {
          if (successRef.current) {
            const navbarHeight = 80; // h-20 = 5rem = 80px
            const additionalOffset = 24; // Extra padding
            const elementPosition = successRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navbarHeight - additionalOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 150);
        
        toast.success(
          "Erfolgreich eingereicht!",
          `${result.success} ${result.success === 1 ? "Datei wurde" : "Dateien wurden"} hochgeladen. Sie erhalten eine Bestätigung per E-Mail.`
        );
        
        // Success message stays visible until user navigates away or uploads new files
      } else if (result.failed > 0 && result.success > 0) {
        // Partial success
        toast.error(
          "Teilweise erfolgreich",
          `${result.success} hochgeladen, ${result.failed} fehlgeschlagen. Klicken Sie auf "Erneut versuchen" bei den fehlerhaften Dateien.`
        );
      } else if (result.failed > 0 && result.success === 0) {
        // All failed
        const errorDetails = analyzeError(new Error("All uploads failed"));
        toast.error(
          "Upload fehlgeschlagen",
          `Alle Dateien konnten nicht hochgeladen werden. ${getSupportMessage()}`,
          {
            label: "Alle erneut versuchen",
            onClick: () => {
              // Reset failed files to pending and retry
              setFiles((prev) =>
                prev.map((f) =>
                  f.status === "error" ? { ...f, status: "pending", error: undefined } : f
                )
              );
            },
          }
        );
      }
    } catch (error) {
      logError("UploadForm.handleSubmit", error);
      const errorDetails = analyzeError(error);
      
      setErrors({ submit: errorDetails.userMessage });
      toast.error(
        "Fehler beim Einreichen",
        errorDetails.userMessage,
        errorDetails.isRetryable
          ? {
              label: "Erneut versuchen",
              onClick: () => handleSubmit(e),
            }
          : undefined
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {submitSuccess && (
        <div 
          ref={successRef}
          className="mb-8 relative overflow-hidden bg-gradient-to-br from-white via-white to-success/5 border border-success/40 rounded-2xl p-8 animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg shadow-success/10"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-success/10 to-transparent rounded-bl-full" />
          <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center shadow-md shadow-success/30">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          
          <div className="relative pr-16">
            <h3 className="text-lg font-bold text-success mb-3">
              Erfolgreich eingereicht!
            </h3>
            
            <p className="text-text-900/70 mb-6">
              {successCount === 1 
                ? "Ihr Fall wurde erfolgreich hochgeladen und wird jetzt von uns bearbeitet."
                : "Ihre Fälle wurden erfolgreich hochgeladen und werden jetzt von uns bearbeitet."
              }
            </p>
            
            {/* Next steps */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-text-900 uppercase tracking-wide">
                Nächste Schritte
              </p>
              <div className="grid gap-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-text-900/70">Wir prüfen Ihre Unterlagen und melden uns bei Rückfragen</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-text-900/70">Wir senden Ihnen eine Bestätigungs-E-Mail mit eindeutigem Aktenzeichen</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-text-900/70">Wir starten den Inkassoprozess automatisch nach Prüfung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Summary */}
        {errors.submit && (
          <FormErrorSummary errors={[errors.submit]} />
        )}

        {/* Email Input - Compact Inline Layout */}
        <div className={`bg-gradient-to-br from-white to-surface-100/50 border-2 rounded-xl p-4 sm:p-5 ${
          errors.email ? "border-error/30" : "border-border-subtle"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label htmlFor="email" className="text-sm font-semibold text-text-900 whitespace-nowrap flex-shrink-0">
              Ihre E-Mail-Adresse
            </label>
            <div className="flex-1 relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={handleEmailBlur}
                className={`w-full px-4 py-2.5 bg-white border-2 rounded-lg focus:border-brand-900 focus:ring-2 focus:ring-focus-ring outline-none transition-all duration-300 text-base ${
                  errors.email ? "border-error" : "border-border-subtle"
                } ${!errors.email && email && isValidEmail(email) ? "pr-10" : ""}`}
                placeholder="ihre.email@beispiel.de"
              />
              {!errors.email && email && isValidEmail(email) && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
              )}
            </div>
          </div>
          <FormError message={errors.email} />
          {!errors.email && !email && (
            <p className="text-xs text-neutral-500 mt-2 sm:ml-[calc(theme(spacing.4)+140px)]">
              Sie erhalten die Bestätigung an diese Adresse.
            </p>
          )}
        </div>

        {/* File Upload Area - Compact */}
        <div className={`bg-gradient-to-br from-white to-surface-100/50 border-2 rounded-xl p-5 sm:p-6 ${
          errors.files ? "border-error/50" : "border-border-subtle"
        }`}>
          <h3 className="text-sm font-semibold text-text-900 mb-3">
            Dateien hochladen
          </h3>
          <FormError message={errors.files} />

          {/* Drag & Drop Zone - Compact */}
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-300
              ${isDragging 
                ? "border-brand-700/70 bg-brand-700/8" 
                : "border-border-subtle hover:border-brand-700/50"
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

            <Upload className="w-10 h-10 text-brand-700 mx-auto mb-3" />
            
            <h4 className="text-base sm:text-lg font-bold text-text-900 mb-1">
              Dateien hier ablegen
            </h4>
            
            <p className="text-sm text-neutral-500 mb-4">
              Formate: PDF, XRechnung, oder ZUGFeRD · Max. 10 MB pro Datei
            </p>

            <label
              htmlFor="fileInput"
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300
                ${email && isValidEmail(email)
                  ? "bg-brand-900 text-white hover:bg-brand-700 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  : "bg-surface-100 text-neutral-500 cursor-not-allowed"
                }
              `}
            >
              <Upload className="w-4 h-4" />
              Dateien auswählen
            </label>

            {!email && (
              <p className="text-xs text-neutral-500 mt-3">
                Bitte zuerst E-Mail-Adresse eingeben
              </p>
            )}
          </div>

          {/* Uploaded Files List - Compact */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-text-900">Hochgeladene Dateien:</h4>
              {files.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className={`flex items-center gap-2.5 p-3 bg-white border rounded-lg transition-all duration-300 ${
                    uploadedFile.status === "error"
                      ? "border-error/50 bg-error/5"
                      : uploadedFile.status === "success"
                      ? "border-success/50 bg-success/5"
                      : "border-border-subtle"
                  }`}
                >
                  <FileText className="w-6 h-6 text-brand-900 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-900 truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      {uploadedFile.status === "retrying" && uploadedFile.retryCount && (
                        <span className="ml-2 text-warning">
                          • Versuch {uploadedFile.retryCount}/3
                        </span>
                      )}
                    </p>
                    {uploadedFile.error && (
                      <p className="text-xs text-error mt-0.5">{uploadedFile.error}</p>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {uploadedFile.status === "pending" && (
                      <div className="w-5 h-5 border-2 border-border-subtle rounded-full" />
                    )}
                    {(uploadedFile.status === "uploading" || uploadedFile.status === "retrying") && (
                      <div className="w-5 h-5 border-2 border-brand-900 border-t-transparent rounded-full animate-spin" />
                    )}
                    {uploadedFile.status === "success" && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {uploadedFile.status === "error" && (
                      <AlertCircle className="w-5 h-5 text-error" />
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex-shrink-0 flex items-center gap-0.5">
                    {/* Retry Button for failed uploads */}
                    {uploadedFile.status === "error" && (
                      <button
                        type="button"
                        onClick={() => retryUpload(uploadedFile.id)}
                        className="p-1 hover:bg-surface-100 rounded transition-colors duration-300 text-brand-900"
                        title="Erneut versuchen"
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Remove Button */}
                    {(uploadedFile.status === "pending" || uploadedFile.status === "error") && (
                      <button
                        type="button"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="p-1 hover:bg-surface-100 rounded transition-colors duration-300"
                        title="Entfernen"
                      >
                        <X className="w-4 h-4 text-neutral-500" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AGB Checkbox - Compact */}
          <div className="mt-4 pt-4 border-t border-border-subtle">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="acceptAGB"
                checked={acceptAGB}
                onChange={(e) => {
                  setAcceptAGB(e.target.checked);
                  clearError("agb");
                }}
                className={`mt-0.5 w-4 h-4 text-brand-900 border-2 rounded focus:ring-2 focus:ring-focus-ring transition-all duration-300 flex-shrink-0 ${
                  errors.agb ? "border-error" : "border-border-subtle"
                }`}
              />
              <label htmlFor="acceptAGB" className="text-xs text-text-900/70 leading-relaxed">
                Ich akzeptiere die{" "}
                <a
                  href="/agb.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-900 hover:underline font-medium"
                >
                  Allgemeinen Geschäftsbedingungen (AGB)
                </a>{" "}
                inkl. der Vereinbarung zur Auftragsverarbeitung und die {" "}
                <a
                  href="/datenschutz.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-900 hover:underline font-medium"
                >
                  Datenschutzerklärung
                </a>
                .
              </label>
            </div>
            <FormError message={errors.agb} />
          </div>

          {/* Submit Button - Compact */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !email ||
                !isValidEmail(email) ||
                files.length === 0 ||
                !acceptAGB
              }
              className="w-full bg-brand-900 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-brand-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Wird eingereicht...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Jetzt einreichen
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Alternative Email Option - Compact */}
      <div className="mt-5 p-4 bg-surface-100/70 rounded-lg text-center border border-border-subtle">
        <p className="text-xs text-text-900/70">
          Alternativ können Sie Ihre Fälle auch per Mail einreichen: {" "}
          <a
            href="mailto:fall@notafinance.de"
            className="text-brand-900 hover:underline font-medium"
          >
            fall@notafinance.de 
          </a>
        </p>
      </div>
    </div>
  );
}
