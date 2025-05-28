import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private model: typeof User
  ){}

  async createSuperAdmin(createUserDto: CreateUserDto){
    try {
      const { email, phoneNumber, password } = createUserDto
      const existsEmail = await this.model.findOne({where:{email}})
      if(!existsEmail){
        throw new ConflictException(`Email already exists => ${email}`)
      }
      const existsPhoneNumber = await this.model.findOne({where:{phoneNumber}})
      if(!existsPhoneNumber){
        throw new ConflictException(`phone Number already exists => ${phoneNumber}`)
      }
      
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
