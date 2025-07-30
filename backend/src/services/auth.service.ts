// src/auth.services.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';

// Load and validate JWT environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Type definitions
interface RegisterUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

// Register a new user
export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}: RegisterUserInput) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      firstName,
      lastName,
    },
  });

  return user;
};

// Login an existing user
export const loginUser = async ({ email, password }: LoginUserInput) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET!,
    { expiresIn: JWT_EXPIRES_IN } 
  );

  return { token, user };
};
