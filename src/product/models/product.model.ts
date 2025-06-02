import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { OrdersItem } from "src/orders-item/models/orders-item.model";
import { ProductRaiting } from "src/product_raitings/models/product_raiting.model";

@Table({tableName:'product'})
export class Product extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name:string;

    @Column({
        type:DataType.DECIMAL,
        allowNull:false
    })
    price:number;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    stock:number;

    @Column({
        type:DataType.STRING
    })
    image:string

    @Column({
        type:DataType.STRING,
    })
    description:string;

    @HasMany(() => OrderItem)
    order_items: OrderItem[];
}