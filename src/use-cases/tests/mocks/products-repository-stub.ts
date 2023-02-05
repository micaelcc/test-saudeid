import { Product } from '@/domain/products/product.entity';
import { ProductsRepository } from '@/domain/products/product.repository';
import { CreateProductDTO } from '@/shared/dtos/create-product.dto';

class ProductsRepositoryStub implements ProductsRepository {
  private readonly products: Product[];

  constructor() {
    this.products = [];
  }

  create(product: CreateProductDTO): Promise<void> {
    this.products.push({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: 'specified_id',
      name: product.name,
      unitPrice: product.unitPrice,
    });

    return;
  }

  getAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  findManyById(ids: string[]): Promise<Product[]> {
    const products = this.products.filter((product) =>
      ids.includes(product.id),
    );

    return Promise.resolve(products);
  }
}

export { ProductsRepositoryStub };
