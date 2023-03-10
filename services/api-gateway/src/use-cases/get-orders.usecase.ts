import { Inject } from '@nestjs/common';
import { Order } from '@/domain/orders/order.entity';
import { OrdersRepository } from '@/domain/orders/order.repository';
import { GetOrdersDTO } from '@/shared/dtos/get-orders.dto';

class GetOrdersUseCase {
  constructor(
    @Inject(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(data: GetOrdersDTO): Promise<Order[]> {
    return this.ordersRepository.getAll(data);
  }
}

export { GetOrdersUseCase };
