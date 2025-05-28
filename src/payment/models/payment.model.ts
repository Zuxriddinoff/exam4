import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment_type, Status } from 'src/enum';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, CreatePaymentDto> {
    @Column({
        type: DataType.ENUM(Payment_type.CARD, Payment_type.CASH),
        allowNull: false
    })
    payment_type: string;

    @Column({
        type: DataType.ENUM(Status.PAID, Status.UNPAID),
        allowNull: false,
        defaultValue: Status.UNPAID
    })
    status: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order_id: number;

}
