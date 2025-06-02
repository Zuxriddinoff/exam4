import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders/models/orders.model';
import { OrderItem } from './orders-item/models/orders-item.model';
import { OrdersModule } from './orders/orders.module';
import { OrdersItemModule } from './orders-item/orders-item.module';
import { User } from './user/common/models/user.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { UserModule } from './user/common/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      port: Number(process.env.PG_PORT),
      password: String(process.env.PG_PASS),
      database: process.env.PG_DB,
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      models: [User, Product, Order, OrderItem],
    }),
    UserModule,
    ProductModule,
    OrdersModule,
    OrdersItemModule
  ],
})
export class AppModule {}