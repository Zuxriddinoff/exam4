import { Module } from '@nestjs/common';
import { ProductRaitingsService } from './product_raitings.service';
import { ProductRaitingsController } from './product_raitings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductRaiting } from './models/product_raiting.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductRaiting])],
  controllers: [ProductRaitingsController],
  providers: [ProductRaitingsService],
})
export class ProductRaitingsModule {}
