import { Request, Response } from 'express';
import prisma from '../services/prisma';
import { successResponse, errorResponse } from '../utils/response';

export async function createProject(req: Request, res: Response) {
  try {
    const { name, description, clientId, ownerId, status, startedAt, dueDate } = req.body;
    const owner = req.user?.id || ownerId;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        clientId,
        ownerId: owner,
        status,
        startedAt: startedAt ? new Date(startedAt) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined
      }
    });
    return successResponse(res, 'Project created', project, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function listProjects(req: Request, res: Response) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;
    const [total, projects] = await Promise.all([
      prisma.project.count(),
      prisma.project.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' }, include: { client: true, owner: true } })
    ]);
    const totalPages = Math.ceil(total / limit);
    return successResponse(res, 'Projects fetched', { page, totalPages, total, projects });
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const project = await prisma.project.findUnique({ where: { id }, include: { client: true, owner: true, reports: true } });
    if (!project) return errorResponse(res, 'Project not found', 404);
    return successResponse(res, 'Project fetched', project);
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    if (data.startedAt) data.startedAt = new Date(data.startedAt);
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    const updated = await prisma.project.update({ where: { id }, data });
    return successResponse(res, 'Project updated', updated);
  } catch (err: any) {
    console.error(err);
    return errorResponse(res, err.code === 'P2025' ? 'Project not found' : 'Internal server error');
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await prisma.project.delete({ where: { id } });
    return successResponse(res, 'Project deleted', null);
  } catch (err: any) {
    console.error(err);
    return errorResponse(res, err.code === 'P2025' ? 'Project not found' : 'Internal server error');
  }
}
