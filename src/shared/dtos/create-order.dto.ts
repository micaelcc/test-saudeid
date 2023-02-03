import { OrderStatus } from 'src/domain/orders/order.entity';
import { Product } from 'src/domain/products/product.entity';

export type CreateOrderDTO = {
  products: Product[];
  totalValue: number;
  status: OrderStatus;
};
