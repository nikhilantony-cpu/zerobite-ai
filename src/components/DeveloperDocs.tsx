"use client";

import React, { useState } from "react";
import {
  FileCode,
  FolderTree,
  Server,
  Database,
  Cpu,
  ShieldAlert,
  Terminal,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Copy,
} from "lucide-react";

export function DeveloperDocs() {
  const [activeSub, setActiveSub] = useState<"arch" | "flutter" | "ai" | "deploy">("arch");

  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const sampleFlutterSnippet = `// ==========================================
// ZERO BITE FLUTTER MOBILE APP MVP CORE
// Main entrypoint & Clean Architecture setup
// State Management: Riverpod / Bloc
// ==========================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const ProviderScope(child: ZeroBiteApp()));
}

class ZeroBiteApp extends StatelessWidget {
  const ZeroBiteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ZeroBite',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2E7D32), // Primary Green
          secondary: const Color(0xFF43A047),
          surface: const Color(0xFFF8FFF8),
        ),
      ),
      darkTheme: ThemeData.dark(useMaterial3: true).copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF81C784),
          brightness: Brightness.dark,
        ),
      ),
      themeMode: ThemeMode.system,
      home: const ZeroBiteHomeScreen(),
    );
  }
}
`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Overview Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="bg-emerald-500/30 text-emerald-300 font-mono text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-400/30">
            💻 ZeroBite Startup PRD & Architecture Specification
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Developer & MVP Architecture Guide</h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Welcome evaluators, developers, and investors. This document outlines exactly how the complete Flutter mobile ecosystem, Next.js / FastAPI web servers, Drizzle PostgreSQL / Firestore database entities, and Razorpay/Stripe touchless verification gateways operate in production.
          </p>
        </div>

        <BookOpen className="w-16 h-16 text-emerald-400 shrink-0 hidden sm:block animate-pulse" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto border border-slate-200">
        {[
          { id: "arch", label: "Clean Architecture & Stack", icon: FolderTree },
          { id: "flutter", label: "Flutter Mobile & State (Riverpod)", icon: FileCode },
          { id: "ai", label: "TensorFlow & FastAPI Prediction Engine", icon: Cpu },
          { id: "deploy", label: "Deployment & Firestore/Drizzle Guide", icon: Server },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeSub === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSub(t.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs transition whitespace-nowrap cursor-pointer ${
                isActive ? "bg-white text-green-800 shadow-md scale-102" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-green-700" : ""}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. CLEAN ARCHITECTURE & STACK */}
      {activeSub === "arch" && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-200 space-y-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <FolderTree className="w-7 h-7 text-green-700" /> Fullstack Clean Architecture
            </h3>
            <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">
              ZeroBite enforces strict separation of concerns across Mobile, Web Dashboard, and Microservices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="font-black text-sm text-green-800 border-b border-slate-200 pb-2">1. Presentation Layer</div>
              <ul className="space-y-2 text-slate-700 font-bold">
                <li>• Flutter (Android & iOS App)</li>
                <li>• Material 3 UI Specs</li>
                <li>• Next.js 16 Responsive Web</li>
                <li>• Glassmorphism + Tailwind CSS</li>
                <li>• Localized: en, ml, hi</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="font-black text-sm text-blue-800 border-b border-slate-200 pb-2">2. Application / API Layer</div>
              <ul className="space-y-2 text-slate-700 font-bold">
                <li>• Express / Firebase Functions</li>
                <li>• Python FastAPI AI microservice</li>
                <li>• FCM Cloud Messaging</li>
                <li>• Razorpay & Stripe Webhooks</li>
                <li>• JWT + Encrypted Role Access</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="font-black text-sm text-purple-800 border-b border-slate-200 pb-2">3. Data & Persistence Layer</div>
              <ul className="space-y-2 text-slate-700 font-bold">
                <li>• Firebase Firestore / Storage</li>
                <li>• PostgreSQL via Drizzle ORM</li>
                <li>• Redis Real-time QR Cache</li>
                <li>• Google Maps Live Navigation</li>
              </ul>
            </div>
          </div>

          {/* Folder structure representation */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h4 className="font-black text-base text-slate-900">Recommended Clean Folder Structure (Mobile + Web Repository)</h4>
            <div className="p-6 bg-slate-900 text-slate-300 font-mono text-xs rounded-2xl leading-relaxed shadow-inner overflow-x-auto">
              {`zerobite_repo/
├── mobile_app/                  # Pure Flutter Codebase
│   ├── lib/
│   │   ├── core/                # Errors, Network, Constants, Theme
│   │   ├── features/            # Feature-driven (Auth, Meals, NGOs, Gamification)
│   │   │   ├── surplus_meals/
│   │   │   │   ├── data/        # Repositories & Models
│   │   │   │   ├── domain/      # Use Cases & Entities
│   │   │   │   └── presentation/# Riverpod Controllers & Material Screens
│   │   └── main.dart
│
├── web_dashboard/               # Next.js App Router (This Application)
│   ├── src/
│   │   ├── app/                 # API Routes (/api/data, /api/init-db)
│   │   ├── components/roles/    # Dedicated UI (Student, Vendor, NGO, Admin)
│   │   ├── context/             # Unified State Management Sync
│   │   └── db/                  # PostgreSQL Drizzle Schema & Seeders
│
└── ai_prediction_engine/        # Python FastAPI Microservice
    ├── models/                  # Trained TensorFlow .h5 Weights
    ├── routes/                  # /predict/demand, /predict/leftover
    └── main.py`}
            </div>
          </div>
        </div>
      )}

      {/* 2. FLUTTER MOBILE & RIVERPOD */}
      {activeSub === "flutter" && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-200 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <FileCode className="w-7 h-7 text-green-700" /> Complete Flutter Production Setup Snippet
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">Download or review our production Dart MVP initialization snippet below.</p>
            </div>
            <button
              onClick={() => handleCopy(sampleFlutterSnippet)}
              className="bg-green-700 hover:bg-green-800 text-white font-black text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedSnippet ? "Copied Flawlessly!" : "Copy Flutter Code"}</span>
            </button>
          </div>

          <div className="relative">
            <pre className="bg-slate-950 text-emerald-300 p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
              <code>{sampleFlutterSnippet}</code>
            </pre>
          </div>
        </div>
      )}

      {/* 3. AI TENSORFLOW & FASTAPI */}
      {activeSub === "ai" && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-200 space-y-8">
          <div>
            <span className="bg-amber-100 text-amber-900 font-mono text-xs font-black px-3 py-1 rounded-full">
              🧠 AI Microservice Architecture
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-3">TensorFlow Demand & Leftover Predictor</h3>
            <p className="mt-2 text-xs text-slate-600 font-medium max-w-3xl leading-relaxed">
              ZeroBite implements a multi-layer deep learning neural network developed in Python. It evaluates historical daily cafeteria transactions alongside live external triggers to prevent surplus production before it even occurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-700" /> Input Data Vectors (Features)
              </h4>
              <ul className="space-y-2 text-xs font-mono text-slate-700 font-bold">
                <li>• Day of Week (0 = Mon, 6 = Sun)</li>
                <li>• Live Weather API (Temp, Rainfall, Humidity)</li>
                <li>• Academic Calendar (Exam Weeks vs Free Weeks)</li>
                <li>• Campus Attendance Log Proxy</li>
                <li>• Festival Days (Onam, Christmas, TechFest)</li>
                <li>• Previous 14-day sales volume</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-700" /> Python FastAPI Endpoint (/predict)
              </h4>
              <pre className="p-3 bg-slate-900 text-emerald-300 rounded-xl font-mono text-[10px] overflow-x-auto">
                {`@app.post("/predict/waste-risk")
def predict_waste(data: PredictionRequest):
    features = extract_vectors(data)
    prediction = model.predict(features)
    
    return {
        "predicted_demand": int(prediction[0]),
        "recommended_quantity": int(prediction[0] * 0.75),
        "risk_level": "HIGH" if prediction[1] > 0.2 else "LOW",
        "smart_advice": "Prepare 35 fewer meals tomorrow."
    }`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 4. DEPLOYMENT & DATABASE SCHEMA GUIDE */}
      {activeSub === "deploy" && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-200 space-y-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Server className="w-7 h-7 text-green-700" /> Production Deployment Instructions
            </h3>
            <p className="mt-2 text-xs text-slate-600 font-medium">
              Ready to launch ZeroBite MVP across your city or university? Follow these steps:
            </p>
          </div>

          <div className="space-y-6 font-mono text-xs">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900">1. Database Bootstrap (PostgreSQL & Drizzle ORM)</div>
              <p className="text-slate-600 font-sans text-xs">Run our internal Drizzle Kit migrations to create all production tables:</p>
              <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl">
                npx drizzle-kit push && curl -X POST http://localhost:3000/api/init-db
              </pre>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900">2. Build & Start Server Production Runtime</div>
              <p className="text-slate-600 font-sans text-xs">Compile Next.js production builds and verify health check endpoints:</p>
              <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl">
                npm run build && npm run start
              </pre>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-black text-sm text-slate-900">3. Firebase Cloud Functions & Hosting (For Mobile API Proxy)</div>
              <p className="text-slate-600 font-sans text-xs">Deploy Firebase authentication hooks and Firestore security rules:</p>
              <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl">
                firebase deploy --only functions,hosting,firestore:rules
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
