import { Body, Controller, Post } from '@nestjs/common';
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
}
