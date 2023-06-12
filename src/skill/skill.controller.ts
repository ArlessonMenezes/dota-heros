import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(
    private readonly skilService: SkillService,
  ){}

  @Post()
  async createSkill(@Body() createSkill: CreateSkillDto) {
    return this.skilService.createSkill(createSkill);
  }

  @Get()
  async getSkills() {
    return this.skilService.getSkills();
  }
}
