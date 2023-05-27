import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/api.response'
import { ReviewLikeService } from '../application/reviwLike.service'

@Controller('reviewLike')
export class ReviewLikeController {
  constructor(private readonly reviewLikeService: ReviewLikeService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async likeReview(@Param('id') id: string, @Req() req) {
    const { user } = req
    const response = await this.reviewLikeService.testLike(user, Number(id))
    return ApiResponse.of({
      data: response,
      message: 'Success Save Review Like',
      statusCode: 200,
    })
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async cancelLikeReview(@Param('id') id: string, @Req() req) {
    const { user } = req
    const response = await this.reviewLikeService.cancelLike(user, Number(id))
    return ApiResponse.of({
      data: response,
      message: 'Success Delete Review Like',
      statusCode: 200,
    })
  }

  @Get('/:id')
  async getReivewLikeList(@Param('id') id: string) {
    const response = await this.reviewLikeService.getReviewLikeList(Number(id))
    return ApiResponse.of({
      data: response,
      message: 'Success Find Review List Like',
      statusCode: 200,
    })
  }
}
