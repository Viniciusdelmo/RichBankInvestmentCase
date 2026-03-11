import { createTransaction as repoCreate, findTransactionsByPortfolioAndAsset } from './transaction.repository';
import { CreateTransactionInput } from './transaction.schema';

export const createTransaction = async (input: CreateTransactionInput) => {
  const { portfolioId, assetId, type, quantity, price } = input;

  if (quantity <= 0) {
    const e: any = new Error('Quantity must be > 0');
    e.status = 400;
    throw e;
  }
  if (price <= 0) {
    const e: any = new Error('Price must be > 0');
    e.status = 400;
    throw e;
  }

  if (type === 'SELL') {
    const txs = await findTransactionsByPortfolioAndAsset(portfolioId, assetId);
    let netQty = 0;
    for (const t of txs) {
      netQty += t.type === 'BUY' ? Number(t.quantity) : -Number(t.quantity);
    }
    if (netQty < quantity) {
      const e: any = new Error('Cannot sell more than current holdings');
      e.status = 400;
      throw e;
    }
  }

  return await repoCreate({
    portfolioId,
    assetId,
    type,
    quantity,
    price,
    date: input.date ? new Date(input.date) : new Date()
  } as any);
};

export const listTransactions = async (filters?: any, page?: number, limit?: number) => {
  return await findTransactionsByPortfolioAndAsset(filters?.portfolioId ?? '', filters?.assetId ?? '');
};

