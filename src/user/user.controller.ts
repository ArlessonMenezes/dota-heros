import { Body, Controller, Post, Get } from '@nestjs/common';
import { Roles } from 'src/utils/decoratos/role.decorator';
import { CreateUSerDto } from './dtos/create-user.dto';
import { TypeUserEnum } from './enum/type-user.enum';
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

  @Roles(TypeUserEnum.ADMIN)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
