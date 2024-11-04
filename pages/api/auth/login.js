import { z } from 'zod';
import dbConnect from '@/lib/utils/dbConnect';
import bcrypt from 'bcrypt';
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

  // Connect to MongoDB
  const client = await dbConnect();
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
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set token in HTTP-only cookie for security
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`);

    // Send success response
    res.status(200).json({ message: 'Sign-in successful' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Send specific validation errors if Zod validation fails
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    // Log error only in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Sign-in error:', error);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
