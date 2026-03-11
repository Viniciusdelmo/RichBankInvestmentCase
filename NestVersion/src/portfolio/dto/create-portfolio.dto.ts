import { IsString, MinLength } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @MinLength(1)
  name!: string;
}