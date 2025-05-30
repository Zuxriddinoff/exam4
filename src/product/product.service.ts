import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private model: typeof Product){}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.model.create({...createProductDto})
      return {
        StatusCode:201,
        message:'success',
        data:product
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    const product = await this.model.findAll()
    return {
      StatusCode:200,
      message:'success',
      data:product
    }
  }

  async findOne(id: number) {
    const product = await this.model.findByPk(id)
    if(!product){
      return `product not found by id ${id}`
    }
    return {
      StatusCode:200,
      message:'success',
      data:product
    }
  }

 async  update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.model.update(updateProductDto, {where:{id}, returning:true})
    if(!product){
      throw new ConflictException(`product not found by id ${id}`)
    }
    return {
      StatusCode:200,
      message:'succes',
      data:product
    } 
  }

  async remove(id: number) {
    const product = await this.model.destroy({where:{id}})
    if(!product){
      return `product not found by id ${id}`
    }
    return {
      StatusCode:201,
      message:'succes',
      data:{}
    }
  }
}
