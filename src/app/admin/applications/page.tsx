import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/Badge";
import { SERVICES_CONFIG } from "@/config/services";
import { Search, Filter, Eye, Clock } from "lucide-react";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: { status?: string; serviceId?: string; search?: string };
}) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const selectedStatus = searchParams.status || "ALL";
  const selectedService = searchParams.serviceId || "ALL";
  const searchQuery = searchParams.search || "";

  const where: any = {};
  if (selectedStatus !== "ALL") {
    where.status = selectedStatus;
  }
  if (selectedService !== "ALL") {
    where.serviceId = selectedService;
  }
  if (searchQuery) {
    where.OR = [
      { applicationNumber: { contains: searchQuery } },
      { user: { name: { contains: searchQuery } } },
      { user: { email: { contains: searchQuery } } },
      { service: { name: { contains: searchQuery } } },
    ];
  }

  const applications = await prisma.application.findMany({
    where,
    include: {
      user: { select: { name: true, email: true, phone: true } },
      service: { select: { name: true, category: true } },
      documents: true,
    },
    orderBy: { submittedAt: "desc" },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Application Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review, approve, or reject submitted government service applications.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs">

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {["ALL", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"].map((st) => (
              <Link
                key={st}
                href={`/admin/applications?status=${st}${selectedService !== "ALL" ? `&serviceId=${selectedService}` : ""}${searchQuery ? `&search=${searchQuery}` : ""}`}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedStatus === st
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st === "ALL" ? "All Statuses" : st.replace("_", " ")}
              </Link>
            ))}
          </div>

          <form className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search ID, citizen or service..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 outline-none text-xs"
            />
          </form>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                  <th className="p-4">Application ID</th>
                  <th className="p-4">Citizen Name</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No applications found matching criteria.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-blue-700">
                        {app.applicationNumber}
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{app.user.name}</span>
                        <span className="text-[11px] text-slate-500 block">{app.user.email}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800 block">{app.service.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {app.service.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
