import { Inject, Injectable } from '@nestjs/common';
import { UpdateStockRequest } from '@/presentation/controllers/stock.controller';

import { ProductsRepository } from '@/domain/product.repository';

@Injectable()
export class UpdateStockUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute({
    addedProducts,
    removedProducts,
  }: UpdateStockRequest): Promise<void> {
    if (addedProducts.length > 0) {
      const addedProductsIds =
        addedProducts?.map((product) => product.id) || [];

      await this.productsRepository.updateMany(addedProductsIds, 'decrement');
    }

    if (removedProducts.length > 0) {
      const removedProductsIds =
        removedProducts?.map((product) => product.id) || [];

      await this.productsRepository.updateMany(removedProductsIds, 'increment');
    }
  }
}
