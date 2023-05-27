import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewModule } from 'src/api/review/review.module'
import { CommentService } from './application/comment.service'
import { CommentRepository } from './infrastructure/comment.repository'
import { CommentController } from './ui/comment.controller'

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), ReviewModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
