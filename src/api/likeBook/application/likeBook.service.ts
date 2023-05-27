import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import User from 'src/api/auth/domain/user.entity'
import { BookService } from 'src/api/book/application/book.service'
import { Book } from 'src/api/book/domain/book.entity'
import { LikeBook } from '../domain/likeBook.entity'
import { LikeBookRepository } from '../infrastructure/likeBook.repository'

@Injectable()
export class LikeBookService {
  constructor(
    private readonly likeBookRepository: LikeBookRepository,
    private readonly bookService: BookService,
  ) {}

  /**
   * LikeBook Find List With Book, User 함수
   * @param {User} user
   * @returns {LikeBook[]}
   */
  async getLikeBookListWithBookAndUser(user: User) {
    try {
      return await this.likeBookRepository.find({
        // where: { user },
        relations: ['book', 'user'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * LikeBook 저장 함수
   * @param {User} user
   * @param {number}bookIdx
   * @returns {LikeBook}
   */
  async saveLikeBook(user: User, bookIdx: number) {
    try {
      const book: Book = await this.bookService.findBookByIdx(bookIdx)
      const findLikeBook: boolean = await this.findLikeBook(user, book)
      if (findLikeBook)
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const likeBook: LikeBook = this.likeBookRepository.create({
        user,
        book,
      })
      return await this.likeBookRepository.save(likeBook)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * LikeBook 삭제 함수
   * @param {User}user
   * @param {number}bookIdx
   * @returns
   */
  async deleteLikeBook(user: User, bookIdx: number) {
    try {
      const book: Book = await this.bookService.findBookByIdx(bookIdx)
      const findLikeBook: boolean = await this.findLikeBook(user, book)
      if (!findLikeBook)
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const likeBook: LikeBook = await this.likeBookRepository.findOne({
        // where: { user, book },
      })
      // return await this.likeBookRepository.delete(likeBook)
      return null
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * LikeBook 조회 함수
   * @param {User}user
   * @param {Book} book
   * @returns {boolean}
   */
  async findLikeBook(user: User, book: Book) {
    try {
      const likeBook: LikeBook = await this.likeBookRepository.findOne({
        // where: { user, book },
      })
      return likeBook ? true : false
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }
}
