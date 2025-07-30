// src/services/user.service.ts

import { prisma } from '../prisma/client';

export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  companyName: string;  
}

export const createUser = async (userData: CreateUserInput) => {
  const company = await prisma.company.create({
    data: {
      name: userData.companyName,  // Use the actual string value here
      address: '',
    },
  });

  return prisma.user.create({
    data: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      hashedPassword: userData.hashedPassword,
      companyId: company.id,
    },
  });
};

// GET all users
export const getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      company: true,
    },
  });
};

//GET user by id
export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

// DELETE user by id
export const deleteUserById = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};



