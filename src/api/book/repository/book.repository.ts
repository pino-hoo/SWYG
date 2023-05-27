// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import Book from '../domain/book.entity'

@CustomRepository(Book)
export default class BookRepository extends Repository<Book> {}
