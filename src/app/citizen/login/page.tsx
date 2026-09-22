"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCheck, ArrowRight, ShieldCheck, Key } from "lucide-react";
import { toast } from "sonner";

export default function CitizenLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      toast.error("Please enter email/mobile and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password, requiredRole: "CITIZEN" }),
      });

      if (res.ok) {
        toast.success("Logged in successfully!");
        router.push("/citizen/dashboard");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "Login failed");
      }
    } catch {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCitizen = () => {
    setEmailOrPhone("rahul.sharma@demo.com");
    setPassword("Citizen@123456");
    toast.info("Filled demo citizen credentials!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Citizen Login</h1>
          <p className="text-xs text-slate-500">
            Access your government virtual assistant & application dashboard
          </p>
        </div>

        {/* Demo Quick Fill Button */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-blue-900">
            <span>Demo Citizen Account:</span>
            <button
              type="button"
              onClick={fillDemoCitizen}
              className="text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2.5 py-1 rounded-lg transition-colors"
            >
              Fill Demo Login
            </button>
          </div>
          <p className="text-blue-700 text-[11px]">Email: rahul.sharma@demo.com | Pass: Citizen@123456</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email or Mobile Number</label>
            <input
              type="text"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="rahul.sharma@demo.com or 9812345678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => toast.info("Demo mode: Use password 'Citizen@123456' for seeded accounts.")}
                className="text-[11px] text-blue-600 font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Logging in..." : "Login to Citizen Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-center text-xs text-slate-500">
          <div>
            Don't have a citizen account?{" "}
            <Link href="/citizen/register" className="text-blue-600 font-bold hover:underline">
              Create New Account
            </Link>
          </div>

          <div className="pt-2">
            <Link href="/admin/login" className="text-amber-700 font-semibold hover:underline text-[11px] inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Switch to Administrator Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
