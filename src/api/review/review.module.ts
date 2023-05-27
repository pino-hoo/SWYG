import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import BookModule from 'src/api/book/book.module'
import { ReviewService } from './application/review.service'
import { ReviewRepository } from './infrastructure/review.repository'
import { ReviewController } from './ui/review.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository]), BookModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
