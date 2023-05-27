// ** Validation Imports
import { IsString } from 'class-validator'

// ** Dto, enums Imports
import Provider from 'src/api/auth/dto/user.provider.enum'

export default class NaverDto {
  @IsString()
  name: string

  @IsString()
  naverId: string

  @IsString()
  email: string

  @IsString()
  provider: Provider.NAVER
}
