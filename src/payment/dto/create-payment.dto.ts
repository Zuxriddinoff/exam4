import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Status } from "src/enum";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    payment_type: string

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status

    @IsNotEmpty()
    @IsNumber()
    order_id: number

}
