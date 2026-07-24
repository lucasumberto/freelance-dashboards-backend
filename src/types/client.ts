export type ClientStatus = 'active' | 'inactive';

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

export interface CreateClientDTO {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status?: ClientStatus;
  lastContact?: string;
}

export interface UpdateClientDTO {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  status?: ClientStatus;
  lastContact?: string;
}
