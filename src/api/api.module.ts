// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Custom Module Imports
import AuthModule from './auth/auth.module'
import BookModule from './book/book.module'
import CommentModule from './comment/comment.module'
import LikeBookModule from './likeBook/likeBook.module'
import MateModule from './mate/mate.module'
import PointModule from './point/point.module'
import QuizModule from './quiz/quiz.module'
import ReviewModule from './review/review.module'
import ReviewLikeModule from './reviewLike/reviewLike.module'
import UploadModule from './upload/upload.module'
import UserBookModule from './userBook/userBook.module'

@Module({
  imports: [
    AuthModule,
    BookModule,
    CommentModule,
    LikeBookModule,
    MateModule,
    PointModule,
    QuizModule,
    ReviewModule,
    ReviewLikeModule,
    UploadModule,
    UserBookModule,
  ],
})
export default class ApiModule {}
