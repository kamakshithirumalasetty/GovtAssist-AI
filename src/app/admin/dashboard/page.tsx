import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/Badge";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Shield,
  ArrowRight,
  TrendingUp,
  Layers
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const totalApps = await prisma.application.count();
  const pendingApps = await prisma.application.count({
    where: { OR: [{ status: "SUBMITTED" }, { status: "UNDER_REVIEW" }] }
  });
  const approvedApps = await prisma.application.count({ where: { status: "APPROVED" } });
  const rejectedApps = await prisma.application.count({ where: { status: "REJECTED" } });
  const totalCitizens = await prisma.user.count({ where: { role: "CITIZEN" } });

  const recentSubmissions = await prisma.application.findMany({
    include: {
      user: { select: { name: true, email: true } },
      service: { select: { name: true, category: true } }
    },
    orderBy: { submittedAt: "desc" },
    take: 6
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">

        {/* Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded uppercase">
                Administrator
              </span>
              <span className="text-xs text-slate-400">System ID: {session.userId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">Executive Review Dashboard</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live metrics across 30 government digital services and citizen submissions.
            </p>
          </div>

          <Link
            href="/admin/applications?status=UNDER_REVIEW"
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Clock className="w-4 h-4" /> Review Pending ({pendingApps})
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Applications</span>
            <div className="flex items-center justify-between mt-2">
              <p className="text-3xl font-black text-slate-900">{totalApps}</p>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending Review</span>
            <div className="flex items-center justify-between mt-2">
              <p className="text-3xl font-black text-amber-600">{pendingApps}</p>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Approved</span>
            <div className="flex items-center justify-between mt-2">
              <p className="text-3xl font-black text-emerald-600">{approvedApps}</p>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Rejected</span>
            <div className="flex items-center justify-between mt-2">
              <p className="text-3xl font-black text-rose-600">{rejectedApps}</p>
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Total Citizens</span>
            <div className="flex items-center justify-between mt-2">
              <p className="text-3xl font-black text-purple-600">{totalCitizens}</p>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* Status Distribution Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Applications Pending Action Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Recent Applications Submitted</h2>
              <Link href="/admin/applications" className="text-xs font-bold text-blue-600 hover:underline">
                View All Applications
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentSubmissions.map((app) => (
                <div key={app.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{app.applicationNumber}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="font-semibold text-slate-800 mt-1">{app.service.name}</p>
                    <p className="text-slate-500">Applicant: {app.user.name} ({app.user.email})</p>
                  </div>

                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors shrink-0"
                  >
                    Inspect & Review
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Service Statistics Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              Application Breakdown
            </h2>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Approved Rate</span>
                  <span className="font-bold text-emerald-600">
                    {totalApps > 0 ? Math.round((approvedApps / totalApps) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${totalApps > 0 ? (approvedApps / totalApps) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Pending Action</span>
                  <span className="font-bold text-amber-600">
                    {totalApps > 0 ? Math.round((pendingApps / totalApps) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${totalApps > 0 ? (pendingApps / totalApps) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Rejection Rate</span>
                  <span className="font-bold text-rose-600">
                    {totalApps > 0 ? Math.round((rejectedApps / totalApps) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: `${totalApps > 0 ? (rejectedApps / totalApps) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-600">
              <span className="font-bold text-slate-800 block">30 Active Service Schemas</span>
              <span>All 30 services available for online citizen application and document uploads.</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
