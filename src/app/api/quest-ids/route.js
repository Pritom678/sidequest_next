import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await dbConnect();
    const quests = await db
      .collection("quests")
      .find({}, { projection: { id: 1, name: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      quests: quests,
    });
  } catch (error) {
    console.error("Error fetching quest IDs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch quest IDs" },
      { status: 500 }
    );
  }
}
