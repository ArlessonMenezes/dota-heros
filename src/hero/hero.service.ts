import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { Hero } from './model/hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ){}

  async createHero(createHero: CreateHeroDto) {
    const hero = await this.findHeroByName(createHero.name);

    if (hero) {
      throw new NotFoundException('hero alerady exists in database.');
    }

    const createdHero = this.heroRepository.create(createHero);
    await this.heroRepository.save(createdHero);
  };

  async getHeros() {
    return this.heroRepository.find({
      select: [
        'idHero',
        'name',
        'breed',
        'description',
        'typeHero',
      ],
    })
  }

  async findHeroById(idHero: number) {
    return this.heroRepository.findOne({
      where: { idHero },
    });
  };

  async findHeroByName(nameHero: string) {
    return this.heroRepository.findOne({
      where: { name: nameHero },
    });
  };
}
