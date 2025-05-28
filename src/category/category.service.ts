import { Injectable } from '@nestjs/common';
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
    const category = await this.model.create({ ...createCategoryDto }); 
    return category;
  }

  async findAll() {
    return this.model.findAll()
  }

  async findOne(id: number) {
    const category = await this.model.findByPk(id)
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.model.update(updateCategoryDto, {where: {id}, returning: true})
    return category[1][0];
  }

  remove(id: number) {
    return this.model.destroy({where: {id}}); 
  }
}
