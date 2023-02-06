import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ProductsRepository } from 'src/domain/product.repository';
import { Product } from 'src/domain/product.schema';

@Injectable()
class MongoProductsRepository implements ProductsRepository {
  constructor(@InjectConnection() private connection: Connection) {}

  async create(data: Product): Promise<void> {
    await this.connection.collection('products').insertOne(data);

    return;
  }

  async update(data: Product): Promise<void> {
    //to do
    return;
  }
}

export { MongoProductsRepository };
