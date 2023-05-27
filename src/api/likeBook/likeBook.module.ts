// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import BookModule from 'src/api/book/book.module'
import LikeBookService from './service/likeBook.service'
import LikeBookRepository from './repository/likeBook.repository'
import LikeBookController from './controller/likeBook.controller'

// ** Domain Imports
import LikeBook from './domain/likeBook.entity'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeBook]),
    TypeOrmExModule.forCustomRepository([LikeBookRepository]),
    BookModule,
  ],
  providers: [LikeBookService],
  controllers: [LikeBookController],
})
export default class LikeBookModule {}
