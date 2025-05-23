import { IsString, IsInt, IsNumber, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()             products: string;
  @IsInt()                quantity: number;
  @IsNumber()             total: number;
  @IsDateString()         date: string;    // ISO date string
  @IsString()             status: string;
  @IsInt()                userId: number;
}
