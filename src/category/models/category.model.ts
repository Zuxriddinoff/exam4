import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CategoryModule } from '../category.module';
import { Product } from 'src/product/models/product.model';

@Table({ tableName: 'Category' })
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dectcription: string;
  
  @HasMany(() => Product)
  product: Product
  
}

