import { z } from 'zod';

// Validation schema for creating a ground
export const createGroundSchema = z.object({
  groundName: z.string().min(3, "Ground name must be at least 3 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().optional(),
  type: z.enum(["Football", "Cricket", "Tennis", "Basketball","Badminton"]),
  media: z.string().url("Invalid URL").optional(),
});

// Validation schema for adding slots to a ground
export const addSlotsSchema = z.object({
  groundId: z.number().int("Ground ID must be an integer"),
  slots: z
    .array(
      z.object({
        timeRange: z.string(),
        price: z.number().positive("Price must be a positive number"),
      })
    )
    .min(1, "At least one slot is required"),
});
