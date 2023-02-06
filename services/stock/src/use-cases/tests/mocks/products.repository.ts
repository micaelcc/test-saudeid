import { ProductsRepository } from '@/domain/product.repository';
import { Product } from '@/domain/product.schema';

class ProductsRepositoryStub implements ProductsRepository {
  private readonly products: Product[];

  constructor() {
    this.products = [];
  }

  async create(data: Product): Promise<void> {
    this.products.push({
      availableItems: data.availableItems,
      productId: data.productId,
    });
  }

  async update(data: Product): Promise<void> {
    return;
  }
}

export { ProductsRepositoryStub };
