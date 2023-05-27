// ** Nest Imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import Review from 'src/api/review/domain/review.entity'
import ReviewLike from '../domain/reviewLike.entity'

// ** Custom Module Imports
import ReviewService from 'src/api/review/service/review.service'
import ReviewLikeRepository from '../repository/reviewLike.repository'

@Injectable()
export default class ReviewLikeService {
  constructor(
    private readonly reviewLikeRepository: ReviewLikeRepository,
    private readonly reviewService: ReviewService,
  ) {}

  /**
   * LikeReview 저장 함수
   * @param {User}user
   * @param {number}reviewIdx
   * @returns
   */
  async saveLikeReview(user: User, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewWithUser(
        reviewIdx,
      )
      const liked: boolean = await this.getLiked(user, review)
      if (liked) return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const reviewLike: ReviewLike = this.reviewLikeRepository.create({
        user,
        review,
      })
      return await this.reviewLikeRepository.save(reviewLike)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * LikeReview 취소 함수
   * @param {User}user
   * @param {number}reviewIdx
   * @returns
   */
  async cancelLike(user: User, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewWithUser(
        reviewIdx,
      )
      const liked: boolean = await this.getLiked(user, review)
      if (!liked)
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const reviewLike: ReviewLike = await this.reviewLikeRepository.findOne({
        // where: { user, review },
      })
      return await this.reviewLikeRepository.delete(reviewLike.idx)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * ReviewLike 조회 함수
   * @param user
   * @param review
   * @returns
   */
  async getLiked(user: User, review: Review) {
    try {
      const reviewLike: ReviewLike = await this.reviewLikeRepository.findOne({
        // where: { user, review: review.idx },
      })
      return reviewLike ? true : false
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  /**
   * ReviewLike List With User 조회 함수
   * @param reviewIdx
   * @returns
   */
  async getReviewLikeList(reviewIdx: number) {
    try {
      return await this.reviewLikeRepository.find({
        // where: { review: reviewIdx },
        relations: ['user'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  /** 임시로 사용하는 함수 */
  async testLike(user: User, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewWithUser(
        reviewIdx,
      )
      const liked: boolean = await this.getLiked(user, review)
      if (liked) {
        const reviewLike: ReviewLike = await this.reviewLikeRepository.findOne({
          // where: { user, review },
        })
        await this.reviewLikeRepository.delete(reviewLike.idx)
        return false
      } else {
        const reviewLike: ReviewLike = this.reviewLikeRepository.create({
          user,
          review,
        })
        await this.reviewLikeRepository.save(reviewLike)
        return true
      }
    } catch (err) {
      console.log(err)
    }
  }
}
