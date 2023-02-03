import { CreateOrderDTO } from 'src/shared/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/shared/dtos/update-order.dto';
import { Order } from './order.entity';

export interface OrdersRepository {
  create: (order: CreateOrderDTO) => Promise<void>;
  update: (updateOrder: UpdateOrderDTO) => Promise<void>;
  getAll: () => Promise<Order[]>;
}

export const OrdersRepository = Symbol('OrdersRepository');
