// ** Typeorm Imports
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'

@Entity({ name: 'tbl_mate' })
export default class Mate extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  name: string

  @ManyToOne((type) => User, (user) => user.mate)
  user: User
}
