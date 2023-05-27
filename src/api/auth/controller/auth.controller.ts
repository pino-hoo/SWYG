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
import RequestUserSaveDto from '../dto/user.save.dto'
import RequestUserLoginDto from '../dto/user.login.dto'

// ** Passport Imports
import JwtGuard from '../passport/auth.jwt.guard'
import KakaoGuard from '../passport/auth.kakao.guard'
import NaverGuard from '../passport/auth.naver.guard'

// ** Custom Module Imports
import MateService from 'src/api/mate/service/mate.service'
import { multerDiskOptions } from 'src/utils/multerOption'
import UserService from 'src/api/auth/service/user.service'

// ** Swagger Imports
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly mateService: MateService,
  ) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: RequestUserSaveDto })
  @ApiCreatedResponse({
    status: 200,
    description: '유저 생성 성공',
    type: ApiResponse,
  })
  @Post('/register')
  public async localSave(
    @Body() dto: RequestUserSaveDto,
  ): Promise<ApiResponse<any>> {
    return await this.userService.localSave(dto)
  }

  @ApiOperation({ summary: '유저 로그인' })
  @ApiBody({ type: RequestUserLoginDto })
  @ApiCreatedResponse({
    status: 200,
    description: '유저 로그인 성공',
    type: ApiResponse,
  })
  @Post('/local')
  public async localLogin(@Body() dto: RequestUserLoginDto) {
    return await this.userService.localLogin(dto)
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
    const user = await this.userService.kakaoLogin(req.user)
    const token = await this.userService.gwtJwtWithIdx(user.idx)
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
    const user = await this.userService.naverLogin(req.user)
    const token = await this.userService.gwtJwtWithIdx(user.idx)
    const mate = await this.mateService.findMateById(user)
    const url = 'https://matebook.swygbro.com'
    // const url = 'http://localhost:5173'
    return mate
      ? res.redirect(`${url}/home?token=${token}`)
      : res.redirect(`${url}/auth/info?token=${token}`)
  }

  @Post('/mail')
  async sendMail(@Body() req: MailDto) {
    const response = await this.userService.sendMail(req.email)
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
    const response = await this.userService.updateImg(req.user, path)
    return ApiResponse.of({
      data: response,
      message: 'Success Change Image File',
      statusCode: 200,
    })
  }
}
