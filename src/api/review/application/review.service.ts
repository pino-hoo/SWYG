import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import User from 'src/api/auth/domain/user.entity'
import { BookService } from 'src/api/book/application/book.service'
import { Book } from 'src/api/book/domain/book.entity'
import { Review } from '../domain/review.entity'
import { ReviewRepository } from '../infrastructure/review.repository'

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookService: BookService,
  ) {}

  /**
   * Review 저장 함수
   * @param {User}user
   * @param {number}bookIdx
   * @param {string}text
   * @returns
   */
  async saveReview(user: User, bookIdx: number, text: string): Promise<Review> {
    try {
      const book: Book = await this.bookService.findBookByIdx(bookIdx)
      const review = this.reviewRepository.create({ user, book, text })
      return await this.reviewRepository.save(review)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * BookIdx를 활용한 Review List With User 조회 함수
   * @param {number}bookIdx
   * @returns {Review[]}
   */
  async findReviewListWithUser(bookIdx: number): Promise<Review[]> {
    try {
      return await this.reviewRepository.find({
        // where: { book: bookIdx },
        relations: ['user'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * Review With User 조회 함수
   * @param {number}idx
   * @returns {Review}
   */
  async findReviewWithUser(idx: number): Promise<Review> {
    try {
      return await this.reviewRepository.findOne({
        where: { idx },
        relations: ['user'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
