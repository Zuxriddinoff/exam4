import {
  ConflictException,
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateProductRaitingDto } from './dto/create-product_raiting.dto';
import { UpdateProductRaitingDto } from './dto/update-product_raiting.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductRaiting } from './models/product_raiting.model';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/common/models/user.model';
import { Roles } from 'src/enum';

@Injectable()
export class ProductRaitingsService {
  constructor(
    @InjectModel(ProductRaiting) private model: typeof ProductRaiting,
    @InjectModel(User) private userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createProductRaitingDto: CreateProductRaitingDto) {
    try {
      const { product_id, client_id } = createProductRaitingDto;

      const user = await this.userModel.findByPk(client_id);

      if (!user || user.dataValues.role != Roles.CUSTOMER) {
        throw new ConflictException('Bunday foydalanuvchi mavjud emas yoki uning roli CUSTOMER emas');
      }

      const product = await Product.findByPk(product_id);
      if (!product) {
        throw new ConflictException(`product id ${product_id} not found`);
      }
      const product_raiting = await this.model.create({
        ...createProductRaitingDto,
      });
      return product_raiting;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return this.model.findAll({ include: [Product, User] });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const productrarinig = await this.model.findByPk(id, {
        include: [Product, User],
      });
      if (!productrarinig) {
        throw new ConflictException('product raiting id not found');
      }
      return productrarinig;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // service
  async getTopRatedProducts() {
    return this.model.findAll({
      attributes: [
        'product_id',
        [this.sequelize.fn('AVG', this.sequelize.col('rayting')), 'avg_rating'],
        [this.sequelize.fn('COUNT', this.sequelize.col('id')), 'raiting_count'],
      ],
      group: ['product_id'],
      order: [
        [this.sequelize.fn('AVG', this.sequelize.col('rayting')), 'DESC'],
      ],
      limit: 100,
    });
  }

  async update(id: number, updateProductRaitingDto: UpdateProductRaitingDto) {
    try {
      const product_raiting = await this.model.update(updateProductRaitingDto, {
        where: { id },
        returning: true,
      });
      if (!product_raiting) {
        throw new ConflictException('product raiting id not found');
      }
      return product_raiting[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      return this.model.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
