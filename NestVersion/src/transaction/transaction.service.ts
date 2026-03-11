import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    const { portfolioId, assetId, type, quantity, price } = dto;

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be > 0');
    }
    if (price <= 0) {
      throw new BadRequestException('Price must be > 0');
    }

    if (type === 'SELL') {
      const txs = await this.prisma.transaction.findMany({
        where: { portfolioId, assetId },
      });
      let netQty = 0;
      for (const t of txs) {
        netQty += t.type === 'BUY' ? Number(t.quantity) : -Number(t.quantity);
      }
      if (netQty < quantity) {
        throw new BadRequestException('Cannot sell more than current holdings');
      }
    }

    const date = dto.date ? new Date(dto.date) : new Date();
    return this.prisma.transaction.create({
      data: {
        portfolioId,
        assetId,
        type,
        quantity,
        price,
        date,
      },
    });
  }

  async findAll(
    filters: { type?: string } | undefined,
    page = 1,
    limit = 20,
  ) {
    const where: { type?: string } = {};
    if (filters?.type) where.type = filters.type;
    const skip = (page - 1) * limit;
    return this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
    });
  }
}