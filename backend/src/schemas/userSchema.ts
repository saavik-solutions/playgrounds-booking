import { z } from "zod";
import { UserRole } from "@prisma/client";

export const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(UserRole).default("USER"),
});

export const updateUserSchema = createUserSchema.partial();
