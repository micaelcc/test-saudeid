import { CreateProductDTO } from '@/shared/dtos/create-product.dto';
import { Product } from './product.entity';

export interface ProductsRepository {
  create: (product: CreateProductDTO) => Promise<Product>;
  getAll: () => Promise<Product[]>;
  findManyById: (ids: string[]) => Promise<Product[]>;
}

export const ProductsRepository = Symbol('ProductsRepository');
