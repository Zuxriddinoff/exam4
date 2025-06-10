import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGouard } from '../guards/auth.guard';
import { Request } from 'express';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @UseGuards(AuthGouard)
  @Post()
  async create(@Body() dto: CreateBasketDto, @Req() req: Request) {
    const userId = (req)['id'];
    return this.basketService.create({ ...dto, user_id: userId });
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}
