import { Order } from '@/domain/orders/order.entity';
import { OrdersRepository } from '@/domain/orders/order.repository';
import { Product } from '@/domain/products/product.entity';
import { ProductsRepository } from '@/domain/products/product.repository';
import { TypeOrmOrderRepository } from '@/infra/db/typeorm/repositories/order.repository';
import { TypeOrmProductsRepository } from '@/infra/db/typeorm/repositories/product.repository';
import { kafkaConfig } from '@/infra/event-streaming/kafka/config';
import { OrdersController } from '@/presentation/controllers/orders.controller';
import { ProductsController } from '@/presentation/controllers/products.controller';
import { CancelOrderUseCase } from '@/use-cases/cancel-order.usecase';
import { CreateOrderUseCase } from '@/use-cases/create-order.usecase';
import { CreateProductUseCase } from '@/use-cases/create-product.usecase';
import { GetOrdersUseCase } from '@/use-cases/get-orders.usecase';
import { GetProductsByIdsUseCase } from '@/use-cases/get-products-by-ids.usecase';
import { UpdateOrderUseCase } from '@/use-cases/update-order.usecase';
import { INestApplication } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('AppRoutesTest', () => {
  let app: INestApplication;
  let createdProductId: string;
  let createdOrderId: string;

  const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [Order, Product],
    synchronize: true,
    logging: true,
    migrations: ['../../infra/db/typeorm/migrations/*.ts'],
    host: process.env.DATABASE_TEST_HOST,
    port: Number(process.env.DATABASE_TEST_PORT),
    username: process.env.DATABASE_TEST_USER,
    password: process.env.DATABASE_TEST_PASS,
    database: process.env.DATABASE_TEST_NAME,
    migrationsRun: true,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ClientsModule.register([
          {
            transport: Transport.KAFKA,
            name: kafkaConfig.serverName,
            options: {
              client: {
                brokers: ['localhost:9093'],
                retry: {
                  retries: 0,
                },
              },
            },
          },
        ]),
      ],
      controllers: [OrdersController, ProductsController],
      providers: [
        CreateOrderUseCase,
        GetProductsByIdsUseCase,
        CancelOrderUseCase,
        UpdateOrderUseCase,
        GetOrdersUseCase,
        CreateProductUseCase,
        { provide: OrdersRepository, useClass: TypeOrmOrderRepository },
        { provide: ProductsRepository, useClass: TypeOrmProductsRepository },
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /products', () => {
    test('Should return 201 on success', async () => {
      const {
        body: { id },
      } = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product_name',
          unitPrice: 10,
          availableItems: 100,
        })
        .set('Accept', 'application/json')
        .expect(201);

      createdProductId = id;
    });
  });

  describe('POST /orders', () => {
    test('Should return 201 on success', async () => {
      const {
        body: { id },
      } = await request(app.getHttpServer())
        .post('/orders')
        .send({
          products: [createdProductId],
        })
        .set('Accept', 'application/json')
        .expect(201);

      createdOrderId = id;
    });
  });

  describe('GET /orders', () => {
    test('Should return 200 on success', async () => {
      await request(app.getHttpServer())
        .get('/orders')
        .set('Accept', 'application/json')
        .expect(200);
    });
  });

  describe('PATCH /orders', () => {
    test('Should return 204 on success', async () => {
      await request(app.getHttpServer())
        .patch(`/orders/${createdOrderId}`)
        .set('Accept', 'application/json')
        .expect(204);
    });
  });

  describe('PUT /orders', () => {
    test('Should return 204 on success', async () => {
      await request(app.getHttpServer())
        .put(`/orders/${createdOrderId}`)
        .send({
          products: [createdProductId],
        })
        .set('Accept', 'application/json')
        .expect(204);
    });
  });
});
