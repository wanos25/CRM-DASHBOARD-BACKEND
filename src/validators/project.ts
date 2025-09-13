import { z } from 'zod';
export const createProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  clientId: z.number().int().optional(),
  ownerId: z.number().int().optional(),
  status: z.enum(['ACTIVE','ON_HOLD','COMPLETED','CANCELLED']).optional(),
  startedAt: z.string().optional(),
  dueDate: z.string().optional()
});
export const updateProjectSchema = createProjectSchema.partial();
