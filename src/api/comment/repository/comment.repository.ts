// ** Typeorm Imports
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'
import { Repository } from 'typeorm'

// ** Domain Imports
import Comment from '../domain/comment.entity'

@CustomRepository(Comment)
export default class CommentRepository extends Repository<Comment> {}
