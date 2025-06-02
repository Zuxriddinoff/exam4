import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Payment_type, Status } from 'src/enum';

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsEnum(Payment_type)
    payment_type: Payment_type;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @IsNotEmpty()
    @IsNumber()
    order_id: number;
}
