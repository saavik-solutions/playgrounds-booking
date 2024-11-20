// src/routes/userRoutes.ts

import { Router } from 'express';
import { userController } from '../controllers';
const router = Router();

router.post('/register',userController.createUser );


export default router;
