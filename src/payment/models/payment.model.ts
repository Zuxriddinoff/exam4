import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { Payment_type, Status } from '../../enum/index';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Order } from 'src/orders/models/orders.model';

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

