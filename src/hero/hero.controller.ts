import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { TypeUserEnum } from 'src/user/enum/type-user.enum';
import { Roles } from 'src/utils/decoratos/role.decorator';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { UpdateHeroDto } from './dtos/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(
    private readonly heroService: HeroService,
  ){}

  // @Roles(TypeUserEnum.ADMIN)
  @Post()
  async createHero(@Body() createHero: CreateHeroDto) {
    return this.heroService.createHero(createHero);
  }
  // @Roles(TypeUserEnum.ADMIN, TypeUserEnum.USER)
  @Get()
  async getHeros() {
    return this.heroService.getHeros();
  };

  @Get('/get-hero')
  async getHero(@Query('name') name: string) {
    return this.heroService.findHeroByName(name);
  }

  @Put('/:idHero')
  async updateHero(
    @Param('idHero', ParseIntPipe) idHero: number,
    @Body() updateHero: UpdateHeroDto,
  ) {
    return this.heroService.updateHero(idHero, updateHero);
  }
}
