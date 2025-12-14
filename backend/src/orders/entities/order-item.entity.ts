import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (o) => o.items, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  purchasePrice: number;
}
