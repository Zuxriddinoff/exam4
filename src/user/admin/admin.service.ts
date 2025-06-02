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
import config from 'src/config';
import { Op } from 'sequelize';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(@InjectModel(User) private model: typeof User) {}

  async onModuleInit() {
    try {
      const isSuperAdmin = await this.model.findOne({
        where: { role: Roles.SUPERADMIN },
      });
      if (!isSuperAdmin) {
        const hashedPassword = await encrypt(config.ADMIN_PASSWORD);
        await this.model.create({
          firstName: config.ADMIN_FIRST_NAME,
          lastName: config.ADMIN_LAST_NAME,
          age: config.ADMIN_AGE,
          gender: config.ADMIN_GENDER,
          email: config.ADMIN_EMAIL,
          hashedPassword,
          phoneNumber: config.ADMIN_PHONE_NUMBER,
          address: config.ADMIN_ADDRESS,
          role: Roles.SUPERADMIN,
        });
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const { email, password, phoneNumber } = createUserDto;
    const existsEmail = await this.model.findOne({ where: { email } });
    if (existsEmail) {
      return `email or phone number already exists`;
    }
    const existsPhoneNumber = await this.model.findOne({
      where: { phoneNumber },
    });
    if (existsPhoneNumber) {
      return `email or phone number already exists`;
    }
    const hashedPassword = await encrypt(password);
    const admin = this.model.create({
      ...createUserDto,
      hashedPassword,
      role: Roles.ADMIN,
    });
    return {
      statusCode: 201,
      message: 'succes',
      data: admin,
    };
  }

  async findAll() {
    const admin = await this.model.findAll({
      where: {
        role: {
          [Op.in]: [Roles.ADMIN, Roles.SUPERADMIN],
        },
      },
    });
    return {
      statusCode: 200,
      message: 'succes',
      data: admin,
    };
  }

  async findOne(id: number) {
    const admin = await this.model.findOne({ where: { id } });
    if (!admin) {
      return `admin not found by id => ${id}`;
    }
    return {
      statusCode: 200,
      message: 'succes',
      data: admin,
    };
  }

  async updateAdmin(id: number, updateUserDto: UpdateUserDto) {
    try {
      const admin = await this.model.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      if (!admin) {
        return `admin not found by id ${id}`;
      }
      return {
        statusCode: 200,
        message: 'succes',
        data: admin[1][0],
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    const admin = await this.model.findOne({ where: { id } });
    console.log('admin', admin);
    console.log('admin role', admin?.role);
    if (admin?.dataValues.role === Roles.SUPERADMIN) {
      return `You're stupid, you can't delete super admin`;
    } else {
      await this.model.destroy({ where: { id } });
      return { data: {} };
    }
  }
}
