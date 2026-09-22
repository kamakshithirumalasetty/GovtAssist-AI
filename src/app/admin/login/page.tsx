"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Key, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter admin credentials");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: email, password, requiredRole: "ADMIN" }),
      });

      if (res.ok) {
        toast.success("Admin authenticated successfully!");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "Admin authentication failed");
      }
    } catch {
      toast.error("Error logging into admin portal.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@govassist.demo");
    setPassword("Admin@123456");
    toast.info("Filled demo admin credentials!");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-md w-full bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl p-8 space-y-6 backdrop-blur-xl">

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Administrator Portal</h1>
          <p className="text-xs text-slate-400">
            Secure authorization required for government application review
          </p>
        </div>

        {/* Demo Admin Auto-fill Box */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-amber-300">
            <span>Seeded Administrator Credentials:</span>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="text-[11px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg transition-colors"
            >
              Fill Admin Login
            </button>
          </div>
          <p className="text-slate-300 text-[11px] font-mono">
            Email: admin@govassist.demo | Pass: Admin@123456
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Admin Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@govassist.demo"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Administrator Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Authorize Admin Login"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-700 text-center text-xs text-slate-400">
          <Link href="/citizen/login" className="hover:text-white transition-colors">
            ← Return to Citizen Portal Login
          </Link>
        </div>

      </div>
    </div>
  );
}
