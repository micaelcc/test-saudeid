import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  unitPrice: number;
}
