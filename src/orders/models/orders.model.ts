import { Column, Table, Model, DataType } from "sequelize-typescript";
import { Status } from "src/enum";

@Table({
    tableName: "orders"
})

export class Order extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    seller_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    client_id: number;

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
        type: DataType.ENUM(Status.ACCEPTED, Status.PROCESS, Status.DELIVERY, Status.CLOSED),
        allowNull: false,
        defaultValue: Status.ACCEPTED
    })
    status: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    phone_number: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    delivery_price: number
}