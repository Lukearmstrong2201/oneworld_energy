// src/auth.services.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

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

export const loginUser = async ({ email, password }: LoginUserInput) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) throw new Error('Invalid credentials');

  // Generate token here or in controller (your choice)
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { user, token };
};
