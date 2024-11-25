import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
 import { config } from './config';
import { User } from '../models';
const prisma = new PrismaClient();

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: '/api/auth/google/callback',
  },
    async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findUserByGoogleId(profile.id); // Use the model function
      if (!user) {
        user = await User.createUser({
          googleId: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
        }); // Create user if not found
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
);


passport.serializeUser((user: any, done) => {
  done(null, user.id); // Serialize user ID to session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: {  } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
