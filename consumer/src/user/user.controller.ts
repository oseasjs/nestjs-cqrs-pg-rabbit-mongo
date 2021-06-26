import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { vars } from '../config/vars';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(vars.createUserMessagePattern)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
