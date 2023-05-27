// ** Nest Imports
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'

// ** Passport Imports
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'

// ** Custom Module Imports
import { PointService } from 'src/api/point/application/point.service'
import MateService from '../service/mate.service'

@Controller('mate')
export default class MateController {
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
