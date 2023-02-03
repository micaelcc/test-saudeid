import { CreateProductDTO } from 'src/shared/dtos/create-product.dto';
import { Product } from './product.entity';

export interface ProductsRepository {
  create: (product: CreateProductDTO) => Promise<void>;
  getAll: () => Promise<Product[]>;
  findManyById: (ids: string[]) => Promise<Product[]>;
}

export const ProductsRepository = Symbol('ProductsRepository');
