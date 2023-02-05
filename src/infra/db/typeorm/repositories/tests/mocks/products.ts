import { randomUUID } from 'crypto';
import { Product } from '@/domain/products/product.entity';

export const PRODUCTS_MOCK: Product[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    id: randomUUID(),
    name: 'product_name',
    unitPrice: 10,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    id: randomUUID(),
    name: 'product_name_2',
    unitPrice: 100,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    id: randomUUID(),
    name: 'product_name',
    unitPrice: 1000,
  },
];
