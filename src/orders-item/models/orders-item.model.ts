import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({
    tableName: 'order-items'
})

export class OrderItem extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    product_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    order_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    total_price: number
}