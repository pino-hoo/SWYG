// ** Typeorm Imports
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// ** Domain, Dto Imports
import User from 'src/api/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import Quiz from 'src/api/quiz/domain/quiz.entity'

@Entity({ name: 'tbl_point' })
export default class Point extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  point: number

  @ManyToOne((type) => Quiz, (quiz) => quiz.point)
  quiz: Quiz

  @ManyToOne((type) => User, (user) => user.point)
  user: User
}
