import { Inject } from '@nestjs/common';

import { Product } from '@/domain/products/product.entity';
import { ProductsRepository } from '@/domain/products/product.repository';
import { CreateProductDTO } from '@/shared/dtos/create-product.dto';

class CreateProductUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    return this.productsRepository.create(data);
  }
}

export { CreateProductUseCase };
