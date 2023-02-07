import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { ClientKafka } from '@nestjs/microservices';
import { kafkaConfig } from '@/infra/event-streaming/kafka/config';
import { CreateProductUseCase } from '@/use-cases/create-product.usecase';
import { CreateProductValidator } from '../validators/create-product.validator';
import { Product } from '@/domain/products/product.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';

@Controller('/products')
class ProductsController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    @Inject(kafkaConfig.serverName) private readonly kafka: ClientKafka,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Product, isArray: false })
  @ApiProperty({ type: Product })
  @ApiOperation({ summary: 'create new product' })
  @ApiBody({
    type: CreateProductValidator,
    description: 'create product payload',
  })
  public async create(@Body() data: CreateProductValidator): Promise<Product> {
    try {
      const product = await this.createProductUseCase.execute({
        name: data.name,
        unitPrice: data.unitPrice,
      });

      this.kafka.emit('product.created', {
        product,
        availableItems: data.availableItems,
      });

      return product;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export { ProductsController };
