// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'

@CustomRepository(User)
export default class UserRepository extends Repository<User> {}
