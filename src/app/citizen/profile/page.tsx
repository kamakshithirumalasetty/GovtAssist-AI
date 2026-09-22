"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Save, Building2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function CitizenProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    address: "",
    state: "",
    district: "",
    pincode: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const json = await res.json();
        if (json.user) {
          setFormData({
            fullName: json.user.name || "",
            email: json.user.email || "",
            phone: json.user.phone || "",
            dob: json.user.dateOfBirth || "",
            gender: json.user.gender || "Male",
            address: json.user.address || "",
            state: json.user.state || "",
            district: json.user.district || "",
            pincode: json.user.pincode || "",
          });
        }
      }
    } catch {
      toast.error("Failed to fetch profile details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-slate-500">Loading citizen profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">

        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {formData.fullName.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{formData.fullName}</h1>
            <p className="text-xs text-slate-500">{formData.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email (Registered)</label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 outline-none text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender</label>
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
              <label className="block font-semibold text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
            <textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving Changes..." : "Save Profile Details"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
