import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CancelOrderUseCase } from '../../use-cases/cancel-order.usecase';
import { CreateOrderUseCase } from '../../use-cases/create-order.usecase';
import { GetProductsByIdsUseCase } from '../../use-cases/get-products-by-ids.usecase';
import { ProductDontExists } from '../errors/ProductDontExists.error';
import { CreateOrderValidator } from '../validators/create-order.validator';

@Controller('/orders')
class OrdersController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getProductsByIds: GetProductsByIdsUseCase,
    private cancelOrderUseCase: CancelOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateOrderValidator): Promise<void> {
    try {
      const products = await this.getProductsByIds.execute(data.products);

      if (!products || products.length !== data.products.length) {
        throw new ProductDontExists();
      }

      await this.createOrderUseCase.execute(products);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async cancelOrder(@Req() request: Request): Promise<void> {
    try {
      const { id } = request.params;

      await this.cancelOrderUseCase.execute(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export { OrdersController };
