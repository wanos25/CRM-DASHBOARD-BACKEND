import { Request, Response, NextFunction } from 'express';
export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(err.status || 500).json({ status: 'error', message: err.message || 'Internal server error' });
}
