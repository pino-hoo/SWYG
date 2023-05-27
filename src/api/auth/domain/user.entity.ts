// ** Nest Imports
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

// ** Domain Imports
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import LikeBook from 'src/api/likeBook/domain/likeBook.entity'
import Mate from 'src/api/mate/domain/mate.entity'
import { Point } from 'src/api/point/domain/point.entity'
import { Quiz } from 'src/api/quiz/domain/quiz.entity'
import { Review } from 'src/api/review/domain/review.entity'
import { ReviewLike } from 'src/api/reviewLike/domain/reviewLike.entity'
import { UserBook } from 'src/api/userBook/domain/userBook.entity'
import Provider from 'src/api/auth/dto/user.provider.enum'

@Entity({ name: 'tbl_user' })
@Unique(['email', 'providerIdx'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ nullable: true, type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'boolean', nullable: true })
  male: boolean

  @Column({ type: 'varchar', nullable: true })
  birth: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  imgPath: string

  @Column({ nullable: true })
  providerIdx: string

  @Column({ type: 'enum', enum: Provider })
  provider: Provider

  @OneToMany((type) => Point, (point) => point.user)
  point: Point[]

  @OneToMany((type) => Quiz, (quiz) => quiz.user)
  quiz: Quiz[]

  @OneToMany((type) => Review, (review) => review.user)
  review: Review[]

  @OneToMany((type) => ReviewLike, (reviewLike) => reviewLike.user)
  reviewLike: ReviewLike[]

  @OneToMany((type) => Mate, (mate) => mate.user)
  mate: Mate[]

  @OneToMany((type) => LikeBook, (likeBook) => likeBook.user)
  likeBook: LikeBook[]

  @OneToMany((type) => UserBook, (userBook) => userBook.user)
  userBook: UserBook[]
}
