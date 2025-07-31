// src/middlewares/authMiddleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../types/jwt';

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  //Bearer Token
  const token = authHeader?.split(' ')[1]; 

  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || typeof decoded !== 'object' || !('userId' in decoded)) {
      return res.status(403).json({ error: 'Token invalid' });
    }

    const { userId, role } = decoded as JwtPayload;
    req.user = { userId, role };

    next();
  });
};
