import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroModule } from 'src/hero/hero.module';
import { Skill } from './model/sikill.entity';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill]),
    HeroModule,
  ],
  controllers: [SkillController],
  providers: [SkillService]
})
export class SkillModule {}