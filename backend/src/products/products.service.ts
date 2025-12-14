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

  async create(dto: CreateProductDto) {
    const owner = await this.customersRepo.findOne({
      where: { id: dto.ownerId },
    });
    if (!owner) throw new NotFoundException('Owner (customer) not found');

    const product = this.productsRepo.create(dto);
    return this.productsRepo.save(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productsRepo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepo.remove(product);
  }
}
