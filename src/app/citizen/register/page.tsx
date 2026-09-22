"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CitizenRegisterSchema } from "@/lib/validation";
import { Building2, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "Male",
    address: "",
    state: "Maharashtra",
    district: "Mumbai",
    pincode: "400001",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = CitizenRegisterSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Please fix form errors");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Account created successfully.");
        router.push("/citizen/login");
      } else {
        const err = await res.json();
        toast.error(err.error || "Registration failed");
      }
    } catch {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Create Citizen Account</h1>
          <p className="text-xs text-slate-500">
            Register to apply for government services, upload documents, and track applications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number (10-Digit) *</label>
              <input
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="e.g. 9812345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Third Gender">Third Gender</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pincode (6-Digit) *</label>
              <input
                type="text"
                name="pincode"
                required
                value={formData.pincode}
                onChange={handleChange}
                placeholder="400001"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address *</label>
            <textarea
              name="address"
              rows={2}
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Flat no, Street, Locality"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">District *</label>
              <input
                type="text"
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Create Citizen Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already have an account?{" "}
          <Link href="/citizen/login" className="text-blue-600 font-bold hover:underline">
            Citizen Login
          </Link>
        </div>

      </div>
    </div>
  );
}
