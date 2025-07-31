//src/middlewares/role.middleware

import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }
    next();
  };
};