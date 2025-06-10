import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    client_id: number;

    @IsString()
    @IsNotEmpty()
    delivery_address: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone_number: string;

}