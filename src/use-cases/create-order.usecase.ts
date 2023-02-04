import { Inject } from '@nestjs/common';

import { OrdersRepository } from '../domain/orders/order.repository';
import { Product } from '../domain/products/product.entity';

class CreateOrderUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(products: Product[]): Promise<void> {
    let totalValue = 0;

    products.forEach((product) => {
      totalValue += product.unitPrice;
    });

    await this.ordersRepository.create({
      products,
      status: 'ok',
      totalValue,
    });
  }
}

export { CreateOrderUseCase };
