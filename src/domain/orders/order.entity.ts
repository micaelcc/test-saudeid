import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

export type OrderStatus = 'canceled' | 'ok';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ type: 'varchar' })
  status: OrderStatus;

  @Column({ type: 'float' })
  totalValue: number;
}
