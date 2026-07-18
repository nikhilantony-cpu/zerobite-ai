import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroBite | AI Surplus Food Management & Affordable Meals",
  description: "AI-powered platform helping college cafeterias, messes, and bakeries reduce surplus food by offering discounted meals and donating to NGOs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F8FFF8] text-slate-900 antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
