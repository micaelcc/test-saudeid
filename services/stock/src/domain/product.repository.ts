import { Product } from './product.schema';

export type UpdateStockAction = 'decrement' | 'increment';

export interface ProductsRepository {
  create: (data: Product) => Promise<void>;
  updateMany: (ids: string[], action: UpdateStockAction) => Promise<void>;
}

export const ProductsRepository = Symbol('ProductsRepository');
