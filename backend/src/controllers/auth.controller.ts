// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { getErrorMessage } from '../utils/errorHelper';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    // Remove hashedPassword before sending response
    const { hashedPassword, ...userWithoutPassword } = user;

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);

    const { hashedPassword, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(401).json({ error: getErrorMessage(error) });
  }
};
