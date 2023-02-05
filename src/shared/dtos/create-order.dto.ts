import { OrderStatus } from '@/domain/orders/order.entity';
import { Product } from '@/domain/products/product.entity';

export type CreateOrderDTO = {
  products: Product[];
  totalValue: number;
  status: OrderStatus;
};
