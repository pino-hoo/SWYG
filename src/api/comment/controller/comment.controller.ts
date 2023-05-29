// ** Nest Imports
import {
  Body,
  Controller,
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
import CommentService from '../service/comment.service'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'
import RequestCommentFindDto from '../dto/comment.find.dto'
import RequestWithUserDto from 'src/common/dto/request.user.dto'

ApiTags('Comment')
@Controller('comment')
export default class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '댓글 저장' })
  @ApiBody({ type: RequestCommentFindDto })
  @ApiCreatedResponse({
    status: 200,
    description: '댓글 저장 성공',
    type: ApiResponse,
  })
  @Post('/:id')
  @UseGuards(JwtGuard)
  public async saveComment(
    @Body() dto: RequestCommentFindDto,
    @Req() req: RequestWithUserDto,
    @Param('id') reviewIdx: number,
  ): Promise<ApiResponse<any>> {
    return await this.commentService.saveComment(req.user, dto, reviewIdx)
  }

  @ApiOperation({ summary: '댓글 조회' })
  @ApiCreatedResponse({
    status: 200,
    description: '댓글 조회 성공',
    type: ApiResponse,
  })
  @Get('/:id')
  public async getComment(
    @Param('id') reviewIdx: number,
  ): Promise<ApiResponse<any>> {
    return await this.commentService.getCommentList(reviewIdx)
  }
}
