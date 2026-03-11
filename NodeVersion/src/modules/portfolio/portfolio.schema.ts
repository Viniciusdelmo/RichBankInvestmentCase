import { z } from 'zod';

export const createPortfolioSchema = z.object({
  name: z.string().min(1)
});

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;

