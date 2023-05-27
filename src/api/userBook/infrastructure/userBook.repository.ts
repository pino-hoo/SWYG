import { EntityRepository, Repository } from 'typeorm'
import { UserBook } from '../domain/userBook.entity'

@EntityRepository(UserBook)
export class UserBookRepository extends Repository<UserBook> {}
