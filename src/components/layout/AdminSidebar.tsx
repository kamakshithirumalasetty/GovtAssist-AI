"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Layers,
  BarChart3,
  Settings,
  LogOut,
  Shield
} from "lucide-react";
import { toast } from "sonner";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out from Admin Portal");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "All Applications", href: "/admin/applications", icon: FileCheck },
    { label: "Pending Reviews", href: "/admin/applications?status=UNDER_REVIEW", icon: Clock },
    { label: "Approved Applications", href: "/admin/applications?status=APPROVED", icon: CheckCircle2 },
    { label: "Rejected Applications", href: "/admin/applications?status=REJECTED", icon: XCircle },
    { label: "Registered Citizens", href: "/admin/citizens", icon: Users },
    { label: "Services Registry (30)", href: "/admin/services", icon: Layers },
    { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
    { label: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-800/80 rounded-xl border border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white block leading-tight">Admin Console</span>
            <span className="text-[10px] text-amber-400 font-mono block">Government Portal</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href.includes("?") && pathname + window.location.search === item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Portal</span>
        </button>
      </div>
    </aside>
  );
}
