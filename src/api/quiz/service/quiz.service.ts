// ** Neset Imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import Book from 'src/api/book/domain/book.entity'
import Quiz from '../domain/quiz.entity'
import QuizKind from '../dto/quiz.kind.enum'

// ** Custom Module Imports
import BookService from 'src/api/book/service/book.service'
import QuizRepository from '../repository/quiz.repository'

@Injectable()
export default class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly bookService: BookService,
  ) {}

  /**
   * Quiz 저장 함수
   * @param {User}user
   * @param {string}text
   * @param {boolean}answer
   * @param {number}idx
   * @returns {User}
   */
  async saveQuiz(
    user: User,
    text: string,
    answer: boolean,
    idx: number,
  ): Promise<Quiz> {
    try {
      const book: Book = await this.bookService.findBookByIdx(idx)
      const quiz = this.quizRepository.create({
        text,
        answer,
        user,
        kind: QuizKind.OX,
        book,
      })
      return await this.quizRepository.save(quiz)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * BookIdx를 이용한 Quiz List 조회 함수
   * @param {number} idx
   * @returns {Quiz[]}
   */
  async getQuizListByBookIdx(idx: number) {
    try {
      return await this.quizRepository.find({
        // where: { book: idx },
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * Quiz 조회 함수
   * @param {number}idx
   * @returns  {Quiz}
   */
  async findQuizByIdx(idx: number) {
    try {
      return await this.quizRepository.findOne({ where: { idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.NOT_FOUND)
    }
  }
}
