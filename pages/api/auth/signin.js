import { z } from 'zod';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Define Zod schema for request validation
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Validate request body with Zod
    const { email, password } = signInSchema.parse(req.body);

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db();

    // Check if user exists
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send success response
    res.status(200).json({ token, message: 'Sign-in successful' });
  } catch (error) {
    // If validation fails, send error message
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Sign-in error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
