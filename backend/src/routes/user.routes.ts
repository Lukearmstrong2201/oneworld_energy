// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsers, createNewUser, deleteUserController, getUserById } from '../controllers/user.controller';
import { getLoggedInUser } from '../controllers/user.controller';

// JWT middleware
import { authenticateToken } from '../middlewares/auth.middleware'

const router = Router();
//Route for the currently logged-in user
router.get('/me', authenticateToken, getLoggedInUser);

//Protected user routes
router.get('/', authenticateToken, getUsers); 
router.get('/:id', authenticateToken, getUserById);
router.post('/', authenticateToken, createNewUser); 
router.delete('/:id', authenticateToken, deleteUserController);



export default router;
