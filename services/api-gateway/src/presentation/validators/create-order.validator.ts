import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, Validate } from 'class-validator';
import { ValidateUUIDArray } from './uuid-array-validator';

export class CreateOrderValidator {
  @ApiProperty()
  @IsNotEmpty({ message: 'products must be provided' })
  @IsArray()
  @ArrayNotEmpty({ message: 'at least one product must be provided' })
  @Validate(ValidateUUIDArray)
  products: string[];
}
