import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    NestCacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,  // e.g. 'redis'
      port: +(process.env.REDIS_PORT || 6379), // e.g. 6379
      ttl: 30,                       // default cache lifetime in seconds
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
