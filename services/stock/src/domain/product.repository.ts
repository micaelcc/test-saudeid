import { Product } from './product.schema';

export interface ProductsRepository {
  create: (data: Product) => Promise<void>;
  update: (data: Product) => Promise<void>;
}

export const ProductsRepository = Symbol('ProductsRepository');
