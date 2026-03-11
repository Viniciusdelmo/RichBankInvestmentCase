import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(dto);
  }

  @Get()
  async findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':id/position')
  async getPosition(@Param('id') id: string) {
    return this.portfolioService.getPosition(id);
  }
}