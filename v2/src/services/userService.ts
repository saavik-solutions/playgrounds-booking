// src/services/userService.ts

import prisma from '../models/prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { sendOtpToPhone, verifyOtp } from '../utils/otpService';

const JWT_SECRET = process.env.JWT_SECRET as string;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const oAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Generate JWT token
export const generateToken = (userId: number, role: string) => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
};

// Register new user
export const registerUser = async (name: string, email: string, password: string, phone: string, role = 'user') => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: { name, email, password: hashedPassword, phone, role },
    });
};

// Authenticate user with email/password
export const authenticateUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Invalid email or password');

    const token = generateToken(user.id, user.role);
    return { token, user };
};

// Google sign-in
export const googleSignIn = async (tokenId: string) => {
    const ticket = await oAuthClient.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) throw new Error('Google authentication failed');

    const { email, name } = payload;
    let user = await prisma.user.findUnique({ where: { email } });

    // Register user if they don't exist
    if (!user) {
        user = await prisma.user.create({
            data: { name, email, role: 'user', googleId: payload.sub },
        });
    }

    const token = generateToken(user.id, user.role);
    return { token, user };
};

// Request OTP for mobile login
export const requestOtp = async (phone: string) => {
    const otp = await sendOtpToPhone(phone);
    return otp;
};

// Login with OTP
export const loginWithOtp = async (phone: string, otp: string) => {
    const isValidOtp = await verifyOtp(phone, otp);
    if (!isValidOtp) throw new Error('Invalid OTP');

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
        user = await prisma.user.create({
            data: { phone, role: 'user' },
        });
    }

    const token = generateToken(user.id, user.role);
    return { token, user };
};

// Retrieve user profile
export const getUserProfile = async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    return user;
};
