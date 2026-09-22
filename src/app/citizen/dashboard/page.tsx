import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import {
  Bot,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  ArrowRight,
  UserCheck
} from "lucide-react";

export default async function CitizenDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/citizen/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  const applications = await prisma.application.findMany({
    where: { userId: session.userId },
    include: { service: true },
    orderBy: { submittedAt: "desc" }
  });

  const totalApps = applications.length;
  const pendingApps = applications.filter((a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW").length;
  const approvedApps = applications.filter((a) => a.status === "APPROVED").length;
  const rejectedApps = applications.filter((a) => a.status === "REJECTED").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Citizen Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Welcome back, {user?.name || session.name}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage your digital government applications, check tracking status, or ask our AI assistant.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/citizen/assistant"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-amber-300" /> Ask AI Assistant
          </Link>
          <Link
            href="/services"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Apply New Service
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Applications</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalApps}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending Review</span>
            <p className="text-3xl font-black text-amber-600 mt-1">{pendingApps}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Approved</span>
            <p className="text-3xl font-black text-emerald-600 mt-1">{approvedApps}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Rejected</span>
            <p className="text-3xl font-black text-rose-600 mt-1">{rejectedApps}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Section: Quick Assistant Banner + Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Applications List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
            <Link href="/citizen/applications" className="text-xs font-bold text-blue-600 hover:underline">
              View All ({totalApps})
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No applications submitted yet</h3>
              <p className="text-xs text-slate-500">Explore available services to get started.</p>
              <Link
                href="/services"
                className="inline-block px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Explore Services
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{app.service.name}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>ID: <strong className="font-mono text-slate-700">{app.applicationNumber}</strong></span>
                      <span>Date: {new Date(app.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    href={`/citizen/track?id=${app.applicationNumber}`}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    Track Status <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Assistant Callout Box */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-amber-300" />
              <h3 className="font-bold text-base">Ask AI Assistant</h3>
            </div>
            <p className="text-xs text-blue-200 leading-relaxed">
              Need help understanding eligibility or documents for any of the 30 government services? Ask our instant conversational assistant.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <Link
                href="/citizen/assistant?q=How%20can%20I%20apply%20for%20a%20PAN%20Card?"
                className="block p-2.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors"
              >
                💬 “How can I apply for a PAN Card?”
              </Link>
              <Link
                href="/citizen/assistant?q=I%20need%20a%20new%20Driving%20Licence"
                className="block p-2.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors"
              >
                💬 “I need a new Driving Licence”
              </Link>
              <Link
                href="/citizen/assistant?q=How%20to%20apply%20for%20Student%20Scholarship?"
                className="block p-2.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors"
              >
                💬 “How to apply for Student Scholarship?”
              </Link>
            </div>
            <Link
              href="/citizen/assistant"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl text-center block shadow-md transition-all mt-2"
            >
              Open Full Chat Assistant
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
