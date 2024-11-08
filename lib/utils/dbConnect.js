// utils/dbConnect.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Use a global variable to preserve the connection across hot-reloads in development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, connect once
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export both the dbConnect function and clientPromise
const dbConnect = async () => {
  const client = await clientPromise;
  return client; // client now has a .db() method
};

export { dbConnect, clientPromise };
export default dbConnect;
