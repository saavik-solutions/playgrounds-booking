import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define a Zod schema for validation
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  password: z.string().min(6),
});

// Create User
export const createUser = async (req: Request, res: Response) => {
  const validationResult = userSchema.safeParse(req.body);  // Safe parse for error handling

  if (!validationResult.success) {
    // Send a descriptive error message
    return res.status(400).json({ error: validationResult.error.errors.map(e => e.message) });
  }

  try {
    const user = await prisma.user.create({ data: validationResult.data });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get User by ID
export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;  // Use `id` as string if defined as string in schema
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
