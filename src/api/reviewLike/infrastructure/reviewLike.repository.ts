import { EntityRepository, Repository } from 'typeorm'
import { ReviewLike } from '../domain/reviewLike.entity'

@EntityRepository(ReviewLike)
export class ReviewLikeRepository extends Repository<ReviewLike> {}
