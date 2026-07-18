"use client";

import React, { useEffect } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { StudentPortal } from "@/components/roles/StudentPortal";
import { VendorPortal } from "@/components/roles/VendorPortal";
import { NgoPortal } from "@/components/roles/NgoPortal";
import { AdminPortal } from "@/components/roles/AdminPortal";
import { AiChatAssistant } from "@/components/AiChatAssistant";
import { MobileAppPreview } from "@/components/MobileAppPreview";

function MainAppContent() {
  const { role, viewMode } = useApp();

  // On initial mount, hit init-db to make sure our PostgreSQL is rich with data
  useEffect(() => {
    fetch("/api/init-db", { method: "POST" })
      .then((res) => res.json())
      .then((d) => console.log("Postgres DB Seed Output:", d))
      .catch((err) => console.error("Postgres Seed Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FFF8] via-slate-50 to-green-50/20 text-slate-900 flex flex-col font-sans selection:bg-green-700 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "mobile" ? (
          <MobileAppPreview />
        ) : (
          <>
            {role === "STUDENT" && <StudentPortal />}
            {role === "VENDOR" && <VendorPortal />}
            {role === "NGO" && <NgoPortal />}
            {role === "ADMIN" && <AdminPortal />}
          </>
        )}
      </main>

      {/* Floating AI Assistant Bot */}
      <AiChatAssistant />

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-green-100 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="font-black text-sm text-green-950 flex items-center justify-center gap-2">
          <span>ZeroBite Platform © 2026</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
            Sustainable Future
          </span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          Building affordable student dining solutions and empowering campus cafeterias to completely eradicate surplus food waste.
        </p>
        <p className="text-slate-400 font-medium mt-1">
          Owners : Nikhil V A & Mrinalini M Nair
        </p>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
