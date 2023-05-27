import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse } from 'src/common/dto/api.response'
import { BookService } from '../application/book.service'
import { BookSaveDto } from '../dto/book.save.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async saveBook(@Body() req: BookSaveDto) {
    const response = await this.bookService.saveBook(req)
    return ApiResponse.of({
      data: response,
      message: 'Success Save Book',
      statusCode: 200,
    })
  }

  @Get('/:id')
  async findBook(@Param('id') idx: string) {
    const response = await this.bookService.findBookByIdxWithReview(Number(idx))
    return ApiResponse.of({
      data: response,
      message: 'Success Find Book',
      statusCode: 200,
    })
  }

  @Get('/count/:id')
  async findBookListCount(@Param('id') idx: string) {
    const response = await this.bookService.findBookListCount(Number(idx))
    return ApiResponse.of({
      data: response,
      message: 'Success Find BookList',
      statusCode: 200,
    })
  }

  @Get('/book/:isbn')
  async findBookByIsbn(@Param('isbn') isbn: string) {
    console.log(isbn)
    const response = await this.bookService.findBookByIsbn(isbn)
    return ApiResponse.of({
      data: response,
      message: 'Success Find Book',
      statusCode: 200,
    })
  }
}
