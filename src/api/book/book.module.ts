import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookService } from './application/book.service'
import { BookRepository } from './infrastructure/book.repository'
import { BookController } from './ui/book.controller'

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
