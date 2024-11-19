// src/routes/userRoutes.ts

import { Router } from 'express';
import {User}
const router = Router();

router.post('/register', );
router.post('/login', userController.loginUser);
router.post('/google-signin', userController.googleSignIn);
router.post('/request-otp', userController.requestOtp);
router.post('/login-otp', userController.loginWithOtp);
router.get('/profile/:userId', userController.getUserProfile);

export default router;
