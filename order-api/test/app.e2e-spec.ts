import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Order, User } from '@prisma/client';

describe('Orders API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testUser: User;
  let testOrder: Order;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = moduleRef.get(PrismaService);
  });

  beforeEach(async () => {
    // Clean database before each test
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();

    // Create test user
    testUser = await prisma.user.create({ 
      data: { 
        email: 'e2e@test.com',
        name: 'Test User' 
      } 
    });

    // Create test order
    testOrder = await prisma.order.create({
      data: {
        products: 'test product',
        quantity: 1,
        price: 10.0,
        status: 'pending',
        userId: testUser.id
      }
    });
  });

  afterAll(async () => {
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      const newOrder = {
        products: 'widget',
        quantity: 5,
        price: 100.0,
        status: 'pending',
        userId: testUser.id
      };

      const res = await request(app.getHttpServer())
        .post('/orders')
        .send(newOrder)
        .expect(201);

      expect(res.body).toMatchObject({
        ...newOrder,
        id: expect.any(Number),
        date: expect.any(String)
      });
    });

    it('should validate request body', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({})
        .expect(400);
    });
  });

  describe('GET /orders', () => {
    it('should return all orders', async () => {
      const res = await request(app.getHttpServer())
        .get('/orders')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toMatchObject({
        id: testOrder.id,
        products: testOrder.products
      });
    });
  });

  describe('PATCH /orders/:id', () => {
    it('should update order status', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/orders/${testOrder.id}`)
        .send({ status: 'shipped' })
        .expect(200);

      expect(res.body).toMatchObject({
        id: testOrder.id,
        status: 'shipped'
      });
    });

    it('should return 404 for non-existent order', async () => {
      await request(app.getHttpServer())
        .patch('/orders/999999')
        .send({ status: 'shipped' })
        .expect(404);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should mark order as deleted', async () => {
      await request(app.getHttpServer())
        .delete(`/orders/${testOrder.id}`)
        .expect(200, { deleted: true });

      const order = await prisma.order.findUnique({
        where: { id: testOrder.id }
      });
      expect(order).toBeNull();
    });

    it('should return 404 for non-existent order', async () => {
      await request(app.getHttpServer())
        .delete('/orders/999999')
        .expect(404);
    });
  });
});