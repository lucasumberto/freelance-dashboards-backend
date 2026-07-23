import { Request, Response } from 'express';
import { Project, CreateProjectDTO, UpdateProjectDTO } from '../types/project';

// Armazenamento em memória (substituir por banco de dados depois)
let projects: Project[] = [];

export const getAllProjects = (req: Request, res: Response): void => {
  res.json(projects);
};

export const getProjectById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    res.status(404).json({ error: 'Projeto não encontrado' });
    return;
  }
  
  res.json(project);
};

export const createProject = (req: Request, res: Response): void => {
  const data: CreateProjectDTO = req.body;
  
  const newProject: Project = {
    id: crypto.randomUUID(),
    name: data.name,
    client: data.client,
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate || null,
    budget: data.budget,
    actualCost: data.actualCost || 0,
    progress: data.progress || 0,
    description: data.description,
  };
  
  projects.push(newProject);
  res.status(201).json(newProject);
};

export const updateProject = (req: Request, res: Response): void => {
  const { id } = req.params;
  const data: UpdateProjectDTO = req.body;
  
  const projectIndex = projects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    res.status(404).json({ error: 'Projeto não encontrado' });
    return;
  }
  
  const updatedProject: Project = {
    ...projects[projectIndex],
    ...data,
  };
  
  projects[projectIndex] = updatedProject;
  res.json(updatedProject);
};

export const deleteProject = (req: Request, res: Response): void => {
  const { id } = req.params;
  
  const projectIndex = projects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    res.status(404).json({ error: 'Projeto não encontrado' });
    return;
  }
  
  projects.splice(projectIndex, 1);
  res.status(204).send();
};
