import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    @InjectRepository(Customer)
    private customersRepo: Repository<Customer>,
  ) {}

  async findMy(ownerId: number): Promise<Product[]> {
    return this.productsRepo.find({
      where: { ownerId },
      order: { id: 'DESC' },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepo.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto, ownerId: number) {
    const owner = await this.customersRepo.findOne({ where: { id: ownerId } });
    if (!owner) throw new NotFoundException('Owner (customer) not found');

    const product = this.productsRepo.create({
      ...dto,
      ownerId,
    });

    return this.productsRepo.save(product);
  }

  async update(
    ownerId: number,
    id: number,
    dto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepo.findOne({ where: { id, ownerId } });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, dto);
    return this.productsRepo.save(product);
  }

  async remove(ownerId: number, id: number): Promise<void> {
    const product = await this.productsRepo.findOne({ where: { id, ownerId } });
    if (!product) throw new NotFoundException('Product not found');

    await this.productsRepo.remove(product);
  }
}
