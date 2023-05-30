// ** Nest Imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import Book from 'src/api/book/domain/book.entity'
import LikeBook from '../domain/likeBook.entity'

// ** Custom Module Imports
import BookService from 'src/api/book/service/book.service'
import LikeBookRepository from '../repository/likeBook.repository'
import { NotFoundException } from 'src/common/exception/customException'
import ExceptionMessage from 'src/common/exception/excepitionMessageEnum'
import { ApiResponse } from 'src/common/dto/api.response'

@Injectable()
export default class LikeBookService {
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
  public async saveLikeBook(
    user: User,
    bookIdx: number,
  ): Promise<ApiResponse<any>> {
    const findBook = await this.bookService.findBookByIdx(bookIdx)
    const findLikeBook: boolean = await this.findLikeBook(user, findBook)
    if (findLikeBook) {
      new NotFoundException(ExceptionMessage.EXIST_LIKE_BOOK)
    }
    const likeBook: LikeBook = this.likeBookRepository.create({
      user,
      book: findBook,
    })
    return ApiResponse.of({
      data: await this.likeBookRepository.save(likeBook),
      message: 'Success Save LikeBook',
      statusCode: 200,
    })
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
