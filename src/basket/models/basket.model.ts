import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/common/models/user.model';
import { Product } from '../../product/models/product.model';

@Table({ tableName: 'basket', timestamps: false })
export class Basket extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    user_id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    product_id: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    total_price: number;
}