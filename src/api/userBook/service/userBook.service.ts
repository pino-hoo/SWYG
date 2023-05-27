// ** Nest Imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import Book from 'src/api/book/domain/book.entity'
import UserBook from '../domain/userBook.entity'

// ** Custom Module Imports
import BookService from 'src/api/book/service/book.service'
import UserBookRepository from '../repository/userBook.repository'

@Injectable()
export default class UserBookService {
  constructor(
    private readonly userBookRepository: UserBookRepository,
    private readonly bookService: BookService,
  ) {}

  /**
   * UserBook 저장 함수
   * @param user
   * @param bookIdx
   * @returns
   */
  async saveUserBook(user: User, bookIdx: number) {
    try {
      const book: Book = await this.bookService.findBookByIdx(bookIdx)
      const readBook: UserBook = await this.findUserBookByBookIdx(book.idx)
      if (readBook) return readBook
      const saveBook: UserBook = this.userBookRepository.create({
        user,
        book,
      })
      return await this.userBookRepository.save(saveBook)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * UserBook 조회 함수
   * @param idx
   * @returns
   */
  async findUserBookByBookIdx(idx: number) {
    try {
      // return await this.userBookRepository.findOne({ where: { book: idx } })
      return await this.userBookRepository.findOne({ where: { idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * UserBook List 조회 함수
   * @param user
   * @returns
   */
  async findUserBookListByUserIdx(user: User) {
    try {
      return null
      // return await this.userBookRepository.find({ where: { user: user.idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
