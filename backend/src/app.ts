// src/app.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/user.routes'; 
import authRoutes from './routes/auth.routes';

const app = express();

// Global Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is working!' });
});

// API routes
app.use('/users', userRoutes); // /users/register
app.use('/auth', authRoutes); // /auth/

export default app;
