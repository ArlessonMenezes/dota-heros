import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/role.guard';
import { HeroModule } from './hero/hero.module';
import { Hero } from './hero/model/hero.entity';
import { Skill } from './skill/model/sikill.entity';
import { SkillModule } from './skill/skill.module';
import { User } from './user/model/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_LOCALHOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Hero, Skill],
      synchronize: true,
      autoLoadEntities: true
    }as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    JwtModule,
    HeroModule,
    SkillModule,
  ],
  controllers: [],
  providers: [ 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
