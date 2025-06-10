import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/orders.model';
import { Basket } from 'src/basket/models/basket.model';
import { OrderItem } from 'src/orders-item/models/orders-item.model';
import { Product } from 'src/product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, Basket, OrderItem, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
