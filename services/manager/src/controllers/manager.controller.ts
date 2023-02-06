import { Controller } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';
import { Order } from '@/entities/order';
import { UpdateStockService } from '@/services/update-stock.service';
import { CreateProductService } from '@/services/create-product.service';
import { Product } from '@/entities/product';

export type CreateProductRequest = {
  product: Product;
  availableItems: number;
};

@Controller()
export class ManagerController {
  constructor(
    private readonly updateStockService: UpdateStockService,
    private readonly createProductService: CreateProductService,
  ) {}

  @MessagePattern('order.created')
  async orderCreated(order: Order): Promise<void> {
    const payload = {
      addedProducts: order.products,
      removedProducts: [],
    };

    return this.updateStockService.execute(payload);
  }

  @MessagePattern('order.updated')
  async orderUpdated(order: Order): Promise<void> {
    const payload = {
      addedProducts: order.products,
      removedProducts: [],
    };

    return this.updateStockService.execute(payload);
  }

  @MessagePattern('order.canceled')
  async orderCanceled(order: Order): Promise<void> {
    const payload = {
      addedProducts: [],
      removedProducts: order.products,
    };

    return this.updateStockService.execute(payload);
  }

  @MessagePattern('product.created')
  async productCreated(data: CreateProductRequest): Promise<void> {
    return this.createProductService.execute(data);
  }
}
