import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto:CreateUserDto){
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(){
    return this.userService.getAll()
  }

  @Get(":id")
  getOne(@Param(`id`) id:string){
    return this.userService.getOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  delete(@Param('id') id:string){
    return this.userService.delete(+id)
  }
}
