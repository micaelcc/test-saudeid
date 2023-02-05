import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { connectionOptions } from 'ormconfig';
import { Order } from '@/domain/orders/order.entity';
import { Product } from '@/domain/products/product.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: [Order, Product],
  ...connectionOptions,
};
