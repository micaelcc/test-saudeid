import { Product } from '@/shared/dtos/product';

export const PRODUCTS_MOCK: Product[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    id: 'any_id',
    name: 'product_name',
    unitPrice: 10,
  },
];
