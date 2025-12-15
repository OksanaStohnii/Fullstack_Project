import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly itemsRepo: Repository<OrderItem>,
    @InjectRepository(Customer)
    private readonly customersRepo: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto, customerId: number) {
    const customer = await this.customersRepo.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const productIds = dto.items.map((i) => i.productId);

    const products = await this.productsRepo.find({
      where: { id: In(productIds) },
    });
    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products not found');
    }

    const items = dto.items.map((i) => {
      const product = products.find((p) => p.id === i.productId)!;
      return this.itemsRepo.create({
        productId: i.productId,
        purchasePrice: Number(product.price),
      });
    });

    const totalPrice = items.reduce(
      (sum, it) => sum + Number(it.purchasePrice),
      0,
    );

    const order = this.ordersRepo.create({
      customerId: customerId,
      totalPrice,
      items,
    });

    return this.ordersRepo.save(order);
  }

  findAll(customerId: number) {
    return this.ordersRepo.find({
      where: { customerId },
      relations: ['items'],
      order: { id: 'DESC' },
    });
  }

  async findOne(customerId: number, id: number) {
    const order = await this.ordersRepo.findOne({
      where: { id, customerId },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(customerId: number, id: number, dto: UpdateOrderDto) {
    const existing = await this.findOne(customerId, id);
    if (!existing) throw new NotFoundException('Order not found');

    if (dto.items) {
      const productIds = dto.items.map((i) => i.productId);
      const products = await this.productsRepo.find({
        where: { id: In(productIds) },
      });

      if (products.length !== productIds.length) {
        throw new BadRequestException('Some products not found');
      }

      await this.itemsRepo.delete({ orderId: id });

      const newItems = dto.items.map((i) => {
        const product = products.find((p) => p.id === i.productId)!;
        return this.itemsRepo.create({
          orderId: id,
          productId: i.productId,
          purchasePrice: Number(product.price),
        });
      });

      existing.items = await this.itemsRepo.save(newItems);

      existing.totalPrice = existing.items.reduce(
        (sum, it) => sum + Number(it.purchasePrice),
        0,
      );
    }

    return this.ordersRepo.save(existing);
  }

  async remove(customerId: number, id: number) {
    const order = await this.findOne(customerId, id);
    if (!order) throw new NotFoundException('Order not found');

    await this.ordersRepo.remove(order);
    return { deleted: true };
  }
}
