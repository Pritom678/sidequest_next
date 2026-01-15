const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dname = process.env.DB_NAME;
const collections = {
  Quests: "quests",
  Users: "users",
};

// Create a MongoClient with a simpler configuration
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

let db = null;

export const dbConnect = async (cname) => {
  try {
    // If not connected, connect first
    if (!db) {
      await client.connect();
      db = client.db(dname);
      console.log("Connected to MongoDB database:", dname);
    }

    return db.collection(cname);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
