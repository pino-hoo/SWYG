import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { PointRepository } from '../infrastructure/point.repository'
import { Point } from '../domain/point.entity'

@Injectable()
export class PointService {
  constructor(private readonly pointRepository: PointRepository) {}

  /**
   * Point 저장 함수
   * @param {User}user
   * @param {number}point
   * @returns {Point}
   */
  async savePoint(user: User, point: number): Promise<Point> {
    try {
      const savePoint: Point = this.pointRepository.create({ user, point })
      return await this.pointRepository.save(savePoint)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * 보유한 Point를 조회 후 합하는 함수
   * @param user
   * @returns
   */
  async getSumPoint(user: User) {
    try {
      const point: Point[] = await this.pointRepository.find({
        where: { user: user.idx },
      })
      let sumPoint: number = 0
      for (const item of point) {
        sumPoint += item.point
      }
      return sumPoint
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
