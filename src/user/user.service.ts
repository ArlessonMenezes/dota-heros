import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUSerDto } from './dtos/create-user.dto';
import { TypeUserEnum } from './enum/type-user.enum';
import { User } from './model/user.entity';

@Injectable()
export class UserService {
  constructor(
  @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async createUser(createUserDto: CreateUSerDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException('user already exists in database.');
    }

    if (createUserDto.password !== createUserDto.confirmedPassword) {
      throw new BadRequestException('passwords do not match.');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      typeUser: TypeUserEnum.USER,
      password: hashedPassword,
    })

      await this.userRepository.save(newUser);
    }

    async getUsers() {
      return this.userRepository.find({
        select: ['idUser', 'username', 'email']
      });
    }

    async getOneUser(idUser: number) {
      const user = await this.findUserById(idUser);
      
      if (!user) {
        throw new NotFoundException('user not found.');
      }
    }

    async findUserByEmail(email: string) {
      return this.userRepository.findOne({
        where: { email },
      });
    }

    async findUserById(idUser: number) {
      return this.userRepository.findOne({
        where: { idUser },
      });
    }
}
