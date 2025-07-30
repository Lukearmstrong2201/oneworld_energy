// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { getErrorMessage } from '../utils/errorHelper';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: getErrorMessage(error) });
  }
};
