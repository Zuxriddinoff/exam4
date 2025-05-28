import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    payment_type: string

    @IsNotEmpty()
    @IsString()
    status: string

    @IsNotEmpty()
    @IsNumber()
    order_id: number

}
