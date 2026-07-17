import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    const allVendors = await db.select().from(vendors);
    const allMeals = await db.select().from(meals);
    const allOrders = await db.select().from(orders);
    const allDonations = await db.select().from(donations);
    const allCoupons = await db.select().from(coupons);
    const allPredictions = await db.select().from(aiPredictions);
    const allTickets = await db.select().from(supportTickets);
    const allChat = await db.select().from(chatMessages);

    return NextResponse.json({
      success: true,
      data: {
        users: allUsers,
        vendors: allVendors,
        meals: allMeals,
        orders: allOrders,
        donations: allDonations,
        coupons: allCoupons,
        aiPredictions: allPredictions,
        supportTickets: allTickets,
        chatMessages: allChat,
      },
    });
  } catch (error: any) {
    console.error("Error fetching ZeroBite DB data:", error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
