import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookModule } from 'src/api/book/book.module'
import { LikeBookService } from './application/likeBook.service'
import { LikeBookRepository } from './infrastructure/likeBook.repository'
import { LikeBookController } from './ui/likeBook.controller'

@Module({
  imports: [TypeOrmModule.forFeature([LikeBookRepository]), BookModule],
  providers: [LikeBookService],
  controllers: [LikeBookController],
})
export class LikeBookModule {}
