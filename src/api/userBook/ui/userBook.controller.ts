import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/api.response'
import { UserBookService } from '../application/userBook.service'

@Controller('userBook')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async readBook(@Req() req: any, @Param('id') id: string) {
    const response = await this.userBookService.saveUserBook(
      req.user,
      Number(id),
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Save UserBook',
      statusCode: 200,
    })
  }

  @Get()
  @UseGuards(JwtGuard)
  async getReadBookList(@Req() req) {
    const response = await this.userBookService.findUserBookListByUserIdx(
      req.user,
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Find UserBook List',
      statusCode: 200,
    })
  }
}
