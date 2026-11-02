import { z } from 'zod';
import { createProjectSchema, projectStatusSchema, updateProjectSchema } from '../schemas/project';

export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string | null;
  budget: number;
  actualCost: number;
  progress: number;
  description?: string;
}

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
