import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();
      const db = client.db(process.env.DB_NAME);

      // Check if user already exists
      const existingUser = await db.collection("users").findOne({ email });

      if (existingUser) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        );
      }

      // Create new user
      const newUser = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In production, hash this with bcrypt
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          bio: "",
          avatar: "",
          preferences: {
            theme: "light",
            notifications: true,
          },
        },
        stats: {
          questsCreated: 0,
          questsCompleted: 0,
          totalXP: 0,
          currentStreak: 0,
          longestStreak: 0,
        },
      };

      const result = await db.collection("users").insertOne(newUser);

      // Initialize user stats for achievements
      await db.collection("userStats").insertOne({
        userId: result.insertedId.toString(),
        totalXP: 0,
        questsCreated: 0,
        questsCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        aiUsageCount: 0,
        lastUpdated: new Date(),
      });

      return NextResponse.json({
        success: true,
        message: "Account created successfully",
        userId: result.insertedId.toString(),
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
