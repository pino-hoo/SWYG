// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import ReviewModule from 'src/api/review/review.module'
import CommentService from './service/comment.service'
import CommentRepository from './repository/comment.repository'
import CommentController from './controller/comment.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import Comment from './domain/comment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmExModule.forCustomRepository([CommentRepository]),
    ReviewModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export default class CommentModule {}
