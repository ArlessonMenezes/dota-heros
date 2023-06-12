import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  skillOne: string;

  @IsString()
  @IsNotEmpty()
  skillTwo: string;

  @IsString()
  @IsNotEmpty()
  skillThree: string;

  @IsString()
  @IsNotEmpty()
  ultimate: string;
}