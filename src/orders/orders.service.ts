import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/orders.model';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) { }
  
  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderModel.create({...createOrderDto});
      return order;
    } catch (error) {
      return catchError(error);
    }
  }

  async findAllOrder() {
    try {
      return await this.orderModel.findAll();
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

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderModel.findByPk(id);
      if (!order) {
        throw new NotFoundException(`ID raqami ${id} bolgan buyurtma mavjud emas`);
      }
      await order.update(updateOrderDto);
      return order;
    } catch (error) {
      return catchError(error);
    }
  }

  async removeOrder(id: number) {
    try {
      const order = await this.orderModel.findByPk(id);
      if (!order) {
        throw new NotFoundException(`ID raqami ${id} bolgan buyurtma topilmadi`);
      }
      await order.destroy();
      return { message: 'Buyurtma ochirib tashlandi' };
    } catch (error) {
      return catchError(error);
    }
  }
}