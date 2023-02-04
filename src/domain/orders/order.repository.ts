import { CreateOrderDTO } from 'src/shared/dtos/create-order.dto';
import { GetOrdersDTO } from 'src/shared/dtos/get-orders.dto';
import { Order } from './order.entity';

export interface OrdersRepository {
  create: (order: CreateOrderDTO) => Promise<void>;
  update: (updateOrder: Order) => Promise<void>;
  getAll: (data: GetOrdersDTO) => Promise<Order[]>;
  findById: (id: string) => Promise<Order>;
}

export const OrdersRepository = Symbol('OrdersRepository');
