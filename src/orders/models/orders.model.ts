import { Column, Table, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Status } from "src/enum";
import { OrderItem } from "src/orders-item/models/orders-item.model";
import { User } from "src/user/common/models/user.model";

@Table({
    tableName: "orders"
})

export class Order extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    client_id: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    delivery_address: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    total_price: number;

    @Column({
        type: DataType.ENUM(Status.PAID, Status.UNPAID),
        allowNull: false,
        defaultValue: Status.UNPAID
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    delivery_price: number

    @HasMany(() => OrderItem)
    order_items: OrderItem[];
}