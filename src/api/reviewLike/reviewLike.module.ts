import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ReviewModule from 'src/api/review/review.module'
import { ReviewLikeService } from './application/reviwLike.service'
import { ReviewLikeRepository } from './infrastructure/reviewLike.repository'
import { ReviewLikeController } from './ui/reviewLike.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewLikeRepository]), ReviewModule],
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService],
})
export class ReviewLikeModule {}
