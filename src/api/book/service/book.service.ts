// ** Nest Imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// ** Custom Module Imports
import BookRepository from '../repository/book.repository'

// ** Domain, Dto Imports
import Book from '../domain/book.entity'
import { ApiResponse } from 'src/common/dto/api.response'
import RequestBookSaveDto from '../dto/book.save.dto'
import { NotFoundException } from 'src/common/exception/customException'

@Injectable()
export default class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Book 저장 함수
   * @param {BookSaveDto} req
   * @returns {Book}
   */
  public async saveBook(dto: RequestBookSaveDto): Promise<ApiResponse<any>> {
    const findBook: Book[] = await this.findBookList(dto.isbn)
    if (findBook.length > 0) {
      return ApiResponse.of({
        data: findBook[0],
        message: 'Success Save Book',
        statusCode: 200,
      })
    }
    const book = this.bookRepository.create({
      title: dto.title,
      contents: dto.contents,
      publisher: dto.publisher,
      authors: dto.authors,
      thumbnail: dto.thumbnail,
      isbn: dto.isbn,
    })

    return ApiResponse.of({
      data: await this.bookRepository.save(book),
      message: 'Success Save Book',
      statusCode: 200,
    })
  }

  /**
   * Book List 조회 함수
   * @param {string} isbn
   * @returns {Book[]}
   */
  public async findBookList(isbn: string) {
    try {
      return await this.bookRepository.find({ where: { isbn } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * BookIdx를 활용한 Book With review 조회 함수
   * @param {number}bookIdx
   * @returns {Book}
   */
  public async findBookByIdxWithReview(idx: number) {
    const findBook = await this.bookRepository.findOne({
      where: { idx },
      relations: ['review'],
    })
    if (!findBook) {
      throw new NotFoundException('Not Found Book')
    }
    return ApiResponse.of({
      data: findBook,
      message: 'Success Find Book',
      statusCode: 200,
    })
  }

  /**
   * 원하는 개수의 Book List 조회 함수
   * @param {number}count
   * @returns {Book[]}
   */
  async findBookListCount(count: number) {
    try {
      const bookList: Book[] = await this.bookRepository.find()
      return bookList.sort(() => Math.random() - 0.5).slice(0, count)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * BookIdx를 이용한 Book 조회
   * @param {number} bookIdx
   * @returns {Book}
   */
  async findBookByIdx(bookIdx: number) {
    try {
      return await this.bookRepository.findOne({ where: { idx: bookIdx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * isbn 이용한 Book 조회
   * @param {string} isbn
   * @returns {Book}
   */
  async findBookByIsbn(isbn: string) {
    try {
      return await this.bookRepository.findOne({ where: { isbn } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
