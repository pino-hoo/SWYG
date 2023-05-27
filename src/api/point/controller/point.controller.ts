// ** Nest Imports
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'

// ** Passport Imports
import JwtGuard from 'src/api/auth/passport/auth.jwt.guard'

// ** Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'

// ** Custom Module Imports
import PointService from '../service/point.service'

@Controller('point')
export default class PointController {
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
