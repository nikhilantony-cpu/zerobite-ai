import { db } from "@/db";
import {
  users,
  vendors,
  meals,
  orders,
  donations,
  coupons,
  aiPredictions,
  supportTickets,
  chatMessages,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function seedDatabaseIfNeeded() {
  const existingUsers = await db.select().from(users);
  if (existingUsers.length > 0) {
    return { status: "already_seeded", count: existingUsers.length };
  }

  console.log("Seeding initial ZeroBite database...");

  // 1. Seed Users
  const [student1] = await db
    .insert(users)
    .values({
      name: "Arjun Krishna",
      email: "arjun@univ.edu",
      phone: "+91 9876543210",
      role: "STUDENT",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      campus: "College of Engineering Trivandrum",
      ecoPoints: 340,
      walletBalance: 650.0,
      status: "APPROVED",
    })
    .returning();

  const [student2] = await db
    .insert(users)
    .values({
      name: "Priya Sharma",
      email: "priya@univ.edu",
      phone: "+91 9876543211",
      role: "STUDENT",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      campus: "College of Engineering Trivandrum",
      ecoPoints: 520,
      walletBalance: 1200.0,
      status: "APPROVED",
    })
    .returning();

  const [vendorUser1] = await db
    .insert(users)
    .values({
      name: "Campus Central Canteen",
      email: "canteen@univ.edu",
      phone: "+91 9876543212",
      role: "VENDOR",
      avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80",
      campus: "College of Engineering Trivandrum",
      ecoPoints: 1200,
      walletBalance: 4500.0,
      status: "APPROVED",
    })
    .returning();

  const [vendorUser2] = await db
    .insert(users)
    .values({
      name: "Green Leaf Bakery & Mess",
      email: "bakery@univ.edu",
      phone: "+91 9876543213",
      role: "VENDOR",
      avatar: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=80",
      campus: "College of Engineering Trivandrum",
      ecoPoints: 890,
      walletBalance: 3200.0,
      status: "APPROVED",
    })
    .returning();

  const [vendorUser3] = await db
    .insert(users)
    .values({
      name: "Hostel 4 Mess Hall",
      email: "hostel4@univ.edu",
      phone: "+91 9876543214",
      role: "VENDOR",
      avatar: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=150&auto=format&fit=crop&q=80",
      campus: "College of Engineering Trivandrum",
      ecoPoints: 450,
      walletBalance: 1800.0,
      status: "PENDING",
    })
    .returning();

  const [ngoUser1] = await db
    .insert(users)
    .values({
      name: "Hope Campus Initiative",
      email: "hope@ngo.org",
      phone: "+91 9876543215",
      role: "NGO",
      avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150&auto=format&fit=crop&q=80",
      campus: "Trivandrum City & Campus",
      ecoPoints: 2500,
      walletBalance: 0.0,
      status: "APPROVED",
    })
    .returning();

  const [ngoUser2] = await db
    .insert(users)
    .values({
      name: "Robin Hood Army Kerala",
      email: "kerala@rha.org",
      phone: "+91 9876543216",
      role: "NGO",
      avatar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80",
      campus: "Kerala Division",
      ecoPoints: 4100,
      walletBalance: 0.0,
      status: "APPROVED",
    })
    .returning();

  const [adminUser] = await db
    .insert(users)
    .values({
      name: "Dr. Rajesh Nair (Admin)",
      email: "admin@zerobite.com",
      phone: "+91 9876543217",
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      campus: "ZeroBite HQ",
      ecoPoints: 9999,
      walletBalance: 10000.0,
      status: "APPROVED",
    })
    .returning();

  // 2. Seed Vendors table
  await db.insert(vendors).values([
    {
      id: vendorUser1.id,
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
      id: vendorUser2.id,
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
      id: vendorUser3.id,
      cafeteriaName: "Hostel 4 Mess Hall",
      location: "Men's Hostel Complex, Block 4",
      foodCategory: "Kerala Mess Meals & Biryani",
      rating: 4.3,
      totalMealsSaved: 84,
      wastePreventedKg: 42.0,
      revenueSaved: 2940.0,
      co2ReducedKg: 105.0,
    },
  ]);

  // 3. Seed Meals / Surplus Food
  const [meal1] = await db
    .insert(meals)
    .values({
      vendorId: vendorUser1.id,
      name: "Malabar Chicken Biryani (Surplus Batch)",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
      originalPrice: 160.0,
      discountPrice: 65.0,
      quantity: 12,
      availableQuantity: 8,
      expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 4), // 4 hrs from now
      pickupWindowStart: "04:30 PM",
      pickupWindowEnd: "06:30 PM",
      category: "NON_VEG",
      status: "ACTIVE",
      description: "Freshly prepared noon batch aromatic dum biryani with raita and pickle. Utterly delicious and safe for consumption today.",
      isDonation: false,
    })
    .returning();

  const [meal2] = await db
    .insert(meals)
    .values({
      vendorId: vendorUser1.id,
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
      description: "Includes rice, 3 types of seasonal curries, sambar, thoran, and papad. Packed in biodegradable banana-leaf lined boxes.",
      isDonation: false,
    })
    .returning();

  const [meal3] = await db
    .insert(meals)
    .values({
      vendorId: vendorUser2.id,
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
      description: "Surplus baked goods from today's morning bake. Includes grilled paneer sandwiches and 2 chocolate croissants.",
      isDonation: false,
    })
    .returning();

  const [meal4] = await db
    .insert(meals)
    .values({
      vendorId: vendorUser3.id,
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
      description: "Hostel special ghee rice paired with authentic Kerala style beef fry. Outstanding taste at unbeatable student price.",
      isDonation: false,
    })
    .returning();

  const [donationMeal1] = await db
    .insert(meals)
    .values({
      vendorId: vendorUser1.id,
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
      description: "Event leftover from TechFest Valedictory function. Completely untouched, kept in hot hygienic containers. Free for verified NGOs.",
      isDonation: true,
    })
    .returning();

  // 4. Seed Orders
  await db.insert(orders).values([
    {
      studentId: student1.id,
      mealId: meal1.id,
      vendorId: vendorUser1.id,
      quantity: 2,
      totalPrice: 130.0,
      status: "RESERVED",
      qrCode: "ZB-ORD-984120",
      paymentMethod: "RAZORPAY",
    },
    {
      studentId: student2.id,
      mealId: meal3.id,
      vendorId: vendorUser2.id,
      quantity: 1,
      totalPrice: 80.0,
      status: "PICKED_UP",
      qrCode: "ZB-ORD-773821",
      paymentMethod: "STRIPE",
      pickedUpAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ]);

  // 5. Seed Donations
  await db.insert(donations).values([
    {
      mealId: donationMeal1.id,
      vendorId: vendorUser1.id,
      ngoId: ngoUser1.id,
      foodQuantity: 40,
      status: "ACCEPTED",
      qrCode: "ZB-DON-554901",
      scheduledPickup: "Today, 07:00 PM",
      impactRecordedKg: 20.0,
      communitiesServed: "Orphanage at Sreekariyam & Street Volunteers",
    },
  ]);

  // 6. Seed Coupons
  await db.insert(coupons).values([
    {
      code: "ECO50",
      discountPercent: 50,
      pointsRequired: 100,
      minOrderAmount: 50.0,
      description: "Get 50% extra off on any surplus meal! Redeem with 100 Eco Points.",
      isActive: true,
    },
    {
      code: "GREENBITE",
      discountPercent: 25,
      pointsRequired: 50,
      minOrderAmount: 40.0,
      description: "Flat 25% discount for campus waste warriors. Redeem with 50 Eco Points.",
      isActive: true,
    },
    {
      code: "DONATEHERO",
      discountPercent: 100,
      pointsRequired: 300,
      minOrderAmount: 0.0,
      description: "100% Free Meal Pass! Sponsored by ZeroBite Green Fund.",
      isActive: true,
    },
  ]);

  // 7. Seed AI Predictions
  await db.insert(aiPredictions).values([
    {
      vendorId: vendorUser1.id,
      date: "Tomorrow (Friday)",
      predictedDemand: 140,
      expectedLeftover: 35,
      recommendedQuantity: 105, // "Prepare 35 fewer meals tomorrow"
      riskLevel: "HIGH",
      wastePercentage: 25.0,
      smartAdvice: "Prepare 35 fewer meals tomorrow. Heavy rainfall predicted & Friday noon lab cancellations will drop campus attendance by 18%.",
      weather: "Heavy Rain (28°C)",
      examSchedule: "No Exams / Long Weekend",
      festival: "Onam Weekend Start",
    },
    {
      vendorId: vendorUser2.id,
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
  ]);

  // 8. Seed Support Tickets
  await db.insert(supportTickets).values([
    {
      userId: student1.id,
      subject: "QR code scanner took 10 seconds to load at pickup",
      message: "The vendor had weak Wi-Fi so the offline verification PIN worked flawlessly as backup!",
      status: "RESOLVED",
    },
    {
      userId: vendorUser1.id,
      subject: "Requesting automated NGO donation ping after 6 PM",
      message: "Can we set our remaining thalis to be automatically routed to Hope NGO every evening?",
      status: "OPEN",
    },
  ]);

  // 9. Seed Chat Messages
  await db.insert(chatMessages).values([
    {
      senderId: student1.id,
      receiverId: vendorUser1.id,
      message: "Hi! Is the Malabar Biryani still hot or should I ask for it to be microwaved during pickup?",
    },
    {
      senderId: vendorUser1.id,
      receiverId: student1.id,
      message: "Hello Arjun! Yes, it is kept in our commercial heated display counter. You will get it piping hot!",
    },
  ]);

  console.log("Database seeded successfully!");
  return { status: "success" };
}
