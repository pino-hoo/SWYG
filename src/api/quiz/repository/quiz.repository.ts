// ** Typeorm Imports
import { Repository } from 'typeorm'
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator'

// ** Domain Imports
import Quiz from '../domain/quiz.entity'

@CustomRepository(Quiz)
export default class QuizRepository extends Repository<Quiz> {}
