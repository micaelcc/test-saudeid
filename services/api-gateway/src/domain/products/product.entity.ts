import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'float' })
  unitPrice: number;
}
