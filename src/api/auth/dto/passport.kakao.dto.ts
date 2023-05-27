// ** Validation Imports
import { IsString } from 'class-validator'

// ** Dto, enums Imports
import Provider from 'src/api/auth/dto/user.provider.enum'

export default class KakaoDto {
  @IsString()
  name: string

  @IsString()
  kakaoId: string

  @IsString()
  email: string

  @IsString()
  provider: Provider.KAKAO
}
