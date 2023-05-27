// ** Nest Imports
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'

// ** Passport Imports
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'

// ** Custom Module Imports
import UserBookService from '../service/userBook.service'

@Controller('userBook')
export default class UserBookController {
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
