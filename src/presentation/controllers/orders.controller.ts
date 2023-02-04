import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateOrderUseCase } from 'src/use-cases/update-order.usecase';
import { CancelOrderUseCase } from '../../use-cases/cancel-order.usecase';
import { CreateOrderUseCase } from '../../use-cases/create-order.usecase';
import { GetProductsByIdsUseCase } from '../../use-cases/get-products-by-ids.usecase';
import { ProductDontExists } from '../errors/ProductDontExists.error';
import { CreateOrderValidator } from '../validators/create-order.validator';

type CancelOrderRequest = {
  id: string;
};

type UpdateOrderRequest = CancelOrderRequest;

@Controller('/orders')
class OrdersController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getProductsByIds: GetProductsByIdsUseCase,
    private cancelOrderUseCase: CancelOrderUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
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
  public async cancelOrder(@Param() params: CancelOrderRequest): Promise<void> {
    try {
      const { id } = params;

      await this.cancelOrderUseCase.execute(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Body() data: CreateOrderValidator,
    @Param() params: UpdateOrderRequest,
  ): Promise<void> {
    try {
      const products = await this.getProductsByIds.execute(data.products);

      if (!products || products.length !== data.products.length) {
        throw new ProductDontExists();
      }

      const { id } = params;

      await this.updateOrderUseCase.execute({
        id,
        data: { products },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export { OrdersController };
