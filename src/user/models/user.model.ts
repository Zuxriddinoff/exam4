import { MethodNotAllowedException } from "@nestjs/common";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:"users"})
export class User extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    firstName:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    lastName:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    age:number

    @Column({
        type:DataType.ENUM('male', 'famale'),
        allowNull:false
    })
    gender:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    email:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    phoneNumber:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    address:string

    @Column({
        type:DataType.ENUM('superAdmin', 'admin', 'seller', 'customer'),
        allowNull:false
    })
    role:string   
}