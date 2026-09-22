import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import {
  FileText,
  Search,
  Filter,
  ArrowRight,
  Plus,
  Clock,
  ExternalLink
} from "lucide-react";

export default async function MyApplicationsPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/citizen/login");
  }

  const selectedStatus = searchParams.status || "ALL";
  const searchQuery = searchParams.search || "";

  const whereCondition: any = { userId: session.userId };
  if (selectedStatus !== "ALL") {
    whereCondition.status = selectedStatus;
  }
  if (searchQuery) {
    whereCondition.OR = [
      { applicationNumber: { contains: searchQuery } },
      { service: { name: { contains: searchQuery } } },
    ];
  }

  const applications = await prisma.application.findMany({
    where: whereCondition,
    include: { service: true, documents: true },
    orderBy: { submittedAt: "desc" },
  });

  const statuses = ["ALL", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Applications</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage and track all your submitted government service applications.
          </p>
        </div>
        <Link
          href="/services"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Apply for New Service
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <Link
              key={st}
              href={`/citizen/applications?status=${st}${searchQuery ? `&search=${searchQuery}` : ""}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedStatus === st
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "ALL" ? "All Applications" : st.replace("_", " ")}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search by ID or service..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </form>
      </div>

      {/* Applications Cards Grid */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No applications found</h3>
          <p className="text-xs text-slate-500">
            {selectedStatus !== "ALL" || searchQuery
              ? "No applications match your selected filter criteria."
              : "You haven't submitted any service applications yet."}
          </p>
          <Link
            href="/services"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl mt-2"
          >
            Browse 30 Services
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-card p-5 glass-card-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {app.applicationNumber}
                  </span>
                  <StatusBadge status={app.status} />
                </div>

                <h3 className="font-bold text-base text-slate-900">{app.service.name}</h3>

                <div className="text-xs text-slate-500 space-y-1">
                  <div>Category: <span className="text-slate-800 font-medium">{app.service.category}</span></div>
                  <div>Submitted: <span className="text-slate-800 font-medium">{new Date(app.submittedAt).toLocaleDateString()}</span></div>
                  <div>Attached Docs: <span className="text-slate-800 font-medium">{app.documents.length} File(s)</span></div>
                </div>

                {app.status === "REJECTED" && app.rejectionReason && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                    <span className="font-bold block">Rejection Reason:</span>
                    <span className="mt-0.5 block leading-normal">{app.rejectionReason}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Updated: {new Date(app.updatedAt).toLocaleDateString()}
                </span>
                <Link
                  href={`/citizen/track?id=${app.applicationNumber}`}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1"
                >
                  Track <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
