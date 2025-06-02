import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders/models/orders.model';
import { OrderItem } from './orders-item/models/orders-item.model';
import { OrdersModule } from './orders/orders.module';
import { OrdersItemModule } from './orders-item/orders-item.module';
import { BasketModule } from './basket/basket.module';
import { PaymentModule } from './payment/payment.module';
import { User } from './user/common/models/user.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';

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
        models: [User, Product],
      }),
    }),
    JwtModule.register({
      global:true
    }),
    UserModule,
    ProductModule,
    MailModule,
  ],
})
export class AppModule {}