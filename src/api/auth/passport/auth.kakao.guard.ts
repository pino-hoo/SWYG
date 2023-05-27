// ** Nest Imports
import { Injectable } from '@nestjs/common'

// ** passport Imports
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export default class KakaoGuard extends AuthGuard('kakao') {}
