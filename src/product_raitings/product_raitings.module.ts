import { Module } from '@nestjs/common';
import { ProductRaitingsService } from './product_raitings.service';
import { ProductRaitingsController } from './product_raitings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductRaiting } from './models/product_raiting.model';
import { User } from 'src/user/common/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductRaiting, User])],
  controllers: [ProductRaitingsController],
  providers: [ProductRaitingsService],
})
export class ProductRaitingsModule {}
