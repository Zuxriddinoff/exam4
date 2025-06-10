import { Column, DataType, Model, Table }from "sequelize-typescript";

@Table({ tableName: 'Category' })
export class Category extends Model {
    @Column({ 
        type: DataType.STRING,
        allowNull: false,
        unique: true 
    })
    name: string;
    @Column({ 
        type: DataType.STRING, 
        allowNull: false  
    })
    dectcription: string;
}

