"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/utils/translations";

export type UserRole = "STUDENT" | "VENDOR" | "NGO" | "ADMIN";
export type ViewMode = "web" | "mobile";

export interface Meal {
  id: number;
  vendorId: number;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  quantity: number;
  availableQuantity: number;
  expiryTime: string | Date;
  pickupWindowStart: string;
  pickupWindowEnd: string;
  category: string;
  status: string;
  description: string;
  isDonation: boolean;
}

export interface Order {
  id: number;
  studentId: number;
  mealId: number;
  vendorId: number;
  quantity: number;
  totalPrice: number;
  status: string;
  qrCode: string;
  paymentMethod: string;
  createdAt: string | Date;
  pickedUpAt?: string | Date | null;
}

export interface Donation {
  id: number;
  mealId: number;
  vendorId: number;
  ngoId: number;
  foodQuantity: number;
  status: string;
  qrCode: string;
  scheduledPickup: string;
  impactRecordedKg: number;
  communitiesServed: string;
  createdAt: string | Date;
}

export interface Vendor {
  id: number;
  cafeteriaName: string;
  location: string;
  foodCategory: string;
  rating: number;
  totalMealsSaved: number;
  wastePreventedKg: number;
  revenueSaved: number;
  co2ReducedKg: number;
}

export interface Coupon {
  id: number;
  code: string;
  discountPercent: number;
  pointsRequired: number;
  minOrderAmount: number;
  description: string;
  isActive: boolean;
}

export interface AiPrediction {
  id: number;
  vendorId: number;
  date: string;
  predictedDemand: number;
  expectedLeftover: number;
  recommendedQuantity: number;
  riskLevel: string;
  wastePercentage: number;
  smartAdvice: string;
  weather: string;
  examSchedule: string;
  festival: string;
}

export interface SupportTicket {
  id: number;
  userId: number;
  subject: string;
  message: string;
  status: string;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  timestamp?: string | Date;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  studentWallet: number;
  setStudentWallet: React.Dispatch<React.SetStateAction<number>>;
  studentEcoPoints: number;
  setStudentEcoPoints: React.Dispatch<React.SetStateAction<number>>;
  meals: Meal[];
  orders: Order[];
  donations: Donation[];
  vendors: Vendor[];
  coupons: Coupon[];
  predictions: AiPrediction[];
  tickets: SupportTicket[];
  chatMessages: ChatMessage[];
  pushNotifications: { title: string; message: string; date: string }[];

