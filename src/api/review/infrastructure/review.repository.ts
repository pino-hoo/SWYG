import { EntityRepository, Repository } from 'typeorm'
import { Review } from '../domain/review.entity'

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {}
