import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the client across hot-reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect().catch(err => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, initialize once
  client = new MongoClient(uri);
  clientPromise = client.connect().catch(err => {
    console.error("MongoDB connection error:", err);
    throw err;
  });
}

export default clientPromise;
