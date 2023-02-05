import { Inject } from '@nestjs/common';

import { OrdersRepository } from '@/domain/orders/order.repository';
import { Order } from '@/domain/orders/order.entity';

class CancelOrderUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      return;
    }

    order.status = 'canceled';

    await this.ordersRepository.update(order);

    return order;
  }
}

export { CancelOrderUseCase };
