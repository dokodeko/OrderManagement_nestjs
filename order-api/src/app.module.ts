import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagingModule } from './messaging/messaging.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
  OrdersModule,
  PrismaModule,
  MessagingModule,
  CacheModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
