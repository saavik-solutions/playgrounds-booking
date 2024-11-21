import express from 'express';
import { authController } from '../controllers';
import validate from '../middlewares/validate'; // Assuming you have a validation middleware
import { authValidation } from '../validations'; // Assuming you have validation schemas
import auth from '../middlewares/auth'; // Assuming you have an authentication middleware

const router = express.Router();

// Register route
router.post(
  '/register', 
  validate(authValidation.register), // Validate registration input
  authController.register
);

// Login route
router.post(
  '/login', 
  validate(authValidation.login), // Validate login input
  authController.login
);

// Logout route (requires authentication)
router.post(
  '/logout', 
  auth(), // Ensure user is authenticated
  validate(authValidation.logout), // Validate logout input
  authController.logout
);

// Refresh tokens route
router.post(
  '/refresh-tokens', 
  validate(authValidation.refreshTokens), // Validate refresh token input
  authController.refreshTokens
);

// Forgot password route
router.post(
  '/forgot-password', 
  validate(authValidation.forgotPassword), // Validate forgot password input
  authController.forgotPassword
);

// Reset password route
router.post(
  '/reset-password', 
  validate(authValidation.resetPassword), // Validate reset password input
  authController.resetPassword
);

// Verify email route
router.get(
  '/verify-email', 
  validate(authValidation.verifyEmail), // Validate email verification input
  authController.verifyEmail
);

// // Optional: Resend verification email route (if you want to add this functionality)
// router.post(
//   '/resend-verification-email', 
//   auth(), // Ensure user is authenticated
//   authController.sendUserVerificationEmail // Uncomment this method in your controller
// );

export default router;