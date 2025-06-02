import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Roles } from 'src/enum';
<<<<<<< HEAD
import {Order} from 'src/orders/models/orders.model';
=======
import { ProductRaiting } from 'src/product_raitings/models/product_raiting.model';

>>>>>>> azizbek
@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.ENUM('male', 'famale'),
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashedPassword: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.ENUM(
      Roles.SUPERADMIN,
      Roles.ADMIN,
      Roles.CUSTOMER,
      Roles.SELLER,
    ),
    allowNull: false,
  })
  role: string;

<<<<<<< HEAD
  @HasMany(() => Order)
  orders: Order[];
}
=======
  @HasMany(() => ProductRaiting)
  productRaiting: ProductRaiting
}
>>>>>>> azizbek
