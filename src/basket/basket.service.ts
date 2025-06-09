import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(@InjectModel(Basket) private basketModel: typeof Basket) { }

  async create(createBasketDto: CreateBasketDto) {
    try {
      const basket = await this.basketModel.create({ ...createBasketDto });
      return basket;
    } catch (error) {
      throw new InternalServerErrorException('Erorr on creating BASKET');
    }
  }

  async findAll() {
    try {
      return await this.basketModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Erorr get BASKETS');
    }
  }

  async findOne(id: number) {
    try {
      const basket = await this.basketModel.findByPk(id);
      if (!basket) throw new NotFoundException('BASKET not found');
      return basket;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBasketDto: UpdateBasketDto) {
    try {
      const [count, [basket]] = await this.basketModel.update(updateBasketDto, {
        where: { id },
        returning: true,
      });

      if (count === 0) throw new NotFoundException('BASKET for update not found');
      return basket;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.basketModel.destroy({ where: { id } });
      if (!deleted) throw new NotFoundException('BASKET for delete not found');
      return { message: 'BASKET deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
