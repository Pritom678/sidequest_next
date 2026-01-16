import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log("Fetching quest with ID:", id); // Debug log

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Quest ID is required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    const quest = await db.collection("quests").findOne({ id: id });

    console.log("Found quest:", quest); // Debug log

    if (!quest) {
      return NextResponse.json(
        { success: false, message: "Quest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quest: quest,
    });
  } catch (error) {
    console.error("Error fetching quest:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
