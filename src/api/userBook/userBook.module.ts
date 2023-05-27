// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import BookModule from 'src/api/book/book.module'
import UserBookService from './service/userBook.service'
import UserBookRepository from './repository/userBook.repository'
import UserBookController from './controller/userBook.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import UserBook from './domain/userBook.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBook]),
    TypeOrmExModule.forCustomRepository([UserBookRepository]),
    BookModule,
  ],
  providers: [UserBookService],
  controllers: [UserBookController],
})
export default class UserBookModule {}
