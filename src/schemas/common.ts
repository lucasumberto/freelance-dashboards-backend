import { z } from 'zod';

// Valida o :id da rota e já converte para número
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Datas são armazenadas como texto "YYYY-MM-DD"
export const dateString = z.iso.date();
