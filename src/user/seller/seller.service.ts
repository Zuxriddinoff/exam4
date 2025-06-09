import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../common/models/user.model';
import { Roles } from 'src/enum';
import { encrypt } from 'src/utils/bcrypt-decrypt';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class SellerService {
  constructor(@InjectModel(User) private model: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<object> {
    try {
      const { email, password, phoneNumber } = createUserDto;
      const existsEmail = await this.model.findOne({ where: { email } });
      if (existsEmail) {
        throw new ConflictException(`email or phone number already exists`);
      }
      const existsPhoneNumber = await this.model.findOne({
        where: { phoneNumber },
      });
      if (existsPhoneNumber) {
        throw new ConflictException(`email or phone number already exists`);
      }
      const hashedPassword = await encrypt(password);
      const seller = await this.model.create({
        ...createUserDto,
        hashedPassword,
        role: Roles.SELLER,
      });

      return {
        statusCode: 201,
        message: 'success',
        data: seller,
      };
    } catch (error) {
      return catchError(error)
    }
  }

  async getAll() {
    try {
      const sellers = await this.model.findAll({
        where: { role: Roles.SELLER },
      });
      return {
        statusCode: 200,
        message: 'success',
        data: sellers,
      };
    } catch (error) {
        return catchError(error)
    }
  }

  async getOne(id: number) {
    try {
      const seller = await this.model.findOne({ where: { id } });
      if (!seller) {
        throw new ConflictException(`seller not found by id ${id}`);
      }
      return {
        statusCode: 200,
        message: 'success',
        data: seller,
      };
    } catch (error) {
        return catchError(error)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    try {
      const seller = await this.model.update(updateUserDto, {
        where: { id },
        returning: true,
      });

      if (!seller) {
        throw new ConflictException(`seller not found by id ${id}`);
      }

      return {
        statusCode: 200,
        message: 'succes',
        data: seller[1][0],
      };
    } catch (error) {
        return catchError(error)
    }
  }

  async delete(id: number) {
    try {
      const admin = await this.model.findOne({ where: { id } });
    if (admin?.dataValues.role === Roles.SUPERADMIN) {
      throw new ConflictException(`You're stupid, you can't delete super admin`);
    } else {
      await this.model.destroy({ where: { id } });
      return { data: {} };
    }
    } catch (error) {
     return catchError(error) 
    }
  }
}
