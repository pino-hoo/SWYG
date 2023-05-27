// ** Nest Imports
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

// ** Custom Module Imports
import UserRepository from '../repository/user.repository'
import { MailerService } from '@nestjs-modules/mailer'
import { JwtService } from '@nestjs/jwt'

// ** Other Imports
import * as bcrypt from 'bcryptjs'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import KakaoDto from 'src/api/auth/dto/passport.kakao.dto'
import NaverDto from 'src/api/auth/dto/passport.naver.dto'
import Provider from 'src/api/auth/dto/user.provider.enum'
import { male } from 'src/config/env/node'
import RequestUserSaveDto from 'src/api/auth/dto/user.save.dto'
import ExceptionMessage from 'src/common/exception/excepitionMessageEnum'
import { ApiResponse } from 'src/common/dto/api.response'
import AuthService from './auth.service'
import RequestUserLoginDto from '../dto/user.login.dto'

@Injectable()
export default class UserService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  /** Local 회원가입 */
  public async localSave(dto: RequestUserSaveDto): Promise<ApiResponse<any>> {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    })
    if (findUser) {
      throw new BadRequestException(ExceptionMessage.EXIST_EAMIL)
    }
    const hash = await bcrypt.hash(dto.password, 8)
    const saveUser = await this.userRepository.save(
      this.userRepository.create({
        email: dto.email,
        password: hash,
        name: dto.name,
        birth: dto.birth,
        male: dto.male,
        provider: Provider.LOCAL,
        providerIdx: null,
        imgPath: null,
      }),
    )
    const accessToken = await this.authService.createAccessToken({
      id: saveUser.idx,
    })

    const refreshToken = await this.authService.createRefreshToken({
      id: saveUser.idx,
    })

    return ApiResponse.of({
      data: { user: saveUser, token: accessToken, refreshToken },
      statusCode: 200,
      message: '유저를 생성하였습니다.',
    })
  }

  /** Local 로그인 */
  public async localLogin(dto: RequestUserLoginDto): Promise<ApiResponse<any>> {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    })
    if (!findUser) {
      throw new BadRequestException(ExceptionMessage.NOT_FOUND_USER)
    }

    const result = await bcrypt.compare(dto.password, findUser.password)

    if (!result) {
      throw new BadRequestException(ExceptionMessage.PASSWORD_WRONG)
    }
    const accessToken = await this.authService.createAccessToken({
      id: findUser.idx,
    })

    const refreshToken = await this.authService.createRefreshToken({
      id: findUser.idx,
    })

    return ApiResponse.of({
      data: { user: findUser, token: accessToken, refreshToken },
      statusCode: 200,
      message: '로그인에 성공하였습니다.',
    })
  }

  /** Kakao Login(Passport) */
  async kakaoLogin(req: KakaoDto): Promise<User> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { providerIdx: req.kakaoId },
      })
      if (findUser) return findUser
      return await this.kakaoSave(req)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Kakao Save -> Kakao Login에서 호출 */
  async kakaoSave(req: KakaoDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: req.email,
        name: req.name,
        provider: req.provider,
        providerIdx: req.kakaoId,
        birth: null,
        password: null,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found!!', HttpStatus.BAD_REQUEST)
    }
  }

  /** Naver Login(Passport) */
  async naverLogin(req: NaverDto): Promise<User> {
    try {
      const findUser = await this.getUserbyProviderIdx(req.naverId)
      if (findUser) return findUser
      return await this.naverSave(req)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Naver Save(Passport) */
  async naverSave(req: NaverDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: req.email,
        name: req.name,
        provider: req.provider,
        providerIdx: req.naverId,
        male: null,
        birth: null,
        password: null,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Jwt를 이용하여 Token 발급 */
  async gwtJwtWithIdx(idx: number) {
    return this.jwtService.sign({ idx })
  }

  /** providerIdx를 이용한 User 조회 */
  async getUserbyProviderIdx(providerIdx: string) {
    return await this.userRepository.findOne({ where: { providerIdx } })
  }

  /** idx를 이용한 User 조회 */
  async getUserByIdx(idx: number) {
    return await this.userRepository.findOne({ where: { idx } })
  }

  async getHashAndSalt(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  /** Bcrypt를 이용한 Hash 풀가 */
  async compareBcrypt(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)
    console.log(result)
    if (!result)
      throw new HttpException('Password ERROR', HttpStatus.BAD_REQUEST)
  }

  /** Local Login Send Mail Code */
  async sendMail(email: string) {
    try {
      const number: number = await this.getRandomNumber()
      console.log(email, male.MALE_ID)
      await this.mailerService.sendMail({
        to: email,
        from: male.MALE_ID,
        subject: '이메일 인증 요청 메일입니다.',
        html: '6자리 인증 코드 : ' + `<b> ${number}</b>`,
      })
      return number
    } catch (err) {
      console.log(err)
    }
  }

  async getRandomNumber() {
    let number = Math.floor(Math.random() * 1000000) + 100000
    if (number > 1000000) number -= 100000
    return number
  }

  async updateImg(user: User, image: string) {
    try {
      const updateUser = await this.userRepository.update(user.idx, {
        imgPath: image,
      })
      return updateUser
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
// async saveForm(user: User, image: string, number: string) {
//   try {
//     const form: Form = this.formRepository.create({ user, image, number })
//     return await this.formRepository.save(form)
//   } catch (err) {
//     console.log(err)
//     throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
//   }
// }
