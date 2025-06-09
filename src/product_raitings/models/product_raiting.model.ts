import {BelongsTo,Column,DataType,ForeignKey,Model,Table,} from 'sequelize-typescript';
import { Raiting } from 'src/enum';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/common/models/user.model';

@Table({ tableName: 'product_raitings' })
export class ProductRaiting extends Model {
  @Column({
    type: DataType.ENUM(
      Raiting.WORST,
      Raiting.BAD,
      Raiting.NORMAL,
      Raiting.GOOD,
      Raiting.VERY_GOOD,
    ),
    allowNull: false,
  })
  rayting: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;
}
