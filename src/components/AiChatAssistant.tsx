"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/utils/translations";
import { Sparkles, MessageSquare, Send, X, Bot, User, Trash2, HelpCircle } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

export function AiChatAssistant() {
  const { language, meals, vendors, role } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I'm EcoBot, your ZeroBite AI Sustainability Assistant. Ask me to recommend surplus meals, give overnight food storage tips, or show prediction stats!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const submitMessage = (msgText: string) => {
    if (!msgText.trim()) return;

    const userMsg = msgText.trim();
    const newMsg: Message = {
      sender: "user",
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    // AI logic simulation answering student / vendor queries
    setTimeout(() => {
      let botResponse = "";
      const lower = userMsg.toLowerCase();

      if (lower.includes("biryani") || lower.includes("non veg") || lower.includes("chicken")) {
        const biryani = meals.find((m) => m.name.toLowerCase().includes("biryani"));
        if (biryani && biryani.availableQuantity > 0) {
          botResponse = `🍲 Good news! Campus Central Canteen currently has ${biryani.availableQuantity} portions of ${biryani.name} listed at just ₹${biryani.discountPrice} (down from ₹${biryani.originalPrice}). Reserve it in the Student Portal!`;
        } else {
          botResponse = "Ah, today's Biryani surplus is completely sold out or not listed yet. Check back around 5:00 PM!";
        }
      } else if (lower.includes("veg") || lower.includes("thali") || lower.includes("samosa") || lower.includes("healthy") || lower.includes("meals")) {
        const veg = meals.find((m) => m.category === "VEG" && m.availableQuantity > 0);
        if (veg) {
          botResponse = `🥗 I highly recommend the ${veg.name} from ${(vendors.find((v) => v.id === veg.vendorId)?.cafeteriaName || "the cafeteria")}! It is currently ₹${veg.discountPrice} with ${veg.availableQuantity} portions remaining.`;
        } else {
          botResponse = "All vegetarian surplus listings have been successfully rescued for this afternoon!";
        }
      } else if (lower.includes("store") || lower.includes("storage") || lower.includes("bakery") || lower.includes("fridge") || lower.includes("pastry")) {
        botResponse = "🥐 AI Food Storage Recommendation: For bakery surplus like pastries or sandwiches, wrap them tightly in beeswax wraps or airtight glass containers to prevent moisture loss. Keep below 4°C (40°F). Do not freeze items with mayonnaise or fresh lettuce.";
      } else if (lower.includes("predict") || lower.includes("waste") || lower.includes("rain") || lower.includes("tomorrow") || lower.includes("fewer") || lower.includes("footfall") || lower.includes("weather") || lower.includes("onam")) {
        botResponse = "🤖 Smart AI Prediction: Based on tomorrow's weather forecast (Heavy Rain, 28°C) and holidays, campus footfall is predicted to drop by 18%. Our neural network advises cafeterias to prepare 35 fewer meals tomorrow to maintain zero leftovers!";
      } else if (lower.includes("point") || lower.includes("gamification") || lower.includes("badge") || lower.includes("reward") || lower.includes("coupon")) {
        botResponse = "⭐ Every time you rescue a surplus meal, you earn 25 Eco Points and prevent about 0.8kg of CO₂! You can redeem points for 50% discount vouchers like 'ECO50' or climb the leaderboard to win the Green Champion badge.";
      } else if (lower.includes("vendor") || lower.includes("list") || lower.includes("upload")) {
        botResponse = "🏪 Vendor Instruction: Go to Listings tab in Vendor portal, input surplus quantity, select discount percentage (30%-70%), and click Upload Surplus Meal. Students nearby get push alert notifications automatically!";
      } else if (lower.includes("ngo") || lower.includes("donation") || lower.includes("claim")) {
        botResponse = "🤝 NGO Assistance: Navigate to Donations tab, filter active surplus uploads, accept claimed quantities, and show checkout generated QR codes at cafeteria counters for verification.";
      } else if (lower.includes("admin") || lower.includes("flag") || lower.includes("broadcast")) {
        botResponse = "🛡️ Admin Operations: Access the Broadcast console to send firebase push alerts to all students, check approval queries on pending vendors, or audit active cafeteria listings.";
      } else {
        botResponse = "🌿 That's an excellent question! In ZeroBite, our mission is to turn campus food waste into affordable meals while offsetting college carbon footprints. Is there a specific cafeteria, NGO donation process, or meal you'd like to inspect?";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    submitMessage(input.trim());
    setInput("");
  };

  const getFaqsForRole = () => {
    switch (role) {
      case "VENDOR":
        return [
          "List Surplus Items",
          "Tomorrow's Rain Prediction?",
          "Bakery Storage Tips",
          "Fewer Footfall Tomorrow?",
        ];
      case "NGO":
        return [
          "Claim NGO Donations",
          "How Eco Points Work?",
          "Bakery Storage Tips",
        ];
      case "ADMIN":
        return [
          "FCM Broadcast Alert",
          "Tomorrow's Rain Prediction?",
          "System Waste Stats",
        ];
      case "STUDENT":
      default:
        return [
          "Recommended Meals?",
          "Tomorrow's Rain Prediction?",
          "Bakery Storage Tips",
          "How Eco Points Work?",
        ];
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-6 bottom-6 z-50 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white p-4 rounded-3xl shadow-2xl flex items-center gap-3 hover:scale-105 hover:shadow-green-700/50 transition-all duration-300 border-2 border-white/40 cursor-pointer ${isOpen ? "hidden" : "block"
          }`}
      >
        <div className="relative">
          <Bot className="w-7 h-7 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        </div>
        <div className="text-left hidden sm:block pr-2">
          <div className="font-black text-xs uppercase tracking-wider text-green-200">AI Assistant</div>
          <div className="font-bold text-sm">Ask EcoBot ⚡</div>
        </div>
      </button>

      {/* Chat Window Popup Modal */}
      {isOpen && (
        <div className="fixed right-4 bottom-4 z-50 w-full sm:w-[420px] h-[520px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-800 to-emerald-900 p-5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-base flex items-center gap-1.5">
                  <span>{t(language, "ai_assistant")}</span>
                  <span className="bg-amber-400 text-slate-950 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                    EcoBot
                  </span>
                </h4>
                <p className="text-[11px] text-green-200 font-medium">Platform TensorFlow AI & Storage Advisor</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (confirm("Reset chat history?")) {
                    setMessages([
                      {
                        sender: "bot",
                        text: "👋 Hi! I'm EcoBot, your ZeroBite AI Sustainability Assistant. Ask me to recommend surplus meals, give overnight food storage tips, or show prediction stats!",
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      },
                    ]);
                  }
                }}
                title="Clear Chat"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick FAQ Suggestion Pills */}
          <div className="bg-green-50/80 p-2.5 border-b border-green-100 flex items-center gap-2 overflow-x-auto text-xs">
            {getFaqsForRole().map((faq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => submitMessage(faq)}
                className="bg-white text-green-905 hover:bg-green-700 hover:text-white border border-green-200 px-3 py-1 rounded-full font-bold whitespace-nowrap transition shadow-2xs cursor-pointer shrink-0"
              >
                {faq}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-8 h-8 rounded-xl bg-green-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-3xl max-w-[82%] text-xs leading-relaxed font-medium shadow-xs ${m.sender === "user"
                      ? "bg-green-700 text-white rounded-br-xs font-bold"
                      : "bg-white text-slate-800 border border-slate-205 rounded-bl-xs"
                    }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-2 ${m.sender === "user" ? "text-green-200 text-right" : "text-slate-400 text-left font-bold"
                      }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-400 text-xs font-bold pl-2">
                <Bot className="w-4 h-4 text-green-700 animate-spin" />
                <span>EcoBot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-205 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(language, "chat_prompt")}
              className="flex-1 bg-slate-100 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-green-700 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-green-700 hover:bg-green-800 disabled:bg-slate-200 text-white p-3 rounded-2xl transition shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
