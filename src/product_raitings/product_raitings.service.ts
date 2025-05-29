import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
        const product_raiting = await this.model.create({ ...createProductRaitingDto })
        // if (product_raiting) {
        //    throw new ConflictException('product raiting alrady exists')
        // }
        return product_raiting
    } catch (error) {
        throw new InternalServerErrorException(error.message) 
    }
  }
  
  async findAll() {
    try {
        return this.model.findAll()
    } catch (error) {
        throw new InternalServerErrorException(error.message) 
      }
    }
    
  async findOne(id: number) {
    try {
        const productrarinig = await this.model.findByPk(id)
        if (!productrarinig) {
          throw new ConflictException('product raiting id not found')
        }
        return productrarinig;
      } catch (error) {
        throw new InternalServerErrorException(error.message) 
      }
    }
    
    async update(id: number, updateProductRaitingDto: UpdateProductRaitingDto) {
      try {
        const product_raiting = await this.model.update(updateProductRaitingDto, {where: {id}, returning: true})
        if (!product_raiting) {
          throw new ConflictException('product raiting id not found')
        }
        return product_raiting[1][0];
    } catch (error) {
        throw new InternalServerErrorException(error.message)   
      }
    }
    
  async remove(id: number) {
    try {
        return this.model.destroy({where: {id}});
    } catch (error) {
        throw new InternalServerErrorException(error.message)   
    }
  }
}
