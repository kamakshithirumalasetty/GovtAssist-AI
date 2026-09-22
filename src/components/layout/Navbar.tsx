"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Bot,
  FileText,
  User,
  LogOut,
  Bell,
  Shield,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "CITIZEN" | "ADMIN";
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchNotifications();
  }, [pathname]);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {}
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to log out");
    }
  };

  const markNotifsRead = async () => {
    try {
      await fetch("/api/notifications", { method: "PUT", body: JSON.stringify({}) });
      setUnreadCount(0);
    } catch {}
  };

  const isAdminPath = pathname.startsWith("/admin");

  return (
    <header className="glass-header border-b border-slate-200/80 shadow-xs">
      {/* Demo Disclaimer Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-blue-600 to-indigo-700 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-xs">
        <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold text-[10px] uppercase tracking-wide">
          Demo Application
        </span>
        <span>
          Educational Government Services Assistant • Not affiliated with official government portals
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none block">
                GovtAssist <span className="text-blue-600 font-black">AI</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase block">
                Virtual Assistant Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/" ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Home
            </Link>

            <Link
              href="/services"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/services") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Services (30+)
            </Link>

            {user?.role === "CITIZEN" && (
              <>
                <Link
                  href="/citizen/assistant"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === "/citizen/assistant" ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Bot className="w-4 h-4 text-blue-600" />
                  AI Assistant
                </Link>

                <Link
                  href="/citizen/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === "/citizen/dashboard" ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  href="/citizen/applications"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith("/citizen/applications") ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  My Applications
                </Link>

                <Link
                  href="/citizen/track"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === "/citizen/track" ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Track Status
                </Link>
              </>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith("/admin") ? "bg-amber-50 text-amber-800 font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Shield className="w-4 h-4 text-amber-600" />
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Right Action Icons & User Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifDropdown(!showNotifDropdown);
                      setShowUserDropdown(false);
                      if (unreadCount > 0) markNotifsRead();
                    }}
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl relative transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-900">Notifications</span>
                        <span className="text-xs text-slate-500">{notifications.length} total</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400">No notifications yet.</div>
                        ) : (
                          notifications.map((n) => (
                            <div key={n.id} className={`p-3 text-xs ${n.read ? "bg-white" : "bg-blue-50/50"}`}>
                              <div className="font-semibold text-slate-800">{n.title}</div>
                              <div className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</div>
                              <div className="text-[10px] text-slate-400 mt-1">
                                {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setShowNotifDropdown(false);
                    }}
                    className="flex items-center gap-2 p-1.5 pl-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      user.role === "ADMIN" ? "bg-amber-500 text-white" : "bg-blue-600 text-white"
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-800 max-w-[120px] truncate">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 divide-y divide-slate-100">
                      <div className="px-4 py-2.5">
                        <p className="text-xs font-medium text-slate-500">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          user.role === "ADMIN" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {user.role === "CITIZEN" ? (
                          <>
                            <Link
                              href="/citizen/dashboard"
                              onClick={() => setShowUserDropdown(false)}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              Dashboard
                            </Link>
                            <Link
                              href="/citizen/profile"
                              onClick={() => setShowUserDropdown(false)}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              My Profile
                            </Link>
                            <Link
                              href="/citizen/applications"
                              onClick={() => setShowUserDropdown(false)}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              My Applications
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setShowUserDropdown(false)}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/citizen/login"
                  className="px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  Citizen Login
                </Link>
                <Link
                  href="/citizen/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all hover:shadow-md"
                >
                  Register
                </Link>
                <Link
                  href="/admin/login"
                  className="px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin Portal
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Services (30+)
          </Link>
          {user ? (
            <>
              {user.role === "CITIZEN" ? (
                <>
                  <Link
                    href="/citizen/assistant"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                  >
                    AI Assistant
                  </Link>
                  <Link
                    href="/citizen/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/citizen/applications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    My Applications
                  </Link>
                  <Link
                    href="/citizen/track"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Track Status
                  </Link>
                  <Link
                    href="/citizen/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    My Profile
                  </Link>
                </>
              ) : (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-50"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-600 hover:bg-rose-50"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/citizen/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 font-semibold text-blue-600 bg-blue-50 rounded-xl"
              >
                Citizen Login
              </Link>
              <Link
                href="/citizen/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 font-semibold text-white bg-blue-600 rounded-xl shadow-sm"
              >
                Register Account
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl"
              >
                Admin Portal
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
