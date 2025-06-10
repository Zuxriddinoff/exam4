import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './models/orders-item.model';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class OrdersItemService {
  constructor(
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}

  async findItemsByOrderId(order_id: number) {
    try {
      const items = await this.orderItemModel.findAll({ where: { order_id } });
      if (!items.length) {
        throw new NotFoundException(`Order ID ${order_id} uchun mahsulotlar topilmadi`);
      }
      return items;
    } catch (error) {
      return catchError(error);
    }
  }
}