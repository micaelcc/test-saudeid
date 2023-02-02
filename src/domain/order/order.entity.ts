import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

type OrderStatus = 'canceled' | 'ok';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ type: 'varchar' })
  status: OrderStatus;

  @Column({ type: 'float' })
  totalValue: number;
}
