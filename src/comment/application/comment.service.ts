import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { ReviewService } from 'src/review/application/review.service'
import { Review } from 'src/review/domain/review.entity'
import { Comment } from '../domain/comment.entity'
import { CommentRepository } from '../infrastructure/comment.repository'

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly reviewService: ReviewService,
  ) {}

  /**
   * Comment 저장 함수
   * @param {User}user
   * @param {string}text
   * @param {number}reviewIdx
   * @returns  {Comment}
   */
  async saveComment(user: User, text: string, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewWithUser(
        reviewIdx,
      )
      const comment: Comment = this.commentRepository.create({
        user,
        text,
        review,
      })
      return await this.commentRepository.save(comment)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * ReviewIdx를 활용한 Comment List Find 함수
   * @param {number}reviewIdx
   * @returns {Comment[]}
   */
  async getCommentList(reviewIdx: number): Promise<any> {
    try {
      // return await this.commentRepository.find({ where: { review: reviewIdx } })
      return null
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
