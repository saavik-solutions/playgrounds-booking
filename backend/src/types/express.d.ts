import { User } from '@prisma/client'; // Assuming User is the Prisma user model type
declare global {
  namespace Express {
    interface Request {
      user?: ReturnType<typeof toJSON<PrismaUser>>;
    }
  }
}