import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './model/hero.entity';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hero]),
    SkillModule,
  ],
  providers: [HeroService],
  controllers: [HeroController],
  exports: [HeroService],
})
export class HeroModule {}
