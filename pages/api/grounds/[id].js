export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const ground = { id, name: 'Central Park Ground', location: 'NYC', available: true };
    res.status(200).json(ground);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, location, available } = req.body;

    // Update logic here (e.g., in a database)
    res.status(200).json({ id, name, location, available });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    // Delete logic here (e.g., from a database)
    res.status(200).json({ message: `Ground with id ${id} deleted` });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
