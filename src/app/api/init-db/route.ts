import { NextResponse } from "next/server";
import { seedDatabaseIfNeeded } from "@/db/seedData";

export async function GET() {
  try {
    const result = await seedDatabaseIfNeeded();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await seedDatabaseIfNeeded();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
