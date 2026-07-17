"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/utils/translations";
import {
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Home,
  QrCode,
  Award,
  User,
  ShoppingBag,
  Sparkles,
  Store,
  MapPin,
  Clock,
  Heart,
  Navigation,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function MobileAppPreview() {
  const { language, role, meals, orders, studentWallet, studentEcoPoints, reserveMeal } = useApp();
  const [mobileTab, setMobileTab] = useState<"home" | "orders" | "wallet" | "profile">("home");
  const [deviceOs, setDeviceOs] = useState<"ios" | "android">("ios");
  const [isOffline, setIsOffline] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);

  const availableMeals = meals.filter((m) => !m.isDonation);
  const reservedOrders = orders.filter((o) => o.status === "RESERVED");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Simulation Controller Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-green-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/30">
        <div>
          <span className="bg-green-500 text-black font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            📱 Flutter Mobile App Simulator (Android & iOS)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">ZeroBite Mobile Experience</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            This mode simulates our exact native Dart/Flutter mobile compilation built with Material 3 UI. The application fully adapts to dark/light theme, offline capabilities, and touchless barcode scanning.
          </p>
        </div>

        {/* Device toggles */}
        <div className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setDeviceOs("ios")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              deviceOs === "ios" ? "bg-white text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            🍎 iOS iPhone
          </button>
          <button
            onClick={() => setDeviceOs("android")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              deviceOs === "android" ? "bg-green-700 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            🤖 Android Pixel
          </button>
          <button
            onClick={() => setIsOffline((prev) => !prev)}
            className={`px-3 py-2 rounded-xl text-xs font-black transition border ${
              isOffline ? "bg-red-600 text-white border-red-500 animate-pulse" : "bg-transparent text-slate-400 border-white/20 hover:text-white"
            }`}
          >
            {isOffline ? "📶 Offline Mode Active" : "🌐 Go Offline"}
          </button>
        </div>
      </div>

      {/* Main Bezel Stage */}
      <div className="flex justify-center">
        {/* Smartphone Bezel */}
        <div className={`relative w-full max-w-[400px] h-[780px] rounded-[52px] border-4 border-slate-800 bg-slate-900 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          deviceOs === "ios" ? "shadow-indigo-500/10" : "shadow-green-500/10"
        }`}>
          {/* Inner Display Bezel border */}
          <div className="relative w-full h-full rounded-[40px] bg-[#F8FFF8] overflow-hidden flex flex-col justify-between border border-slate-700 shadow-inner">
            
            {/* Top Status Bar */}
            <div className="bg-slate-900 text-white px-7 pt-3 pb-2 flex items-center justify-between text-[11px] font-mono font-bold select-none z-30 shrink-0">
              <span>9:41</span>
              {/* Dynamic Island / Camera Punch Hole */}
              <div className={`h-4 bg-black rounded-full mx-auto transition-all ${
                deviceOs === "ios" ? "w-24" : "w-4 h-4"
              }`} />
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-emerald-400" />
              </div>
            </div>

            {/* Application Flutter Header Bar */}
            <div className="bg-gradient-to-r from-green-800 to-emerald-900 p-4 text-white shadow-md z-20 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs">
                    ZB
                  </div>
                  <div>
                    <div className="font-black text-base tracking-tight leading-none">{t(language, "app_name")}</div>
                    <div className="text-[10px] text-emerald-200 font-medium mt-0.5">{role} Portal (Flutter v3.24)</div>
                  </div>
                </div>

                {isOffline && (
                  <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-bounce">
                    OFFLINE
                  </span>
                )}
              </div>
            </div>

            {/* SCREEN BODY CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gradient-to-b from-[#F8FFF8] via-white to-green-50/30">
              
              {mobileTab === "home" && (
                <div className="space-y-4">
                  {/* Local student stats badge */}
                  <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-4 rounded-3xl border border-emerald-300 flex items-center justify-between shadow-xs">
                    <div>
                      <div className="text-[10px] font-extrabold text-emerald-900 uppercase">My Touchless Wallet</div>
                      <div className="text-xl font-black text-green-950 mt-0.5">₹{studentWallet.toFixed(0)}</div>
                    </div>
                    <div className="h-8 w-px bg-emerald-300" />
                    <div>
                      <div className="text-[10px] font-extrabold text-amber-900 uppercase">Eco Points</div>
                      <div className="text-xl font-black text-amber-600 mt-0.5">{studentEcoPoints} ⭐</div>
                    </div>
                  </div>

                  {/* Mobile Search input */}
                  <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200/80 text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span className="text-base">🔍</span>
                    <span>Search cafeteria food nearby...</span>
                  </div>

                  {/* Surplus Listing Cards */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-black text-slate-900 px-1">
                      <span>Nearby Hot Deals 🔥</span>
                      <span className="text-[10px] text-green-700">{availableMeals.length} items</span>
                    </div>

                    {availableMeals.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMeal(m)}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex gap-3 p-3"
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative">
                          <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-black/70 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md">
                            -{Math.round(((m.originalPrice - m.discountPrice) / m.originalPrice) * 100)}%
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="text-[10px] font-black text-green-800 uppercase tracking-wider">{m.category}</div>
                            <h4 className="font-black text-sm text-slate-900 line-clamp-1 mt-0.5">{m.name}</h4>
                            <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">{m.description}</p>
                          </div>

                          <div className="flex items-baseline justify-between pt-2">
                            <span className="text-base font-black text-green-700">₹{m.discountPrice}</span>
                            <span className="text-[10px] font-extrabold bg-slate-100 px-2 py-0.5 rounded-lg text-slate-700">
                              {m.availableQuantity} left
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mobileTab === "orders" && (
                <div className="space-y-4">
                  <div className="bg-green-800 text-white p-4 rounded-3xl text-center space-y-1 shadow-sm">
                    <div className="font-black text-sm">Active Mobile QR Pickups</div>
                    <div className="text-[10px] text-green-200 font-medium">Have your screen brightness at max for quick cafeteria scanning.</div>
                  </div>

                  <div className="space-y-4">
                    {reservedOrders.map((ord) => {
                      const meal = meals.find((ml) => ml.id === ord.mealId);
                      return (
                        <div key={ord.id} className="bg-white rounded-3xl border-2 border-green-300 p-5 space-y-4 shadow-md text-center">
                          <div className="flex items-center justify-between text-left">
                            <div>
                              <div className="font-black text-sm text-slate-900">{meal?.name}</div>
                              <div className="text-[10px] text-slate-500 font-bold">{ord.quantity}x Portions • ₹{ord.totalPrice}</div>
                            </div>
                            <span className="bg-green-100 text-green-800 text-[10px] font-black px-2 py-1 rounded-full">
                              ✔ Reserved
                            </span>
                          </div>

                          {/* Big internal QR code */}
                          <div className="p-3 bg-slate-950 text-white rounded-2xl flex flex-col items-center justify-center font-mono text-xs gap-1 shadow-inner">
                            <QrCode className="w-24 h-24 text-emerald-400 animate-pulse" />
                            <div className="font-black text-sm mt-1">{ord.qrCode}</div>
                            <div className="text-[10px] text-slate-400">PIN: {ord.qrCode.slice(-4)}</div>
                          </div>
                        </div>
                      );
                    })}

                    {reservedOrders.length === 0 && (
                      <div className="text-center py-12 text-slate-400 space-y-2">
                        <QrCode className="w-12 h-12 mx-auto stroke-1" />
                        <div className="text-xs font-bold">No unpicked reservations. Book a meal in the Home tab!</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {mobileTab === "wallet" && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white p-6 rounded-3xl text-center space-y-2 shadow-lg">
                    <Award className="w-12 h-12 text-amber-200 mx-auto animate-bounce" />
                    <div className="text-4xl font-black">{studentEcoPoints}</div>
                    <div className="text-xs font-bold text-amber-100">Eco Points Clean Record</div>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
                    <div className="font-black text-xs text-slate-900">Green Badges Unlocked</div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-3 bg-green-50 rounded-2xl border border-green-200 font-black text-green-900">
                        ⚡ Waste Warrior Level 3
                      </div>
                      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 font-black text-amber-900">
                        ⭐ Carbon Offset Hero
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {mobileTab === "profile" && (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-3">
                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" alt="avatar" className="w-20 h-20 rounded-full mx-auto object-cover shadow-md" />
                    <div>
                      <h4 className="font-black text-lg text-slate-900">Arjun Krishna</h4>
                      <p className="text-xs text-slate-500 font-bold">College of Engineering Trivandrum</p>
                    </div>
                    <span className="bg-green-100 text-green-900 font-black text-[10px] px-3 py-1 rounded-full inline-block">
                      Role: {role} Premium Member
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Navigation Bar */}
            <div className="bg-white border-t border-slate-200 p-2 flex items-center justify-around z-20 shrink-0">
              {[
                { id: "home", label: "Explore", icon: Home },
                { id: "orders", label: "My QRs", icon: QrCode, badge: reservedOrders.length },
                { id: "wallet", label: "Eco Points", icon: Award },
                { id: "profile", label: "Profile", icon: User },
              ].map((b) => {
                const Icon = b.icon;
                const isSel = mobileTab === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setMobileTab(b.id as any)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition relative cursor-pointer ${
                      isSel ? "text-green-700 font-black scale-110" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px]">{b.label}</span>
                    {b.badge !== undefined && b.badge > 0 && (
                      <span className="absolute top-1 right-3 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {b.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Smartphone Bottom Home Gesture Bar */}
            <div className="bg-white pb-2 pt-1 flex justify-center z-20 shrink-0">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>

          </div>
        </div>
      </div>

      {/* Internal Meal Modal inside Mobile app */}
      {selectedMeal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95">
            <img src={selectedMeal.image} alt="food" className="w-full h-40 object-cover rounded-2xl shadow-sm" />
            <h3 className="font-black text-lg text-slate-900">{selectedMeal.name}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedMeal.description}</p>
            <div className="text-2xl font-black text-green-700">₹{selectedMeal.discountPrice}</div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMeal(null)}
                className="flex-1 p-3 bg-slate-100 font-bold text-xs rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => {
                  reserveMeal(selectedMeal, 1, "RAZORPAY");
                  setSelectedMeal(null);
                  setMobileTab("orders");
                }}
                className="flex-1 p-3 bg-green-700 hover:bg-green-800 text-white font-black text-xs rounded-xl shadow-lg"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
