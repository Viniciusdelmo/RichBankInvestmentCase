import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAssetDto) {
    const exists = await this.prisma.asset.findUnique({
      where: { ticker: dto.ticker },
    });
    if (exists) {
      throw new ConflictException('Ticker already exists');
    }
    return this.prisma.asset.create({ data: dto });
  }

  async findAll() {
    return this.prisma.asset.findMany();
  }
}