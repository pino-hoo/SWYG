// ** Nest Imports
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// ** Domain, dto Imports
import User from 'src/api/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import Review from 'src/api/review/domain/review.entity'

@Entity({ name: 'tbl_comment' })
export default class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  text: string

  @ManyToOne((type) => User, (user) => user.review)
  user: User

  @ManyToOne((type) => Review, (review) => review.comment)
  review: Review
}
