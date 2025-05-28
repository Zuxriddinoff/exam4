import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private model: typeof Order
  ) { }
  
  async createOrder(createOrderDto: CreateOrderDto) {
    try {

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}