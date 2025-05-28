import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrdersItemDto {
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'count kamida 1 bolishi kerak' })
    count: number;
}