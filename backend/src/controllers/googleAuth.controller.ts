import { Request, Response } from 'express';

export const handleGoogleAuth = (req: Request, res: Response) => {
  try {
    const user = req.user; // Passport sets req.user after successful auth
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
