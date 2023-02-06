import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Product } from '@/domain/products/product.entity';
import { ProductsRepository } from '@/domain/products/product.repository';
import { CreateProductDTO } from '@/shared/dtos/create-product.dto';
import { EntityManager, In } from 'typeorm';

@Injectable()
class TypeOrmProductsRepository implements ProductsRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async create(data: CreateProductDTO): Promise<Product> {
    return this.manager.save(Product, data);
  }

  async getAll(): Promise<Product[]> {
    return this.manager.find(Product);
  }

  async findManyById(ids: string[]): Promise<any[]> {
    return this.manager.findBy(Product, { id: In(ids) });
  }
}

export { TypeOrmProductsRepository };
