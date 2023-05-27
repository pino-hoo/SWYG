// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import LikeBook from '../domain/likeBook.entity'

@CustomRepository(LikeBook)
export default class LikeBookRepository extends Repository<LikeBook> {}
