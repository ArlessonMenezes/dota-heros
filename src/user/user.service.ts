import { BadRequestException, Injectable } from '@nestjs/common';
import { BadGatewayException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { HeroService } from 'src/hero/hero.service';
import { Repository } from 'typeorm';

import { CreateUSerDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { TypeUserEnum } from './enum/type-user.enum';
import { User } from './model/user.entity';

@Injectable()
export class UserService {
  constructor(
  @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    private readonly heroService: HeroService, 
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
        select: ['idUser', 'username', 'email'],
        relations: { heros: true },
      });
    }

    async getProfile(idUser: number) {
      const user = await this.findUserById(idUser);
      
      if (!user) {
        throw new NotFoundException('user not found.');
      }

      const { 
        password,
        createdAt,
        updatedAt,
        typeUser,
        ...userReturn 
      } = user;

      return userReturn;
    }

    async findUserByEmail(email: string) {
      return this.userRepository.findOne({
        where: { email },
      });
    }

    async findUserById(idUser: number) {
      return this.userRepository.findOne({
        where: { idUser },
        relations: { heros: true },
      });
    }

    async updateUser(idUser: number, updateUserDto: UpdateUserDto) {
      const user = await this.findUserById(idUser);
      
      if (!user) {
        throw new NotFoundException('user not found.');
      };

      await this.userRepository.update(user.idUser, {
        ...updateUserDto,
      });

      return { message: 'user updated with success' };
    }

    async addHeroToUserList(idUser: number, nameHero: string) {
      const user = await this.findUserById(idUser);
      
      if (!user) {
        throw new NotFoundException('user not found.');
      };
      
      const hero = await this.heroService.findHeroByName(nameHero);

      if (!hero) {
        throw new NotFoundException('hero not found.');
      }

      const heroFilter = user.heros.find(
        (h) => h.name === hero.name
      )

      if (heroFilter) {
        throw new BadRequestException('hero already save in your list')
      }

      user.heros.push(hero);

      await this.userRepository.save(user);

      const msg = {
        message: `the hero ${hero.name} was included in your list`
      };

      return msg;
    }

    async removeHeroToUserList(idUser: number, nameHero: string) {
      const user = await this.findUserById(idUser);

      if (!user) {
        throw new NotFoundException('user not found.');
      };

      const heroFound = await this.heroService.findHeroByName(nameHero);

      if (!heroFound) {
        throw new NotFoundException('hero not found.');
      }

      const heroIndex = user.heros.findIndex(
        (h) => h.name === heroFound.name
      );

      if (heroIndex < 0) {
        throw new BadRequestException('hero not found in your list')
      }
        
      user.heros.splice(heroIndex, 1);

      await this.userRepository.save(user);

      const msg = {
        message: `the hero ${heroFound.name} was removed in your list`
      };

      return msg; 
    }

    async findHeroInUserList(idUser: number, nameHero: string) {
      const user = await this.findUserById(idUser);

      if (!user) {
        throw new NotFoundException('user not found.');
      };

      const findHero = user.heros?.map(async (h) => h)
      .find(async (hero) => (await hero).name === nameHero);
            
      if (!findHero) {
        throw new NotFoundException('hero not found in your list');
      }  

      const returnHero = {
        name: (await findHero).name,
        breed: (await findHero).breed,
        typeHero: (await findHero).typeHero,
        description: (await findHero).description,
      }

      return returnHero;
    };

    async updatePassword(idUser: number, updatePassword: UpdatePasswordDto) {
      const user = await this.findUserById(idUser);

      if (!user) {
        throw new NotFoundException('user not found');
      };

      const comparePassword = await compare(
        updatePassword.currentPassword,
        user.password,
      );

      if (!comparePassword) {
        throw new BadRequestException('password is invalid');
      };

      if (updatePassword.newPassword !== updatePassword.confirmedNewPassword) {
        throw new BadRequestException('passwords do not match');
      };

      const newPasswordEqualOldPassword = await compare(
        updatePassword.newPassword,
        user.password,
      );

      if (newPasswordEqualOldPassword) {
        throw new BadRequestException('current password cannot equal old password')
      }

      const hashedPassword = await hash(updatePassword.newPassword, 10);


      await this.userRepository.update(user.idUser, {
        password: hashedPassword,
      })
    }
}


