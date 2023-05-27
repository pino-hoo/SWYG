// ** Nest Imports
import { Injectable } from '@nestjs/common'

// ** Passport Imports
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

// ** Custom Module Imports
import AuthService from '../service/user.service'

// ** Domain Imports
import User from '../domain/user.entity'

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }
  async validate(email: string, password: string): Promise<User> {
    return await this.authService.localLogin(email, password)
  }
}
