import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToOne(() => Customer, { onDelete: 'CASCADE' })
  owner: Customer;

  @Column()
  ownerId: number;
}
