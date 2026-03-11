import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @MinLength(1)
  ticker!: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  sector?: string;
}