import express, { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import docsRoute from './docs.route';
import config from '../../config/config';

// Create a router instance
const router: Router = express.Router();

// Define the default routes
const defaultRoutes: Array<{ path: string; route: Router }> = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

// Define the development-only routes
const devRoutes: Array<{ path: string; route: Router }> = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

// Register default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Register development-only routes
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
