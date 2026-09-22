"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  FileText,
  User,
  ShieldAlert,
  Building2,
  Eye,
  Clock,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";

export default function AdminApplicationReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<any | null>(null);

  // Modals state
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplicationDetails();
  }, [params.id]);

  const fetchApplicationDetails = async () => {
    try {
      const res = await fetch(`/api/applications/${params.id}`);
      if (res.ok) {
        const json = await res.json();
        setApplication(json.application);
      } else {
        toast.error("Application not found.");
      }
    } catch {
      toast.error("Error retrieving application details.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setProcessing(true);
    try {
      const res = await fetch(`/api/applications/${params.id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "APPROVED" }),
      });

      if (res.ok) {
        toast.success("Application APPROVED successfully!");
        setShowApproveModal(false);
        fetchApplicationDetails();
      } else {
        const err = await res.json();
        toast.error(err.error || "Approval failed.");
      }
    } catch {
      toast.error("Error approving application.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim() || rejectionReason.trim().length < 5) {
      toast.error("Please enter a valid rejection reason (minimum 5 characters).");
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch(`/api/applications/${params.id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "REJECTED", rejectionReason }),
      });

      if (res.ok) {
        toast.success("Application REJECTED with feedback reason.");
        setShowRejectModal(false);
        fetchApplicationDetails();
      } else {
        const err = await res.json();
        toast.error(err.error || "Rejection failed.");
      }
    } catch {
      toast.error("Error rejecting application.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-slate-500">Loading application dossier...</div>;
  }

  if (!application) {
    return (
      <div className="p-12 text-center text-xs text-slate-500">
        Application record not found.
      </div>
    );
  }

  const parsedFormData = application.formData
    ? typeof application.formData === "string"
      ? JSON.parse(application.formData)
      : application.formData
    : {};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/applications"
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Applications
        </Link>
        <StatusBadge status={application.status} />
      </div>

      {/* Header Info */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
            {application.applicationNumber}
          </span>
          <h1 className="text-2xl font-black text-white mt-2">{application.service.name}</h1>
          <p className="text-xs text-slate-400 mt-0.5">Submitted: {new Date(application.submittedAt).toLocaleString()}</p>
        </div>

        {/* Action buttons at top if not decided */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowApproveModal(true)}
            disabled={application.status === "APPROVED"}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Approve Application
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={application.status === "REJECTED"}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" /> Reject Application
          </button>
        </div>
      </div>

      {/* Rejection notice if already rejected */}
      {application.status === "REJECTED" && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-1 text-rose-900">
          <span className="font-bold flex items-center gap-1 text-rose-700">
            <XCircle className="w-4 h-4" /> Previously Rejected
          </span>
          <p className="bg-white p-3 rounded-xl border border-rose-100">{application.rejectionReason}</p>
        </div>
      )}

      {/* Grid: Citizen Profile & Form Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Citizen Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" /> Applicant Information
          </h3>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-500 block">Name:</span>
              <span className="font-bold text-slate-900 block">{application.user.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email:</span>
              <span className="font-semibold text-slate-800 block">{application.user.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Mobile:</span>
              <span className="font-semibold text-slate-800 block">{application.user.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Address:</span>
              <span className="text-slate-700 block">{application.user.address}, {application.user.district}, {application.user.state} - {application.user.pincode}</span>
            </div>
          </div>
        </div>

        {/* Form Fields Data */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Submitted Form Fields
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {Object.entries(parsedFormData).map(([k, v]) => (
              <div key={k} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px] capitalize">{k.replace(/([A-Z])/g, " $1")}:</span>
                <span className="font-bold text-slate-900 block mt-0.5">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Uploaded Documents */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
          Uploaded Documents Verification ({application.documents.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {application.documents.map((doc: any) => (
            <div key={doc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{doc.documentType}</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">{doc.fileName}</span>
              </div>

              {doc.fileUrl && (
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Audit Actions Trail */}
      {application.adminActions && application.adminActions.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <h4 className="font-bold text-slate-700 uppercase tracking-wider">Administrative Action History</h4>
          <div className="space-y-2">
            {application.adminActions.map((act: any) => (
              <div key={act.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{act.action}</span> by {act.admin?.name || "Admin"}
                  {act.reason && <p className="text-slate-600 mt-0.5">Note: {act.reason}</p>}
                </div>
                <span className="text-slate-400 text-[10px]">{new Date(act.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal: APPROVE */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-lg text-slate-900">Approve Application?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to approve application <strong className="font-mono">{application.applicationNumber}</strong> for {application.user.name}?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={processing}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                {processing ? "Approving..." : "Confirm Approval"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal: REJECT */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-lg text-slate-900">Reject Application</h3>
              <p className="text-xs text-slate-500">
                Please provide the mandatory rejection reason so the citizen can rectify their submission.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rejection Reason *</label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Uploaded income certificate is expired. Please upload a valid current certificate."
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={processing || !rejectionReason.trim()}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
              >
                {processing ? "Rejecting..." : "Reject Application"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
