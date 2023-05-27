// ** passport Imports
import { AuthGuard } from '@nestjs/passport'

export default class NaverGuard extends AuthGuard('naver') {}
