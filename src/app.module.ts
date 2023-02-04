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
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [OrdersController],
  providers: [
    CreateOrderUseCase,
    GetProductsByIdsUseCase,
    { provide: OrdersRepository, useClass: TypeOrmOrderRepository },
    { provide: ProductsRepository, useClass: TypeOrmProductsRepository },
  ],
})
export class AppModule {}
