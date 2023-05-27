import User from 'src/api/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import Review from 'src/api/review/domain/review.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_reviewLike' })
export class ReviewLike extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @ManyToOne((type) => User, (user) => user.reviewLike)
  user: User

  @ManyToOne((type) => Review, (review) => review.reviewLike)
  review: Review
}
