import { Module } from '@nestjs/common';
import { OrdersItemService } from './orders-item.service';
import { OrdersItemController } from './orders-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './models/orders-item.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem])],
  controllers: [OrdersItemController],
  providers: [OrdersItemService],
})
export class OrdersItemModule {}
