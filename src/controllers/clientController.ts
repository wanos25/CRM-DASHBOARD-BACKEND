import { Request, Response } from 'express';
import prisma from '../services/prisma';
import { successResponse, errorResponse } from '../utils/response';

export async function createClient(req: Request, res: Response) {
  try {
    const { name, contact, email, phone } = req.body;
    const ownerId = req.user?.id || undefined;
    const client = await prisma.client.create({ data: { name, contact, email, phone, ownerId } });
    return successResponse(res, 'Client created', client, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function listClients(req: Request, res: Response) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;
    const [total, clients] = await Promise.all([
      prisma.client.count(),
      prisma.client.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } })
    ]);
    const totalPages = Math.ceil(total / limit);
    return successResponse(res, 'Clients fetched', { page, totalPages, total, clients });
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function getClient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const client = await prisma.client.findUnique({ where: { id }, include: { projects: true } });
    if (!client) return errorResponse(res, 'Client not found', 404);
    return successResponse(res, 'Client fetched', client);
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await prisma.client.update({ where: { id }, data });
    return successResponse(res, 'Client updated', updated);
  } catch (err: any) {
    console.error(err);
    return errorResponse(res, err.code === 'P2025' ? 'Client not found' : 'Internal server error');
  }
}

export async function deleteClient(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await prisma.client.delete({ where: { id } });
    return successResponse(res, 'Client deleted', null);
  } catch (err: any) {
    console.error(err);
    return errorResponse(res, err.code === 'P2025' ? 'Client not found' : 'Internal server error');
  }
}
