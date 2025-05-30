import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdersItemService } from './orders-item.service';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders-item.dto';

@Controller('orders-item')
export class OrdersItemController {
  constructor(private readonly ordersItemService: OrdersItemService) {}

  @Post()
  create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    return this.ordersItemService.createOrderItem(createOrdersItemDto);
  }

  @Get()
  findAll() {
    return this.ordersItemService.findAllOrderItems();
  }

  @Get('by-order/:order_id')
  findByOrderId(@Param('order_id', ParseIntPipe) order_id: number) {
    return this.ordersItemService.findItemsByOrderId(order_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersItemService.findOneOrderItem(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrdersItemDto: UpdateOrdersItemDto,
  ) {
    return this.ordersItemService.updateOrderItem(id, updateOrdersItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersItemService.removeOrderItem(id);
  }
}
