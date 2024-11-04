// pages/api/test-db.js
import dbConnect from '@/lib/utils/dbConnect';

export default async function handler(req, res) {
  try {
    const client = await dbConnect();
    const db = client.db(); // Access the database instance

    // You can try to get some sample data here (optional) to confirm the connection works
    const collections = await db.listCollections().toArray();

    res.status(200).json({ message: 'Database connected successfully', collections });
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
