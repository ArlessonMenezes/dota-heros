import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/model/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { HeroModule } from './hero/hero.module';
import { Hero } from './hero/model/hero.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_LOCALHOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Hero],
      synchronize: true,
      autoLoadEntities: true
    }as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    JwtModule,
    HeroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
