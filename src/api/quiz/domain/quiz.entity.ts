// ** Typeorm Imports
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

// ** Dto, Domain Imports
import QuizKind from '../dto/quiz.kind.enum'
import User from 'src/api/auth/domain/user.entity'
import Book from 'src/api/book/domain/book.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import Point from 'src/api/point/domain/point.entity'

@Entity({ name: 'tbl_quiz' })
export default class Quiz extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  text: string

  @Column()
  answer: boolean

  @Column()
  kind: QuizKind

  @OneToMany((type) => Point, (point) => point.quiz)
  point: Point

  @OneToMany((type) => User, (user) => user.quiz)
  user: User

  @ManyToOne((type) => Book, (book) => book.quiz)
  book: Book
}
