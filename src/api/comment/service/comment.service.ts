// ** Nest Imports
import { Injectable } from '@nestjs/common'

// ** Custom Module Imports
import CommentRepository from '../repository/comment.repository'
import ReviewRepository from 'src/api/review/repository/review.repository'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import RequestCommentFindDto from '../dto/comment.find.dto'
import { ApiResponse } from 'src/common/dto/api.response'
import { NotFoundException } from 'src/common/exception/customException'
import ExceptionMessage from 'src/common/exception/excepitionMessageEnum'

@Injectable()
export default class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  /**
   * Comment 저장 함수
   * @param {User}user
   * @param {string}text
   * @param {number}reviewIdx
   * @returns  {Comment}
   */
  public async saveComment(
    user: User,
    dto: RequestCommentFindDto,
    idx: number,
  ): Promise<ApiResponse<any>> {
    const findReview = await this.reviewRepository.findOne({
      where: { idx },
      relations: ['user'],
    })
    if (!findReview) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND_REVIEW)
    }
    const comment = this.commentRepository.create({
      user,
      text: dto.text,
      review: findReview,
    })

    return ApiResponse.of({
      data: await this.commentRepository.save(comment),
      message: 'Success Save Comment',
      statusCode: 200,
    })
  }

  /**
   * ReviewIdx를 활용한 Comment List Find 함수
   * @param {number}reviewIdx
   * @returns {Comment[]}
   */
  public async getCommentList(idx: number): Promise<ApiResponse<any>> {
    const findComment = await this.commentRepository.find({
      where: { review: { idx } },
    })
    return ApiResponse.of({
      data: findComment,
      statusCode: 200,
      message: 'Success Find Comment',
    })
  }
}
