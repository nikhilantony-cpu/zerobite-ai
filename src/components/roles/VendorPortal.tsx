"use client";

import React, { useState } from "react";
import { useApp, Meal, Order } from "@/context/AppContext";
import { t } from "@/utils/translations";
import {
  TrendingUp,
  Store,
  Sparkles,
  QrCode,
  Package,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  PlusCircle,
  BarChart3,
  Trash2,
  Clock,
  MapPin,
  Camera,
} from "lucide-react";

export function VendorPortal() {
  const {
    language,
    vendors,
    meals,
    orders,
    donations,
    predictions,
    confirmPickup,
    uploadSurplusMeal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"listings" | "scan" | "analytics" | "ai">("listings");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // QR Scanning Simulator state
  const [scanInput, setScanInput] = useState("");
  const [lastScanResult, setLastScanResult] = useState<{ success: boolean; msg: string } | null>(null);

  // Upload Form state
  const [formName, setFormName] = useState("");
  const [formImage, setFormImage] = useState("https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600");
  const [formOrigPrice, setFormOrigPrice] = useState(150);
  const [formDiscPrice, setFormDiscPrice] = useState(60);
  const [formQty, setFormQty] = useState(10);
  const [formExpiry, setFormExpiry] = useState("08:00 PM");
  const [formPickupStart, setFormPickupStart] = useState("05:30 PM");
  const [formPickupEnd, setFormPickupEnd] = useState("07:30 PM");
  const [formCategory, setFormCategory] = useState("NON_VEG");
  const [formDesc, setFormDesc] = useState("");
  const [formIsDonation, setFormIsDonation] = useState(false);

  // Current vendor (Cafeteria 1)
  const vendor = vendors[0] || {
    cafeteriaName: "Campus Central Canteen",
    location: "Main Academic Block",
    foodCategory: "Indian",
    rating: 4.8,
    totalMealsSaved: 342,
    wastePreventedKg: 171.0,
    revenueSaved: 12540.0,
    co2ReducedKg: 427.5,
  };

  const myMeals = meals.filter((m) => m.vendorId === 1);
  const myOrders = orders.filter((o) => o.vendorId === 1);

  const handleTriggerScan = (codeToScan: string) => {
    const success = confirmPickup(codeToScan);
    setLastScanResult({
      success,
      msg: success ? "✔ Pickup successfully fulfilled and verified! Inventory adjusted." : "❌ Invalid QR code or item already redeemed.",
    });
    setScanInput("");
  };

  const handleAiAutofill = () => {
    setFormName("Evening Special Chicken Biryani (Surplus)");
    setFormOrigPrice(160);
    setFormDiscPrice(65);
    setFormQty(15);
    setFormCategory("NON_VEG");
    setFormDesc("Auto-detected remaining evening dum batch. Perfectly warm and fresh for student takeaway.");
    alert("⚡ AI Waste Sensor auto-filled suggested quantity and optimal discount pricing!");
  };

  const handleExecuteUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formDesc) {
      alert("Please enter meal name and description.");
      return;
    }
    uploadSurplusMeal({
      vendorId: 1,
      name: formName,
      image: formImage,
      originalPrice: Number(formOrigPrice),
      discountPrice: formIsDonation ? 0 : Number(formDiscPrice),
      quantity: Number(formQty),
      expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 4),
      pickupWindowStart: formPickupStart,
      pickupWindowEnd: formPickupEnd,
      category: formCategory,
      description: formDesc,
      isDonation: formIsDonation,
    });
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Vendor Hub Header */}
      <div className="rounded-3xl bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-400/30">
              🏪 Professional Cafeteria Dashboard
            </span>
            <span className="bg-amber-400/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
              ⭐ {vendor.rating} Top Rated
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{vendor.cafeteriaName}</h1>
          <p className="text-emerald-100 text-sm font-medium flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" /> {vendor.location}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 relative z-10">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-white hover:bg-green-50 text-green-950 font-black px-6 py-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300 flex items-center gap-2 text-sm cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-green-700" />
            <span>{t(language, "upload_meal_btn")}</span>
          </button>
          <button
            onClick={() => setActiveTab("scan")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300 flex items-center gap-2 text-sm cursor-pointer"
          >
            <QrCode className="w-5 h-5" />
            <span>{t(language, "scan_qr_btn")}</span>
          </button>
        </div>
      </div>

      {/* Revenue & Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: t(language, "revenue_today"), value: "₹" + vendor.revenueSaved.toFixed(0), icon: DollarSign, color: "from-emerald-500 to-green-600" },
          { title: t(language, "meals_sold"), value: vendor.totalMealsSaved + " Meals", icon: Package, color: "from-blue-500 to-indigo-600" },
          { title: t(language, "waste_prevented"), value: vendor.wastePreventedKg + " Kg", icon: Trash2, color: "from-amber-500 to-orange-600" },
          { title: t(language, "co2_saved"), value: vendor.co2ReducedKg + " Kg CO₂", icon: TrendingUp, color: "from-purple-500 to-pink-600" },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500">{m.title}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">{m.value}</h3>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mt-2 inline-block">
                  ✔ Verified via IoT Scale
                </span>
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center shadow-lg`}>
                <Icon className="w-7 h-7" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart AI Engine Banner Component */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-8 rounded-3xl text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-emerald-500/30 relative">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> Platform AI Engine Notice
            </span>
            <span className="text-xs text-emerald-300 font-mono font-bold">Prediction Model: ZeroBite-FastAPI-v4</span>
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white mt-1">
            "{predictions[0]?.smartAdvice || 'Prepare 35 fewer meals tomorrow.'}"
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Our neural network learned from your previous sales, exam schedule, Onam festival holidays, and tomorrow's heavy rainfall weather prediction (28°C) to calculate exactly how much food to cook.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/10 shrink-0">
          <div>
            <div className="text-xs font-bold text-slate-400">Predicted Demand</div>
            <div className="text-2xl font-black text-emerald-400">{predictions[0]?.predictedDemand || 140} Portions</div>
          </div>
          <div className="h-10 w-px bg-white/20 hidden sm:block" />
          <div>
            <div className="text-xs font-bold text-slate-400">Risk Level</div>
            <div className="text-sm font-black bg-red-600/80 text-white px-2.5 py-1 rounded-xl uppercase tracking-wider inline-block mt-1">
              {predictions[0]?.riskLevel || 'HIGH'} RISK
            </div>
          </div>
        </div>
      </div>

      {/* Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto border border-slate-200">
        {[
          { id: "listings", name: "Today's Live Listings (" + myMeals.length + ")", icon: Store },
          { id: "scan", name: "Scan & Verify QR Code", icon: QrCode },
          { id: "analytics", name: t(language, "daily_reports"), icon: BarChart3 },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs transition whitespace-nowrap ${
                isActive ? "bg-white text-green-800 shadow-md scale-102" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-green-700" : ""}`} />
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LISTINGS MANAGEMENT */}
      {activeTab === "listings" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-xl text-slate-900">Active Surplus Food Inventory</h3>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-green-700 hover:bg-green-800 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Post New Batch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myMeals.map((meal) => {
              const isSold = meal.availableQuantity === 0;

              return (
                <div
                  key={meal.id}
                  className={`bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md flex flex-col justify-between ${
                    isSold ? "opacity-70 bg-slate-50" : ""
                  }`}
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                    <span className={`absolute top-4 left-4 font-black text-xs px-3 py-1 rounded-full text-white shadow-lg ${
                      meal.isDonation ? "bg-purple-600" : "bg-green-700"
                    }`}>
                      {meal.isDonation ? "🎁 Free NGO Donation" : "🏷 Surplus Discount"}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-xs px-3 py-1 rounded-xl">
                      {meal.availableQuantity} / {meal.quantity} left
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-lg text-slate-900">{meal.name}</h4>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">{meal.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-black text-green-700">₹{meal.discountPrice}</div>
                        <div className="text-[10px] text-slate-400 font-bold line-through">₹{meal.originalPrice} original</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-black ${
                          isSold ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800 animate-pulse"
                        }`}>
                          {isSold ? "Sold Out" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: QR SCANNING SIMULATOR */}
      {activeTab === "scan" && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-200 max-w-3xl mx-auto space-y-8 text-center">
          <div>
            <div className="w-16 h-16 bg-green-100 text-green-800 rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
              <QrCode className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Touchless QR Code & PIN Fulfillment Scanner</h3>
            <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
              In the real mobile app, this opens the smartphone device camera. For this web dashboard, type the Student/NGO QR Code or click one of the quick test orders below!
            </p>
          </div>

          {/* Quick Trigger sample buttons */}
          <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-left space-y-3">
            <div className="text-xs font-black text-green-950 uppercase tracking-wider flex items-center justify-between">
              <span>⚡ Click to quickly simulate customer arrival</span>
              <span className="text-[10px] bg-green-200 px-2 py-0.5 rounded-md font-bold text-green-900">Test mode</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {orders.filter((o) => o.status === "RESERVED").map((o) => (
                <button
                  key={o.id}
                  onClick={() => handleTriggerScan(o.qrCode)}
                  className="bg-white hover:bg-green-700 hover:text-white text-slate-900 border border-green-300 font-mono font-black text-xs px-4 py-2.5 rounded-xl transition shadow-2xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Student QR: {o.qrCode}</span>
                  <span className="bg-green-100 text-green-900 px-1.5 py-0.5 rounded-md text-[10px]">{o.quantity} items</span>
                </button>
              ))}

              {orders.filter((o) => o.status === "RESERVED").length === 0 && (
                <div className="text-xs text-slate-500 font-bold italic py-2">
                  No unfulfilled standard student reservations remaining. Try making a new reservation in the Student Portal first!
                </div>
              )}
            </div>
          </div>

          {/* Manual Input Box */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="e.g. ZB-ORD-984120 or 4120"
              className="bg-slate-50 border-2 border-slate-300 px-5 py-3.5 rounded-2xl font-mono text-base font-bold text-slate-900 w-full sm:w-80 focus:outline-hidden focus:border-green-700 focus:bg-white transition"
            />
            <button
              onClick={() => handleTriggerScan(scanInput)}
              className="bg-green-700 hover:bg-green-800 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg transition w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Verify & Complete</span>
            </button>
          </div>

          {/* Last Result */}
          {lastScanResult && (
            <div className={`p-5 rounded-2xl font-black text-sm text-left animate-in fade-in slide-in-from-bottom-3 border ${
              lastScanResult.success ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-red-50 text-red-900 border-red-300"
            }`}>
              {lastScanResult.msg}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DAILY & MONTHLY ANALYTICS REPORTS */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-xl text-slate-900">Daily Food Waste Prevention Chart (Kg)</h3>
              <span className="bg-green-100 text-green-800 text-xs font-black px-3 py-1 rounded-full">
                Past 7 Days Output
              </span>
            </div>

            {/* Custom high-fidelity CSS Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-2 px-2 sm:px-8 border-b border-slate-200">
              {[
                { day: "Sat", waste: 45, saved: 32 },
                { day: "Sun", waste: 12, saved: 10 },
                { day: "Mon", waste: 60, saved: 50 },
                { day: "Tue", waste: 55, saved: 48 },
                { day: "Wed", waste: 40, saved: 35 },
                { day: "Thu", waste: 30, saved: 28 },
                { day: "Today", waste: 25, saved: 25 },
              ].map((bar, i) => {
                const heightPct = Math.round((bar.saved / 60) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="text-[10px] font-black text-slate-500 opacity-0 group-hover:opacity-100 transition">
                      {bar.saved}kg saved
                    </div>
                    <div className="w-full max-w-12 bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden p-1">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className="w-full bg-gradient-to-t from-green-700 to-emerald-500 rounded-t-lg transition-all duration-500 group-hover:from-green-600 group-hover:to-emerald-400 shadow-sm"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{bar.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-600 pt-2">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-t from-green-700 to-emerald-500 rounded-sm inline-block" />
                Surplus Rescued & Eaten
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-slate-200 rounded-sm inline-block" />
                Initial Surplus Available
              </span>
            </div>
          </div>

          {/* Report summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-8 rounded-3xl text-white shadow-lg space-y-4">
              <h4 className="font-black text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Platform AI Prediction Accuracy
              </h4>
              <div className="text-4xl font-black text-emerald-400">96.4%</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                By comparing historical cafeteria footfall with our weather triggers, the ZeroBite AI accurately predicted surplus volumes within a 4-meal margin for the entire week.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-700 to-emerald-800 p-8 rounded-3xl text-white shadow-lg space-y-4">
              <h4 className="font-black text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" /> Complete Tax & Donation Audit Export
              </h4>
              <p className="text-xs text-green-100 leading-relaxed">
                Export verified PDF & CSV records of all surplus food sold and all food packages donated to NGOs for formal college accreditations (NAAC / NBA / Green Campus Audits).
              </p>
              <button
                onClick={() => alert("📥 Downloaded formal NAAC Green Audit Report (ZeroBite_October_2026.pdf)")}
                className="bg-white text-green-900 font-black text-xs px-5 py-3 rounded-xl shadow-md hover:bg-green-50 transition cursor-pointer"
              >
                Download Monthly Green Audit PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD SURPLUS MEAL MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-slate-100 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-7 h-7 text-green-700" /> Post Today's Surplus Food Listing
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-900 font-black text-lg"
              >
                ✕
              </button>
            </div>

            {/* AI Suggestion Bar */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-600 shrink-0 animate-bounce" />
                <span className="text-xs font-bold text-amber-950">
                  Save time! Let ZeroBite's historical sales pattern engine auto-fill optimal surplus pricing & counts.
                </span>
              </div>
              <button
                type="button"
                onClick={handleAiAutofill}
                className="bg-amber-600 hover:bg-amber-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition shadow-xs whitespace-nowrap cursor-pointer"
              >
                {t(language, "auto_fill_ai")}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleExecuteUpload} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-black text-slate-700">Meal Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Malabar Chicken Biryani"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-900 text-sm focus:bg-white focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formOrigPrice}
                    onChange={(e) => setFormOrigPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-900 text-sm focus:bg-white focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700">Discount Price (₹) *</label>
                  <input
                    type="number"
                    required
                    disabled={formIsDonation}
                    value={formDiscPrice}
                    onChange={(e) => setFormDiscPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-900 text-sm focus:bg-white focus:border-green-700 focus:outline-hidden disabled:bg-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700">Quantity Available *</label>
                  <input
                    type="number"
                    required
                    value={formQty}
                    onChange={(e) => setFormQty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-900 text-sm focus:bg-white focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700">Food Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-900 text-sm focus:bg-white focus:border-green-700 focus:outline-hidden cursor-pointer"
                  >
                    <option value="VEG">Vegetarian (VEG)</option>
                    <option value="NON_VEG">Non-Vegetarian (NON_VEG)</option>
                    <option value="BAKERY">Bakery & Pastries (BAKERY)</option>
                    <option value="VEGAN">Strict Vegan (VEGAN)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-black text-slate-700">Pickup Window</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formPickupStart}
                      onChange={(e) => setFormPickupStart(e.target.value)}
                      placeholder="Start (e.g. 05:00 PM)"
                      className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-medium text-slate-900 text-xs"
                    />
                    <input
                      type="text"
                      value={formPickupEnd}
                      onChange={(e) => setFormPickupEnd(e.target.value)}
                      placeholder="End (e.g. 07:00 PM)"
                      className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 font-medium text-slate-900 text-xs"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-black text-slate-700">High-Resolution Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-900 text-xs focus:bg-white focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-black text-slate-700">Detailed Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Include food ingredients, flavor notes, packaging details..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-900 text-sm focus:bg-white focus:border-green-700 focus:outline-hidden"
                  />
                </div>

                {/* Is Donation Checkbox */}
                <div className="sm:col-span-2 p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isDon"
                    checked={formIsDonation}
                    onChange={(e) => {
                      setFormIsDonation(e.target.checked);
                      if (e.target.checked) setFormDiscPrice(0);
                    }}
                    className="w-5 h-5 accent-purple-700 cursor-pointer"
                  />
                  <label htmlFor="isDon" className="text-xs font-black text-purple-950 cursor-pointer">
                    Route directly to NGO Community Kitchens (100% Free Donation instead of surplus student sale)
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-black px-8 py-3.5 rounded-xl shadow-lg transition cursor-pointer"
                >
                  Publish Listing Immediately
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
