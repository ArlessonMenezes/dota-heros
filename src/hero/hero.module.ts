import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './model/hero.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hero])
  ],
  providers: [HeroService],
  controllers: [HeroController]
})
export class HeroModule {}
