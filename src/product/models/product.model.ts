import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/category/models/category.model";
import { ProductRaiting } from "src/product_raitings/models/product_raiting.model";
import { User } from "src/user/common/models/user.model";

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

    @HasMany(() => ProductRaiting)
    rating: ProductRaiting[];

    @ForeignKey(() => Category)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    category_id:number

    @BelongsTo(() => Category, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    category: Category

    @ForeignKey(() => User)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    seller_id:number

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    seller: User

}