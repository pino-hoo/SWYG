import { Request } from 'express'
import User from 'src/api/auth/domain/user.entity'

interface RequestWithUserDto extends Request {
  user: User
}

export default RequestWithUserDto
