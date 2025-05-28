import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { encrypt } from 'utils/bcrypt-decrypt';
import { Roles } from 'src/enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private model: typeof User) {}

  async createSuperAdmin(createUserDto: CreateUserDto): Promise<object> {
    try {
      const { email, phoneNumber, password } = createUserDto;
      const existsEmail = await this.model.findOne({ where: { email } });
      if (existsEmail) {
        throw new ConflictException(`Email already exists => ${email}`);
      }
      const existsPhoneNumber = await this.model.findOne({
        where: { phoneNumber },
      });
      if (existsPhoneNumber) {
        throw new ConflictException(
          `phone Number already exists => ${phoneNumber}`,
        );
      }

      const hashedPassword = await encrypt(password);
      const superadmin = await this.model.create({
        ...createUserDto,
        hashedPassword,
        role: Roles.SUPERADMIN,
      });

      return {
        statusCode: 201,
        message: 'succes',
        data: superadmin,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
