import React from "react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { SERVICES_CONFIG } from "@/config/services";
import { Layers, FileText } from "lucide-react";

export default async function AdminServicesPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const services = SERVICES_CONFIG;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Services Registry</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Active configuration for all 30 pre-loaded government digital services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  {s.category}
                </span>
                <span className="text-[11px] text-slate-400">⏱️ {s.processingDays} Days</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{s.name}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Docs required: {s.requiredDocuments.length}</span>
                <span className="font-semibold text-slate-800">{s.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
