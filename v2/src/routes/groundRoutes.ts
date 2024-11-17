// src/routes/groundRoutes.ts

import { Router } from 'express';
import * as groundController from '../controllers/groundController';

const router = Router();

// Route to get all grounds
router.get('/', groundController.getAllGrounds);

// Route to create a new ground (Admin only)
router.post('/', groundController.createGround);

// Route to update an existing ground (Admin only)
router.put('/:id', groundController.updateGround);

// Route to delete a ground (Admin only)
router.delete('/:id', groundController.deleteGround);

export default router;
