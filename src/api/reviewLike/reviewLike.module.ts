// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import ReviewModule from 'src/api/review/review.module'
import ReviewLikeService from './service/reviwLike.service'
import ReviewLikeRepository from './repository/reviewLike.repository'
import ReviewLikeController from './controller/reviewLike.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import ReviewLike from './domain/reviewLike.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewLike]),
    TypeOrmExModule.forCustomRepository([ReviewLikeRepository]),
    ReviewModule,
  ],
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService],
})
export default class ReviewLikeModule {}
