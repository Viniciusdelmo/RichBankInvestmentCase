import { z } from 'zod';

export const createTransactionSchema = z.object({
  portfolioId: z.string().uuid(),
  assetId: z.string().uuid(),
  type: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive(),
  price: z.number().positive(),
  date: z.string().optional()
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

