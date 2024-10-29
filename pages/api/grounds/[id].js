import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function groundHandler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookGrounds'); // Replace 'myDatabase' with your actual database name

  const groundId = req.query.id;

  if (req.method === 'GET') {
    // Get a single ground
    try {
      const ground = await db.collection('grounds').findOne({ _id: new ObjectId(groundId) });
      if (!ground) {
        return res.status(404).json({ error: 'Ground not found' });
      }
      res.status(200).json(ground);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ground' });
    }
  } else if (req.method === 'PUT') {
    // Update an existing ground
    const { location, description, capacity, type, availability, pricePerHour, features, media, rules, rating } = req.body;

    try {
      const result = await db.collection('grounds').updateOne(
        { _id: new ObjectId(groundId) },
        { $set: { location, description, capacity, type, availability, pricePerHour, features, media, rules, rating } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Ground not found' });
      }

      const updatedGround = await db.collection('grounds').findOne({ _id: new ObjectId(groundId) });
      res.status(200).json(updatedGround);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update ground' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a ground
    try {
      const result = await db.collection('grounds').deleteOne({ _id: new ObjectId(groundId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Ground not found' });
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete ground' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}