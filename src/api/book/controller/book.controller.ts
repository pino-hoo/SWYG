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
  public async saveBook(
    @Body() dto: RequestBookSaveDto,
  ): Promise<ApiResponse<any>> {
    return await this.bookService.saveBook(dto)
  }

  @ApiOperation({ summary: '책 조회' })
  @ApiCreatedResponse({
    status: 200,
    description: '책 조회 성공',
    type: ApiResponse,
  })
  @Get('/:id')
  public async findBook(@Param('id') id: number): Promise<ApiResponse<any>> {
    return await this.bookService.findBookByIdxWithReview(id)
  }

  @Get('/count/:id')
  public async findBookListCount(
    @Param('id') idx: number,
  ): Promise<ApiResponse<any>> {
    return await this.bookService.findBookListCount(idx)
  }

  @Get('/book/:isbn')
  public async findBookByIsbn(@Param('isbn') isbn: string) {
    console.log(isbn)
    const response = await this.bookService.findBookByIsbn(isbn)
    return ApiResponse.of({
      data: response,
      message: 'Success Find Book',
      statusCode: 200,
    })
  }
}
