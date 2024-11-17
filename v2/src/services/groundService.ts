

import prisma from '../models/prismaClient';



// Get all grounds
export const getAllGrounds = async () => {
  return await prisma.ground.findMany();
};

// Create a new ground
export const createGround = async (data: {
  groundName: string;
  location: string;
  description: string;
  type: string;
  availability: boolean;
  pricePerHour: number;
}) => {
  return await prisma.ground.create({ data });
};

// Update ground
export const updateGround = async (
  id: number,
  data: {
    groundName?: string;
    location?: string;
    description?: string;
    type?: string;
    availability?: boolean;
    pricePerHour?: number;
  }
) => {
  return await prisma.ground.update({
    where: { id },
    data,
  });
};

// Delete ground
export const deleteGround = async (id: number) => {
  return await prisma.ground.delete({ where: { id } });
};
