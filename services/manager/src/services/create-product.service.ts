import { Injectable } from '@nestjs/common';
import { Product } from '@/entities/product';

@Injectable()
export class CreateProductService {
  execute(product: Product): Promise<void> {
    //to do
    console.log('call stock microservice to att stock');

    return;
  }
}
