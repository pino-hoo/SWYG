// ** Nest Imports
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// ** Passport Imports
import { ExtractJwt, Strategy } from 'passport-jwt'

// ** Custom Module Imports
import AuthService from '../service/user.service'

// ** Domain Imports
import User from '../domain/user.entity'

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.headers?.accesstoken
        },
      ]),
      secretOrKey: 'swyg3',
    })
  }

  async validate(token): Promise<User> {
    return await this.authService.getUserByIdx(token.idx)
  }
}
