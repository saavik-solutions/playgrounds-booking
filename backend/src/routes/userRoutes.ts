import express from 'express';
import { createUser, getUser } from '../controllers/userController';
import { authorizeRole } from '../middleware/rbac';

const router = express.Router();

router.post('/', authorizeRole('admin'), createUser);  // Only allow 'admin' role
router.get('/:id', getUser);

export default router;
