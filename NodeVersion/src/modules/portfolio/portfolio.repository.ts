import prisma from '../../database/prismaClient';
import { Portfolio } from './portfolio.types';

export const createPortfolio = async (data: Omit<Portfolio, 'id' | 'createdAt'>): Promise<Portfolio> => {
  const created = await prisma.portfolio.create({ data });
  return created as unknown as Portfolio;
};

export const findAllPortfolios = async (): Promise<Portfolio[]> => {
  return (await prisma.portfolio.findMany()) as unknown as Portfolio[];
};

export const findPortfolioById = async (id: string): Promise<Portfolio | null> => {
  return (await prisma.portfolio.findUnique({ where: { id } })) as unknown as Portfolio | null;
};

export const findTransactionsByPortfolioId = async (portfolioId: string) => {
  return prisma.transaction.findMany({
    where: { portfolioId },
    include: { asset: true }
  });
};

