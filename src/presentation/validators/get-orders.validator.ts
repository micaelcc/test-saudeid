import { IsOptional, Validate } from 'class-validator';
import { OrderStatus } from 'src/domain/orders/order.entity';
import { OrderByFields } from 'src/shared/dtos/get-orders.dto';
import {
  ValidateOrderByFilter,
  ValidateStatusFilter,
} from './filters-validators';

export class GetOrdersValidator {
  @IsOptional()
  limit: number;

  @IsOptional()
  @Validate(ValidateOrderByFilter)
  orderBy: OrderByFields;

  @IsOptional()
  @Validate(ValidateStatusFilter)
  status: OrderStatus;
}
