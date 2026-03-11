import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

export interface PortfolioPositionItem {
  assetId: string;
  ticker: string;
  totalQuantity: number;
  investedCapital: number;
  averagePrice: number | null;
}

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePortfolioDto) {
    return this.prisma.portfolio.create({ data: dto });
  }

  async findAll() {
    return this.prisma.portfolio.findMany();
  }

  async getPosition(portfolioId: string): Promise<PortfolioPositionItem[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { portfolioId },
      include: { asset: true },
    });

    const map = new Map<string, PortfolioPositionItem>();

    for (const t of transactions) {
      const assetId = t.assetId;
      const ticker = t.asset.ticker;
      const sign = t.type === 'BUY' ? 1 : -1;
      const qty = Number(t.quantity) * sign;
      const value = Number(t.price) * sign * Number(t.quantity);

      if (!map.has(assetId)) {
        map.set(assetId, {
          assetId,
          ticker,
          totalQuantity: 0,
          investedCapital: 0,
          averagePrice: null,
        });
      }
      const entry = map.get(assetId)!;
      entry.totalQuantity += qty;
      entry.investedCapital += value;
      entry.averagePrice =
        entry.totalQuantity > 0
          ? entry.investedCapital / entry.totalQuantity
          : null;
    }

    return Array.from(map.values());
  }
}