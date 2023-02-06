import { IsNotEmpty } from 'class-validator';

export class CreateProductValidator {
  @IsNotEmpty({ message: 'product name must be provided' })
  name: string;

  @IsNotEmpty({ message: 'product price must be provided' })
  unitPrice: number;

  @IsNotEmpty({ message: 'product available items must be provided' })
  availableItems: number;
}
