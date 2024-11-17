import * as userModel from '../models/user.model';

export const registerUser = async (data: { name: string; email: string; password: string; role?: string }) => {
  if (await userModel.isEmailTaken(data.email)) {
    throw new Error('Email is already taken');
  }
  return userModel.createUser(data);
};

export const verifyPassword = async (email: string, password: string): Promise<boolean> => {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  return userModel.isPasswordMatch(password, user.password);
};
