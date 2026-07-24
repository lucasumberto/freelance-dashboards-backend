export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';

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

export interface CreateProjectDTO {
  name: string;
  client: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  budget: number;
  actualCost?: number;
  progress?: number;
  description?: string;
}

export interface UpdateProjectDTO {
  name?: string;
  client?: string;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string | null;
  budget?: number;
  actualCost?: number;
  progress?: number;
  description?: string;
}
