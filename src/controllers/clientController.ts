import { Request, Response } from 'express';
import { CreateClientDTO, UpdateClientDTO } from '../types/client';
import { createClientSchema, updateClientSchema } from '../schemas/client';
import { idParamSchema } from '../schemas/common';
import { isRecordNotFound } from '../middlewares/errorHandler';
import prisma from '../config/prisma';

export const getAllClients = async (req: Request, res: Response): Promise<void> => {
  const clients = await prisma.client.findMany();
  res.json(clients);
};

export const getClientById = async (req: Request, res: Response): Promise<void> => {
  const { id } = idParamSchema.parse(req.params);

  const client = await prisma.client.findUnique({
    where: { id }
  });

  if (!client) {
    res.status(404).json({ error: 'Cliente não encontrado' });
    return;
  }

  res.json(client);
};

export const createClient = async (req: Request, res: Response): Promise<void> => {
  const data: CreateClientDTO = createClientSchema.parse(req.body);

  const newClient = await prisma.client.create({ data });

  res.status(201).json(newClient);
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = idParamSchema.parse(req.params);
  const data: UpdateClientDTO = updateClientSchema.parse(req.body);

  try {
    const updatedClient = await prisma.client.update({
      where: { id },
      data
    });

    res.json(updatedClient);
  } catch (error) {
    if (!isRecordNotFound(error)) throw error;
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = idParamSchema.parse(req.params);

  try {
    await prisma.client.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    if (!isRecordNotFound(error)) throw error;
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};
