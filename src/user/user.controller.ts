import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { idUser } from 'src/utils/decoratos/user.decorator';

import { CreateUSerDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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

  @Get('/:idUser')
  async getProfile(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.getProfile(idUser);
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

  @Get('/:idUser/filter-hero')
  async filterHero(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Query('name') nameHero: string,
  ) {
    return this.userService.findHeroInUserList(idUser, nameHero);
  }

  @Patch('/:idUser/update-password')
  async updatePassword(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(idUser, updatePasswordDto);
  }
}