  reserveMeal: (meal: Meal, quantity: number, paymentMethod: string) => boolean;
  confirmPickup: (qrCode: string) => boolean;
  acceptDonation: (meal: Meal, scheduledTime: string) => boolean;
  uploadSurplusMeal: (newMeal: Omit<Meal, "id" | "availableQuantity" | "status" | "isDonation"> & { isDonation?: boolean }) => void;
  redeemCoupon: (coupon: Coupon) => boolean;
  createTicket: (subject: string, message: string) => void;
  sendChatMessage: (msg: string, receiverId: number) => void;
  broadcastPushNotification: (title: string, message: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const FALLBACK_MEALS: Meal[] = [
  {
    id: 1,
    vendorId: 1,
    name: "Malabar Chicken Biryani (Dum Batch)",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    originalPrice: 160.0,
    discountPrice: 65.0,
    quantity: 12,
    availableQuantity: 8,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 4),
    pickupWindowStart: "04:30 PM",
    pickupWindowEnd: "06:30 PM",
    category: "NON_VEG",
    status: "ACTIVE",
    description: "Freshly prepared noon batch aromatic dum biryani with raita and pickle. Safe & delicious.",
    isDonation: false,
  },
  {
    id: 2,
    vendorId: 1,
    name: "Special Vegetarian Thali Combo",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    originalPrice: 110.0,
    discountPrice: 40.0,
    quantity: 18,
    availableQuantity: 12,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 5),
    pickupWindowStart: "05:00 PM",
    pickupWindowEnd: "07:00 PM",
    category: "VEG",
    status: "ACTIVE",
    description: "Includes rice, 3 seasonal curries, sambar, thoran, and papad. Biodegradable box.",
    isDonation: false,
  },
  {
    id: 3,
    vendorId: 2,
    name: "Assorted Pastries & Veg Sandwiches",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    originalPrice: 220.0,
    discountPrice: 80.0,
    quantity: 10,
    availableQuantity: 5,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 3),
    pickupWindowStart: "04:00 PM",
    pickupWindowEnd: "06:00 PM",
    category: "BAKERY",
    status: "ACTIVE",
    description: "Surplus baked goods from today's morning bake. Grilled paneer sandwiches & croissants.",
    isDonation: false,
  },
  {
    id: 4,
    vendorId: 3,
    name: "Ghee Rice with Beef Ularthiyathu",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
    originalPrice: 180.0,
    discountPrice: 75.0,
    quantity: 15,
    availableQuantity: 2,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
    pickupWindowStart: "03:30 PM",
    pickupWindowEnd: "05:30 PM",
    category: "NON_VEG",
    status: "ACTIVE",
    description: "Hostel special ghee rice paired with authentic Kerala style beef fry. Outstanding taste.",
    isDonation: false,
  },
  {
    id: 5,
    vendorId: 1,
    name: "Bulk Surplus Veg Fried Rice & Dal (40 Servings)",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
    originalPrice: 1500.0,
    discountPrice: 0.0,
    quantity: 40,
    availableQuantity: 40,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 6),
    pickupWindowStart: "06:00 PM",
    pickupWindowEnd: "08:30 PM",
    category: "VEG",
    status: "DONATION_READY",
    description: "Event leftover from TechFest Valedictory. Hygienic containers. Free for verified NGOs.",
    isDonation: true,
  },
];

const FALLBACK_VENDORS: Vendor[] = [
  {
    id: 1,
    cafeteriaName: "Campus Central Canteen",
    location: "Main Academic Block, North Wing",
    foodCategory: "Indian Multi-Cuisine",
    rating: 4.8,
    totalMealsSaved: 342,
    wastePreventedKg: 171.0,
    revenueSaved: 12540.0,
    co2ReducedKg: 427.5,
  },
  {
    id: 2,
    cafeteriaName: "Green Leaf Bakery & Sweets",
    location: "Student Union Building, Ground Floor",
    foodCategory: "Bakery & Confectionery",
    rating: 4.7,
    totalMealsSaved: 215,
    wastePreventedKg: 86.0,
    revenueSaved: 8600.0,
    co2ReducedKg: 215.0,
  },
  {
    id: 3,
    cafeteriaName: "Hostel 4 Mess Hall",
    location: "Men's Hostel Complex, Block 4",
    foodCategory: "Kerala Mess Meals & Biryani",
    rating: 4.3,
    totalMealsSaved: 84,
    wastePreventedKg: 42.0,
    revenueSaved: 2940.0,
    co2ReducedKg: 105.0,
  },
];

