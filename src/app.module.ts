import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { BasketModule } from './basket/basket.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/common/user.module';
import { User } from './user/common/models/user.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';

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

    BasketModule,
    PaymentModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule { }
