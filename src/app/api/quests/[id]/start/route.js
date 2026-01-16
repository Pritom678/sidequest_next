import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    console.log("Starting quest with ID:", id); // Debug log

    const db = await dbConnect();
    const quest = await db.collection("quests").findOne({ id: id });
    const result = await db.collection("quests").updateOne(
      { id: id },
      {
        $set: {
          selected: true,
          startedAt: new Date(),
          progress: 0,
        },
      }
    );

    console.log("Update result:", result); // Debug log

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Quest started successfully",
    });
  } catch (error) {
    console.error("Error starting quest:", error);
    return NextResponse.json(
      { error: "Failed to start quest" },
      { status: 500 }
    );
  }
}
