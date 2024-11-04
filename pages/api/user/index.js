import clientPromise from "@/lib/mongodb";
import { z } from "zod";

// Define the schema for the ground data
const groundSchema = z.object({
  groundName: z.string(),
  location: z.string(),
  description: z.string().optional(),
  type: z.string(),
  availability: z.boolean().optional(),
  pricePerHour: z.number().optional(),
  media: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
  totalPeopleRated: z.number().int().nonnegative().optional(),
});

export default async function groundsHandler(req, res) {
  const client = await clientPromise;
  const db = client.db("bookGrounds");

  if (req.method === "GET") {
    // Handle GET request: List all grounds with selected fields
    try {
      const grounds = await db.collection("grounds").find(
        {},
        {
          projection: {
            groundName: 1,
            location: 1,
            description: 1,
            type: 1,
            availability: 1,
            pricePerHour: 1,
            media: 1,
            rating: 1,
            totalPeopleRated: 1,
          },
        }
      ).toArray();

      // Validate and transform each ground using the Zod schema
      const validatedGrounds = grounds.map((ground) => groundSchema.parse(ground));

      res.status(200).json(validatedGrounds);
    } catch (error) {
      // If validation fails, respond with a 400 error
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data format", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to fetch grounds" });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
