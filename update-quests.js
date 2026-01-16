const { dbConnect } = require("../src/lib/dbConnect");

async function addUserIdToQuests() {
  try {
    const db = await dbConnect();

    // Update all quests that don't have userId to add "default-user"
    const result = await db
      .collection("quests")
      .updateMany(
        { userId: { $exists: false } },
        { $set: { userId: "default-user" } }
      );

    console.log(`Updated ${result.modifiedCount} quests with userId`);

    // Verify the update
    const questsWithoutUserId = await db
      .collection("quests")
      .countDocuments({ userId: { $exists: false } });
    console.log(`Quests without userId: ${questsWithoutUserId}`);

    const questsWithUserId = await db
      .collection("quests")
      .countDocuments({ userId: "default-user" });
    console.log(`Quests with userId 'default-user': ${questsWithUserId}`);

    process.exit(0);
  } catch (error) {
    console.error("Error updating quests:", error);
    process.exit(1);
  }
}

addUserIdToQuests();
