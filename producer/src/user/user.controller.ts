import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddUserStatusDto } from './dto/add-user-status.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Query('seed') seed: string, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(seed, createUserDto);
  }

  
  @Post(':id/status')
  addStatus(@Param('id') id: string, @Body() addUserStatusDto: AddUserStatusDto) {
    return this.userService.addStatus(+id, addUserStatusDto);
  }

}
