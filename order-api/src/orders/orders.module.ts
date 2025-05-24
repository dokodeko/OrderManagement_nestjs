import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { OrdersConsumer } from './consumers/orders.consumers';

@Module({
  imports: [
    PrismaModule,
    MessagingModule,
    ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersConsumer]
})
export class OrdersModule {}
