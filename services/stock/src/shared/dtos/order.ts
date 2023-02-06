import { Product } from './product';

export type Order = {
  id: string;
  products: Product[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
