import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category) private model: typeof Category 
  ){}
  
  async create(createCategoryDto: CreateCategoryDto) {
    try {

      const existingCategory = await this.model.findOne({
        where: { name: createCategoryDto.name },
      });

      if (existingCategory) {
        throw new BadRequestException('Category name alrady exists.');
      }

      const category = await this.model.create({ ...createCategoryDto }); 
      return category;
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
      const category = await this.model.findByPk(id)
      if (!category) {
        throw new ConflictException('Category not found')
      }
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message) 
    }
  }
  
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.model.update(updateCategoryDto, {where: {id}, returning: true})
      if (!category) {
        throw new ConflictException('Category not found')
      }
      return category[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message) 
    }
  }
  
  remove(id: number) {
    try {
      return this.model.destroy({where: {id}}); 
    } catch (error) {
      throw new InternalServerErrorException(error.message) 
    }
  }
}
