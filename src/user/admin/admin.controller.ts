import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UpdateUserDto } from '../common/dto/update-user.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(createUserDto:CreateUserDto){
    return this.adminService.createAdmin(createUserDto)
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
    return this.adminService.updateAdmin(+id, updateUserDto)
  }
}
