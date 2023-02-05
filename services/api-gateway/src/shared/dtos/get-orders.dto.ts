import { OrderStatus } from '@/domain/orders/order.entity';

export type OrderByFields = 'createdAt' | 'updatedAt' | 'id';

export type GetOrdersDTO = {
  filters: {
    status?: OrderStatus;
    limit?: number;
    orderBy?: OrderByFields;
  };
};
