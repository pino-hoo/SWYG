// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import Review from '../domain/review.entity'

@CustomRepository(Review)
export default class ReviewRepository extends Repository<Review> {}
