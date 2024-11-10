import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.role || req.body.role !== role) {
      return res.status(403).json({ error: 'Access Denied' });
    }
    next();
  };
};
