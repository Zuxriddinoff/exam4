import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Order } from "src/orders/models/orders.model";
import { Product } from "src/product/models/product.model";

@Table({
    tableName: 'order-items'
})

export class OrderItem extends Model {
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    product_id: number;

    @BelongsTo(() => Product)
    product: Product;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    order_id: number;

    @BelongsTo(() => Order)
    order: Order;

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