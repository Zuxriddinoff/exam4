import { Module } from '@nestjs/common';
import { UserService } from '../customer/user.service';
import { UserController } from '../customer/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AdminService } from '../admin/admin.service';
import { AminController } from '../admin/admin.controller';
import { SellerController } from '../seller/seller.controller';
import { SellerService } from '../seller/seller.service';
import { MailModule } from 'src/mail/mail.module';
import { SignInUserController } from '../auth/auth.controller';
import { SignInUser } from '../auth/auth.service';
import { Token } from 'src/utils/generate-token';

@Module({
  imports: [SequelizeModule.forFeature([User]), MailModule],
  controllers: [UserController, AminController, SellerController, SignInUserController],
  providers: [UserService, AdminService, SellerService, SignInUser, Token],
})
export class UserModule {}
