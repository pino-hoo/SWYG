import { User } from 'src/auth/domain/user.entity'
import { Book } from 'src/book/domain/book.entity'
import { Comment } from 'src/comment/domain/comment.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { ReviewLike } from 'src/reviewLike/domain/reviewLike.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'tbl_review' })
export class Review extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  text: string

  @ManyToOne((type) => User, (user) => user.review)
  user: User

  @ManyToOne((type) => Book, (book) => book.review)
  book: Book

  @OneToMany((type) => Comment, (comment) => comment.review)
  comment: Comment[]

  @OneToMany((type) => ReviewLike, (reviewLike) => reviewLike.review)
  reviewLike: ReviewLike[]
}
