import {
    IsString,
    IsEnum,
    IsNumber,
    IsPositive,
    IsOptional,
    IsUUID,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateTransactionDto {
    @IsUUID()
    portfolioId!: string;
  
    @IsUUID()
    assetId!: string;
  
    @IsEnum(['BUY', 'SELL'])
    type!: 'BUY' | 'SELL';
  
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    quantity!: number;
  
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price!: number;
  
    @IsOptional()
    @IsString()
    date?: string;
  }