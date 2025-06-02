import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../common/models/user.model';
import { SignInUser } from './auth.service';
import { Token } from 'src/utils/generate-token';
import { SignInUserController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), MailModule],
  controllers: [SignInUserController],
  providers: [SignInUser, Token],
})
export class SignInUserModule {}
