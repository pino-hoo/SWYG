import { EntityRepository, Repository } from 'typeorm'
import { Book } from '../domain/book.entity'

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {}
