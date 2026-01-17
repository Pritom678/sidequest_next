import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await dbConnect();
    const quests = await db
      .collection("quests")
      .find({ selected: true }) // Only fetch quests that have been started
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      quests: JSON.parse(JSON.stringify(quests)),
    });
  } catch (error) {
    console.error("Error fetching quests:", error);
    return Response.json(
      { success: false, message: "Failed to fetch quests" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const questData = await request.json();
    console.log("API received questData:", questData); // Debug log

    // Validate required fields
    const requiredFields = [
      "id",
      "name",
      "description",
      "price",
      "reward",
      "xp",
      "difficulty",
      "duration",
      "category",
      "image",
      "status",
      "popularity",
    ];
    const missingFields = requiredFields.filter((field) => {
      const value = questData[field];
      console.log(`Checking field ${field}:`, value, "Type:", typeof value); // Debug log
      return (
        !value || (typeof value === "string" ? value.trim() === "" : false)
      );
    });

    console.log("Missing fields:", missingFields); // Debug log

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Check for duplicate quest ID
    const db = await dbConnect();
    const existingQuest = await db
      .collection("quests")
      .findOne({ id: questData.id });

    if (existingQuest) {
      return NextResponse.json(
        { error: "Quest with this ID already exists" },
        { status: 409 },
      );
    }

    // Process tags
    const tags = Array.isArray(questData.tags)
      ? questData.tags
      : questData.tags
        ? questData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

    // Create quest document
    const quest = {
      id: questData.id,
      name: questData.name,
      description: questData.description,
      price: Number(questData.price),
      reward: questData.reward,
      xp: Number(questData.xp),
      difficulty: questData.difficulty,
      duration: questData.duration,
      category: questData.category,
      image: questData.image,
      status: questData.status,
      popularity: Number(questData.popularity),
      tags: tags,
      progress: 0,
      userId: "default-user", // Add userId for achievement tracking
      createdAt: new Date(),
    };

    // Insert quest into database
    console.log("Attempting to insert quest:", quest); // Debug log
    const result = await db.collection("quests").insertOne(quest);
    console.log("Insert result:", result); // Debug log

    return NextResponse.json(
      {
        success: true,
        message: "Quest created successfully",
        questId: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating quest:", error); // Debug log
    console.error("Error details:", error.message); // Debug log
    return NextResponse.json(
      { error: error.message || "Failed to create quest" },
      { status: 500 },
    );
  }
}
