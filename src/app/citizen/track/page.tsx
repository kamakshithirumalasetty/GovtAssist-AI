"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  User,
  Building2,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [appIdInput, setAppIdInput] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<any | null>(null);

  useEffect(() => {
    if (initialId) {
      handleFetchApplication(initialId);
    }
  }, [initialId]);

  const handleFetchApplication = async (searchId: string) => {
    if (!searchId.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/applications/${encodeURIComponent(searchId.trim())}`);
      if (res.ok) {
        const json = await res.json();
        setApplicationData(json.application);
      } else {
        setApplicationData(null);
        toast.error("Application not found. Please check Application ID.");
      }
    } catch {
      toast.error("Error retrieving application details.");
    } finally {
      setLoading(false);
    }
  };

  const parsedFormData = applicationData?.formData
    ? typeof applicationData.formData === "string"
      ? JSON.parse(applicationData.formData)
      : applicationData.formData
    : {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-4 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Application Status Tracker</h1>
        <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
          Enter your unique Application ID (e.g. <strong className="font-mono text-amber-300">GOV-2026-000001</strong>) to view real-time verification timeline.
        </p>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFetchApplication(appIdInput);
          }}
          className="flex flex-col sm:flex-row items-center gap-2 max-w-xl pt-2"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={appIdInput}
              onChange={(e) => setAppIdInput(e.target.value)}
              placeholder="Enter Application ID (GOV-2026-XXXXXX)..."
              className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 font-mono font-bold text-sm rounded-xl focus:ring-2 focus:ring-amber-400 outline-none shadow-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all shrink-0"
          >
            {loading ? "Searching..." : "Track Application"}
          </button>
        </form>
      </div>

      {/* Application Tracking View */}
      {applicationData ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8">

          {/* Title Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-extrabold text-blue-800 bg-blue-50 px-3 py-1 rounded-lg">
                  {applicationData.applicationNumber}
                </span>
                <StatusBadge status={applicationData.status} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{applicationData.service.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Submitted by: {applicationData.user.name}</p>
            </div>

            <div className="text-xs text-slate-500 text-left sm:text-right">
              <div>Submitted: <strong className="text-slate-800">{new Date(applicationData.submittedAt).toLocaleDateString()}</strong></div>
              <div>Last Updated: <strong className="text-slate-800">{new Date(applicationData.updatedAt).toLocaleDateString()}</strong></div>
            </div>
          </div>

          {/* Interactive Status Timeline */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Live Progress Timeline
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">

              {/* Step 1: Created & Submitted */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Application Submitted</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Application dossier registered into central queue on {new Date(applicationData.submittedAt).toLocaleDateString()}.
                  </p>
                </div>
              </div>

              {/* Step 2: Under Review */}
              <div className="relative flex items-start gap-3">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] ${
                    applicationData.status !== "SUBMITTED"
                      ? "bg-emerald-500"
                      : "bg-amber-500 animate-pulse"
                  }`}
                >
                  {applicationData.status !== "SUBMITTED" ? "✓" : "•"}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Document & Identity Verification</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {applicationData.status === "SUBMITTED"
                      ? "Queued for administrative scrutiny."
                      : "Identity proofs and uploaded documents reviewed by officer."}
                  </p>
                </div>
              </div>

              {/* Step 3: Final Approval / Rejection */}
              <div className="relative flex items-start gap-3">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] ${
                    applicationData.status === "APPROVED"
                      ? "bg-emerald-500"
                      : applicationData.status === "REJECTED"
                      ? "bg-rose-500"
                      : "bg-slate-300"
                  }`}
                >
                  {applicationData.status === "APPROVED"
                    ? "✓"
                    : applicationData.status === "REJECTED"
                    ? "✕"
                    : "3"}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {applicationData.status === "APPROVED"
                      ? "Application Approved"
                      : applicationData.status === "REJECTED"
                      ? "Application Rejected"
                      : "Final Determination"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {applicationData.status === "APPROVED"
                      ? "Official certificate generated and approved."
                      : applicationData.status === "REJECTED"
                      ? "Application rejected due to document or eligibility discrepancy."
                      : "Pending final review decision."}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Rejection Notice Box if Rejected */}
          {applicationData.status === "REJECTED" && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-2 text-rose-900">
              <div className="flex items-center gap-2 font-bold text-rose-700 text-sm">
                <XCircle className="w-5 h-5" /> Application Rejection Reason
              </div>
              <p className="leading-relaxed bg-white p-3 rounded-xl border border-rose-100">
                {applicationData.rejectionReason || "Required supporting documents could not be verified."}
              </p>
            </div>
          )}

          {/* Form Fields Summary Drawer */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Submitted Form Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(parsedFormData).map(([k, v]) => (
                <div key={k} className="border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, " $1")}: </span>
                  <span className="font-semibold text-slate-900">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : initialId ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
          No application details retrieved for ID: <strong>{initialId}</strong>
        </div>
      ) : null}
    </div>
  );
}

export default function ApplicationTrackingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Application Tracker...</div>}>
        <TrackContent />
      </Suspense>
    </div>
  );
}
