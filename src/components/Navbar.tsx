"use client";

import React, { useState, useEffect } from "react";
import { useApp, UserRole, ViewMode } from "@/context/AppContext";
import { Language, t } from "@/utils/translations";
import {
  Leaf,
  Globe,
  Wallet,
  Award,
  Bell,
  User,
  Store,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  Download,
} from "lucide-react";

export function Navbar() {
  const {
    role,
    setRole,
    language,
    setLanguage,
    viewMode,
    setViewMode,
    studentWallet,
    setStudentWallet,
    studentEcoPoints,
    setStudentEcoPoints,
    pushNotifications,
    showToast,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIsLoggedIn = localStorage.getItem("zb_isLoggedIn") === "true";
      if (savedIsLoggedIn) {
        setIsLoggedIn(true);
        setName(localStorage.getItem("zb_name") || "");
        setEmail(localStorage.getItem("zb_email") || "");
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when states change
  useEffect(() => {
    if (!isLoaded) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("zb_isLoggedIn", isLoggedIn.toString());
      localStorage.setItem("zb_name", name);
      localStorage.setItem("zb_email", email);
    }
  }, [isLoggedIn, name, email, isLoaded]);

  const roles: { id: UserRole; nameKey: string; icon: any }[] = [
    { id: "STUDENT", nameKey: "role_student", icon: User },
    { id: "VENDOR", nameKey: "role_vendor", icon: Store },
    { id: "NGO", nameKey: "role_ngo", icon: HeartHandshake },
    { id: "ADMIN", nameKey: "role_admin", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand & Logo */}
          <div
            onClick={() => {
              setViewMode("web");
              setRole("STUDENT");
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white shadow-md shadow-green-600/30 group-hover:scale-105 transition-all duration-300">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
                {t(language, "app_name")}
              </span>
              <span className="hidden md:block text-xs font-medium text-emerald-800/80 uppercase tracking-widest">
                {t(language, "app_tagline")}
              </span>
            </div>
          </div>

          {/* Center: Multi-Role Switcher (Desktop only) */}
          <div className="hidden lg:flex items-center bg-green-50/80 p-1 rounded-2xl border border-green-200/60 shadow-inner">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setViewMode("web");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${isSelected
                    ? "bg-green-700 text-white shadow-md shadow-green-800/20 scale-102"
                    : "text-green-900/70 hover:text-green-900 hover:bg-green-100/50"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(language, r.nameKey)}
                </button>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Desktop Only Badges/Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Wallet Balance (For Student Demo) */}
              {role === "STUDENT" && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-950 font-semibold text-xs shadow-2xs">
                  <Wallet className="w-4 h-4 text-emerald-700" />
                  <span>₹{studentWallet.toFixed(0)}</span>
                </div>
              )}

              {/* Eco Points Badge */}
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-900 font-bold text-xs shadow-2xs">
                <Award className="w-4 h-4 text-amber-600 fill-amber-500/20" />
                <span>{studentEcoPoints} Pts</span>
              </div>

              {/* View Mode Toggle: Download Mobile App Center */}
              <button
                onClick={() => setViewMode(viewMode === "mobile" ? "web" : "mobile")}
                title={viewMode === "mobile" ? "Back to Dashboard" : "Download Mobile App"}
                className={`p-2 rounded-xl transition-all border shrink-0 cursor-pointer ${viewMode === "mobile"
                  ? "bg-green-700 text-white border-green-800 shadow-xs font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                  }`}
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="appearance-none bg-green-50 hover:bg-green-100/80 text-green-900 font-bold text-base sm:text-xs py-2 pl-3 pr-7 rounded-xl border border-green-200/80 cursor-pointer focus:outline-hidden transition"
                >
                  <option value="en">English</option>
                  <option value="ml">മലയാളം (ML)</option>
                  <option value="hi">हिन्दी (HI)</option>
                </select>
                <Globe className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-green-700 pointer-events-none" />
              </div>
            </div>

            {/* Notifications Toggle */}
            <div className="static sm:relative">
              <button
                onClick={() => {
                  setShowNotifications((prev) => !prev);
                  setShowAuthModal(false);
                }}
                className="relative p-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 transition border border-green-200/60"
              >
                <Bell className="w-5 h-5" />
                {pushNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                    {pushNotifications.length}
                  </span>
                )}
              </button>

              {/* Notification Popup Drawer (Responsive Width) */}
              {showNotifications && (
                <div className="absolute right-4 left-4 sm:right-0 sm:left-auto mt-2 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-green-700" /> Platform Live Notifications
                    </h3>
                    <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                      Live FCM Sync
                    </span>
                  </div>
                  <div className="mt-3 space-y-3 max-h-80 overflow-y-auto pr-1">
                    {pushNotifications.map((n, i) => (
                      <div
                        key={i}
                        className="bg-green-50/60 border border-green-100 p-3 rounded-2xl hover:bg-green-50 transition"
                      >
                        <div className="flex items-center justify-between text-xs font-black text-green-950">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-green-700/80 font-medium">{n.date}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 font-normal leading-snug">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Auth Button */}
            <div className="static sm:relative">
              <button
                onClick={() => {
                  setShowAuthModal((prev) => !prev);
                  setShowNotifications(false);
                }}
                className={`relative p-2 rounded-xl border transition ${showAuthModal
                  ? "bg-green-700 text-white border-green-800"
                  : "bg-green-50 hover:bg-green-100 text-green-800 border-green-200/60"
                  }`}
                title="Account Settings & Authentication"
              >
                <User className="w-5 h-5 block" />
                {isLoggedIn && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                )}
              </button>

              {/* Auth Popup Drawer (Responsive Width) */}
              {showAuthModal && (
                <div className="absolute right-4 left-4 sm:right-0 sm:left-auto mt-2 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 animate-in fade-in slide-in-from-top-4">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-black text-lg">
                          {(name || "U")[0].toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{name || "Verified Student"}</h4>
                          <p className="text-xs text-slate-500">{email || "user@zerobite.edu"}</p>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
                          <span>Platform Active Role:</span>
                          <span className="bg-green-100 text-green-850 px-2 py-0.5 rounded-md uppercase text-[10px]">
                            {role}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
                          <span>Security Status:</span>
                          <span className="text-green-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 fill-green-100" /> Authorized
                          </span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setName("");
                            setEmail("");
                            setPassword("");
                            setStudentWallet(0.0);
                            setStudentEcoPoints(0);
                            setRole("STUDENT");
                            setShowAuthModal(false);
                            showToast("Successfully logged out from ZeroBite!", "success");
                          }}
                          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs py-2.5 rounded-xl transition border border-rose-150 cursor-pointer"
                        >
                          Log Out Account
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center pb-2 border-b border-slate-100">
                        <h4 className="font-black text-slate-900 text-base">
                          {authType === "login" ? "Welcome back to ZeroBite" : "Register ZeroBite Account"}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {authType === "login"
                            ? "Sign in to save surplus meals & earn eco points."
                            : "Create an account to join the campus zero waste mission."}
                        </p>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!email || !password || (authType === "signup" && !name)) {
                            showToast("Please fill in all required fields!", "warning");
                            return;
                          }
                          setIsLoggedIn(true);

                          const emailLower = email.toLowerCase();
                          if (emailLower.includes("arjun") || emailLower === "arjun@univ.edu") {
                            setStudentWallet(650.0);
                            setStudentEcoPoints(340);
                            if (!name) setName("Arjun Krishna");
                            setRole("STUDENT");
                          } else if (emailLower.includes("priya") || emailLower === "priya@univ.edu") {
                            setStudentWallet(1200.0);
                            setStudentEcoPoints(520);
                            if (!name) setName("Priya Sharma");
                            setRole("STUDENT");
                          } else {
                            setStudentWallet(0.0);
                            setStudentEcoPoints(0);
                            if (!name) setName(email.split("@")[0]);
                          }

                          setShowAuthModal(false);
                          showToast(
                            authType === "login"
                              ? `Welcome back to ZeroBite, ${name || email.split("@")[0]}!`
                              : `Registration successful! Welcome to ZeroBite, ${name || email.split("@")[0]}!`,
                            "success"
                          );
                        }}
                        className="space-y-3 text-left"
                      >
                        {authType === "signup" && (
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Anil Kumar"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-green-600 focus:outline-hidden transition"
                            />
                          </div>
                        )}
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="user@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-green-600 focus:outline-hidden transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-green-600 focus:outline-hidden transition"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-md shadow-green-700/10 mt-2 cursor-pointer"
                        >
                          {authType === "login" ? "Sign In" : "Sign Up"}
                        </button>
                      </form>

                      <div className="text-center pt-2">
                        <button
                          onClick={() => setAuthType(authType === "login" ? "signup" : "login")}
                          className="text-xs font-black text-green-700 hover:text-green-800 hover:underline cursor-pointer"
                        >
                          {authType === "login"
                            ? "Don't have an account? Create one"
                            : "Already have an account? Sign in"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Drawer Settings Toggle Button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen((prev) => !prev);
                  setShowNotifications(false);
                  setShowAuthModal(false);
                }}
                className="p-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 transition border border-green-200/60 cursor-pointer"
                title="Toggle settings panel"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 block animate-in spin-in duration-300" />
                ) : (
                  <Menu className="w-5 h-5 block" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Settings Drawer Overlay (Expands under header on mobile/tablet) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-green-100/50 py-4 px-1 space-y-4 animate-in slide-in-from-top duration-300">
            {/* Small Balance Boxes */}
            <div className="grid grid-cols-2 gap-3">
              {role === "STUDENT" ? (
                <div className="bg-gradient-to-r from-emerald-50/60 to-green-50/60 p-3 rounded-2xl border border-emerald-100 text-emerald-950 shadow-2xs">
                  <div className="text-[9px] font-black text-emerald-800/80 uppercase">Wallet Balance</div>
                  <div className="text-sm font-black mt-1 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-emerald-700" /> ₹{studentWallet.toFixed(0)}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 text-slate-500 shadow-2xs">
                  <div className="text-[9px] font-black uppercase">Wallet Balance</div>
                  <div className="text-xs font-bold mt-1">Not Applicable</div>
                </div>
              )}

              <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 p-3 rounded-2xl border border-amber-100 text-amber-900 shadow-2xs">
                <div className="text-[9px] font-black text-amber-800 uppercase">Eco Points</div>
                <div className="text-sm font-black mt-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600 fill-amber-500/20" /> {studentEcoPoints} Pts
                </div>
              </div>
            </div>

            {/* Language & View Mode Controls */}
            <div className="grid grid-cols-2 gap-3 items-end">
              {/* Language Box */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Language</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full appearance-none bg-white text-green-950 font-bold text-base sm:text-xs py-2.5 px-3.5 rounded-xl border border-slate-200 cursor-pointer focus:outline-hidden transition"
                  >
                    <option value="en">English</option>
                    <option value="ml">മലയാളം (ML)</option>
                    <option value="hi">हिन्दी (HI)</option>
                  </select>
                  <Globe className="absolute right-3 top-3 w-3.5 h-3.5 text-green-700 pointer-events-none" />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">App Version</label>
                <button
                  onClick={() => {
                    setViewMode(viewMode === "mobile" ? "web" : "mobile");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex justify-center items-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition border cursor-pointer ${viewMode === "mobile"
                    ? "bg-slate-900 text-white hover:bg-slate-950 border-slate-950 shadow-xs"
                    : "bg-green-50 hover:bg-green-100 text-green-850 border-green-200/50 shadow-2xs"
                    }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{viewMode === "mobile" ? "Web Version" : "Get Mobile App"}</span>
                </button>
              </div>
            </div>

            {/* Switching Role Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-200/50">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Switch Account Role</span>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id);
                        setViewMode("web");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition ${isSelected
                        ? "bg-green-700 text-white border-green-800 shadow-md shadow-green-700/10"
                        : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{t(language, r.nameKey)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
