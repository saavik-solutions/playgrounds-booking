import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      res.status(400).send({
        message: 'Validation Error',
        errors: {},
      });
    }
  };

export default validate;
