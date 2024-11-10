import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateBody = (schema: ZodSchema<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
        return; // Ensure the function returns void after sending the response
      }
      res.status(500).json({ error: "An unexpected error occurred." });
      return; // Ensure the function returns void after sending the response
    }
  };
};
