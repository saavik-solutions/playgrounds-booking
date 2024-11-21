import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { config } from './config';
import { TokenTypes } from './token'; // Adjust import path for TokenTypes
import { User } from '../models';
import { Payload } from '../types/auth'; // Ensure Payload is defined in the right place

const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: Payload, done: (error: any, user?: any, info?: any) => void): Promise<void> => {
  try {
    if (payload.type !== TokenTypes.ACCESS) {
      return done(new Error('Invalid token type'), false); // Updated to ensure message comes first
    }

    const user = await User.findUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
