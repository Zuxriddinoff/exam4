import { Injectable } from '@nestjs/common';
import { CreateProductRaitingDto } from './dto/create-product_raiting.dto';
import { UpdateProductRaitingDto } from './dto/update-product_raiting.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductRaiting } from './models/product_raiting.model';

@Injectable()
export class ProductRaitingsService {

  constructor(
    @InjectModel(ProductRaiting) private model: typeof ProductRaiting
  ){}

  async create(createProductRaitingDto: CreateProductRaitingDto) {
    const product_raiting = await this.model.create({ ...createProductRaitingDto })
    return product_raiting
  }

  async findAll() {
    return this.model.findAll()
  }

  async findOne(id: number) {
    const productrarinig = await this.model.findByPk(id)
    return productrarinig;
  }

  async update(id: number, updateProductRaitingDto: UpdateProductRaitingDto) {
    const product_raiting = await this.model.update(updateProductRaitingDto, {where: {id}, returning: true})
    return product_raiting[1][0];
  }

  async remove(id: number) {
    return this.model.destroy({where: {id}});
  }
}
