import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (c) => c.orders, { onDelete: 'CASCADE' })
  customer: Customer;

  @Column()
  customerId: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  totalPrice: number;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
