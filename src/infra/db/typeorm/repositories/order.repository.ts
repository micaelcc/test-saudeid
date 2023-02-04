import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Order } from '../../../../domain/orders/order.entity';
import { OrdersRepository } from 'src/domain/orders/order.repository';
import { CreateOrderDTO } from 'src/shared/dtos/create-order.dto';
import { EntityManager } from 'typeorm';

@Injectable()
class TypeOrmOrderRepository implements OrdersRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async update(order: Order): Promise<void> {
    const updateOrder = await this.manager.preload(Order, order);

    await this.manager.save(Order, updateOrder);
  }

  async getAll(): Promise<Order[]> {
    return this.manager.find(Order);
  }

  async findById(id: string): Promise<Order> {
    return this.manager.findOne(Order, { where: { id } });
  }
  async create(order: CreateOrderDTO): Promise<void> {
    await this.manager.save(Order, order);
  }
}

export { TypeOrmOrderRepository };
