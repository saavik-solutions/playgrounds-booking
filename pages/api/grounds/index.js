import clientPromise from "@/lib/mongodb";


export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('myDatabase'); // Replace 'myDatabase' with your actual database name

  if (req.method === 'GET') {
    // Handle GET request: List all grounds
    try {
      const grounds = await db.collection('grounds').find({}).toArray();
      res.status(200).json(grounds);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch grounds' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request: Create a new ground
    const { name, location, available } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const newGround = { name, location, available: available ?? true };

    try {
      const result = await db.collection('grounds').insertOne(newGround);
      res.status(201).json({ _id: result.insertedId, ...newGround });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create new ground' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
