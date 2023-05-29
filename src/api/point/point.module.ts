// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import PointService from './service/point.service'
import PointRepository from './repository/point.repository'
import PointController from './controller/point.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import Point from './domain/point.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Point]),
    TypeOrmExModule.forCustomRepository([PointRepository]),
  ],
  controllers: [PointController],
  providers: [PointService],
  exports: [PointService, TypeOrmExModule, TypeOrmModule],
})
export default class PointModule {}
