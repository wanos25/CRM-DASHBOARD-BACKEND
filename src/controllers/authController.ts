import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../services/prisma'
import { signToken } from '../services/jwt'
import { successResponse, errorResponse } from '../utils/response'

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body
    if (!email || !password) return errorResponse(res, 'Email and password are required', 400)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return errorResponse(res, 'User already exists', 400)

    const hash = await bcrypt.hash(password, 10)

    // تعيين الدور بناءً على الإيميل
    let role: 'ADMIN' | 'MANAGER' | 'USER' = 'USER'
    if (email === 'admin@example.com' && password === 'admin123') {
      role = 'ADMIN'
    } else if (email === 'manager@example.com' && password === 'manager123') {
      role = 'MANAGER'
    }

    const user = await prisma.user.create({
      data: { name, email, password: hash, role }
    })

    return successResponse(res, 'User registered', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    if (!email || !password) return errorResponse(res, 'Email and password are required', 400)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return errorResponse(res, 'Invalid credentials', 400)

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return errorResponse(res, 'Invalid credentials', 400)

    const token = signToken({ userId: user.id, role: user.role })
    return successResponse(res, 'Login successful', { token, role: user.role })
  } catch (err) {
    console.error(err)
    return errorResponse(res)
  }
}
