import { randomUUID } from 'crypto';
import { Order } from 'src/domain/orders/order.entity';

export const ORDERS_MOCK: Order[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    id: randomUUID(),
    products: [],
    status: 'ok',
    totalValue: 150,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    id: randomUUID(),
    products: [],
    status: 'canceled',
    totalValue: 170,
  },
];
