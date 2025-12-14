import { IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateOrderItemDto {
  @IsInt()
  productId: number;
}

export class UpdateOrderDto {
  @IsArray()
  @Type(() => UpdateOrderItemDto)
  items: UpdateOrderItemDto[];
}
