import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Get your MongoDB URI from environment variables
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

// Check if we are running in development mode
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to store the client
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the client promise
export default clientPromise;
