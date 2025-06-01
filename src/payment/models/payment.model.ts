// ---------------------------------------- Ohirgacha emas, HATOLARI KO'P ----------------------------------------
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { Order } from '../../orders/models/order.model';
import { Payment_type, Status } from '../../enum/index';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Table({ tableName: 'payment', timestamps: false })
export class Payment extends Model<Payment, CreatePaymentDto> {
    @Column({
        type: DataType.ENUM(...Object.values(Payment_type)),
        allowNull: false,
    })
    payment_type: Payment_type;

    @Column({
        type: DataType.ENUM(...Object.values(Status)),
        allowNull: false,
        defaultValue: Status.UNPAID,
    })
    status: Status;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    order_id: number;
}
// ---------------------------------------- Ohirgacha emas, HATOLARI KO'P ----------------------------------------
