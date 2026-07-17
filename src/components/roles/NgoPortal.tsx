"use client";

import React, { useState } from "react";
import { useApp, Meal, Donation } from "@/context/AppContext";
import { t } from "@/utils/translations";
import {
  HeartHandshake,
  AlertCircle,
  Truck,
  CheckCircle2,
  Navigation,
  QrCode,
  MapPin,
  Clock,
  Calendar,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";

export function NgoPortal() {
  const { language, meals, donations, acceptDonation } = useApp();

  const [activeTab, setActiveTab] = useState<"alerts" | "active" | "history">("alerts");
  const [scheduleTime, setScheduleTime] = useState("Today, 07:15 PM");
  const [selectedDonationForMap, setSelectedDonationForMap] = useState<Donation | null>(null);

  // Available donations (meals where isDonation === true or status === 'DONATION_READY')
  const availableDonations = meals.filter((m) => m.isDonation && m.availableQuantity > 0);

  // My accepted donations
  const myDonations = donations;

  const handleAccept = (meal: Meal) => {
    acceptDonation(meal, scheduleTime);
    setActiveTab("active");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* NGO Hero Hub Header */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-800 to-green-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10 max-w-2xl">
          <span className="bg-teal-500/30 text-teal-200 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider border border-teal-400/30 flex items-center gap-1.5 w-fit">
            <HeartHandshake className="w-4 h-4 text-teal-300" /> Community Kitchen & NGO Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Hope Campus Initiative</h1>
          <p className="text-teal-100 text-sm font-normal leading-relaxed">
            ZeroBite partners with verified food banks and NGOs to rescue bulk surplus food from campus events and canteens absolutely free of cost.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-4 relative z-10 shrink-0">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shadow-lg">
            <div className="text-3xl font-black text-teal-300">850</div>
            <div className="text-xs text-white/80 font-bold mt-0.5">Meals Rescued</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shadow-lg">
            <div className="text-3xl font-black text-emerald-300">425 Kg</div>
            <div className="text-xs text-white/80 font-bold mt-0.5">CO₂ Offset</div>
          </div>
        </div>
      </div>

      {/* Urgent Notice Banner */}
      {availableDonations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 p-6 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-purple-400 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-purple-300 shrink-0" />
            <div>
              <h3 className="font-black text-lg text-white">🚨 Live Donation Emergency Alert</h3>
              <p className="text-xs text-purple-200 font-medium">
                {availableDonations.length} bulk surplus food batches are waiting for immediate NGO rescue before college closing hours!
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("alerts")}
            className="bg-white hover:bg-purple-50 text-purple-950 font-black text-xs px-6 py-3 rounded-2xl shadow-lg transition whitespace-nowrap cursor-pointer"
          >
            Inspect Available Donations
          </button>
        </div>
      )}

      {/* Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto border border-slate-200">
        {[
          { id: "alerts", name: "Nearby Donation Alerts (" + availableDonations.length + ")", icon: AlertCircle },
          { id: "active", name: "Scheduled Pickups & Live Navigation", icon: Truck, badge: myDonations.filter((d) => d.status === "ACCEPTED").length },
          { id: "history", name: "Donation Impact History", icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs transition whitespace-nowrap ${
                isActive ? "bg-white text-green-800 shadow-md scale-102" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-green-700" : ""}`} />
              <span>{tab.name}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: NEARBY URGENT DONATION ALERTS */}
      {activeTab === "alerts" && (
        <div className="space-y-6">
          <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-purple-700" /> Available Event & Cafeteria Surplus Claims
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableDonations.map((meal) => (
              <div key={meal.id} className="bg-white rounded-3xl border-2 border-purple-200 shadow-lg p-8 space-y-6 hover:shadow-2xl transition flex flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="bg-purple-100 text-purple-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      🎁 100% Free Verified Donation
                    </span>
                    <h4 className="font-black text-2xl text-slate-900 mt-2">{meal.name}</h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">{meal.description}</p>
                  </div>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={meal.image} alt="food" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-black text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-green-700" /> Donor: Campus Central Canteen
                    </span>
                    <span className="text-purple-700 font-mono">{meal.availableQuantity} Bulk Servings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" /> Complete Expiry Deadline:
                    </span>
                    <span>{new Date(meal.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Pickup scheduler */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 w-full sm:w-44 focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <button
                    onClick={() => handleAccept(meal)}
                    className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-purple-700/30 flex items-center justify-center gap-2 text-sm transition cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Claim & Dispatch Driver</span>
                  </button>
                </div>
              </div>
            ))}

            {availableDonations.length === 0 && (
              <div className="col-span-2 text-center bg-white p-16 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h4 className="font-black text-xl text-slate-800">No Pending NGO Donation Claims</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  All surplus meals have been successfully sold to students or already rescued! You will receive an instant push alert as soon as commercial cafeterias close for the night.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SCHEDULED PICKUPS & LIVE NAVIGATION */}
      {activeTab === "active" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-900 to-emerald-900 p-6 rounded-3xl text-white flex items-center justify-between shadow-lg">
            <div>
              <h3 className="text-xl font-black flex items-center gap-2">
                <Navigation className="w-6 h-6 text-teal-400 animate-spin" /> Live Fleet Route & Verification Codes
              </h3>
              <p className="text-xs text-teal-100 mt-1">
                Share the QR Code with your collection driver to present at the college cafeteria security gate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myDonations.map((don) => {
              const isDone = don.status === "PICKED_UP";

              return (
                <div key={don.id} className={`bg-white rounded-3xl border-2 ${
                  isDone ? "border-slate-200 bg-slate-50 opacity-80" : "border-teal-400 shadow-xl"
                } p-8 space-y-6 flex flex-col justify-between transition`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                        isDone ? "bg-slate-200 text-slate-700" : "bg-teal-100 text-teal-900 border border-teal-300 animate-pulse"
                      }`}>
                        {isDone ? "✔ Completed Pickup" : "🚚 Active Driver Navigation"}
                      </span>
                      <h4 className="font-black text-2xl text-slate-900 mt-2">Bulk Veg Fried Rice & Dal</h4>
                      <p className="text-xs text-slate-500 font-bold mt-1">Donor: Campus Central Canteen</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-teal-700">{don.foodQuantity}</div>
                      <div className="text-xs text-slate-500 font-bold">Servings Rescued</div>
                    </div>
                  </div>

                  {/* Interactive Simulated Live Map Visualizer */}
                  {!isDone && (
                    <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-inner">
                      <div className="flex items-center justify-between text-xs font-black text-teal-300 pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1.5">
                          <Navigation className="w-4 h-4 text-teal-400 animate-pulse" /> Live Google Map GPS Simulator
                        </span>
                        <span>ETA: 12 mins (3.2 km)</span>
                      </div>

                      {/* Radar Animation Box */}
                      <div className="h-32 bg-slate-950 rounded-xl flex items-center justify-between px-6 relative overflow-hidden border border-slate-800 font-mono text-xs">
                        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                        <div className="text-center relative z-10 space-y-1">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black mx-auto shadow-md shadow-blue-500/50">
                            NGO
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold">Hope Hub</div>
                        </div>

                        {/* Animated vehicle dot */}
                        <div className="flex-1 flex items-center justify-center relative z-10 px-4">
                          <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/50 w-8 animate-ping" />
                          </div>
                          <Truck className="w-6 h-6 text-teal-400 absolute animate-bounce" />
                        </div>

                        <div className="text-center relative z-10 space-y-1">
                          <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-black mx-auto shadow-md shadow-green-500/50">
                            CET
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold">Canteen</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1">
                        <span>Driver: Subhash M. (KL-01-BK-4019)</span>
                        <a
                          href="https://maps.google.com/?q=College+of+Engineering+Trivandrum"
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-400 hover:underline"
                        >
                          Open Google Maps↗
                        </a>
                      </div>
                    </div>
                  )}

                  {/* QR Box */}
                  <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-2">
                    <div className="font-mono text-2xl font-black text-teal-950 tracking-widest bg-white py-2 rounded-xl border border-teal-300 shadow-sm max-w-xs mx-auto">
                      {don.qrCode}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Driver must show this code to security officer at collection gate for audit scanning.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DONATION HISTORY */}
      {activeTab === "history" && (
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" /> Official Verified Donation Records
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-black text-slate-500 uppercase">
                  <th className="py-4 px-4">Verification QR</th>
                  <th className="py-4 px-4">Food Item & Source</th>
                  <th className="py-4 px-4">Quantity Rescued</th>
                  <th className="py-4 px-4">Communities Benefited</th>
                  <th className="py-4 px-4">Impact Audit Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-4 font-mono font-black text-purple-800">{d.qrCode}</td>
                    <td className="py-4 px-4">
                      <div className="font-black text-slate-900">Bulk Veg Fried Rice</div>
                      <div className="text-[10px] text-slate-500 font-medium">Campus Central Canteen</div>
                    </td>
                    <td className="py-4 px-4 text-emerald-700 font-black text-sm">{d.foodQuantity} Servings</td>
                    <td className="py-4 px-4 text-slate-600 font-medium max-w-xs">{d.communitiesServed}</td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg text-[10px] font-black inline-block">
                        ✔ {d.impactRecordedKg}kg CO₂ Avoided
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
