import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductValidator {
  @ApiProperty()
  @IsNotEmpty({ message: 'product name must be provided' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'product price must be provided' })
  unitPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'product available items must be provided' })
  availableItems: number;
}
