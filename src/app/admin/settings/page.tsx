import React from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Settings, Shield, Key, Database, Cpu } from "lucide-react";

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-black text-slate-900">System Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Environment configuration and demo system status.
          </p>
        </div>

        <div className="max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Demo Administrator Environment</h3>
              <p className="text-slate-500">Configured via environment variables / seeded DB</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Admin Account</span>
              <span className="font-mono font-bold text-slate-900">admin@govassist.demo</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Database Engine</span>
              <span className="font-mono text-blue-700 font-bold">SQLite / Prisma ORM</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Services Count</span>
              <span className="font-bold text-emerald-600">30 Services Pre-loaded</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Document Upload Mode</span>
              <span className="font-bold text-purple-600">Base64 Encoded Local Sandbox</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
