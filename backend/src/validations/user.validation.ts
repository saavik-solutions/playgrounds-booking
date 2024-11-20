import { z } from 'zod';

 const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.string().optional(),
  }),
});

 const getUserValidation = z.object({
  params: z.object({
    userId: z.string().regex(/^\d+$/, 'User ID must be a number'),
  }),
});

 const updateUserValidation = z.object({
  params: z.object({
    userId: z.string().regex(/^\d+$/, 'User ID must be a number'),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().min(6).optional(),
    role: z.string().optional(),
  }),
});

 const deleteUserValidation = z.object({
  params: z.object({
    userId: z.string().regex(/^\d+$/, 'User ID must be a number'),
  }),
});

export const userValidation = {
    createUserValidation,
    getUserValidation,
    updateUserValidation,
    deleteUserValidation

}