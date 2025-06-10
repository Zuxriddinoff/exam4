import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersItemService } from './orders-item.service';

@Controller('orders-item')
export class OrdersItemController {
  constructor(private readonly ordersItemService: OrdersItemService) {}

  @Get('by-order/:order_id')
  findByOrderId(@Param('order_id', ParseIntPipe) order_id: number) {
    return this.ordersItemService.findItemsByOrderId(order_id);
  }
}