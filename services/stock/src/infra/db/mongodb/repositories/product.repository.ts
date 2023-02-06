import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ProductsRepository } from '@/domain/product.repository';
import { Product } from '@/domain/product.schema';

type UpdateStockAction = 'decrement' | 'increment';

@Injectable()
class MongoProductsRepository implements ProductsRepository {
  constructor(@InjectConnection() private connection: Connection) {}

  async create(data: Product): Promise<void> {
    await this.connection.collection('products').insertOne(data);
  }

  async updateMany(ids: string[], action: UpdateStockAction): Promise<void> {
    await this.connection.collection('products').updateMany(
      {
        productId: {
          $in: ids,
        },
      },
      {
        $inc: {
          availableItems: action === 'decrement' ? -1 : 1,
        },
      },
    );
  }
}

export { MongoProductsRepository };
