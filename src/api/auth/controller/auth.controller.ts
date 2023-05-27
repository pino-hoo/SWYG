// ** Nest Imports
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

// ** Other Imports
import { Response } from 'express'

// ** Domain, Dto Imports
import { ApiResponse } from 'src/common/dto/api.response'
import MailDto from '../dto/mail.dto'
import ReqWithUser from '../dto/passport.req.dto'
import CreateUserDto from '../dto/user.create.dto'

// ** Passport Imports
import JwtGuard from '../passport/auth.jwt.guard'
import KakaoGuard from '../passport/auth.kakao.guard'
import LocalGuard from '../passport/auth.local.guard'
import NaverGuard from '../passport/auth.naver.guard'

// ** Custom Module Imports
import { MateService } from 'src/api/mate/application/mate.service'
import { multerDiskOptions } from 'src/utils/multerOption'
import AuthService from 'src/api/auth/service/auth.service'

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mateService: MateService,
  ) {}

  @Post('/register')
  async localSave(@Body() req: CreateUserDto) {
    const user = await this.authService.localSave(req)
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    const response = { user, token }
    return ApiResponse.of({
      data: response,
      message: 'Success Register',
      statusCode: 200,
    })
  }

  @UseGuards(LocalGuard)
  @Post('/local')
  async localLogin(@Req() req: ReqWithUser) {
    const { user } = req
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    const response = { user, token }
    return ApiResponse.of({
      data: response,
      message: 'Success Local Login',
      statusCode: 200,
    })
  }

  @Get('/kakao')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoLogin() {
    return HttpStatus.OK
  }

  @Get('/kakao/callback')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoCallBack(@Req() req, @Res() res: Response) {
    const user = await this.authService.kakaoLogin(req.user)
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    const mate = await this.mateService.findMateById(user)
    // const url = 'http://localhost:5173'
    const url = 'https://matebook.swygbro.com'
    return mate
      ? res.redirect(`${url}/home?token=${token}`)
      : res.redirect(`${url}/auth/info?token=${token}`)
  }

  @Get('/naver')
  @HttpCode(200)
  @UseGuards(NaverGuard)
  async naverLogin() {
    return HttpStatus.OK
  }

  @Get('/naver/callback')
  @HttpCode(200)
  @UseGuards(NaverGuard)
  async naverCallBack(@Req() req, @Res() res: Response) {
    const user = await this.authService.naverLogin(req.user)
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    const mate = await this.mateService.findMateById(user)
    const url = 'https://matebook.swygbro.com'
    // const url = 'http://localhost:5173'
    return mate
      ? res.redirect(`${url}/home?token=${token}`)
      : res.redirect(`${url}/auth/info?token=${token}`)
  }

  @Post('/mail')
  async sendMail(@Body() req: MailDto) {
    const response = await this.authService.sendMail(req.email)
    return ApiResponse.of({
      data: response,
      message: 'Success Send Mail',
      statusCode: 200,
    })
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async getUserInfo(@Req() req) {
    const { user: response } = req
    return ApiResponse.of({
      data: response,
      message: 'success Find User Info',
      statusCode: 200,
    })
  }

  @Patch('/')
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  async updateImage(@Req() req, @UploadedFiles() files) {
    const { path } = files[0]
    const response = await this.authService.updateImg(req.user, path)
    return ApiResponse.of({
      data: response,
      message: 'Success Change Image File',
      statusCode: 200,
    })
  }
}
