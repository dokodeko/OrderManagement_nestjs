// src/orders/orders.controller.ts

import {
  Patch,
  Delete,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Post,
  Get,
  // … other imports …
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './update-order.dto';
import { CreateOrderDto } from './create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // … existing @Post, @Get, @Get(':id') …
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
  
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
