import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './models/basket.model';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

@Module({
  imports: [SequelizeModule.forFeature([Basket])],
  providers: [BasketService],
  controllers: [BasketController],
})
export class BasketModule { }
