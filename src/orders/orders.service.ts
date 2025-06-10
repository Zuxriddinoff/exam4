import { Injectable, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/orders.model';
import { catchError } from 'src/utils/catch-error';
import { Sequelize } from 'sequelize-typescript';
import { Basket } from 'src/basket/models/basket.model';
import { successRes } from 'src/utils/success-response';
import { OrderItem } from 'src/orders-item/models/orders-item.model';
import { Status } from 'src/enum';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(Basket) private readonly basketModel: typeof Basket,
    @InjectModel(OrderItem) private readonly orderItemModel: typeof OrderItem,
    @InjectModel(Product) private readonly productModel: typeof Product,
    private readonly sequelize: Sequelize
  ) { }
  
  async createOrder(createOrderDto: CreateOrderDto) {
  const transaction = await this.sequelize.transaction();
  try {
    const { client_id, delivery_address, phone_number } = createOrderDto;

    const baskets = await this.basketModel.findAll({ where: { user_id: client_id }, transaction });

    if (!baskets.length) throw new BadRequestException("Basket null");

    const total_price = baskets.reduce((sum, basket) => {
      return sum + Number(basket.dataValues.total_price);
    }, 0);

    const order = await this.orderModel.create({
      client_id,
      delivery_address,
      phone_number,
      total_price,
      status: Status.UNPAID,
      delivery_price: 0
    }, { transaction });

    for (const basket of baskets) {
      const product = await this.productModel.findByPk(basket.product_id, { transaction });
      if (!product) {
        throw new NotFoundException(`product not found by id  ${basket.product_id}`);
      }

      if (product.dataValues.quantity < basket.dataValues.quantity) {
        throw new BadRequestException(`Mahsulot ID raqami ${product.dataValues.id} boyicha yetarli miqdorda mahsulot mavjud emas`);
      }

      await this.orderItemModel.create({
        order_id: order.id,
        product_id: basket.product_id,
        quantity: basket.quantity,
        total_price: basket.total_price,
      }, { transaction });

      product.dataValues.quantity -= basket.dataValues.quantity;
      await product.save({ transaction });
    }

    await this.basketModel.destroy({ where: { user_id: client_id }, transaction });

    await transaction.commit();
    return successRes(order, 201);

  } catch (error) {
    await transaction.rollback();
    return catchError(error);
  }
}

  async findAllOrder() {
    try {
      return await this.orderModel.findAll({include:{all:true}});
    } catch (error) {
      return catchError(error);
    }
  }
  
  async findOneOrder(id: number) {
    try {
      const order = await this.orderModel.findByPk(id);
      if (!order) {
        throw new NotFoundException(`ID raqami ${id} bolgan buyurtma topilmadi`);
      }
      return order;
    } catch (error) {
      return catchError(error);
    }
  }
}