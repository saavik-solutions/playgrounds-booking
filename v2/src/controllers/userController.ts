// src/controllers/userController.ts

import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const user = await userService.registerUser(name, email, password, phone, role);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await userService.authenticateUser(email, password);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const googleSignIn = async (req: Request, res: Response) => {
    const { tokenId } = req.body;

    try {
        const { token, user } = await userService.googleSignIn(tokenId);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const requestOtp = async (req: Request, res: Response) => {
    const { phone } = req.body;

    try {
        const otp = await userService.requestOtp(phone);
        res.json({ message: 'OTP sent successfully', otp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginWithOtp = async (req: Request, res: Response) => {
    const { phone, otp } = req.body;

    try {
        const { token, user } = await userService.loginWithOtp(phone, otp);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await userService.getUserProfile(Number(userId));
        res.json({ user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
