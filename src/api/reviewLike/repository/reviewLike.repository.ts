// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import ReviewLike from '../domain/reviewLike.entity'

@CustomRepository(ReviewLike)
export default class ReviewLikeRepository extends Repository<ReviewLike> {}
