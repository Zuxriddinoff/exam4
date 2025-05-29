import { Module } from '@nestjs/common';
import { UserService } from '../customer/user.service';
import { UserController } from '../customer/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AdminService } from '../admin/admin.service';
import { AminController } from '../admin/admin.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController, AminController],
  providers: [UserService, AdminService],
})
export class UserModule {}
