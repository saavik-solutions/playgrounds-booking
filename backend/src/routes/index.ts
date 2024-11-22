import express from 'express';
import authRoutes from './auth.route'; // Update this with the actual file path
import userRoutes from './user.routes'; // Update this with the actual file path


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;