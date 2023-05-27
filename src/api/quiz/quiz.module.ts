// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import AuthModule from 'src/api/auth/auth.module'
import BookModule from 'src/api/book/book.module'
import QuizService from './service/quiz.service'
import QuizRepository from './repository/quiz.repository'
import QuizController from './controller/quiz.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import Quiz from './domain/quiz.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    TypeOrmExModule.forCustomRepository([QuizRepository]),
    AuthModule,
    BookModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export default class QuizModule {}
