import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUSerDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @Post()
  async createUser(@Body() createUser: CreateUSerDto) {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
