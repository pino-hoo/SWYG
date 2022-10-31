import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/api.response'
import { ReviewService } from '../application/review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/:id')
  async getReview(@Param('id') id: string) {
    const response = await this.reviewService.findReviewWithUser(Number(id))
    return ApiResponse.of({
      data: response,
      message: 'Success Find Review',
      statusCode: 200,
    })
  }

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveReview(@Req() req, @Param('id') idx: string, @Body() body) {
    const { user } = req
    const { text } = body
    const response = await this.reviewService.saveReview(
      user,
      Number(idx),
      text,
    )
    return ApiResponse.of({
      data: response,
      message: 'Success Save Review',
      statusCode: 200,
    })
  }

  @Get('/list/:id')
  async getReviewList(@Param('id') id: string) {
    const response = await this.reviewService.findReviewListWithUser(Number(id))
    return ApiResponse.of({
      data: response,
      message: 'Success Find Review',
      statusCode: 200,
    })
  }
}
