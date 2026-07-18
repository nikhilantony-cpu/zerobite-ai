"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  Smartphone,
  Shield,
  BellRing,
  Award,
  QrCode,
  ArrowDownToLine,
  CheckCircle2,
  ChevronRight,
  Download,
} from "lucide-react";

export function MobileAppPreview() {
  const { studentEcoPoints } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-500 pb-20">

      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-green-950 p-8 sm:p-12 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-500/20">
        <div className="space-y-3">
          <span className="bg-green-500 text-black font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            📱 Official Native Compilation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">ZeroBite Mobile App</h2>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            Get the full ZeroBite experience right on your phone. Experience faster touchless checkout, live push notifications, offline scan verification, and secure wallet tracking.
          </p>
        </div>

        {/* ECO points badge */}
        <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 shrink-0">
          <Award className="w-6 h-6 text-amber-400 fill-amber-400/20" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-black">My Balance</div>
            <div className="text-lg font-black text-white">{studentEcoPoints} Eco Points</div>
          </div>
        </div>
      </div>

      {/* Main Download Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Downloads & Features */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-green-150 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-905 flex items-center gap-2">
              <Download className="w-5 h-5 text-green-700" />
              <span>Available Packages</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* iOS IPA Download Card */}
              <div className="bg-slate-50 border border-slate-205/60 p-5 rounded-2xl text-center space-y-4 hover:border-green-300 hover:shadow-xs transition duration-200">
                <div className="text-4xl">🍏</div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Apple iOS Version</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Built for iPhones (.ipa package)</p>
                </div>
                <button
                  onClick={() => alert("📥 Downloading ZeroBite iOS App (.ipa installation package)...")}
                  className="w-full bg-slate-900 hover:bg-slate-950 text-white py-2 rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>Download .ipa</span>
                </button>
              </div>

              {/* Android APK Download Card */}
              <div className="bg-slate-50 border border-slate-205/60 p-5 rounded-2xl text-center space-y-4 hover:border-green-300 hover:shadow-xs transition duration-200">
                <div className="text-4xl">🤖</div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Google Android Version</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Compatible with Android (.apk package)</p>
                </div>
                <button
                  onClick={() => alert("📥 Downloading ZeroBite Android App (.apk installation package)...")}
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl text-xs font-black shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>Download .apk</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-250/60 rounded-xl text-[10px] font-bold text-amber-900 leading-relaxed">
              💡 <b>Installation Assist:</b> Make sure you toggle "Allow installations from unknown sources" in settings to install these packages directly on your test device.
            </div>
          </div>

          {/* Key app features bullet list */}
          <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Why Use Mobile Over Web Option?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-800">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-normal font-extrabold text-slate-900 text-xs">Offline Verification</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Verified by local SQLite database. claim coupons even when cafeteria internet is slow or completely down.</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <BellRing className="w-4 h-4" />
                </div>
                <h4 className="text-normal font-extrabold text-slate-900 text-xs">Instant Alerts</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Get broadcast push notifications the second a vendor uploads fresh surplus batches at the end of the shift.</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800">
                  <QrCode className="w-4 h-4" />
                </div>
                <h4 className="text-normal font-extrabold text-slate-900 text-xs">Faster Verification</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Show your dynamic screen barcode directly at the canteen counter validation portal for dynamic claiming.</p>
              </div>

            </div>
          </div>
        </div>

        {/* Right: Scan to Install QR */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-green-150 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          <div className="text-xs font-black uppercase text-green-800 tracking-wider">Scan to Download</div>

          {/* Styled QR Scan Interface */}
          <div className="p-5 bg-slate-950 text-white rounded-3xl flex flex-col items-center justify-center border-4 border-green-700/60 shadow-lg relative overflow-hidden group">
            <span className="absolute inset-x-0 top-0 h-1 bg-green-500 animate-bounce" />
            <QrCode className="w-48 h-48 text-green-405 stroke-1" />
            <div className="font-mono text-xs text-slate-300 mt-3 font-black">SCAN WITH PHONE CAMERA</div>
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-slate-900">Direct Mobile Install</h4>
            <p className="text-[10px] text-slate-500 max-w-72 leading-relaxed">
              Point your smartphone camera at the code above to download the target package directly on your mobile browser.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
