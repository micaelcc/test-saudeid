import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from '@/domain/product.repository';
import { CreateProductRequest } from '@/presentation/controllers/stock.controller';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(data: CreateProductRequest): Promise<void> {
    const product = {
      productId: data.product.id,
      availableItems: data.availableItems,
    };

    return this.productsRepository.create(product);
  }
}
