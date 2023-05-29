// ** Nest Imports
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Passport Imports
import JwtStrategy from './passport/auth.jwt.strategy'
import KakaoStrategy from './passport/auth.kakao.strategy'
import NaverStrategy from './passport/auth.naver.strategy'
import { PassportModule } from '@nestjs/passport'
import LocalStrategy from './passport/auth.local.strategy'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'

// ** Custom Module Imports
import AuthController from 'src/api/auth/controller/auth.controller'
import UserRepository from 'src/api/auth/repository/user.repository'
import MateModule from 'src/api/mate/mate.module'
import { male } from 'src/config/env/node'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'
import UserService from 'src/api/auth/service/user.service'
import AuthService from './service/auth.service'

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: male.MALE_HOST,
        port: male.MALE_PORT,
        auth: {
          user: male.MALE_ID,
          pass: male.GOOGLE_KEY,
        },
        secure: true,
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
    MateModule,
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    KakaoStrategy,
    NaverStrategy,
  ],
})
export default class AuthModule {}
