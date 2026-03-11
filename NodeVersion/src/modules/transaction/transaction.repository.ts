import prisma from '../../database/prismaClient';
import { Transaction } from './transaction.types';

export const createTransaction = async (data: Omit<Transaction, 'id' | 'date'> & { date?: Date }) => {
  const payload = { ...data, date: data.date ?? new Date() };
  return await prisma.transaction.create({ data: payload });
};

export const findTransactionsByPortfolioAndAsset = async (portfolioId: string, assetId: string) => {
  return await prisma.transaction.findMany({
    where: { portfolioId, assetId }
  });
};

export const findAllTransactions = async (filters?: any, page = 1, limit = 20) => {
  const where: any = {};
  if (filters?.type) where.type = filters.type;
  const skip = (page - 1) * limit;
  return await prisma.transaction.findMany({
    where,
    skip,
    take: limit,
    orderBy: { date: 'desc' }
  });
};

