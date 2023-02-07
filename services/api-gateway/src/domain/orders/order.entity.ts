import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Product } from '../products/product.entity';

export type OrderStatus = 'canceled' | 'ok';

@Entity('orders')
export class Order extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  status: OrderStatus;

  @ApiProperty()
  @Column({ type: 'float' })
  totalValue: number;

  @ApiProperty()
  @ManyToMany(() => Product, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'orders_products' })
  products: Product[];
}
