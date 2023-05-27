// ** Nest Imports
import { Module } from '@nestjs/common'

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm'

// ** Custom Module Imports
import PointModule from 'src/api/point/point.module'
import MateService from './service/mate.service'
import MateRepository from './repository/mate.repository'
import MateController from './controller/mate.controller'
import TypeOrmExModule from 'src/common/repository/typeOrmEx.module'

// ** Domain Imports
import Mate from './domain/mate.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Mate]),
    TypeOrmExModule.forCustomRepository([MateRepository]),
    PointModule,
  ],
  providers: [MateService],
  controllers: [MateController],
  exports: [MateService],
})
export default class MateModule {}
