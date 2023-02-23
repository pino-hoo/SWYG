import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-kakao'
import { KakaoDto } from '../dto/passport.kakao.dto'
import { Provider } from '../dto/user.provider.enum'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: 'f8e6e54fa6a6a1af7adf51a197880f75',
      callbackURL: 'http://www.pinodev.shop:8003/auth/kakao/callback',
      // callbackURL: 'http://localhost:8003/auth/kakao/callback',
    })
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json
    const kakao_account = profileJson.kakao_account
    const payload: KakaoDto = {
      name: kakao_account.profile.nickname,
      kakaoId: profileJson.id,
      email:
        kakao_account.has_email && !kakao_account.email_needs_agreement
          ? kakao_account.email
          : null,
      provider: Provider.KAKAO,
    }
    done(null, payload)
  }
}
