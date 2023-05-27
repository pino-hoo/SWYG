import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/api.response'
import { PointService } from '../application/point.service'

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  @UseGuards(JwtGuard)
  async savePoint(@Req() req, @Body() body) {
    const response = await this.pointService.savePoint(req.user, body.point)
    return ApiResponse.of({
      data: response,
      message: 'Success Find Mate and Point',
      statusCode: 200,
    })
  }

  @Get()
  @UseGuards(JwtGuard)
  async getPoint(@Req() req) {
    const response = await this.pointService.getSumPoint(req.user)
    return ApiResponse.of({
      data: response,
      message: 'Success Find Point',
      statusCode: 200,
    })
  }
}
