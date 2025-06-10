import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductRaitingsService } from './product_raitings.service';
import { CreateProductRaitingDto } from './dto/create-product_raiting.dto';
import { UpdateProductRaitingDto } from './dto/update-product_raiting.dto';

@Controller('product-raitings')
export class ProductRaitingsController {
  constructor(
    private readonly productRaitingsService: ProductRaitingsService,
  ) {}

  @Post()
  create(@Body() createProductRaitingDto: CreateProductRaitingDto) {
    return this.productRaitingsService.create(createProductRaitingDto);
  }

  @Get()
  findAll() {
    return this.productRaitingsService.findAll();
  }

  // controller
  @Get('top-rated-products')
  getTopRatedProducts() {
    return this.productRaitingsService.getTopRatedProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRaitingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductRaitingDto: UpdateProductRaitingDto,
  ) {
    return this.productRaitingsService.update(+id, updateProductRaitingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRaitingsService.remove(+id);
  }
}
