import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import BookModule from 'src/api/book/book.module'
import { UserBookService } from './application/userBook.service'
import { UserBookRepository } from './infrastructure/userBook.repository'
import { UserBookController } from './ui/userBook.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserBookRepository]), BookModule],
  providers: [UserBookService],
  controllers: [UserBookController],
})
export class UserBookModule {}
