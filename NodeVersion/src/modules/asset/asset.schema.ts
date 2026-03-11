import { z } from 'zod';

export const createAssetSchema = z.object({
  ticker: z.string().min(1),
  companyName: z.string().optional(),
  sector: z.string().optional()
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;

