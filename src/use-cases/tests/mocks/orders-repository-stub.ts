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

    order.products = updateOrder.products;
    order.status = updateOrder.status;

    return;
  }

  getAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
}

export { OrdersRepositoryStub };
