import React from "react";
import Link from "next/link";
import { SERVICES_CONFIG } from "@/config/services";
import {
  Bot,
  Building2,
  CheckCircle2,
  FileText,
  Search,
  Shield,
  ArrowRight,
  UserCheck,
  Award,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export default function HomePage() {
  const popularServices = SERVICES_CONFIG.slice(0, 6);

  return (
    <div className="space-y-20 pb-16">

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Next-Gen Digital Governance Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">Virtual Assistant</span> for Government Services
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Your intelligent digital assistant for discovering, understanding requirements, submitting online applications, and tracking 30+ government services in one place.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/citizen/assistant"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-102 flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5 text-amber-300" />
                  Get Started with Assistant
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  Explore Services (30+)
                  <ArrowRight className="w-5 h-5 text-blue-300" />
                </Link>
              </div>

              {/* Demo Badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Demo / Educational Government Services Portal</span>
              </div>
            </div>

            {/* Hero Right Visual Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-slate-950/80 rounded-2xl border border-slate-700/80 p-5 shadow-2xl backdrop-blur-xl">
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">GovtAssist Assistant v2.0</span>
                </div>

                {/* Simulated Assistant Conversation */}
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-slate-200">
                    <p className="font-semibold text-blue-300 mb-1">🤖 Assistant</p>
                    <p>Hello! How can I assist you with government services today?</p>
                  </div>
                  <div className="bg-blue-600/90 text-white p-3 rounded-xl ml-6">
                    <p>“I want to apply for a PAN Card.”</p>
                  </div>
                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-slate-200 space-y-2">
                    <p className="font-semibold text-blue-300">🤖 Assistant</p>
                    <p>Sure! PAN Card application takes ~15 days. Required documents: Aadhaar, Address Proof & Passport Photo.</p>
                    <div className="flex gap-2 pt-1">
                      <span className="px-3 py-1 bg-emerald-600 font-bold rounded text-[10px] text-white">Apply Now</span>
                      <span className="px-3 py-1 bg-slate-700 rounded text-[10px] text-slate-300">View Requirements</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>30 Integrated Services</span>
                  <span className="text-emerald-400 font-medium">Instant NLP Matching</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Grid (6 Main Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Digital Government Features
          </h2>
          <p className="text-sm text-slate-600">
            Engineered to streamline discovery, application submission, document management, and official review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="glass-card p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">AI Government Assistant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conversational intelligence that detects service intent, answers FAQs, checks eligibility, and provides direct CTAs.
            </p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">30+ Government Services</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pre-configured registry covering Identity Cards, Civil Certificates, Transport Licences, Social Welfare, Pensions & Agriculture.
            </p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Easy Online Applications</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamic multi-step form engine that automatically adapts input fields and required document checklists for every service.
            </p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Application Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time tracking timeline from submission to review and final approval, complete with unique GOV-2026 Application IDs.
            </p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Secure Citizen Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              JWT-authenticated citizen dashboard for managing saved applications, profile details, and real-time status notifications.
            </p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Admin Review System</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated administrative portal for inspecting submitted applications, document verification, approving, or providing rejection reasons.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works (5 Steps) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Simple Workflow</span>
            <h2 className="text-3xl font-extrabold tracking-tight">How GovtAssist AI Works</h2>
            <p className="text-xs text-slate-400">Complete end-to-end citizen journey in 5 simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-3 text-center relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm mx-auto flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Register</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Create your verified citizen account with contact details.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-3 text-center relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm mx-auto flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Ask AI Assistant</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Ask questions or search among 30+ supported services.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-3 text-center relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm mx-auto flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Select Service</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Review requirements, fee structure, and processing duration.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-3 text-center relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm mx-auto flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-sm text-white">Submit Application</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Fill specific fields and upload supporting documents.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-3 text-center relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm mx-auto flex items-center justify-center">
                5
              </div>
              <h4 className="font-bold text-sm text-white">Track Status</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Track application progress until official approval.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Services Showcase Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              30 Digital Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Government Services
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition-colors"
          >
            View All 30 Services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <div key={service.id} className="glass-card p-5 glass-card-hover flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {service.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">⏱️ {service.processingDays} Days</span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{service.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{service.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-700">{service.fee}</span>
                <Link
                  href={`/citizen/apply/${service.id}`}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to process your government application?
            </h2>
            <p className="text-sm text-blue-200 max-w-xl">
              Use our AI Chatbot Assistant to verify documents or register to start your online application immediately.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/citizen/register"
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all"
            >
              Register Citizen Account
            </Link>
            <Link
              href="/citizen/assistant"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl backdrop-blur-md transition-all"
            >
              Launch AI Assistant
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
