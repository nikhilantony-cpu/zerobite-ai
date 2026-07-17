import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.run(sql`select 1`);
    return Response.json({ ok: true });
  } catch (error: any) {
    console.error("Health check database query failed:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
