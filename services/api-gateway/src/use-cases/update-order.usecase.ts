import { Inject } from '@nestjs/common';
import { UpdateOrderDTO } from '@/shared/dtos/update-order.dto';

import { OrdersRepository } from '@/domain/orders/order.repository';
import { Order } from '@/domain/orders/order.entity';

class UpdateOrderUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute({ id, data }: UpdateOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      return;
    }

    let totalValue = 0;

    data.products?.forEach((product) => {
      totalValue += product.unitPrice;
    });

    order.products = data.products;
    order.totalValue = totalValue;

    await this.ordersRepository.update(order);

    return order;
  }
}

export { UpdateOrderUseCase };
