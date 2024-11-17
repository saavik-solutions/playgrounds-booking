import * as z from 'zod';

export const registerValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/\d/, 'Password must contain a number').regex(/[a-zA-Z]/, 'Password must contain a letter'),
  role: z.enum(['user', 'admin']).optional(),
});
