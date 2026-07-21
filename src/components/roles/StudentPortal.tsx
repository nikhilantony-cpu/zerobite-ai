"use client";

import React, { useState } from "react";
import { useApp, Meal, Vendor, Coupon } from "@/context/AppContext";
import { t } from "@/utils/translations";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  Sparkles,
  QrCode,
  CheckCircle2,
  Star,
  ShoppingBag,
  Award,
  Gift,
  Heart,
  ExternalLink,
  Wallet,
  CreditCard,
  ShieldCheck,
  Navigation,
  ChevronRight,
} from "lucide-react";

export function StudentPortal() {
  const {
    language,
    meals,
    orders,
    vendors,
    coupons,
    reserveMeal,
    studentWallet,
    studentEcoPoints,
    redeemCoupon,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"surplus" | "reservations" | "gamification" | "favorites">("surplus");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(200);
  const [maxDistance, setMaxDistance] = useState(5.0); // km

  // Modals
  const [selectedMealForDetail, setSelectedMealForDetail] = useState<Meal | null>(null);
  const [selectedMealForPay, setSelectedMealForPay] = useState<Meal | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const [reserveQuantity, setReserveQuantity] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([1, 2]); // Vendor IDs

  // Filter meals
  const filteredMeals = meals.filter((m) => {
    if (m.isDonation) return false; // Available for NGOs
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== "ALL" && m.category !== selectedCategory) return false;
    if (m.discountPrice > maxPrice) return false;
    // simulated vendor distance check (we can map vendor ID to a distance)
    const vDist = m.vendorId === 1 ? 0.8 : m.vendorId === 2 ? 1.5 : 3.2;
    if (vDist > maxDistance) return false;
    return true;
  });

  const toggleFavorite = (vid: number) => {
    if (favorites.includes(vid)) {
      setFavorites(favorites.filter((id) => id !== vid));
    } else {
      setFavorites([...favorites, vid]);
    }
  };

  const handleExecutePayment = (meal: Meal) => {
    const success = reserveMeal(meal, reserveQuantity, paymentMethod);
    if (success) {
      setSelectedMealForPay(null);
      setSelectedMealForDetail(null);
      setActiveTab("reservations");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Hero Sustainability Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-900 p-8 sm:p-12 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-10 hidden lg:block">
          <div className="w-48 h-48 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl rotate-3 hover:rotate-0 transition duration-300">
            <div className="flex items-center justify-between text-emerald-300 font-bold text-xs">
              <span>Eco Impact</span>
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <div className="text-3xl font-black">78.5 Kg</div>
              <div className="text-xs text-white/80">CO₂ Prevented This Month</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <span className="bg-emerald-500/30 font-extrabold text-emerald-200 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-400/30">
            🌿 Green Campus Initiative
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t(language, "student_hero_title")}
          </h1>
          <p className="mt-3 text-emerald-100 text-sm sm:text-base font-normal leading-relaxed">
            {t(language, "student_hero_subtitle")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#surplus-section"
              className="bg-white text-green-900 font-black px-6 py-3.5 rounded-2xl shadow-lg hover:bg-green-50 hover:scale-105 transition duration-300 flex items-center gap-2 text-sm"
            >
              <ShoppingBag className="w-4 h-4 text-green-700" />
              Explore Surplus Meals
            </a>
            <button
              onClick={() => setActiveTab("gamification")}
              className="bg-green-600/60 backdrop-blur-sm hover:bg-green-600 font-bold text-white px-6 py-3.5 rounded-2xl border border-white/20 transition duration-300 flex items-center gap-2 text-sm"
            >
              <Award className="w-4 h-4 text-amber-300" />
              Redeem Eco Rewards
            </button>
          </div>
        </div>
      </div>

      {/* ZeroBite AI Real Assistant Benefits Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black bg-gradient-to-r from-green-800 to-emerald-950 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-700 animate-pulse" />
              <span>Meet Your ZeroBite AI Food Advisor</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              ZeroBite AI solving problems you actually face daily. Click any card to launch query!
            </p>
          </div>
          <button
            onClick={() => {
              const event = new CustomEvent("open-zero-bite-ai", { detail: { query: "" } });
              window.dispatchEvent(event);
            }}
            className="bg-green-750 hover:bg-green-800 text-white font-black text-xs px-5 py-3 rounded-xl transition duration-350 shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
          >
            <span>Open Chat Assistant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 scrollbar-none">
          {[
            {
              title: t(language, "ai_benefit_1"),
              desc: t(language, "ai_benefit_1_desc"),
              icon: QrCode,
              color: "bg-emerald-50/60 border-emerald-200 text-emerald-800 hover:bg-emerald-100/50 hover:border-emerald-300",
              query: "How does food scanning work on ZeroBite?"
            },
            {
              title: t(language, "ai_benefit_2"),
              desc: t(language, "ai_benefit_2_desc"),
              icon: Clock,
              color: "bg-amber-50/60 border-amber-250 text-amber-800 hover:bg-amber-100/50 hover:border-amber-300",
              query: "What food is expiring next or available?"
            },
            {
              title: t(language, "ai_benefit_3"),
              desc: t(language, "ai_benefit_3_desc"),
              icon: ShoppingBag,
              color: "bg-teal-50/60 border-teal-200 text-teal-800 hover:bg-teal-100/50 hover:border-teal-300",
              query: "Can you help me turn leftovers into meals?"
            },
            {
              title: t(language, "ai_benefit_4"),
              desc: t(language, "ai_benefit_4_desc"),
              icon: Wallet,
              color: "bg-blue-50/60 border-blue-200 text-blue-800 hover:bg-blue-100/50 hover:border-blue-300",
              query: "How does ZeroBite help reduce waste and save money?"
            },
            {
              title: t(language, "ai_benefit_5"),
              desc: t(language, "ai_benefit_5_desc"),
              icon: Sparkles,
              color: "bg-purple-50/60 border-purple-200 text-purple-800 hover:bg-purple-100/50 hover:border-purple-300",
              query: "Give me personalized food advice or storage tips."
            }
          ].map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                onClick={() => {
                  const event = new CustomEvent("open-zero-bite-ai", { detail: { query: b.query } });
                  window.dispatchEvent(event);
                }}
                className={`p-5 border rounded-2.5xl cursor-pointer hover:scale-102 hover:shadow-xs transition-all duration-300 flex flex-col justify-between space-y-3 shrink-0 w-[260px] snap-start sm:w-auto ${b.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-xs border border-inherit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider opacity-60">
                    ADVICE 💡
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-slate-900 leading-snug">{b.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-normal">{b.desc}</p>
                </div>
                <span className="text-[10px] font-black underline hover:no-underline transition self-start flex items-center gap-0.5">
                  Ask Advisor
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto border border-slate-200">
        {[
          { id: "surplus", name: t(language, "surplus_meals"), icon: Sparkles },
          { id: "reservations", name: t(language, "reservations_tab"), icon: QrCode, badge: orders.filter((o) => o.status === "RESERVED").length },
          { id: "gamification", name: t(language, "gamification_tab"), icon: Award },
          { id: "favorites", name: "Favorite Cafeterias", icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs transition whitespace-nowrap ${isActive ? "bg-white text-green-800 shadow-md scale-102" : "text-slate-600 hover:text-slate-900"
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

      {/* 1. SURPLUS MEALS TAB */}
      {activeTab === "surplus" && (
        <div id="surplus-section" className="space-y-6">
          {/* Search & Filters */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(language, "search_placeholder")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 font-medium text-slate-900 focus:outline-hidden focus:border-green-600 focus:bg-white transition text-sm"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {[
                  { id: "ALL", label: t(language, "filter_all") },
                  { id: "VEG", label: t(language, "filter_veg") },
                  { id: "NON_VEG", label: t(language, "filter_nonveg") },
                  { id: "BAKERY", label: t(language, "filter_bakery") },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition ${selectedCategory === cat.id
                      ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Distance Sliders */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-3 border-t border-slate-100 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-4 w-full sm:w-1/2">
                <SlidersHorizontal className="w-4 h-4 text-green-700 shrink-0" />
                <span className="w-24">Max Price: ₹{maxPrice}</span>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-green-700 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-1/2">
                <MapPin className="w-4 h-4 text-green-700 shrink-0" />
                <span className="w-32">Max Distance: {maxDistance} km</span>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-green-700 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => {
              const vendor = vendors.find((v) => v.id === meal.vendorId);
              const isFav = favorites.includes(meal.vendorId);
              const isSoldOut = meal.status === "SOLD_OUT" || meal.availableQuantity === 0;

              // Calculate discount percentage
              const discountPct = Math.round(((meal.originalPrice - meal.discountPrice) / meal.originalPrice) * 100);

              return (
                <div
                  key={meal.id}
                  className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${isSoldOut ? "opacity-60 grayscale hover:grayscale-0" : "hover:-translate-y-1"
                    }`}
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg animate-pulse">
                      {discountPct}% OFF
                    </div>

                    <button
                      onClick={() => toggleFavorite(meal.vendorId)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:text-red-600 hover:scale-110 shadow-lg transition"
                    >
                      <Heart className={`w-5 h-5 ${isFav ? "fill-red-600 text-red-600" : ""}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{meal.pickupWindowStart} - {meal.pickupWindowEnd}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-green-700" />
                          {vendor?.cafeteriaName}
                        </span>
                        <span className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {vendor?.rating}
                        </span>
                      </div>

                      <h3 className="font-black text-lg text-slate-900 line-clamp-1 mt-1">{meal.name}</h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 font-normal">{meal.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-green-700">₹{meal.discountPrice}</span>
                          <span className="text-xs font-bold text-slate-400 line-through">₹{meal.originalPrice}</span>
                        </div>
                        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {meal.availableQuantity} left in stock
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMealForDetail(meal)}
                          className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition"
                          title="Details"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedMealForPay(meal)}
                          disabled={isSoldOut}
                          className={`px-5 py-3 rounded-xl font-black text-xs transition duration-300 flex items-center gap-1.5 ${isSoldOut ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/30"
                            }`}
                        >
                          <QrCode className="w-4 h-4" />
                          <span>{isSoldOut ? t(language, "sold_out") : t(language, "reserve_btn")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMeals.length === 0 && (
            <div className="text-center bg-white p-16 rounded-3xl border border-slate-200 shadow-sm">
              <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto animate-bounce" />
              <h3 className="mt-4 font-black text-xl text-slate-800">No Surplus Meals match your filter</h3>
              <p className="mt-2 text-slate-500 text-sm max-w-md mx-auto">
                Try widening your price/distance slider or switching to another food category. Vendors update listings twice daily!
              </p>
              <button
                onClick={() => { setSelectedCategory("ALL"); setMaxPrice(250); setMaxDistance(10.0); setSearchQuery(""); }}
                className="mt-6 bg-green-700 text-white font-black px-6 py-3 rounded-2xl shadow-md hover:bg-green-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. MY RESERVATIONS & QR PICKUP TAB */}
      {activeTab === "reservations" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-900 to-green-800 p-6 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                <QrCode className="w-6 h-6 text-emerald-400" /> My Active Meal Pickups & Verification QRs
              </h2>
              <p className="text-xs text-emerald-100 mt-1">
                Present your QR Code or unique PIN to the cafeteria counter staff upon arrival.
              </p>
            </div>
            <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700 text-xs text-emerald-200 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Guaranteed Reserve Status
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((ord) => {
              const meal = meals.find((m) => m.id === ord.mealId);
              const vendor = vendors.find((v) => v.id === ord.vendorId);
              const isPickedUp = ord.status === "PICKED_UP";

              return (
                <div
                  key={ord.id}
                  className={`bg-white rounded-3xl border ${isPickedUp ? "border-slate-200 bg-slate-50/50" : "border-green-300 shadow-xl shadow-green-700/10"
                    } p-6 flex flex-col justify-between transition-all`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 shadow-sm">
                        <img src={meal?.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200"} alt="food" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isPickedUp ? "bg-slate-200 text-slate-700" : "bg-green-100 text-green-800 border border-green-300 animate-pulse"
                          }`}>
                          {isPickedUp ? "✔ Complete & Enjoyed" : "⏳ Active Reservation"}
                        </span>
                        <h3 className="font-black text-lg text-slate-900 mt-1">{meal?.name || "Surplus Meal"}</h3>
                        <p className="text-xs text-slate-500 font-bold">{vendor?.cafeteriaName}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">₹{ord.totalPrice}</div>
                      <div className="text-xs text-slate-500 font-bold">{ord.quantity} portions</div>
                    </div>
                  </div>

                  {/* QR Code Presentation Box */}
                  <div className="mt-6 p-6 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-200 text-center space-y-3 shadow-inner">
                    <div className="flex justify-center">
                      <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-slate-900 flex flex-col items-center justify-center">
                        {/* Simulated high-contrast SVG QR */}
                        <div className="w-36 h-36 border-4 border-black p-2 bg-black text-white flex flex-col items-center justify-center font-mono text-xs rounded-xl shadow-inner gap-2">
                          <QrCode className="w-16 h-16 text-emerald-400 animate-pulse" />
                          <span className="bg-white text-black font-black px-2 py-0.5 rounded-sm">
                            {ord.qrCode}
                          </span>
                        </div>
                        <div className="mt-2 text-xs font-black text-slate-800 tracking-widest">
                          PIN: {ord.qrCode.slice(-4)}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                      Scan this QR code at the cafeteria or state the 4-digit PIN for instant touchless fulfillment.
                    </p>

                    {!isPickedUp && (
                      <div className="pt-2 flex items-center justify-center gap-2">
                        <a
                          href={"https://maps.google.com/?q=" + encodeURIComponent((vendor?.cafeteriaName || "") + " " + (vendor?.location || ""))}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Live Walking Map</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Payment Method: {ord.paymentMethod}</span>
                    <span>Order Date: {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. GAMIFICATION & ECO REWARDS TAB */}
      {activeTab === "gamification" && (
        <div className="space-y-8">
          {/* Points Banner */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="bg-amber-400/30 text-amber-100 text-xs font-extrabold px-3 py-1 rounded-full uppercase border border-amber-300/40">
                ⭐ ZeroBite Eco Points Program
              </span>
              <h2 className="text-3xl font-black tracking-tight">You are a &quot;Waste Warrior&quot; Level 3</h2>
              <p className="text-sm text-amber-100 max-w-lg leading-relaxed">
                Every surplus meal you reserve earns you 25 Eco Points and prevents approx. 0.8kg of CO₂ emissions. Climb the Campus Sustainability Leaderboard to unlock 100% Free VIP Dining!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-1 min-w-48 shadow-lg">
              <Award className="w-12 h-12 text-amber-300 mx-auto animate-bounce" />
              <div className="text-4xl font-black">{studentEcoPoints}</div>
              <div className="text-xs font-bold text-amber-200">Total Eco Points Available</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Campus Leaderboard */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-lg border border-slate-200 space-y-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-700" /> Campus Leaderboard
              </h3>

              <div className="space-y-3">
                {[
                  { rank: 1, name: "Priya Sharma", campus: "Hostel Block A", points: 520, badge: "Green Champion 👑" },
                  { rank: 2, name: "Arjun Krishna (You)", campus: "College of Engg", points: studentEcoPoints, badge: "Waste Warrior ⚡" },
                  { rank: 3, name: "Kiran Matthew", campus: "Medical College", points: 290, badge: "Donation Hero 💚" },
                  { rank: 4, name: "Ananya Patel", campus: "Law Campus", points: 210, badge: "Eco Ally" },
                  { rank: 5, name: "Rohit Varma", campus: "Hostel Block C", points: 180, badge: "Eco Starter" },
                ].map((lb) => (
                  <div
                    key={lb.rank}
                    className={`p-4 rounded-2xl flex items-center justify-between border transition ${lb.name.includes("(You)")
                      ? "bg-green-50/80 border-green-300 shadow-sm font-black"
                      : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${lb.rank === 1 ? "bg-amber-400 text-black shadow-md" : lb.rank === 2 ? "bg-slate-300 text-black" : "bg-slate-200 text-slate-700"
                        }`}>
                        #{lb.rank}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{lb.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{lb.badge}</div>
                      </div>
                    </div>
                    <div className="text-xs font-black text-green-800">{lb.points} Pts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redeemable Coupons Grid */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-lg border border-slate-200 space-y-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-red-600" /> Unlock & Redeem Exclusive Coupons
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coupons.map((c) => (
                  <div key={c.id} className="bg-gradient-to-br from-green-50 to-slate-50 border-2 border-green-200 rounded-2xl p-5 flex flex-col justify-between relative shadow-xs hover:shadow-md transition">
                    <div className="absolute top-0 right-0 bg-green-700 text-white font-black text-[10px] px-3 py-1 rounded-bl-2xl rounded-tr-xl">
                      -{c.discountPercent}% OFF
                    </div>

                    <div>
                      <div className="font-mono font-black text-xl text-green-900 tracking-wider">{c.code}</div>
                      <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">{c.description}</p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-green-200/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-600" /> {c.pointsRequired} Pts required
                      </span>

                      <button
                        onClick={() => redeemCoupon(c)}
                        className="bg-green-700 hover:bg-green-800 text-white text-xs font-black px-4 py-2 rounded-xl shadow-sm transition"
                      >
                        Redeem Voucher
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FAVORITE CAFETERIAS TAB */}
      {activeTab === "favorites" && (
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-600 fill-red-600" /> My Favorite Messes & Cafeterias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((v) => {
              const isFav = favorites.includes(v.id);
              if (!isFav) return null;
              return (
                <div key={v.id} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4 hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-800 text-xs font-black px-3 py-1 rounded-full">
                      {v.foodCategory}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-800 text-xs bg-amber-100 px-2.5 py-1 rounded-xl">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {v.rating}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-lg text-slate-900">{v.cafeteriaName}</h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" /> {v.location}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black text-slate-700">
                    <span>{v.totalMealsSaved} Meals Saved</span>
                    <span>{v.co2ReducedKg}kg CO₂ Avoided</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MEAL DETAILS MODAL */}
      {selectedMealForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="relative h-64">
              <img src={selectedMealForDetail.image} alt="food" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedMealForDetail(null)}
                className="absolute top-4 right-4 bg-slate-900/80 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold hover:bg-slate-900"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 rounded-2xl font-black text-sm shadow-lg">
                {selectedMealForDetail.category} Surplus
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{selectedMealForDetail.name}</h3>
                <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed">{selectedMealForDetail.description}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-2xl border border-green-200 flex items-center justify-between text-xs font-bold text-green-950">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-green-700" /> Expiry / Best Before:
                </span>
                <span>{new Date(selectedMealForDetail.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <div className="text-xs font-bold text-slate-500">Super Discount Price</div>
                  <div className="text-3xl font-black text-green-700">₹{selectedMealForDetail.discountPrice}</div>
                </div>
                <button
                  onClick={() => {
                    const m = selectedMealForDetail;
                    setSelectedMealForDetail(null);
                    setSelectedMealForPay(m);
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-green-700/30 flex items-center gap-2 text-sm"
                >
                  <QrCode className="w-5 h-5" /> Reserve This Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ONLINE PAYMENT SIMULATOR MODAL */}
      {selectedMealForPay && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-green-700" /> Online Payment Secure Checkout
              </h3>
              <button
                onClick={() => setSelectedMealForPay(null)}
                className="text-slate-400 hover:text-slate-900 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Order summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-black text-sm text-slate-900">{selectedMealForPay.name}</div>
                <div className="text-xs text-slate-500 font-medium">₹{selectedMealForPay.discountPrice} per portion</div>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setReserveQuantity(Math.max(1, reserveQuantity - 1))}
                  className="font-black text-xs text-slate-700 hover:text-black px-1"
                >
                  -
                </button>
                <span className="font-black text-sm text-slate-900">{reserveQuantity}</span>
                <button
                  onClick={() => setReserveQuantity(Math.min(selectedMealForPay.availableQuantity, reserveQuantity + 1))}
                  className="font-black text-xs text-slate-700 hover:text-black px-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total calculation */}
            <div className="flex items-center justify-between text-base font-black text-slate-900 px-2">
              <span>Total Payable Amount</span>
              <span className="text-2xl text-green-700">₹{(selectedMealForPay.discountPrice * reserveQuantity).toFixed(2)}</span>
            </div>

            {/* Select gateway */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Select Gateway / Wallet</label>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: "RAZORPAY", name: "Razorpay Secure (UPI / Cards)", desc: "Instant Google Pay, PhonePe, Paytm, RuPay", icon: ShieldCheck },
                  { id: "STRIPE", name: "Stripe International", desc: "Apple Pay, Mastercard, Visa Secure", icon: CreditCard },
                  { id: "WALLET", name: "Student ZeroBite Wallet (₹" + studentWallet.toFixed(0) + ")", desc: "One-click 0-fee touchless payment", icon: Wallet },
                ].map((gw) => {
                  const Icon = gw.icon;
                  const isSel = paymentMethod === gw.id;
                  return (
                    <div
                      key={gw.id}
                      onClick={() => setPaymentMethod(gw.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition ${isSel ? "border-green-700 bg-green-50/60 shadow-xs" : "border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${isSel ? "text-green-700" : "text-slate-500"}`} />
                        <div>
                          <div className="font-black text-xs text-slate-900">{gw.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{gw.desc}</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSel ? "border-green-700 bg-green-700 text-white" : "border-slate-300"
                        }`}>
                        {isSel && "✔"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => handleExecutePayment(selectedMealForPay)}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-700/30 flex items-center justify-center gap-2 text-base transition"
            >
              <span>Authorize & Generate Pickup QR Code</span>
              <Sparkles className="w-5 h-5 animate-spin" />
            </button>

            <div className="text-center text-[10px] text-slate-400 font-semibold">
              🔒 Fully encrypted via 256-bit SSL Certificate. Instant pickup guarantee.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
