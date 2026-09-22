"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SERVICES_CONFIG, CATEGORIES, ServiceConfig } from "@/config/services";
import {
  Search,
  Filter,
  ArrowRight,
  FileText,
  Clock,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Categories";
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredServices = SERVICES_CONFIG.filter((s) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      s.category.toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.requiredDocuments.some((d) => d.name.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Comprehensive Registry
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Government Services Directory (30 Services)
          </h1>
          <p className="text-sm text-blue-200">
            Discover verified eligibility criteria, document checklists, official processing times, and submit your application online.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="pt-2 max-w-2xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by service name, category or keywords (e.g. PAN, Driving Licence, Scholarship)..."
              className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Showing {filteredServices.length} of {SERVICES_CONFIG.length} services</span>
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); }}
            className="text-blue-600 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No services found</h3>
          <p className="text-xs text-slate-500">Try searching for a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card p-6 glass-card-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {service.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">⏱️ {service.processingDays} Days</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">{service.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{service.description}</p>

                {/* Documents List Preview */}
                <div className="bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-1">Key Documents:</span>
                  <span>{service.requiredDocuments.map((d) => d.name).slice(0, 3).join(" • ")}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/services/${service.id}`}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl border border-slate-200 transition-colors"
                >
                  View Details
                </Link>

                <Link
                  href={`/citizen/apply/${service.id}`}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Services Directory...</div>}>
        <ServicesContent />
      </Suspense>
    </div>
  );
}
