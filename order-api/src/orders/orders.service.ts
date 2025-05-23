import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as needed
import { UpdateOrderDto } from './update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    return this.prisma.order.create({ data: dto });
  }

    async update(id: number, dto: UpdateOrderDto) {
    // will throw if no record with that ID
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    // optionally verify it exists first
    await this.findOne(id);
    await this.prisma.order.delete({ where: { id } });
    return { deleted: true };
  }
  
  findAll() {
    return this.prisma.order.findMany({
      include: { user: true },  // if you want to return user info
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }
}
