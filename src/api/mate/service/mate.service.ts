// ** Nest Imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// ** Domain Imports
import User from 'src/api/auth/domain/user.entity'
import Mate from '../domain/mate.entity'

// ** Custom Module Imports
import MateRepository from '../repository/mate.repository'

@Injectable()
export default class MateService {
  constructor(private readonly mateRepository: MateRepository) {}

  /**
   * Mate 조회 함수
   * @param {User}user
   * @returns {Mate}
   */
  async findMateById(user: User) {
    try {
      return null
      // return await this.mateRepository.findOne({ where: { user: user.idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * Mate 저장 함수
   * @param {User}user
   * @param {string}name
   * @returns {Mate}
   */
  async saveMate(user: User, name: string) {
    try {
      const mate: Mate = this.mateRepository.create({
        user,
        name,
      })
      return await this.mateRepository.save(mate)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * Mate With User 조회 함수
   * @param {User} user
   * @returns
   */
  async findMateWithUser(user: User) {
    try {
      return await this.mateRepository.findOne({
        // where: { user: user.idx },
        relations: ['user'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
