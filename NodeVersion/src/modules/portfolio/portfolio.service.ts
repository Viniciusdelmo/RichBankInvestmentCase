import * as portfolioRepository from './portfolio.repository';
import { CreatePortfolioInput } from './portfolio.schema';

export const createPortfolio = async (input: CreatePortfolioInput) => {
  return portfolioRepository.createPortfolio(input);
};

export const listPortfolios = async () => {
  return portfolioRepository.findAllPortfolios();
};

export const getPortfolioPosition = async (portfolioId: string) => {
  const transactions = await portfolioRepository.findTransactionsByPortfolioId(portfolioId);

  type Pos = {
    assetId: string;
    ticker: string;
    totalQuantity: number;
    investedCapital: number;
    averagePrice: number | null;
  };

  const map = new Map<string, Pos>();

  for (const t of transactions) {
    const assetId = t.assetId;
    const ticker = t.asset.ticker;
    const sign = t.type === 'BUY' ? 1 : -1;
    const qty = Number(t.quantity) * sign;
    const value = Number(t.price) * sign * Number(t.quantity);

    if (!map.has(assetId)) {
      map.set(assetId, { assetId, ticker, totalQuantity: 0, investedCapital: 0, averagePrice: null });
    }
    const entry = map.get(assetId)!;
    entry.totalQuantity += qty;
    entry.investedCapital += value;
    if (entry.totalQuantity > 0) {
      entry.averagePrice = entry.investedCapital / entry.totalQuantity;
    } else {
      entry.averagePrice = null;
    }
  }

  return Array.from(map.values());
};

