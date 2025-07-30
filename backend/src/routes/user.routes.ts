// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsers, createNewUser, deleteUserController, getUserById } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createNewUser);
router.delete('/:id', deleteUserController);

export default router;
