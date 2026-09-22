"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ServiceConfig,
  FormFieldConfig,
  RequiredDocumentConfig
} from "@/config/services";
import {
  CheckCircle,
  FileText,
  Upload,
  Trash2,
  Eye,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Building2,
  FileCheck,
  Search
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { StatusBadge } from "../ui/Badge";

interface UploadedDoc {
  documentType: string;
  fileName: string;
  fileSize?: number;
  fileUrl: string;
}

export function DynamicApplicationForm({ service, prefillUser }: { service: ServiceConfig; prefillUser?: any }) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form field state prefilled if user profile available
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    service.formFields.forEach((field) => {
      if (prefillUser) {
        if (field.id === "fullName" || field.id === "applicantName" || field.id === "studentName" || field.id === "farmerName" || field.id === "ownerName" || field.id === "headOfFamily") {
          initial[field.id] = prefillUser.name || "";
        } else if (field.id === "email") {
          initial[field.id] = prefillUser.email || "";
        } else if (field.id === "mobile" || field.id === "phone") {
          initial[field.id] = prefillUser.phone || "";
        } else if (field.id === "dob") {
          initial[field.id] = prefillUser.dateOfBirth || "";
        } else if (field.id === "gender") {
          initial[field.id] = prefillUser.gender || "Male";
        } else if (field.id === "address") {
          initial[field.id] = prefillUser.address || "";
        } else if (field.id === "state") {
          initial[field.id] = prefillUser.state || "";
        } else if (field.id === "district") {
          initial[field.id] = prefillUser.district || "";
        } else if (field.id === "pincode") {
          initial[field.id] = prefillUser.pincode || "";
        } else {
          initial[field.id] = "";
        }
      } else {
        initial[field.id] = "";
      }
    });
    return initial;
  });

  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);

  const [declaration, setDeclaration] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleFileUpload = async (docConfig: RequiredDocumentConfig, file: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadingDocId(docConfig.id);
    const data = new FormData();
    data.append("file", file);
    data.append("documentType", docConfig.name);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const json = await res.json();
        setDocuments((prev) => [
          ...prev.filter((d) => d.documentType !== docConfig.name),
          {
            documentType: docConfig.name,
            fileName: json.fileName,
            fileSize: json.fileSize,
            fileUrl: json.fileUrl,
          },
        ]);
        toast.success(`${docConfig.name} uploaded successfully!`);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to upload document");
      }
    } catch {
      toast.error("Error uploading file");
    } finally {
      setUploadingDocId(null);
    }
  };

  const removeDocument = (docName: string) => {
    setDocuments((prev) => prev.filter((d) => d.documentType !== docName));
    toast.info(`Removed document`);
  };

  const validateStep2 = () => {
    for (const field of service.formFields) {
      if (field.required && (!formData[field.id] || String(formData[field.id]).trim() === "")) {
        toast.error(`Please fill in required field: ${field.label}`);
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    for (const reqDoc of service.requiredDocuments) {
      if (reqDoc.required && !documents.some((d) => d.documentType === reqDoc.name)) {
        toast.error(`Please upload mandatory document: ${reqDoc.name}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmitApplication = async () => {
    if (!declaration) {
      toast.error("Please confirm the legal accuracy declaration before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          formData,
          documents,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedData(data);
        setStep(5); // Success step
        toast.success("Application submitted successfully!");
      } else {
        const err = await res.json();
        toast.error(err.error || "Application submission failed.");
      }
    } catch {
      toast.error("An error occurred during application submission.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-8">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider mb-2">
              {service.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{service.name}</h1>
            <p className="text-sm text-blue-200 mt-1 max-w-xl">{service.description}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-xs text-right shrink-0">
            <div>Processing Time: <span className="font-bold text-amber-300">{service.processingDays} Days</span></div>
            <div>Govt Fee: <span className="font-bold text-emerald-400">{service.fee}</span></div>
          </div>
        </div>

        {/* Step Progression Bar */}
        {step < 5 && (
          <div className="grid grid-cols-4 gap-2 mt-8 pt-6 border-t border-white/10 text-xs">
            <div className={`flex items-center gap-2 pb-1 border-b-2 font-medium ${step >= 1 ? "border-amber-400 text-amber-300 font-bold" : "border-white/20 text-white/50"}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>Overview</span>
            </div>
            <div className={`flex items-center gap-2 pb-1 border-b-2 font-medium ${step >= 2 ? "border-amber-400 text-amber-300 font-bold" : "border-white/20 text-white/50"}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>Application Details</span>
            </div>
            <div className={`flex items-center gap-2 pb-1 border-b-2 font-medium ${step >= 3 ? "border-amber-400 text-amber-300 font-bold" : "border-white/20 text-white/50"}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>Upload Documents</span>
            </div>
            <div className={`flex items-center gap-2 pb-1 border-b-2 font-medium ${step >= 4 ? "border-amber-400 text-amber-300 font-bold" : "border-white/20 text-white/50"}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">4</span>
              <span>Review & Submit</span>
            </div>
          </div>
        )}
      </div>

      {/* Step 1: Overview & Guidelines */}
      {step === 1 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm space-y-2">
            <h3 className="font-bold text-blue-900 flex items-center gap-2 text-base">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Eligibility Criteria
            </h3>
            <p className="text-slate-700">{service.eligibility}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Checklist of Mandatory Documents Required:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.requiredDocuments.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3 text-xs">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">{doc.name}</span>
                    <span className="text-slate-500 block leading-normal mt-0.5">{doc.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <Link href="/services" className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Start Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Dynamic Form Fields */}
      {step === 2 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Enter Application Information</h2>
            <span className="text-xs text-slate-500">* Indicates required field</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {service.formFields.map((field) => (
              <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>

                {field.type === "select" ? (
                  <select
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                  >
                    <option value="">Select option...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Continue to Document Upload <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Document Upload */}
      {step === 3 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 3: Upload Required Documents</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Supported formats: PDF, JPG, JPEG, PNG (Max 5MB per document)
            </p>
          </div>

          <div className="space-y-4">
            {service.requiredDocuments.map((docConfig) => {
              const uploaded = documents.find((d) => d.documentType === docConfig.name);
              const isUploading = uploadingDocId === docConfig.id;

              return (
                <div
                  key={docConfig.id}
                  className={`p-4 rounded-xl border transition-all ${
                    uploaded ? "bg-emerald-50/60 border-emerald-300" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">{docConfig.name}</span>
                        {docConfig.required && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{docConfig.description}</p>
                    </div>

                    <div>
                      {uploaded ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            {uploaded.fileName}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeDocument(docConfig.name)}
                            className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                            title="Remove document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer px-4 py-2 bg-white hover:bg-blue-50 border border-blue-300 text-blue-700 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          {isUploading ? "Uploading..." : "Choose File"}
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(docConfig, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => {
                if (validateStep3()) setStep(4);
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Review Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Preview & Legal Declaration */}
      {step === 4 && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 4: Review Your Details & Submit</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Please verify all entries carefully before final submission.
            </p>
          </div>

          {/* Form Fields Summary */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
              Application Fields Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {service.formFields.map((field) => (
                <div key={field.id} className="border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 block">{field.label}:</span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {formData[field.id] || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Documents Summary */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
              Attached Documents ({documents.length})
            </h3>
            <div className="space-y-2">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-800">{doc.documentType}</span>
                  <span className="text-emerald-700 font-semibold">{doc.fileName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Declaration Checkbox */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={declaration}
                onChange={(e) => setDeclaration(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-amber-900 leading-relaxed font-medium">
                I confirm that the information provided by me is accurate and true to the best of my knowledge. I acknowledge that this digital application operates as a demo government-tech submission.
              </span>
            </label>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Edit Details
            </button>

            <button
              onClick={handleSubmitApplication}
              disabled={!declaration || submitting}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Submission Success Confirmation */}
      {step === 5 && submittedData && (
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              Submission Successful
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Application Submitted Successfully</h2>
            <p className="text-sm text-slate-600 mt-1">
              Your application has been received and registered under official demo reference.
            </p>
          </div>

          {/* Application Number Box */}
          <div className="max-w-md mx-auto p-6 bg-slate-900 text-white rounded-2xl shadow-xl space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400">Application ID</span>
              <span className="text-lg font-black text-amber-400 font-mono tracking-wider">
                {submittedData.applicationNumber}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Service</span>
              <span className="font-semibold text-white">{submittedData.serviceName}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Submission Date</span>
              <span className="text-slate-300">{new Date(submittedData.submittedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400">Initial Status</span>
              <StatusBadge status={submittedData.status} />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/citizen/track?id=${submittedData.applicationNumber}`}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> Track Status Live
            </Link>
            <Link
              href="/citizen/applications"
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all"
            >
              View My Applications
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
