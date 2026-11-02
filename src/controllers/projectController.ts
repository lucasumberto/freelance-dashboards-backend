import { Request, Response } from 'express';
import { CreateProjectDTO, UpdateProjectDTO } from '../types/project';
import { createProjectSchema, updateProjectSchema } from '../schemas/project';
import { idParamSchema } from '../schemas/common';
import { isRecordNotFound } from '../middlewares/errorHandler';
import prisma from '../config/prisma';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  const projects = await prisma.project.findMany();
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = idParamSchema.parse(req.params);
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    res.status(404).json({ error: 'Projeto não encontrado' });
    return;
  }

  res.json(project);
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const data: CreateProjectDTO = createProjectSchema.parse(req.body);

  const newProject = await prisma.project.create({ data });

  res.status(201).json(newProject);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = idParamSchema.parse(req.params);
  const data: UpdateProjectDTO = updateProjectSchema.parse(req.body);

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data
    });

    res.json(updatedProject);
  } catch (error) {
    if (!isRecordNotFound(error)) throw error;
    res.status(404).json({ error: 'Projeto não encontrado' });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = idParamSchema.parse(req.params);

  try {
    await prisma.project.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    if (!isRecordNotFound(error)) throw error;
    res.status(404).json({ error: 'Projeto não encontrado' });
  }
};
