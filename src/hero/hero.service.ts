import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillService } from 'src/skill/skill.service';
import { Repository } from 'typeorm';

import { CreateHeroDto } from './dtos/create-hero.dto';
import { UpdateHeroDto } from './dtos/update-hero.dto';
import { Hero } from './model/hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    private readonly skilService: SkillService,
  ){}

  async createHero(createHero: CreateHeroDto, idSkill: number) {
    const hero = await this.findHeroByName(createHero.name);

    if (hero) {
      throw new NotFoundException('hero alerady exists in database.');
    }

    const skill = await this.skilService.findSkillById(
      idSkill,
    );

    if (!skill) {
      throw new NotFoundException('skill not found');
    }

    const createdHero = this.heroRepository.create({
      ...createHero,
      skill,
    });

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
      relations: { skill: true },
    })
  }

  async updateHero(idHero: number, updateHero: UpdateHeroDto) {
    const hero = await this.findHeroById(idHero);

    if (!hero) {
      throw new NotFoundException('hero not found');
    }

    await this.heroRepository.update(hero.idHero, {
      ...updateHero,
    });

    return { message: `hero ${hero.name} updated with success` };
  }

  async findHeroById(idHero: number) {
    return this.heroRepository.findOne({
      where: { idHero },
    });
  };

  async findHeroByName(nameHero: string) {
    return this.heroRepository.findOne({
      where: { name: nameHero },
      select: [
        'idHero',
        'name',
        'breed',
        'description',
        'typeHero',
      ],
      relations: { skill: true },
    });
  };
}
