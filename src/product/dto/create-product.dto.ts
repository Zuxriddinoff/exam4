import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsPositive,
    IsInt,
    IsUrl,
    MaxLength,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Type(() => Number)
    price: number;
  
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    stock: number;
  
    @IsOptional()
    @IsString()
    @IsUrl()
    image?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    seller_id: number

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    category_id: number
  }
  