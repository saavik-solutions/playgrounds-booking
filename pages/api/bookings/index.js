export default function handler(req, res) {
  if (req.method === 'GET') {
    const bookings = [
      { id: 1, groundId: 1, userId: 101, date: '2024-10-24', status: 'Confirmed' },
      { id: 2, groundId: 2, userId: 102, date: '2024-10-25', status: 'Pending' },
    ];

    res.status(200).json(bookings);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { groundId, userId, date } = req.body;

    if (!groundId || !userId || !date) {
      return res.status(400).json({ error: 'Ground ID, User ID, and Date are required' });
    }

    const newBooking = { id: Date.now(), groundId, userId, date, status: 'Confirmed' };

    // Save booking logic would go here (e.g., in a database)
    res.status(201).json(newBooking);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


