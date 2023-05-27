import User from 'src/api/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Quiz } from 'src/api/quiz/domain/quiz.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_point' })
export class Point extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  point: number

  @ManyToOne((type) => Quiz, (quiz) => quiz.point)
  quiz: Quiz

  @ManyToOne((type) => User, (user) => user.point)
  user: User
}
