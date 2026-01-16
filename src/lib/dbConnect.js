const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Create a MongoClient with a simpler configuration
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

let db = null;

export const dbConnect = async () => {
  try {
    // If not connected, connect first
    if (!db) {
      await client.connect();
      db = client.db(dbName);
      console.log("Connected to MongoDB database:", dbName);
    }

    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
