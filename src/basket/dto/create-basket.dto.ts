import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBasketDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;
}
