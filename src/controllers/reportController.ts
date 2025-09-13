import { Request, Response } from "express"
import prisma from "../services/prisma"
import { successResponse, errorResponse } from "../utils/response"

export async function createReport(req: Request, res: Response) {
  try {
    const { title, content, projectId } = req.body
    if (!title || !content || !projectId) {
      return errorResponse(res, "Title, content and projectId are required", 400)
    }

    const report = await prisma.report.create({
      data: {
        title,
        content,
        projectId: Number(projectId),
        authorId: req.user!.id
      }
    })

    return successResponse(res, "Report created", report)
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}

export async function listReports(req: Request, res: Response) {
  try {
    const reports = await prisma.report.findMany({
      include: { project: true, author: true }
    })
    return successResponse(res, "Reports fetched", reports)
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}

export async function getReport(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const report = await prisma.report.findUnique({
      where: { id },
      include: { project: true, author: true }
    })
    if (!report) return errorResponse(res, "Report not found", 404)
    return successResponse(res, "Report fetched", report)
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}

export async function updateReport(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const { title, content } = req.body

    const report = await prisma.report.update({
      where: { id },
      data: { title, content }
    })

    return successResponse(res, "Report updated", report)
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}

export async function deleteReport(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.report.delete({ where: { id } })
    return successResponse(res, "Report deleted")
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}
