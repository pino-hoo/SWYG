import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/dto/api.response'
import { PointService } from 'src/point/application/point.service'
import { MateService } from '../application/mate.service'

@Controller('mate')
export class MateController {
  constructor(
    private readonly mateService: MateService,
    private readonly pointService: PointService,
  ) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async saveMate(@Req() req, @Body() body) {
    const response = await this.mateService.saveMate(req.user, body.name)
    return ApiResponse.of({
      data: response,
      message: 'Success Save Mate',
      statusCode: 200,
    })
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async findMate(@Req() req) {
    const mate = await this.mateService.findMateWithUser(req.user)
    const point = await this.pointService.getSumPoint(req.user)
    const response = { mate, point }
    return ApiResponse.of({
      data: response,
      message: 'Success Find Mate and Point',
      statusCode: 200,
    })
  }
}
