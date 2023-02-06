import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Product } from '@/entities/product';

type UpdateStockDTO = {
  addedProducts: Product[];
  removedProducts: Product[];
};

@Injectable()
export class UpdateStockService {
  constructor(
    @Inject('STOCK_SERVICE') private readonly stockService: ClientProxy,
  ) {}

  execute(data: UpdateStockDTO): Promise<void> {
    this.stockService.emit('updateStock', data);

    return;
  }
}
