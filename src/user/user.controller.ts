import { CreateUserDto } from './interfaces/createUser.dto';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return {
      ...createUser,
      password: undefined,
    };
  }
}
