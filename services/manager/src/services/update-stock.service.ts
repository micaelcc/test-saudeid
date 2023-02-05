import { Injectable } from '@nestjs/common';
import { Order } from '@/entities/order';

@Injectable()
export class UpdateStockService {
  execute(order: Order): Promise<void> {
    //to do
    console.log('call stock microservice to att stock');

    return;
  }
}
