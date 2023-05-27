// ** Domain Imports
import User from '../domain/user.entity'

// ** Express Imports
import { Request } from 'express'

export default interface ReqWithUser extends Request {
  user: User
}
