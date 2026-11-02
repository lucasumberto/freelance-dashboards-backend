import { z } from 'zod';
import { dateString } from './common';

export const projectStatusSchema = z.enum(['active', 'completed', 'on-hold', 'cancelled']);

// Campos que o cliente da API pode enviar. Campos fora daqui (id, createdAt,
// transactions...) são descartados pelo Zod e nunca chegam ao Prisma.
const projectFields = z.object({
  name: z.string().trim().min(1),
  client: z.string().trim().min(1),
  status: projectStatusSchema,
  startDate: dateString,
  endDate: dateString.nullable(),
  budget: z.number().nonnegative(),
  actualCost: z.number().nonnegative(),
  progress: z.number().int().min(0).max(100),
  description: z.string().trim(),
});

export const createProjectSchema = projectFields.extend({
  endDate: projectFields.shape.endDate.optional(),
  actualCost: projectFields.shape.actualCost.default(0),
  progress: projectFields.shape.progress.default(0),
  description: projectFields.shape.description.optional(),
});

export const updateProjectSchema = projectFields
  .partial()
  .refine(data => Object.keys(data).length > 0, { message: 'Informe ao menos um campo para atualizar' });
