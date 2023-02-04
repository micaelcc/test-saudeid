import { randomUUID } from 'crypto';
import { Order } from 'src/domain/orders/order.entity';
import { OrdersRepository } from 'src/domain/orders/order.repository';
import { CreateOrderDTO } from 'src/shared/dtos/create-order.dto';
import { GetOrdersDTO } from 'src/shared/dtos/get-orders.dto';

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
