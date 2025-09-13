import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'

// الـ payload اللي هندخله للـ token
interface JwtPayload {
  userId: number
  role: 'ADMIN' | 'MANAGER' | 'USER'
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}
