import { Inject } from '@nestjs/common';
import { Product } from '@/domain/products/product.entity';
import { ProductsRepository } from '@/domain/products/product.repository';

class GetProductsByIdsUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findManyById(ids);
  }
}

export { GetProductsByIdsUseCase };
