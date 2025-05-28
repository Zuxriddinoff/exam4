import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRaitingDto } from './create-product_raiting.dto';

export class UpdateProductRaitingDto extends PartialType(CreateProductRaitingDto) {}
