import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AssetModule } from './asset/asset.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    PrismaModule,
    PortfolioModule,
    AssetModule,
    TransactionModule,
  ],
})
export class AppModule {}