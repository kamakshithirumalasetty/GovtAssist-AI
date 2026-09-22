import React from "react";
import Link from "next/link";
import { Building2, ShieldAlert, Heart, CheckCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                GovtAssist <span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your intelligent digital government assistant for discovering services, checking requirements, applying online, and tracking applications.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-amber-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Demo / Educational Assistant</span>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular Services
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/services/pan-card" className="hover:text-white transition-colors">PAN Card Application</Link></li>
              <li><Link href="/services/aadhaar-enrolment" className="hover:text-white transition-colors">Aadhaar Enrolment / Update</Link></li>
              <li><Link href="/services/driving-licence" className="hover:text-white transition-colors">Driving Licence</Link></li>
              <li><Link href="/services/passport-application" className="hover:text-white transition-colors">Passport Application</Link></li>
              <li><Link href="/services/student-scholarship" className="hover:text-white transition-colors">Student Scholarship</Link></li>
              <li><Link href="/services/agricultural-subsidy" className="hover:text-white transition-colors">PM-KISAN Agriculture Subsidy</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Portal Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/citizen/assistant" className="hover:text-white transition-colors">AI Government Chatbot</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">30 Services Directory</Link></li>
              <li><Link href="/citizen/track" className="hover:text-white transition-colors">Track Application Status</Link></li>
              <li><Link href="/citizen/login" className="hover:text-white transition-colors">Citizen Portal Login</Link></li>
              <li><Link href="/admin/login" className="hover:text-white transition-colors">Administrator Portal</Link></li>
            </ul>
          </div>

          {/* Disclaimer & Compliance */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Important Disclaimer
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              This is a digital government-service assistance platform designed for educational and demonstration purposes. Applications submitted here operate in a controlled demo workflow and are not forwarded to real government ministries.
            </p>
            <div className="space-y-1 text-[11px] text-slate-500">
              <p>• Zero real government credentials collected</p>
              <p>• Data encrypted and local sandbox only</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} GovtAssist AI • Modern Digital Government Assistant Demo.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Help & FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
