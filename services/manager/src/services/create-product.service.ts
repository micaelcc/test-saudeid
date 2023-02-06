import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductRequest } from '@/controllers/manager.controller';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject('STOCK_SERVICE') private readonly stockService: ClientProxy,
  ) {}

  execute(data: CreateProductRequest): Promise<void> {
    this.stockService.emit('createProduct', data);

    return;
  }
}
