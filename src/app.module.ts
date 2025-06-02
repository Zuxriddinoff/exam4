import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/common/models/user.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';
import { ProductRaitingsModule } from './product_raitings/product_raitings.module';
import { UserModule } from './user/common/user.module';
import { Order } from './orders/models/orders.model';
import { OrdersModule } from './orders/orders.module';
import { ProductRaiting } from './product_raitings/models/product_raiting.model';
import { OrderItem } from './orders-item/models/orders-item.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('PG_HOST'),
        port: config.get<number>('PG_PORT'),
        username: config.get('PG_USER'),
        password: config.get('PG_PASS'),
        database: config.get('PG_DB'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
        models: [User, Product, Order, ProductRaiting, OrderItem,],
      }),
    }),
    JwtModule.register({
      global:true
    }),
    CategoryModule,
    ProductRaitingsModule,
    UserModule,
    ProductModule,
    MailModule,
    OrdersModule
  ],
})
export class AppModule {}