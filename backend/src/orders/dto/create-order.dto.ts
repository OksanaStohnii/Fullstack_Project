import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto {
  @IsInt()
  productId: number;
}

export class CreateOrderDto {
  @IsArray()
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
