import {
  ProductsRepository,
  UpdateStockAction,
} from '@/domain/product.repository';
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

  async updateMany(ids: string[], action: UpdateStockAction): Promise<void> {
    this.products.map((product) => {
      if (ids.includes(product.productId)) {
        product.availableItems =
          action === 'decrement'
            ? product.availableItems - 1
            : product.availableItems + 1;
      }
    });
  }
}

export { ProductsRepositoryStub };
