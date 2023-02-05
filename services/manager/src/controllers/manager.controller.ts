import { Controller } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';
import { Order } from '@/entities/order';
import { UpdateStockService } from '@/services/update-stock.service';
import { CreateProductService } from '@/services/create-product.service';
import { Product } from '@/entities/product';

@Controller()
export class ManagerController {
  constructor(
    private readonly updateStockService: UpdateStockService,
    private readonly createProductService: CreateProductService,
  ) {}

  @MessagePattern('order.created')
  async orderCreated(order: Order): Promise<void> {
    console.log(order);
    await this.updateStockService.execute(order);
    return;
  }

  @MessagePattern('order.updated')
  async orderUpdated(order: Order): Promise<void> {
    await this.updateStockService.execute(order);
    return;
  }

  @MessagePattern('order.canceled')
  async orderCanceled(order: Order): Promise<void> {
    await this.updateStockService.execute(order);
    return;
  }

  @MessagePattern('product.created')
  async productCreated(product: Product): Promise<void> {
    await this.createProductService.execute(product);
    return;
  }
}
