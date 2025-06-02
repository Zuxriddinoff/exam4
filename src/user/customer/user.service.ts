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
export class UserService {
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
      const customer = await this.model.create({
        ...createUserDto,
        hashedPassword,
        role: Roles.CUSTOMER,
      });
      console.log(customer);

      return {
        statusCode: 201,
        message: 'success',
        data: customer,
      };
    } catch (error) {
      return catchError(error)
    }
  }

  async getAll() {
    try {
      const customers = await this.model.findAll({where:{role:Roles.CUSTOMER}});
      return {
        statusCode: 200,
        message: 'success',
        data: customers,
      };
    } catch (error) {
      return catchError(error)
    }
  }

  async getOne(id: number) {
    try {
      const customer = await this.model.findOne({ where: { id } });
      if (!customer) {
        throw new ConflictException(`customer not found by id ${id}`);
      }
      return {
        statusCode: 200,
        message: 'success',
        data: customer,
      };
    } catch (error) {
      return catchError(error)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    try {
      const customer = await this.model.update(updateUserDto, {
        where: { id },
        returning: true,
      });

      if(!customer){
        throw new ConflictException(`customer not found by id ${id}`)
      }

      return {
        statusCode: 200,
        message: 'succes',
        data: customer[1][0]
      };
    } catch (error) {
        return catchError(error)
    }
  }

  async delete(id:number){
    try {
      const admin = await this.model.findOne({where:{id}})
    if(admin?.dataValues.role === Roles.SUPERADMIN){
      throw new ConflictException(`You're stupid, you can't delete super admin`)
    }else{
      await this.model.destroy({where:{id}})
      return {data:{}}
    }
    } catch (error) {
      return catchError(error) 
    }
  }
}

