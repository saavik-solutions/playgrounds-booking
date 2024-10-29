// testMongoConnection.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://saaviksolutions:e0gHNCVzcWFORWns@groundbooking.mhdfw.mongodb.net/";
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    await client.close();
  }
}

testConnection();
