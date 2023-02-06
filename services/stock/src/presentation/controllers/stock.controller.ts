import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Product } from 'src/shared/dtos/product';
import { CreateProductUseCase } from 'src/use-cases/create-product.usecase';
import { UpdateStockUseCase } from 'src/use-cases/update-stock.usecase';

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
