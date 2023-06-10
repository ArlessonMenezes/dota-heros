import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

import { LoginPayloadDto } from './dtos/login-payload.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(
      loginDto.email
    )

    const passwordMatch = await compare(loginDto.password, user?.password || '');
console.log(passwordMatch);
    if (!user || !passwordMatch) {
      throw new UnauthorizedException('email or password is invalid');
    };

    return {
      access_token: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: user.username,
    };
  }
}
