// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

// ** Domain, Dto Imports
import User from 'src/api/auth/domain/user.entity'
import Book from 'src/api/book/domain/book.entity'
import Comment from 'src/api/comment/domain/comment.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import ReviewLike from 'src/api/reviewLike/domain/reviewLike.entity'

@Entity({ name: 'tbl_review' })
export default class Review extends BaseTimeEntity {
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
