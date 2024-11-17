// src/controllers/groundController.ts

import { Request, Response } from 'express';
import * as groundService from '../services/groundService';

// Get all grounds
export const getAllGrounds = async (req: Request, res: Response) => {
  try {
    const grounds = await groundService.getAllGrounds();
    res.json(grounds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve grounds' });
  }
};

// Create a new ground (Admin only)
export const createGround = async (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { groundName, location, description, type, availability, pricePerHour } = req.body;

  try {
    const newGround = await groundService.createGround({
      groundName,
      location,
      description,
      type,
      availability,
      pricePerHour,
    });
    res.status(201).json(newGround);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ground' });
  }
};

// Update ground (Admin only)
export const updateGround = async (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { id } = req.params;
  const { groundName, location, description, type, availability, pricePerHour } = req.body;

  try {
    const updatedGround = await groundService.updateGround(Number(id), {
      groundName,
      location,
      description,
      type,
      availability,
      pricePerHour,
    });
    res.json(updatedGround);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ground' });
  }
};

// Delete ground (Admin only)
export const deleteGround = async (req: Request, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { id } = req.params;

  try {
    await groundService.deleteGround(Number(id));
    res.json({ message: 'Ground deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ground' });
  }
};
