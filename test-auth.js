const { MongoClient } = require("mongodb");

async function testAuth() {
  const client = new MongoClient(
    process.env.MONGODB_URI || "mongodb://localhost:27017/sidequest",
  );

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || "sidequest");

    console.log("Testing database connection...");

    // Check if test user exists
    const testUser = await db
      .collection("users")
      .findOne({ email: "admin@sidequest.com" });

    if (testUser) {
      console.log("✅ Test user found:", testUser.email);
      console.log("Password should be:", testUser.password);
    } else {
      console.log("❌ Test user not found, creating one...");

      // Create test user
      const newUser = {
        name: "Admin User",
        email: "admin@sidequest.com",
        password: "sidequest123",
        role: "admin",
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
      console.log("✅ Test user created:", result.insertedId);

      // Initialize user stats
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

      console.log("✅ User stats initialized");
    }

    // List all users
    const allUsers = await db.collection("users").find({}).toArray();
    console.log(`📊 Total users in database: ${allUsers.length}`);
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.close();
  }
}

testAuth();
