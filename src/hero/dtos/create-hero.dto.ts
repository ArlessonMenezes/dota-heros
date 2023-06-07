import { IsString, IsNotEmpty } from "class-validator";
import { TypeHeroEnum } from "../enum/type-hero.enum";

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  typeHero: TypeHeroEnum;
}