import { Product } from '@/entities/product';

export const PRODUCTS_MOCK: Product[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    id: 'fake_id',
    name: 'fake_name',
    unitPrice: 10,
  },
];
