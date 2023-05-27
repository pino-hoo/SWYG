// ** Typeorm Imports
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// ** Domain, Dto Imports
import User from 'src/api/auth/domain/user.entity'
import Book from 'src/api/book/domain/book.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'

@Entity({ name: 'tbl_like' })
export default class LikeBook extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @ManyToOne((type) => User, (user) => user.likeBook)
  user: User

  @ManyToOne((type) => Book, (book) => book.likeBook)
  book: Book
}
