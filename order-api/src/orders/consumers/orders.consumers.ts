// src/orders/orders.consumer.ts
import { Injectable, Logger }        from '@nestjs/common';
import { RabbitSubscribe }            from '@golevelup/nestjs-rabbitmq';
import { Order }                      from '@prisma/client';

@Injectable()
export class OrdersConsumer {
  private readonly logger = new Logger(OrdersConsumer.name);

  @RabbitSubscribe({
    exchange: '',            // default exchange
    routingKey: 'order.created',
    queue: 'orders_created', // queue name
  })
  public async handleOrderCreated(msg: Order) {
    this.logger.log('🔔 Received order.created event:', JSON.stringify(msg));
  }
}
