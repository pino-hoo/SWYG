// ** Nest Imports
import { Body, Controller, Get, Param, Post } from '@nestjs/common'

// ** Custom Module Imports
import BookService from '../service/book.service'

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'
import RequestBookSaveDto from '../dto/book.save.dto'

@Controller('book')
export default class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: '책 생성' })
  @ApiBody({ type: RequestBookSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '책 생성 성공',
    type: ApiResponse,
  })
  @Post()
  async saveBook(@Body() dto: RequestBookSaveDto) {
    return await this.bookService.saveBook(dto)
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
