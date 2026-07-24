import { Request, Response } from 'express';
import { CreateClientDTO, UpdateClientDTO } from '../types/client';
import prisma from '../config/prisma';

export const getAllClients = async (req: Request, res: Response): Promise<void> => {
  const clients = await prisma.client.findMany();
  res.json(clients);
};

export const getClientById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const clientId = parseInt(Array.isArray(id) ? id[0] : id, 10);
  
  const client = await prisma.client.findUnique({
    where: { id: clientId }
  });
  
  if (!client) {
    res.status(404).json({ error: 'Cliente não encontrado' });
    return;
  }
  
  res.json(client);
};

export const createClient = async (req: Request, res: Response): Promise<void> => {
  const data: CreateClientDTO = req.body;
  
  const newClient = await prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      status: data.status || 'active',
      lastContact: data.lastContact,
    }
  });
  
  res.status(201).json(newClient);
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const clientId = parseInt(Array.isArray(id) ? id[0] : id, 10);
  const data: UpdateClientDTO = req.body;
  
  try {
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data
    });
    
    res.json(updatedClient);
  } catch (error) {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const clientId = parseInt(Array.isArray(id) ? id[0] : id, 10);
  
  try {
    await prisma.client.delete({
      where: { id: clientId }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};
