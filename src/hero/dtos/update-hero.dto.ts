import { IsOptional, IsString } from 'class-validator';

import { TypeHeroEnum } from '../enum/type-hero.enum';

export class UpdateHeroDto {
  @IsString()
  @IsOptional()
  name?: string;
  
  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  typeHero?: TypeHeroEnum;
};