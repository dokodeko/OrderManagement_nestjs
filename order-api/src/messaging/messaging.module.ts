// src/messaging/messaging.module.ts
import { Module }           from '@nestjs/common';
import { RabbitMQModule }   from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [{ name: 'orders', type: 'topic' }],
      uri: process.env.RABBITMQ_URL || 'amqp://localhost',
    }),
  ],
  exports: [RabbitMQModule],
})
export class MessagingModule {}
