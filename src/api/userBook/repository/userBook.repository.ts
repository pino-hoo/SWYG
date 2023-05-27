// ** Typeorm Imports
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'
import { Repository } from 'typeorm'

// ** Domain Imports
import UserBook from '../domain/userBook.entity'

@CustomRepository(UserBook)
export default class UserBookRepository extends Repository<UserBook> {}
