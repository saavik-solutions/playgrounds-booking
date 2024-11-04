import bcrypt from 'bcrypt';
import { z } from 'zod';
import dbConnect from '@/lib/utils/dbConnect';
import jwt from 'jsonwebtoken';

// Define Zod schema for request validation
const signUpSchema = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
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
  const client = await dbConnect();
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
      name, // Changed to name to match parsed result
      email,
      password: hashedPassword, // store the hashed password
      role: 'user', // default role for new users
      createdAt: new Date(),
    };

    // Insert the user into the database
    const result = await db.collection('users').insertOne(newUser);

    // Generate a JWT for the new user
    const token = jwt.sign(
      { id: result.insertedId, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    // Set the token as a cookie (for authentication purposes)
    const cookieOptions = [
      `auth-token=${token}`,
      'HttpOnly',
      'Path=/',
      `SameSite=Strict`,
      process.env.NODE_ENV === 'production' && 'Secure',
    ].filter(Boolean).join('; ');
    
    res.setHeader('Set-Cookie', cookieOptions);

    res.status(201).json({ message: 'User created successfully', token });
 } catch (error) {
  console.error('Error in signup handler:', error);
  if (error instanceof z.ZodError) {
    return res.status(400).json({ message: 'Invalid input', errors: error.errors });
  }
  res.status(500).json({ message: 'Internal server error' });
}

}
