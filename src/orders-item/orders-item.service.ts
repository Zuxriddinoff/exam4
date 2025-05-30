import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './models/orders-item.model';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders-item.dto';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class OrdersItemService {
  constructor(
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}

  async createOrderItem(createOrdersItemDto: CreateOrdersItemDto) {
    try {
      const item = await this.orderItemModel.create({ ...createOrdersItemDto });
      return item;
    } catch (error) {
      catchError(error);
    }
  }

  async findAllOrderItems() {
    try {
      return await this.orderItemModel.findAll();
    } catch (error) {
      catchError(error);
    }
  }

  async findItemsByOrderId(order_id: number) {
    try {
      const items = await this.orderItemModel.findAll({ where: { order_id } });
      if (!items || items.length === 0) {
        throw new NotFoundException(`Order ID ${order_id} uchun mahsulotlar topilmadi`);
      }
      return items;
    } catch (error) {
      catchError(error);
    }
  }

  async findOneOrderItem(id: number) {
    try {
      const item = await this.orderItemModel.findByPk(id);
      if (!item) {
        throw new NotFoundException(`ID ${id} bolgan order item topilmadi`);
      }
      return item;
    } catch (error) {
      catchError(error);
    }
  }

  async updateOrderItem(id: number, updateOrdersItemDto: UpdateOrdersItemDto) {
    try {
      const item = await this.orderItemModel.findByPk(id);
      if (!item) {
        throw new NotFoundException(`ID ${id} bolgan order item mavjud emas`);
      }
      await item.update(updateOrdersItemDto);
      return item;
    } catch (error) {
      catchError(error);
    }
  }

  async removeOrderItem(id: number) {
    try {
      const item = await this.orderItemModel.findByPk(id);
      if (!item) {
        throw new NotFoundException(`ID ${id} bolgan order item topilmadi`);
      }
      await item.destroy();
      return { message: 'Order item ochirildi' };
    } catch (error) {
      catchError(error);
    }
  }
}