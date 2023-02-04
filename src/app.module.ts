import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './infra/db/typeorm/config';
import { TypeOrmOrderRepository } from './infra/db/typeorm/repositories/order.repository';
import { OrdersController } from './presentation/controllers/orders.controller';
import { CreateOrderUseCase } from './use-cases/create-order.usecase';
import { OrdersRepository } from './domain/orders/order.repository';
import { ProductsRepository } from './domain/products/product.repository';
import { TypeOrmProductsRepository } from './infra/db/typeorm/repositories/product.repository';
import { GetProductsByIdsUseCase } from './use-cases/get-products-by-ids.usecase';
import { CancelOrderUseCase } from './use-cases/cancel-order.usecase';
import { UpdateOrderUseCase } from './use-cases/update-order.usecase';
import { GetOrdersUseCase } from './use-cases/get-orders.usecase';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [OrdersController],
  providers: [
    CreateOrderUseCase,
    GetProductsByIdsUseCase,
    CancelOrderUseCase,
    UpdateOrderUseCase,
    GetOrdersUseCase,
    { provide: OrdersRepository, useClass: TypeOrmOrderRepository },
    { provide: ProductsRepository, useClass: TypeOrmProductsRepository },
  ],
})
export class AppModule {}
