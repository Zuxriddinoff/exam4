import { Column, DataType, Model, Table }from "sequelize-typescript";

@Table({ tableName: 'product_raitings' })
export class ProductRaiting extends Model {
    @Column({ 
        type: DataType.DECIMAL,
        allowNull: false  
    })
    rayting: number;

    @Column({ 
        type: DataType.INTEGER,
        allowNull: false  
    })
    client_id: number;

    @Column({ 
        type: DataType.INTEGER,
        allowNull: false  
    })
    product_id: number;
    
    @Column({ 
        type: DataType.STRING,
        allowNull: false  
    })
    comment: string;
}
