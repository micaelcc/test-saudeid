import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Order } from '@/domain/orders/order.entity';
import { OrdersRepository } from '@/domain/orders/order.repository';
import { CreateOrderDTO } from '@/shared/dtos/create-order.dto';
import { EntityManager } from 'typeorm';
import { GetOrdersDTO } from '@/shared/dtos/get-orders.dto';

@Injectable()
class TypeOrmOrderRepository implements OrdersRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async update(order: Order): Promise<void> {
    const updateOrder = await this.manager.preload(Order, order);

    await this.manager.save(Order, updateOrder);
  }

  async getAll({ filters }: GetOrdersDTO): Promise<Order[]> {
    const findFilters = {};

    if (filters.status) {
      findFilters['where'] = { status: filters.status };
    }

    if (filters.limit) {
      findFilters['take'] = filters.limit;
    }

    if (filters.orderBy) {
      const orderByFilter = {};
      orderByFilter[filters.orderBy] = 'DESC';

      findFilters['order'] = orderByFilter;
    }

    return this.manager.find(Order, findFilters);
  }

  async findById(id: string): Promise<Order> {
    return this.manager.findOne(Order, { where: { id } });
  }
  async create(order: CreateOrderDTO): Promise<Order> {
    return this.manager.save(Order, order);
  }
}

export { TypeOrmOrderRepository };
