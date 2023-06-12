import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from './model/sikill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ){}

  async createSkill(createSkill: CreateSkillDto) {
    const skill = await this.skillRepository.findOne({
      where: { skillOne: createSkill.skillOne },
    })

    if (skill) {
      throw new BadRequestException('skill already exists in database');
    }

    const newSkill = this.skillRepository.create({
      ...createSkill,
    })

    await this.skillRepository.save(newSkill);
  }

  async findSkillById(idSkill: number) {
    return this.skillRepository.findOne({
      where: { idSkill },
    })
  }

  async getSkills() {
    return this.skillRepository.find({
      select: [
        'idSkill',
        'skillOne',
        'skillTwo',
        'skillThree',
        'ultimate',
      ],
    })
  }
}
