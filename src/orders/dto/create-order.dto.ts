import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    seller_id: number;

    @IsNumber()
    @IsNotEmpty()
    client_id: number;

    @IsString()
    @IsNotEmpty()
    delivery_address: string;

    @IsNumber()
    @IsNotEmpty()
    total_price: number;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone_number: string;

    @IsNumber()
    @IsNotEmpty()
    delivery_price: number;
}