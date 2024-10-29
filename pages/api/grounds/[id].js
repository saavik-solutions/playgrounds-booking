// pages/api/grounds/[id].js

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // Handle GET request: retrieve ground information
      const ground = { id, name: 'Central Park Ground', location: 'NYC', available: true };
      res.status(200).json(ground);
      break;

    case 'PUT':
      // Handle PUT request: update ground information
      const { name, location, available } = req.body;

      // Here, you would typically include logic to update the data in your database
      res.status(200).json({ id, name, location, available });
      break;

    case 'DELETE':
      // Handle DELETE request: delete ground
      // Here, you would typically include logic to delete the data from your database
      res.status(200).json({ message: `Ground with id ${id} deleted` });
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
