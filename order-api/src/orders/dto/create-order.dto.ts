// src/orders/create-order.dto.ts
import { IsString, IsInt, IsNumber, IsEnum } from 'class-validator';
import { Transform, Type }                    from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  products: string;

  @Type(() => Number)
  @IsInt()
  quantity: number;

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsEnum(['pending','shipped','delivered','cancelled'])
  status: 'pending'|'shipped'|'delivered'|'cancelled';

  @Type(() => Number)
  @IsInt()
  userId: number;
}
