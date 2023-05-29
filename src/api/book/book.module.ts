// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import BookService from './service/book.service'
import BookRepository from './repository/book.repository'
import BookController from './controller/book.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import Book from './domain/book.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmExModule.forCustomRepository([BookRepository]),
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService, TypeOrmExModule, TypeOrmModule],
})
export default class BookModule {}
