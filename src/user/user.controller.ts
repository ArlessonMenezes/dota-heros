import { Body, Controller, Post, Get, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { idUser } from 'src/utils/decoratos/ise-user.decorator';
import { Roles } from 'src/utils/decoratos/role.decorator';
import { CreateUSerDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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

  // @Roles(TypeUserEnum.ADMIN)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Put('/:idUser')
  async updateUSer(
    @Param('idUser') idUser: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(idUser, updateUserDto);
  }

  @Post('/:idUser/add-hero')
  async addHeroToUserList(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Query('nameHero') nameHero: string,
  ) {
    return this.userService.addHeroToUserList(idUser, nameHero);
  };

  @Delete('/:idUser/remove-hero')
  async RemoveHeroToUserList(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Query('nameHero') nameHero: string,
    ) {
    return this.userService.removeHeroToUserList(idUser, nameHero);
  }
}
