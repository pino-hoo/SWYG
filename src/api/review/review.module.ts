// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import BookModule from 'src/api/book/book.module'
import ReviewService from './service/review.service'
import ReviewRepository from './repository/review.repository'
import ReviewController from './controller/review.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import Review from './domain/review.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmExModule.forCustomRepository([ReviewRepository]),
    BookModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService, TypeOrmExModule, TypeOrmModule],
})
export default class ReviewModule {}
