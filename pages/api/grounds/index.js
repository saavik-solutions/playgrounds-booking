import clientPromise from "@/lib/mongodb";

export default async function groundsHandler(req, res) {
  const client = await clientPromise;
  const db = client.db('bookGrounds'); // Replace 'myDatabase' with your actual database name

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
    const {
      groundName,
      location,
      description,
      capacity,
      type,
      availability,
      pricePerHour,
      features,
      media,
      rules,
      rating
    } = req.body;

    if (!groundName || !location) {
      return res.status(400).json({ error: 'Ground name and location are required' });
    }

    const newGround = {
      groundName,
      location,
      description,
      capacity,
      type,
      availability: availability ?? true,
      pricePerHour,
      features,
      media,
      rules,
      rating
    };

    try {
      const result = await db.collection('grounds').insertOne(newGround);
      res.status(201).json({ _id: result.insertedId, ...newGround });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create new ground' });
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request: Update an existing ground
    const { id, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Ground ID is required' });
    }

    try {
      const result = await db.collection('grounds').updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Ground not found' });
      }

      const updatedGround = await db.collection('grounds').findOne({ _id: new ObjectId(id) });
      res.status(200).json(updatedGround);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update ground' });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request: Delete a ground
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Ground ID is required' });
    }

    try {
      const result = await db.collection('grounds').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Ground not found' });
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete ground' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}