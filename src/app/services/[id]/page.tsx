import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "@/config/services";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  DollarSign,
  Bot
} from "lucide-react";

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = getServiceById(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/services" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> All Services
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{service.name}</span>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {service.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{service.name}</h1>
          <p className="text-sm text-blue-200 max-w-2xl leading-relaxed">{service.description}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-xs space-y-2 shrink-0">
          <div className="flex items-center justify-between gap-6 text-slate-200">
            <span>Processing Time:</span>
            <span className="font-bold text-amber-300 text-sm">~{service.processingDays} Days</span>
          </div>
          <div className="flex items-center justify-between gap-6 text-slate-200">
            <span>Government Fee:</span>
            <span className="font-bold text-emerald-400 text-sm">{service.fee}</span>
          </div>
          <div className="pt-2 border-t border-white/10">
            <Link
              href={`/citizen/apply/${service.id}`}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-center block text-xs shadow-md transition-all"
            >
              Start Online Application
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Details & Instructions */}
        <div className="lg:col-span-2 space-y-6">

          {/* Eligibility Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Eligibility Criteria
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {service.eligibility}
            </p>
          </div>

          {/* Required Documents Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Required Documents Checklist
            </h2>
            <div className="space-y-3">
              {service.requiredDocuments.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3 text-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">{doc.name}</span>
                    <span className="text-slate-600 block mt-0.5 leading-normal">{doc.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Step-by-Step */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Step-by-Step Application Process
            </h2>
            <div className="space-y-3">
              {service.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 pt-0.5 leading-relaxed">{inst}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-3 divide-y divide-slate-100">
              {service.faq.map((faq, idx) => (
                <div key={idx} className="pt-3 first:pt-0 space-y-1 text-xs">
                  <h4 className="font-bold text-slate-900">Q: {faq.question}</h4>
                  <p className="text-slate-600 leading-relaxed">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar CTA & Assistant Integration */}
        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Ready to Apply?</h3>
            <p className="text-xs text-slate-600">
              Complete your dynamic application form in under 5 minutes with document upload.
            </p>
            <Link
              href={`/citizen/apply/${service.id}`}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Bot className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-wider">Ask AI Assistant</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have specific questions about eligibility, required IDs, or status for {service.name}?
            </p>
            <Link
              href={`/citizen/assistant?q=${encodeURIComponent(`Tell me about ${service.name}`)}`}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs rounded-xl text-center block transition-all"
            >
              Chat about this Service
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
