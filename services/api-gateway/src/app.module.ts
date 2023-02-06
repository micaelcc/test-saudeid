import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@/infra/db/typeorm/config';
import { TypeOrmOrderRepository } from '@/infra/db/typeorm/repositories/order.repository';
import { OrdersController } from '@/presentation/controllers/orders.controller';
import { CreateOrderUseCase } from '@/use-cases/create-order.usecase';
import { OrdersRepository } from '@/domain/orders/order.repository';
import { ProductsRepository } from '@/domain/products/product.repository';
import { TypeOrmProductsRepository } from '@/infra/db/typeorm/repositories/product.repository';
import { GetProductsByIdsUseCase } from '@/use-cases/get-products-by-ids.usecase';
import { CancelOrderUseCase } from '@/use-cases/cancel-order.usecase';
import { UpdateOrderUseCase } from '@/use-cases/update-order.usecase';
import { GetOrdersUseCase } from '@/use-cases/get-orders.usecase';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaConfig } from './infra/event-streaming/kafka/config';
import { ProductsController } from './presentation/controllers/products.controller';
import { CreateProductUseCase } from './use-cases/create-product.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClientsModule.register([
      {
        transport: Transport.KAFKA,
        name: kafkaConfig.serverName,
        options: {
          client: {
            brokers: [kafkaConfig.url],
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
})
export class AppModule {}
