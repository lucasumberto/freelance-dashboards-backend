import { z } from 'zod';
import { clientStatusSchema, createClientSchema, updateClientSchema } from '../schemas/client';

export type ClientStatus = z.infer<typeof clientStatusSchema>;

export interface Client {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: ClientStatus;
  totalProjects: number;
  totalSpent: number;
  lastContact: string;
}

export type CreateClientDTO = z.infer<typeof createClientSchema>;
export type UpdateClientDTO = z.infer<typeof updateClientSchema>;
