// ** Nest Imports
import { Injectable } from '@nestjs/common'

// ** Passport Imports
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

// ** Custom Module Imports
import UserService from '../service/user.service'

// ** Domain Imports
import User from '../domain/user.entity'

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }
  async validate(email: string, password: string): Promise<User> {
    return null
    // return await this.userService.localLogin(email, password)
  }
}
