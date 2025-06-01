import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { User } from 'src/user/common/models/user.model';
import { Product } from 'src/product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Basket, User, Product])],
  providers: [BasketService],
  controllers: [BasketController],
})
export class BasketModule { }
