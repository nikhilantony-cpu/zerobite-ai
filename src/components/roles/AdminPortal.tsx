"use client";

import React, { useState } from "react";
import { useApp, Vendor, SupportTicket } from "@/context/AppContext";
import { t } from "@/utils/translations";
import {
  ShieldCheck,
  Users,
  TrendingUp,
  Store,
  HeartHandshake,
  Trash2,
  DollarSign,
  Send,
  Ticket,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Bell,
  Sparkles,
  BarChart3,
  RefreshCw,
  Gift,
} from "lucide-react";

export function AdminPortal() {
  const {
    language,
    vendors,
    meals,
    orders,
    donations,
    coupons,
    tickets,
    broadcastPushNotification,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"stats" | "approvals" | "listings" | "broadcast" | "tickets">("stats");

  // Broadcast state
  const [pushTitle, setPushTitle] = useState("");
  const [pushMessage, setPushMessage] = useState("");

  // Approval vendors
  const [vendorList, setVendorList] = useState<any[]>([
    { id: 3, name: "Hostel 4 Mess Hall", type: "Kerala Mess Meals", appDate: "Oct 12, 2026", status: "PENDING" },
    { id: 4, name: "Student Union Organic Cafe", type: "Vegan Bakery", appDate: "Oct 14, 2026", status: "PENDING" },
    { id: 5, name: "Hope Campus Initiative", type: "Community NGO", appDate: "Oct 10, 2026", status: "APPROVED" },
  ]);

  const [ticketList, setTicketList] = useState<SupportTicket[]>(tickets);

  const handleApprove = (id: number) => {
    setVendorList((prev) => prev.map((v) => (v.id === id ? { ...v, status: "APPROVED" } : v)));
    alert("✅ Organization successfully verified and approved! API keys have been provisioned.");
  };

  const handleReject = (id: number) => {
    setVendorList((prev) => prev.map((v) => (v.id === id ? { ...v, status: "REJECTED" } : v)));
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushTitle || !pushMessage) {
      alert("Please enter both title and message.");
      return;
    }
    broadcastPushNotification(pushTitle, pushMessage);
    setPushTitle("");
    setPushMessage("");
  };

  const handleQuickAlert = (title: string, msg: string) => {
    setPushTitle(title);
    setPushMessage(msg);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Admin Hero Oversight Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-green-950 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row justify-between lg:items-center gap-8">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10 max-w-2xl">
          <span className="bg-emerald-500/30 text-emerald-300 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Executive Oversight Engine
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">ZeroBite Admin Command Hub</h1>
          <p className="text-slate-300 text-sm font-normal leading-relaxed">
            Manage user roles, verify and authorize partner canteens and NGOs, monitor IoT waste scale analytics, and ensure compliance with NAAC environmental directives.
          </p>
        </div>

        {/* Global Impact totals */}
        <div className="flex flex-wrap items-center gap-4 relative z-10 shrink-0">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shadow-lg">
            <div className="text-3xl font-black text-white">4,250</div>
            <div className="text-xs text-slate-400 font-bold mt-0.5">Total Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shadow-lg">
            <div className="text-3xl font-black text-emerald-400">1,420 Kg</div>
            <div className="text-xs text-slate-400 font-bold mt-0.5">Total Food Saved</div>
          </div>
        </div>
      </div>

      {/* Admin Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto border border-slate-200">
        {[
          { id: "stats", name: "Campus Waste Analytics", icon: BarChart3 },
          { id: "approvals", name: "Pending Approvals", icon: Users, badge: vendorList.filter((v) => v.status === "PENDING").length },
          { id: "listings", name: "Monitor Active Listings (" + meals.length + ")", icon: Store },
          { id: "broadcast", name: t(language, "broadcast_push"), icon: Bell },
          { id: "tickets", name: "Complaint Helpdesk", icon: Ticket },
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

      {/* TAB 1: SYSTEM STATISTICS DASHBOARD */}
      {activeTab === "stats" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Food Waste Reduced Across Campus", val: "1,420 Kg", icon: Trash2, color: "from-emerald-600 to-green-700" },
              { label: "Student Financial Savings Total", val: "₹1,18,500", icon: DollarSign, color: "from-blue-600 to-indigo-700" },
              { label: "Verified NGO Donation Parcels", val: "420 Packages", icon: HeartHandshake, color: "from-purple-600 to-pink-700" },
              { label: "College Carbon Footprint Avoided", val: "3,550 Kg CO₂", icon: TrendingUp, color: "from-amber-600 to-orange-700" },
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex items-center justify-between hover:shadow-xl transition">
                  <div>
                    <span className="text-xs font-bold text-slate-500">{st.label}</span>
                    <h4 className="text-2xl font-black text-slate-900 mt-2">{st.val}</h4>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mt-2 inline-block">
                      +14% vs last term
                    </span>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${st.color} text-white flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Impact charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 space-y-4">
              <h4 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-700" /> Monthly Surplus Sales vs NGO Donations
              </h4>
              <p className="text-xs text-slate-500">
                Visualizing the primary goal of ZeroBite: first discounted student recovery, then automatic NGO routing.
              </p>

              <div className="h-64 flex items-end justify-around gap-4 pt-6 pb-2 px-4 border-b border-slate-200 text-xs font-black">
                {[
                  { month: "Jun", sales: 120, ngo: 40 },
                  { month: "Jul", sales: 180, ngo: 60 },
                  { month: "Aug", sales: 250, ngo: 90 },
                  { month: "Sep", sales: 310, ngo: 110 },
                  { month: "Oct (Now)", sales: 342, ngo: 140 },
                ].map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition text-center">
                      {m.sales}s / {m.ngo}n
                    </div>
                    <div className="w-full max-w-16 flex items-end gap-1 h-full bg-slate-50 rounded-t-xl p-1">
                      <div
                        style={{ height: `${Math.min(100, Math.round((m.sales / 350) * 100))}%` }}
                        className="flex-1 bg-green-700 rounded-t-md transition-all duration-500 shadow-sm"
                        title={"Sales: " + m.sales}
                      />
                      <div
                        style={{ height: `${Math.min(100, Math.round((m.ngo / 350) * 100))}%` }}
                        className="flex-1 bg-purple-600 rounded-t-md transition-all duration-500 shadow-sm"
                        title={"NGO: " + m.ngo}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{m.month}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-8 text-xs font-bold text-slate-600 pt-2">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-700 rounded-sm" /> Student Surplus Meals Sold
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-600 rounded-sm" /> Free NGO Donations
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-900 p-8 rounded-3xl text-white shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  🌱 NAAC Green Audit Integration Ready
                </span>
                <h4 className="text-3xl font-black leading-tight">Campus Sustainability Ranking: #1</h4>
                <p className="text-xs text-green-100 leading-relaxed">
                  By demonstrating an active closed-loop zero food waste ecosystem on campus, our college has officially attained the Platinum Green Standard in this academic year's AICTE & Ministry of Education inspections.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-green-200">Calculated Value</div>
                  <div className="text-2xl font-black text-amber-300 mt-0.5">35.5 Carbon Credits Generated</div>
                </div>
                <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER & VENDOR APPROVALS */}
      {activeTab === "approvals" && (
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-green-700" /> Vendor & NGO Onboarding Verification
              </h3>
              <p className="text-xs text-slate-500 mt-1">Review organizational documents before granting platform access and API keys.</p>
            </div>
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full">
              {vendorList.filter((v) => v.status === "PENDING").length} Requiring Audit
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {vendorList.map((ven) => (
              <div key={ven.id} className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                ven.status === "APPROVED" ? "border-green-200 bg-green-50/40" : ven.status === "REJECTED" ? "border-red-200 bg-red-50/40 opacity-60" : "border-amber-300 bg-amber-50/30 shadow-md"
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      ven.status === "APPROVED" ? "bg-green-700 text-white" : ven.status === "REJECTED" ? "bg-red-700 text-white" : "bg-amber-500 text-white animate-pulse"
                    }`}>
                      {ven.status}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Applied: {ven.appDate}</span>
                  </div>

                  <h4 className="font-black text-xl text-slate-900">{ven.name}</h4>
                  <p className="text-xs text-slate-600 font-bold">{ven.type}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {ven.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleReject(ven.id)}
                        className="flex-1 sm:flex-none bg-red-100 hover:bg-red-200 text-red-800 font-black text-xs px-5 py-3 rounded-xl transition cursor-pointer"
                      >
                        Reject Application
                      </button>
                      <button
                        onClick={() => handleApprove(ven.id)}
                        className="flex-1 sm:flex-none bg-green-700 hover:bg-green-800 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg transition cursor-pointer"
                      >
                        ✔ Approve & Provision Keys
                      </button>
                    </>
                  )}
                  {ven.status !== "PENDING" && (
                    <span className="text-xs font-black text-slate-500 italic">
                      Audit logged by Dr. Rajesh Nair
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MONITOR LIVE LISTINGS */}
      {activeTab === "listings" && (
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-700" /> Platform Active Real-time Surplus Food Audit
            </h3>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
              Automated Price Gouging Prevention Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div key={meal.id} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-200 text-green-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {meal.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">ID: #{meal.id}</span>
                  </div>
                  <h4 className="font-black text-lg text-slate-900">{meal.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{meal.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-green-700 text-base">₹{meal.discountPrice}</span>
                    <span className="text-slate-400 font-bold line-through ml-1.5">₹{meal.originalPrice}</span>
                  </div>
                  <span className="font-extrabold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
                    {meal.availableQuantity} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BROADCAST PUSH NOTIFICATIONS */}
      {activeTab === "broadcast" && (
        <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md max-w-3xl mx-auto">
          <div>
            <div className="w-16 h-16 bg-purple-100 text-purple-800 rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
              <Send className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center">Firebase Cloud Messaging (FCM) Push Broadcaster</h3>
            <p className="mt-2 text-xs text-slate-500 text-center max-w-md mx-auto">
              Instantly broadcast emergency discount promotions, NGO alerts, or server announcements to all connected Flutter mobile users.
            </p>
          </div>

          {/* Quick templates */}
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 space-y-3">
            <span className="text-xs font-black text-purple-950 uppercase tracking-wider block">
              ⚡ Select a verified broadcast template
            </span>

            <div className="flex flex-wrap gap-2">
              {[
                { title: "⛈️ Heavy Rain Alert: Prepare for Surplus", msg: "Rainfall predicted tomorrow. Cafeterias are posting surplus batches at 70% off!" },
                { title: "🎁 NGO Urgent Rescue Activation", msg: "Campus Central Canteen just routed 40 portions of fresh food for touchless NGO pickup." },
                { title: "⭐ Eco Points Green Weekend", msg: "Earn DOUBLE Eco Points on all surplus meal orders this Saturday & Sunday!" },
              ].map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickAlert(tpl.title, tpl.msg)}
                  className="bg-white hover:bg-purple-700 hover:text-white text-slate-900 border border-purple-300 text-xs font-black px-3.5 py-2 rounded-xl transition shadow-2xs cursor-pointer"
                >
                  {tpl.title}
                </button>
              ))}
            </div>
          </div>

          {/* Broadcast Form */}
          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700">Notification Title *</label>
              <input
                type="text"
                required
                value={pushTitle}
                onChange={(e) => setPushTitle(e.target.value)}
                placeholder="e.g. 📢 Flash 80% Off Surplus Sale!"
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-3.5 font-bold text-slate-900 text-base focus:bg-white focus:border-purple-700 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700">Message Content *</label>
              <textarea
                rows={3}
                required
                value={pushMessage}
                onChange={(e) => setPushMessage(e.target.value)}
                placeholder="Type the broadcast message that will appear on student & NGO smartphones..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-3.5 font-medium text-slate-900 text-sm focus:bg-white focus:border-purple-700 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-700/30 flex items-center justify-center gap-2 text-base transition cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Broadcast Over FCM Network</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: COMPLAINT MANAGEMENT DESK */}
      {activeTab === "tickets" && (
        <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Ticket className="w-6 h-6 text-amber-700" /> Support Tickets & Complaint Resolution Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1">Resolve student cafeteria pickup disputes, refund requests, and Wi-Fi feedback.</p>
            </div>
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full">
              {ticketList.filter((t) => t.status === "OPEN").length} Open Tickets Desk
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {ticketList.map((t) => (
              <div key={t.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      t.status === "OPEN" ? "bg-amber-500 text-white animate-pulse" : "bg-green-700 text-white"
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">Ticket #{t.id}</span>
                  </div>

                  <h4 className="font-black text-lg text-slate-900 mt-1">{t.subject}</h4>
                  <p className="text-xs text-slate-600 font-medium">{t.message}</p>
                </div>

                {t.status === "OPEN" && (
                  <button
                    onClick={() => {
                      setTicketList(ticketList.map((tk) => (tk.id === t.id ? { ...tk, status: "RESOLVED" } : tk)));
                      alert("✅ Ticket marked as resolved and customer notified!");
                    }}
                    className="bg-green-700 hover:bg-green-800 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition cursor-pointer whitespace-nowrap"
                  >
                    Mark Resolved
                  </button>
                )}
                {t.status === "RESOLVED" && (
                  <span className="text-xs font-black text-green-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Fully Resolved
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
