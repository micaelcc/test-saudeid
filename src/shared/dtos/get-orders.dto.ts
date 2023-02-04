import { OrderStatus } from 'src/domain/orders/order.entity';

export type OrderByFields = 'createdAt' | 'updatedAt' | 'id';

export type GetOrdersDTO = {
  filters: {
    status?: OrderStatus;
    limit?: number;
    orderBy?: OrderByFields;
  };
};
