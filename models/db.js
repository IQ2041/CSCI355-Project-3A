require('dotenv').config();
console.log("Loaded ATLAS_URI:", process.env.ATLAS_URI); 

const { MongoClient } = require('mongodb');

// Read MongoDB URI from .env file
const dbURL = process.env.ATLAS_URI;

// Safety check: ensure the URI is defined
if (!dbURL) {
  throw new Error("ATLAS_URI is undefined. Make sure your .env file has the correct variable and is in the project root.");
}

let db; // Global variable to hold the DB connection

// Function to connect to MongoDB
async function connectToDB() {
  try {
    console.log("🔌 Connecting to MongoDB...");

    const client = new MongoClient(dbURL);
    await client.connect();

    console.log("✅ Connected to MongoDB!");

    // Use a specific database (change name if needed)
    db = client.db("cs355db");

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
}

// Function to get a specific collection from the DB
function getCollection(collectionName) {
  if (!db) {
    throw new Error("❌ Database connection not established. Call connectToDB first.");
  }
  return db.collection(collectionName);
}

// Export both functions
module.exports = {
  connectToDB,
  getCollection,
};
