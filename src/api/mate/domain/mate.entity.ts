import User from 'src/api/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_mate' })
export class Mate extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  name: string

  @ManyToOne((type) => User, (user) => user.mate)
  user: User
}
