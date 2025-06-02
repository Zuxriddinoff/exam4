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
import { encrypt } from 'utils/bcrypt-decrypt';
import { Roles } from 'src/enum';

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
      console.log(seller);

      return {
        statusCode: 201,
        message: 'success',
        data: seller,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOne(id: number) {
    try {
      const seller = await this.model.findOne({ where: { id } });
      if (!seller) {
        return `seller not found by id ${id}`;
      }
      return {
        statusCode: 200,
        message: 'success',
        data: seller,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    const admin = await this.model.findOne({ where: { id } });
    if (admin?.dataValues.role === Roles.SUPERADMIN) {
      return `You're stupid, you can't delete super admin`;
    } else {
      await this.model.destroy({ where: { id } });
      return { data: {} };
    }
  }
}