const FALLBACK_ORDERS: Order[] = [
  {
    id: 1,
    studentId: 1,
    mealId: 1,
    vendorId: 1,
    quantity: 2,
    totalPrice: 130.0,
    status: "RESERVED",
    qrCode: "ZB-ORD-984120",
    paymentMethod: "RAZORPAY",
    createdAt: new Date(),
  },
  {
    id: 2,
    studentId: 2,
    mealId: 3,
    vendorId: 2,
    quantity: 1,
    totalPrice: 80.0,
    status: "PICKED_UP",
    qrCode: "ZB-ORD-773821",
    paymentMethod: "STRIPE",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    pickedUpAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

const FALLBACK_DONATIONS: Donation[] = [
  {
    id: 1,
    mealId: 5,
    vendorId: 1,
    ngoId: 6,
    foodQuantity: 40,
    status: "ACCEPTED",
    qrCode: "ZB-DON-554901",
    scheduledPickup: "Today, 07:00 PM",
    impactRecordedKg: 20.0,
    communitiesServed: "Orphanage at Sreekariyam",
    createdAt: new Date(),
  },
];

const FALLBACK_COUPONS: Coupon[] = [
  {
    id: 1,
    code: "ECO50",
    discountPercent: 50,
    pointsRequired: 100,
    minOrderAmount: 50.0,
    description: "Get 50% extra off on any surplus meal! Redeem with 100 Eco Points.",
    isActive: true,
  },
  {
    id: 2,
    code: "GREENBITE",
    discountPercent: 25,
    pointsRequired: 50,
    minOrderAmount: 40.0,
    description: "Flat 25% discount for campus waste warriors. Redeem with 50 Eco Points.",
    isActive: true,
  },
  {
    id: 3,
    code: "DONATEHERO",
    discountPercent: 100,
    pointsRequired: 300,
    minOrderAmount: 0.0,
    description: "100% Free Meal Pass! Sponsored by ZeroBite Green Fund.",
    isActive: true,
  },
];

const FALLBACK_PREDICTIONS: AiPrediction[] = [
  {
    id: 1,
    vendorId: 1,
    date: "Tomorrow (Friday)",
    predictedDemand: 140,
    expectedLeftover: 35,
    recommendedQuantity: 105,
    riskLevel: "HIGH",
    wastePercentage: 25.0,
    smartAdvice: "Prepare 35 fewer meals tomorrow. Heavy rainfall predicted & Friday noon lab cancellations will drop campus attendance by 18%.",
    weather: "Heavy Rain (28°C)",
    examSchedule: "No Exams / Long Weekend",
    festival: "Onam Weekend Start",
  },
  {
    id: 2,
    vendorId: 2,
    date: "Tomorrow (Friday)",
    predictedDemand: 90,
    expectedLeftover: 8,
    recommendedQuantity: 85,
    riskLevel: "LOW",
    wastePercentage: 8.8,
    smartAdvice: "Stable demand expected. Bakery snacks sell exceptionally well during rainy evenings.",
    weather: "Cloudy / Showers",
    examSchedule: "Standard Classes",
    festival: "None",
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [language, setLanguage] = useState<Language>("en");
  const [viewMode, setViewMode] = useState<ViewMode>("web");

  const [studentWallet, setStudentWallet] = useState<number>(650.0);
  const [studentEcoPoints, setStudentEcoPoints] = useState<number>(340);
  const [meals, setMeals] = useState<Meal[]>(FALLBACK_MEALS);
  const [orders, setOrders] = useState<Order[]>(FALLBACK_ORDERS);
  const [donations, setDonations] = useState<Donation[]>(FALLBACK_DONATIONS);
  const [vendors, setVendors] = useState<Vendor[]>(FALLBACK_VENDORS);
  const [coupons, setCoupons] = useState<Coupon[]>(FALLBACK_COUPONS);
  const [predictions, setPredictions] = useState<AiPrediction[]>(FALLBACK_PREDICTIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 1, userId: 1, subject: "QR code scanner quick load", message: "Worked perfectly offline", status: "RESOLVED" },
    { id: 2, userId: 3, subject: "Automated NGO donation ping", message: "Can we route remaining thalis after 6 PM?", status: "OPEN" },
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, senderId: 1, receiverId: 3, message: "Is the Malabar Biryani hot?", timestamp: new Date() },
    { id: 2, senderId: 3, receiverId: 1, message: "Yes, kept in commercial hot counter!", timestamp: new Date() },
  ]);
  const [pushNotifications, setPushNotifications] = useState<{ title: string; message: string; date: string }[]>([
    { title: "🌱 Save 60% on Biryani Today!", message: "Campus Central Canteen just listed 8 surplus aromatic dum biryanis.", date: "10m ago" },
    { title: "🎁 Eco Points Reward Alert", message: "You earned 50 Eco Points this week for reducing 2.5kg of CO₂!", date: "1d ago" },
  ]);

  // Fetch live sync from backend
  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.data) {
          if (data.data.meals?.length) setMeals(data.data.meals);
          if (data.data.orders?.length) setOrders(data.data.orders);
          if (data.data.vendors?.length) setVendors(data.data.vendors);
          if (data.data.donations?.length) setDonations(data.data.donations);
          if (data.data.coupons?.length) setCoupons(data.data.coupons);
          if (data.data.aiPredictions?.length) setPredictions(data.data.aiPredictions);
        }
      })
      .catch((err) => console.log("Frontend loaded fallback state", err));
  }, []);

  // Reserve a meal
  const reserveMeal = (meal: Meal, quantity: number, paymentMethod: string) => {
    const totalCost = meal.discountPrice * quantity;
    if (paymentMethod === "WALLET" && studentWallet < totalCost) {
      alert("Insufficient balance in your student wallet. Please use Razorpay or Stripe online options.");
      return false;
    }

    if (meal.availableQuantity < quantity) {
      alert("Only " + meal.availableQuantity + " portions available.");
      return false;
    }

    // Deduct wallet if wallet
    if (paymentMethod === "WALLET") {
      setStudentWallet((prev) => prev - totalCost);
    }
    // Add Eco points (+25 per meal)
    setStudentEcoPoints((prev) => prev + quantity * 25);

    // Generate random QR
    const randomCode = "ZB-ORD-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder: Order = {
      id: orders.length + 1,
      studentId: 1,
      mealId: meal.id,
      vendorId: meal.vendorId,
      quantity,
      totalPrice: totalCost,
      status: "RESERVED",
      qrCode: randomCode,
      paymentMethod,
      createdAt: new Date(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setMeals((prev) =>
      prev.map((m) =>
        m.id === meal.id
          ? { ...m, availableQuantity: m.availableQuantity - quantity, status: m.availableQuantity - quantity === 0 ? "SOLD_OUT" : "ACTIVE" }
          : m
      )
    );

    // Notify simulator
    setPushNotifications((prev) => [
      {
        title: "✅ Meal Reserved! (" + randomCode + ")",
        message: "You reserved " + quantity + "x " + meal.name + ". Show your QR code at " + (vendors.find((v) => v.id === meal.vendorId)?.cafeteriaName || "the cafeteria") + ".",
        date: "Just now",
      },
      ...prev,
    ]);

    return true;
  };

  // Vendor confirms pickup
  const confirmPickup = (qrCodeInput: string) => {
    const cleanQr = qrCodeInput.trim().toUpperCase();
    const orderIndex = orders.findIndex((o) => o.qrCode === cleanQr && o.status === "RESERVED");

    if (orderIndex !== -1) {
      const order = orders[orderIndex];
      // Mark Picked up
      setOrders((prev) => prev.map((o, idx) => (idx === orderIndex ? { ...o, status: "PICKED_UP", pickedUpAt: new Date() } : o)));

      // Update Vendor Analytics
      setVendors((prev) =>
        prev.map((v) =>
          v.id === order.vendorId
            ? {
              ...v,
              totalMealsSaved: v.totalMealsSaved + order.quantity,
              wastePreventedKg: parseFloat((v.wastePreventedKg + order.quantity * 0.5).toFixed(2)),
              revenueSaved: v.revenueSaved + order.totalPrice,
              co2ReducedKg: parseFloat((v.co2ReducedKg + order.quantity * 1.25).toFixed(2)),
            }
            : v
        )
      );

      alert("🎉 QR Code Verified Successfully! Order marked as Picked Up. Impact logged in live blockchain tracker.");
      return true;
    }

    // Check if donation QR
    const donationIndex = donations.findIndex((d) => d.qrCode === cleanQr && d.status === "ACCEPTED");
    if (donationIndex !== -1) {
      const don = donations[donationIndex];
      setDonations((prev) => prev.map((d, idx) => (idx === donationIndex ? { ...d, status: "PICKED_UP" } : d)));
      alert("🚛 Donation QR Verified! Food successfully transferred to NGO community vehicle.");
      return true;
    }

    alert("❌ Invalid or Already Picked Up QR Code: " + cleanQr);
    return false;
  };

  // NGO accepts donation
  const acceptDonation = (meal: Meal, scheduledTime: string) => {
    const randomDonCode = "ZB-DON-" + Math.floor(100000 + Math.random() * 900000);
    const newDon: Donation = {
      id: donations.length + 1,
      mealId: meal.id,
      vendorId: meal.vendorId,
      ngoId: 6,
      foodQuantity: meal.availableQuantity,
      status: "ACCEPTED",
      qrCode: randomDonCode,
      scheduledPickup: scheduledTime,
      impactRecordedKg: parseFloat((meal.availableQuantity * 0.5).toFixed(2)),
      communitiesServed: "Campus Surrounding Hostels & Slum Schools",
      createdAt: new Date(),
    };

    setDonations((prev) => [newDon, ...prev]);
    setMeals((prev) => prev.map((m) => (m.id === meal.id ? { ...m, availableQuantity: 0, status: "ACCEPTED_BY_NGO" } : m)));

    alert("🤝 Donation Accepted! Driver route activated. Please present your verification QR " + randomDonCode + " upon pickup.");
    return true;
  };

  // Upload Surplus Meal
  const uploadSurplusMeal = (
    newMeal: Omit<Meal, "id" | "availableQuantity" | "status" | "isDonation"> & { isDonation?: boolean }
  ) => {
    const mealObj: Meal = {
      ...newMeal,
      id: meals.length + 1,
      availableQuantity: newMeal.quantity,
      status: newMeal.isDonation ? "DONATION_READY" : "ACTIVE",
      isDonation: !!newMeal.isDonation,
    };
    setMeals((prev) => [mealObj, ...prev]);

    // Broadcast alert if huge discount or donation
    setPushNotifications((prev) => [
      {
        title: newMeal.isDonation ? "🍲 New Free NGO Donation Available!" : "🔥 Instant Surplus Listing Posted!",
        message: newMeal.quantity + " portions of " + newMeal.name + " listed at just ₹" + newMeal.discountPrice + ".",
        date: "Just now",
      },
      ...prev,
    ]);

    alert("✅ New Surplus Listing successfully posted & synced to cloud!");
  };

  // Redeem Coupon
  const redeemCoupon = (coupon: Coupon) => {
    if (studentEcoPoints < coupon.pointsRequired) {
      alert("❌ Insufficient Eco Points! You need " + coupon.pointsRequired + " points.");
      return false;
    }
    setStudentEcoPoints((prev) => prev - coupon.pointsRequired);
    alert("🎉 Coupon " + coupon.code + " unlocked! Added 25% automatic voucher to your student checkout.");
    return true;
  };

  // Support Ticket
  const createTicket = (subject: string, message: string) => {
    const t: SupportTicket = {
      id: tickets.length + 1,
      userId: 1,
      subject,
      message,
      status: "OPEN",
    };
    setTickets((prev) => [t, ...prev]);
    alert("🎫 Support Ticket Submitted! Campus Admin has been pinged.");
  };

  // Chat message
  const sendChatMessage = (msg: string, receiverId: number) => {
    const newChat: ChatMessage = {
      id: chatMessages.length + 1,
      senderId: 1,
      receiverId,
      message: msg,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newChat]);
  };

  // Admin broadcast Push Notification
  const broadcastPushNotification = (title: string, message: string) => {
    setPushNotifications((prev) => [
      {
        title: "📢 [ADMIN BROADCAST]: " + title,
        message,
        date: "Just now",
      },
      ...prev,
    ]);
    alert("📡 Broadcast Push Notification sent to all connected Flutter Android & iOS instances!");
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        viewMode,
        setViewMode,
        studentWallet,
        setStudentWallet,
        studentEcoPoints,
        setStudentEcoPoints,
        meals,
        orders,
        donations,
        vendors,
        coupons,
        predictions,
        tickets,
        chatMessages,
        pushNotifications,
        reserveMeal,
        confirmPickup,
        acceptDonation,
        uploadSurplusMeal,
        redeemCoupon,
        createTicket,
        sendChatMessage,
        broadcastPushNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
