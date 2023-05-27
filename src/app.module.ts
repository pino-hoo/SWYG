// ** Nest Imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import TypeOrmExModule from './common/repository/typeOrmEx.module'
import LoggerModule from './utils/logger/logger.module'
import LoggerMiddleware from './utils/logger/logger.middleware'
import ApiModule from './api/api.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/api/**/*.entity.{js, ts}'],
      synchronize: true,
      logging: true,
      logger: 'file',
    }),
    TypeOrmExModule,
    LoggerModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
