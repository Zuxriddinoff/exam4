import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketModel: typeof Basket,
    @InjectModel(Product) private productModel: typeof Product,
  ) { }

  async create(createBasketDto: CreateBasketDto) {
    try {
      const { user_id, product_id, quantity } = createBasketDto;

      const product = await this.productModel.findByPk(product_id);
      if (!product) {
        throw new NotFoundException('Mahsulot topilmadi');
      }


      const total_price = Number(product.dataValues.price) * quantity;

      const basket = await this.basketModel.create({
        user_id,
        product_id,
        quantity,
        total_price,
      });

      return basket;
    } catch (error) {
      throw new InternalServerErrorException('BASKET yaratishda xatolik');
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

      if (count === 0)
        throw new NotFoundException('BASKET for update not found');
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