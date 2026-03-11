import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async create(@Body() dto: CreateAssetDto) {
    return this.assetService.create(dto);
  }

  @Get()
  async findAll() {
    return this.assetService.findAll();
  }
}