import { Request, Response } from 'express';
import { getAllUsers, createUser, deleteUserById, findUserById } from '../services/user.service';
import { getErrorMessage } from '../utils/errorHelper';


// GET all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users', details: getErrorMessage(error) });
  }
};

//Get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};

//Create user
export const createNewUser = async (req: Request, res: Response) => {
  const { email, firstName, lastName, hashedPassword, companyName } = req.body;

  if (!email || !firstName || !lastName || !hashedPassword || !companyName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await createUser({ email, firstName, lastName, hashedPassword, companyName });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user', details: getErrorMessage(error) });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    await deleteUserById(id);
    res.status(204).send(); // No Content on success
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Delete user error:', message);
    if (message.includes('Record to delete does not exist')) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to delete user', details: message });
  }
};


