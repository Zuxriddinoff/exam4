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
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Category } from './category/models/category.model';
import { Payment } from './payment/models/payment.model';
import { Basket } from './basket/models/basket.model';
import { BasketModule } from './basket/basket.module';
import { PaymentModule } from './payment/payment.module';
import { OrdersItemModule } from './orders-item/orders-item.module';
import { FileModule } from './file/file.module';

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
        models: [User, Product, Order, ProductRaiting, OrderItem, Category, Payment, Basket],
      }),
    }),
    JwtModule.register({
      global:true
    }),
    CacheModule.register({
      isGlobal:true
    }),
    CategoryModule,
    ProductRaitingsModule,
    UserModule,
    ProductModule,
    MailModule,
    OrdersModule,
    BasketModule,
    PaymentModule,
    OrdersItemModule,
    FileModule
    ],
  providers:[{
    provide:APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }]
})
export class AppModule {}