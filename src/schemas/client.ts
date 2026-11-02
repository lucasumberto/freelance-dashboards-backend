import { z } from 'zod';
import { dateString } from './common';

export const clientStatusSchema = z.enum(['active', 'inactive']);

// totalProjects e totalSpent ficam de fora: são calculados, não editáveis via API
const clientFields = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  company: z.string().trim(),
  phone: z.string().trim(),
  status: clientStatusSchema,
  lastContact: dateString,
});

export const createClientSchema = clientFields.extend({
  company: clientFields.shape.company.optional(),
  phone: clientFields.shape.phone.optional(),
  status: clientFields.shape.status.default('active'),
  lastContact: clientFields.shape.lastContact.optional(),
});

export const updateClientSchema = clientFields
  .partial()
  .refine(data => Object.keys(data).length > 0, { message: 'Informe ao menos um campo para atualizar' });
