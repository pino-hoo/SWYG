import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import AuthModule from 'src/api/auth/auth.module'
import { BookModule } from 'src/api/book/book.module'
import { QuizService } from './application/quiz.service'
import { QuizRepository } from './infrastructure/quiz.repository'
import { QuizController } from './ui/quiz.controller'

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository]), AuthModule, BookModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
