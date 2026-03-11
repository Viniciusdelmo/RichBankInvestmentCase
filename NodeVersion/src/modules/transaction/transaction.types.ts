export type UUID = string;

export type TransactionType = 'BUY' | 'SELL';

export interface Transaction {
  id: UUID;
  portfolioId: UUID;
  assetId: UUID;
  type: TransactionType;
  quantity: number;
  price: number;
  date: Date;
}

