import { z } from 'zod';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

// Define Zod schema for request validation
const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Validate the request body with Zod
    const { name, email, password } = signUpSchema.parse(req.body);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if the email is already in use
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Insert the user into the database
    const result = await db.collection('users').insertOne(newUser);

    // Return success response
    res.status(201).json({ message: 'Sign-up successful', userId: result.insertedId });
  } catch (error) {
    // Send validation errors or internal server errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Sign-up error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
