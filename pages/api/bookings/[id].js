export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Handle GET request: Fetch a specific ground by ID
    const ground = { id, name: 'Central Park Ground', location: 'NYC', available: true };
    res.status(200).json(ground);
  } else if (req.method === 'PUT') {
    // Handle PUT request: Update a specific ground by ID
    const { name, location, available } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const updatedGround = { id, name, location, available: available || true };

    // Update ground logic would go here (e.g., database update)
    res.status(200).json(updatedGround);
  } else if (req.method === 'DELETE') {
    // Handle DELETE request: Delete a ground by ID
    // Delete ground logic would go here (e.g., database deletion)
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
