import { OrderStatus } from '@/domain/orders/order.entity';
import { Product } from '@/domain/products/product.entity';

export type UpdateOrderDTO = {
  id: string;
  data: {
    products?: Product[];
    status?: OrderStatus;
  };
};
