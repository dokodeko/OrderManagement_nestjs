// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }     from '@nestjs/core';
import { AppModule }       from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,    // ← allow basic type coercion
    },
  }));
  await app.listen(3000);
}
bootstrap();
