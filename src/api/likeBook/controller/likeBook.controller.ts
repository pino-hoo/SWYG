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

// ** Swagger Imports
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

// ** Custom Module Imports
import LikeBookService from '../service/likeBook.service'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'
import RequestWithUserDto from 'src/common/dto/request.user.dto'

@ApiTags('Comment')
@Controller('likeBook')
export default class LikeBookController {
  constructor(private readonly likeBookService: LikeBookService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '책 좋아요 생성' })
  @ApiCreatedResponse({
    status: 200,
    description: '책 좋아요 생성 성공',
    type: ApiResponse,
  })
  @Post('/:id')
  @UseGuards(JwtGuard)
  public async saveLikeBook(
    @Req() { user }: RequestWithUserDto,
    @Param('id') id: number,
  ): Promise<ApiResponse<any>> {
    return await this.likeBookService.saveLikeBook(user, id)
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '좋아요 취소' })
  @ApiCreatedResponse({
    status: 200,
    description: '좋아요 취소 성공',
    type: ApiResponse,
  })
  @Delete('/:id')
  @UseGuards(JwtGuard)
  public async deleteLikeBook(
    @Param('id') id: number,
    @Req() { user }: RequestWithUserDto,
  ): Promise<ApiResponse<any>> {
    return await this.likeBookService.deleteLikeBook(user, id)
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '좋아요 리스트 조회 성공' })
  @ApiCreatedResponse({
    status: 200,
    description: '좋아요 리스트 조회 성공',
    type: ApiResponse,
  })
  @Get('/')
  @UseGuards(JwtGuard)
  public async getLikeBookList(
    @Req() { user }: RequestWithUserDto,
  ): Promise<ApiResponse<any>> {
    return await this.likeBookService.getLikeBookListWithBookAndUser(user)
  }
}
