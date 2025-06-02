import { Column, DataType, Model, Table } from "sequelize-typescript";

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

    
}