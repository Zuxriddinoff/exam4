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
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
