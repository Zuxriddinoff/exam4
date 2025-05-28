import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: 'basket' })
export class Basket extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    product_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    total_price: number;
}
