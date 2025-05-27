import { Module } from '@nestjs/common';
import { OrdersItemService } from './orders-item.service';
import { OrdersItemController } from './orders-item.controller';

@Module({
  controllers: [OrdersItemController],
  providers: [OrdersItemService],
})
export class OrdersItemModule {}
