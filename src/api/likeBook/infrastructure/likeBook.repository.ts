import { EntityRepository, Repository } from 'typeorm'
import { LikeBook } from '../domain/likeBook.entity'

@EntityRepository(LikeBook)
export class LikeBookRepository extends Repository<LikeBook> {}
