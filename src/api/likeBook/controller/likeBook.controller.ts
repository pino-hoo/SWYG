// ** Nest Imports
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'

// ** Passport Imports
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'

// ** Custom Module Imports
import LikeBookService from '../service/likeBook.service'

@Controller('likeBook')
export default class LikeBookController {
  constructor(private readonly likeBookService: LikeBookService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveLikeBook(@Req() req, @Param('id') id: string) {
    const response = await this.likeBookService.saveLikeBook(
      req.user,
      Number(id),
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Save LikeBook',
      statusCode: 200,
    })
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteLikeBook(@Param('id') id: string, @Req() req) {
    const response = await this.likeBookService.deleteLikeBook(
      req.user,
      Number(id),
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Delete LikeBook',
      statusCode: 200,
    })
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async getLikeBookList(@Req() req) {
    const response = await this.likeBookService.getLikeBookListWithBookAndUser(
      req.user,
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Find LikeBookList',
      statusCode: 200,
    })
  }
}
