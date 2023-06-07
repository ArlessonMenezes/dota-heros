import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUSerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmedPassword: string;
}