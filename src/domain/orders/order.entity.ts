import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Product } from '../products/product.entity';

export type OrderStatus = 'canceled' | 'ok';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ type: 'varchar' })
  status: OrderStatus;

  @Column({ type: 'float' })
  totalValue: number;

  @ManyToMany(() => Product, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'orders_products' })
  products: Product[];
}
