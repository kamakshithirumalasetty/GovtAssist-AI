import React from "react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Users, Mail, Phone, MapPin } from "lucide-react";

export default async function AdminCitizensPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const citizens = await prisma.user.findMany({
    where: { role: "CITIZEN" },
    include: {
      applications: { select: { id: true, status: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Registered Citizens Directory</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Overview of all registered citizen user accounts in the platform ({citizens.length}).
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase tracking-wider">
                <th className="p-4">Citizen Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Total Submissions</th>
                <th className="p-4">Registered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {citizens.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{c.name}</td>
                  <td className="p-4 space-y-0.5 text-slate-600">
                    <div className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> {c.email}</div>
                    <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {c.phone}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {c.district}, {c.state} ({c.pincode})
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {c.applications.length} Application(s)
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
