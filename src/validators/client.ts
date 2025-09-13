import { z } from 'zod';
export const createClientSchema = z.object({
  name: z.string().min(2),
  contact: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional()
});
export const updateClientSchema = createClientSchema.partial();
