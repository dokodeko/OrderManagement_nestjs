import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Orders API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = moduleRef.get(PrismaService);
    // Reset DB
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();
    // Seed a user
    await prisma.user.create({ data: { email: 'e2e@test.com' } });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/orders (POST) → 201 + created order', async () => {
    const res = await request(app.getHttpServer())
      .post('/orders')
      .send({
        products: 'widget',
        quantity: 5,
        total: 100.0,
        date: new Date().toISOString(),
        status: 'pending',
        userId: 1,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toBe('pending');
  });

  it('/orders (GET) → 200 + array', async () => {
    const res = await request(app.getHttpServer())
      .get('/orders')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('/orders/:id (PATCH) → 200 + updated', async () => {
    const res = await request(app.getHttpServer())
      .patch('/orders/1')
      .send({ status: 'shipped' })
      .expect(200);
    expect(res.body.status).toBe('shipped');
  });

  it('/orders/:id (DELETE) → 200 + deleted flag', async () => {
    await request(app.getHttpServer())
      .delete('/orders/1')
      .expect(200, { deleted: true });
  });
});
