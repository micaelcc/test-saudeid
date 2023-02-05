import { randomUUID } from 'crypto';
import { Order } from '@/domain/orders/order.entity';
import { OrdersRepository } from '@/domain/orders/order.repository';
import { CreateOrderDTO } from '@/shared/dtos/create-order.dto';
import { GetOrdersDTO } from '@/shared/dtos/get-orders.dto';

class OrdersRepositoryStub implements OrdersRepository {
  private readonly orders: Order[];

  constructor() {
    this.orders = [];
  }

  create(order: CreateOrderDTO): Promise<Order> {
    const data = {
      ...order,
      updatedAt: new Date(),
      createdAt: new Date(),
      deletedAt: null,
      id: randomUUID(),
    };

    this.orders.push(data);

    return Promise.resolve(data);
  }

  update(updateOrder: Order): Promise<void> {
    const order = this.orders.find((order) => order.id === updateOrder.id);

    if (order.products) {
      order.products = updateOrder.products;
    }

    if (order.status) {
      order.status = updateOrder.status;
    }

    return;
  }

  getAll({ filters }: GetOrdersDTO): Promise<Order[]> {
    const orders = this.orders.filter(
      (order) => order.status === filters.status,
    );

    return Promise.resolve(orders);
  }

  findById(id: string): Promise<Order> {
    const order = this.orders.find((order) => order.id === id);

    return Promise.resolve(order);
  }
}

export { OrdersRepositoryStub };
