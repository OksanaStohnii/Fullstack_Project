import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsArray()
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
