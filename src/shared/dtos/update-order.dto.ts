import { OrderStatus } from 'src/domain/orders/order.entity';
import { Product } from 'src/domain/products/product.entity';

export type UpdateOrderDTO = {
  id: string;
  data: {
    products?: Product[];
    status?: OrderStatus;
  };
};
