import { Inject, Injectable } from '@nestjs/common';
import { UpdateStockRequest } from '@/presentation/controllers/stock.controller';

import { ProductsRepository } from '@/domain/product.repository';

@Injectable()
export class UpdateStockUseCase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(data: UpdateStockRequest): Promise<void> {
    //todo

    return;
  }
}
