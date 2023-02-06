import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from 'src/presentation/controllers/stock.controller';

@Injectable()
export class CreateProductUseCase {
  execute(data: CreateProductRequest): string {
    //todo
    return 'Hello World!';
  }
}
