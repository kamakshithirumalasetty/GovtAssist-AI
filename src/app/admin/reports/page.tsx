import React from "react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { BarChart3, TrendingUp, ShieldCheck, FileSpreadsheet } from "lucide-react";

export default async function AdminReportsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const actions = await prisma.adminAction.findMany({
    include: {
      admin: { select: { name: true } },
      application: { include: { service: true, user: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Reports & Audit Logs</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical record of administrative approval and rejection decisions.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            Audit Action Trail
          </h2>

          <div className="space-y-3 divide-y divide-slate-100">
            {actions.map((act) => (
              <div key={act.id} className="pt-3 first:pt-0 text-xs flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    act.action === "APPROVED" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {act.action}
                  </span>
                  <span className="font-semibold text-slate-800 ml-2">
                    {act.application.applicationNumber} ({act.application.service.name})
                  </span>
                  <p className="text-slate-600 mt-1">Applicant: {act.application.user.name}</p>
                  {act.reason && <p className="text-slate-500 italic mt-0.5">Note: {act.reason}</p>}
                </div>
                <span className="text-slate-400 text-[10px] shrink-0">
                  {new Date(act.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
