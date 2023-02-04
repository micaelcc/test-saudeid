import { randomUUID } from 'crypto';
import { Order } from 'src/domain/orders/order.entity';
import { OrdersRepository } from 'src/domain/orders/order.repository';
import { CreateOrderDTO } from 'src/shared/dtos/create-order.dto';

class OrdersRepositoryStub implements OrdersRepository {
  private readonly orders: Order[];

  constructor() {
    this.orders = [];
  }

  create(order: CreateOrderDTO): Promise<void> {
    this.orders.push({
      ...order,
      updatedAt: new Date(),
      createdAt: new Date(),
      deletedAt: null,
      id: randomUUID(),
    });

    return;
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

  getAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  findById(id: string): Promise<Order> {
    const order = this.orders.find((order) => order.id === id);

    return Promise.resolve(order);
  }
}

export { OrdersRepositoryStub };
