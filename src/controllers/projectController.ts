import { Request, Response } from 'express';
import { CreateProjectDTO, UpdateProjectDTO } from '../types/project';
import prisma from '../config/prisma';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  const projects = await prisma.project.findMany();
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const projectId = parseInt(Array.isArray(id) ? id[0] : id, 10);
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  
  if (!project) {
    res.status(404).json({ error: 'Projeto não encontrado' });
    return;
  }
  
  res.json(project);
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const data: CreateProjectDTO = req.body;
  
  const newProject = await prisma.project.create({
    data: {
      name: data.name,
      client: data.client,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate || null,
      budget: data.budget,
      actualCost: data.actualCost || 0,
      progress: data.progress || 0,
      description: data.description,
    }
  });
  
  res.status(201).json(newProject);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const projectId = parseInt(Array.isArray(id) ? id[0] : id, 10);
  const data: UpdateProjectDTO = req.body;
  
  try {
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data
    });
    
    res.json(updatedProject);
  } catch (error) {
    res.status(404).json({ error: 'Projeto não encontrado' });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const projectId = parseInt(Array.isArray(id) ? id[0] : id, 10);
  
  try {
    await prisma.project.delete({
      where: { id: projectId }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Projeto não encontrado' });
  }
};
