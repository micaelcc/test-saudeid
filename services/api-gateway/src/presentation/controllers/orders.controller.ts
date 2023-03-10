import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateOrderUseCase } from '@/use-cases/update-order.usecase';
import { CancelOrderUseCase } from '@/use-cases/cancel-order.usecase';
import { CreateOrderUseCase } from '@/use-cases/create-order.usecase';
import { GetProductsByIdsUseCase } from '@/use-cases/get-products-by-ids.usecase';
import { ProductDontExists } from '../errors/ProductDontExists.error';
import { CreateOrderValidator } from '../validators/create-order.validator';
import { Order } from '@/domain/orders/order.entity';
import { GetOrdersUseCase } from '@/use-cases/get-orders.usecase';
import { GetOrdersValidator } from '../validators/get-orders.validator';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaConfig } from '@/infra/event-streaming/kafka/config';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiProperty,
  ApiOperation,
  ApiNoContentResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

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
    private getOrdersUseCase: GetOrdersUseCase,
    @Inject(kafkaConfig.serverName) private readonly kafka: ClientKafka,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Order, isArray: false })
  @ApiProperty({ type: Order })
  @ApiOperation({ summary: 'create new order' })
  @ApiBody({ type: CreateOrderValidator, description: 'array of uuid strings' })
  public async create(@Body() data: CreateOrderValidator): Promise<Order> {
    try {
      const products = await this.getProductsByIds.execute(data.products);

      if (!products || products.length !== data.products.length) {
        throw new ProductDontExists();
      }

      const order = await this.createOrderUseCase.execute(products);

      this.kafka.emit('order.created', {
        orderId: order.id,
        products: order.products,
      });

      return order;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({})
  @ApiProperty({ type: Order })
  @ApiOperation({ summary: 'cancel order by id' })
  @ApiParam({ name: 'id', description: 'provides a order id' })
  public async cancelOrder(@Param() params: CancelOrderRequest): Promise<void> {
    try {
      const { id } = params;

      const canceledOrder = await this.cancelOrderUseCase.execute(id);

      this.kafka.emit('order.canceled', {
        orderId: canceledOrder.id,
        products: canceledOrder.products,
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({})
  @ApiProperty({ type: Order })
  @ApiOperation({ summary: 'update order' })
  @ApiBody({ type: CreateOrderValidator, description: 'array of uuid strings' })
  @ApiParam({ name: 'id', description: 'provides a order id' })
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

      const updatedOrder = await this.updateOrderUseCase.execute({
        id,
        data: { products },
      });

      this.kafka.emit('order.updated', {
        orderId: updatedOrder.id,
        products: updatedOrder.products,
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Order, isArray: true })
  @ApiProperty({ type: Order })
  @ApiOperation({ summary: 'get all orders' })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'canceled',
  })
  public async getAll(@Query() params: GetOrdersValidator): Promise<Order[]> {
    return this.getOrdersUseCase.execute({ filters: { ...params } });
  }
}

export { OrdersController };
