// ** Nest Imports
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import AuthModule from './api/auth/auth.module'
import BookModule from './api/book/book.module'
import CommentModule from './api/comment/comment.module'
import LikeBookModule from './api/likeBook/likeBook.module'
import MateModule from './api/mate/mate.module'
import PointModule from './api/point/point.module'
import { QuizModule } from './api/quiz/quiz.module'
import { ReviewModule } from './api/review/review.module'
import { ReviewLikeModule } from './api/reviewLike/reviewLike.module'
import { UserBookModule } from './api/userBook/userBook.module'
import TypeOrmExModule from './common/repository/typeOrmEx.module'

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
    PointModule,
    QuizModule,
    ReviewModule,
    CommentModule,
    ReviewLikeModule,
    LikeBookModule,
    MateModule,
    AuthModule,
    UserBookModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
