import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './category/category.module';
import { ProductRaitingsModule } from './product_raitings/product_raitings.module';
import { ProductRaiting } from './product_raitings/models/product_raiting.model';
import { Category } from './category/models/category.model';
import { User } from './user/common/models/user.model';
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
      models: [User, Category, ProductRaiting],
    }),
    UserModule,
    CategoryModule,
    ProductRaitingsModule,
  ],
})
export class AppModule {}
