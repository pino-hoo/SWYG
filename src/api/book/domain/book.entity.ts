// ** Domain Imports
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import LikeBook from 'src/api/likeBook/domain/likeBook.entity'
import Quiz from 'src/api/quiz/domain/quiz.entity'
import Review from 'src/api/review/domain/review.entity'
import UserBook from 'src/api/userBook/domain/userBook.entity'

// ** Typeorm Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity({ name: 'tbl_book' })
@Unique(['isbn'])
export default class Book extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  isbn: string

  @Column({ type: 'text' })
  contents: string

  // @Column()
  // datetime: Date

  @Column()
  authors: string

  @Column()
  publisher: string

  @Column()
  thumbnail: string

  @OneToMany((type) => Review, (review) => review.book)
  review: Review[]

  @OneToMany((type) => LikeBook, (likeBook) => likeBook.book)
  likeBook: LikeBook[]

  @OneToMany((type) => Quiz, (quiz) => quiz.book)
  quiz: Quiz[]

  @OneToMany((type) => UserBook, (userBook) => userBook.book)
  userBook: UserBook[]
}
