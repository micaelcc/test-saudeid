import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Product } from '@/shared/dtos/product';
import { CreateProductUseCase } from '@/use-cases/create-product.usecase';
import { UpdateStockUseCase } from '@/use-cases/update-stock.usecase';

export type UpdateStockRequest = {
  addedProducts: Product[];
  removedProducts: Product[];
};

export type CreateProductRequest = {
  product: Product;
  availableItems: number;
};

@Controller()
export class StockController {
  constructor(
    private readonly updateStockService: UpdateStockUseCase,
    private readonly createProductService: CreateProductUseCase,
  ) {}

  @MessagePattern('updateStock')
  async update(data: UpdateStockRequest): Promise<void> {
    return this.updateStockService.execute(data);
  }

  @MessagePattern('createProduct')
  async create(data: CreateProductRequest): Promise<void> {
    return this.createProductService.execute(data);
  }
}
