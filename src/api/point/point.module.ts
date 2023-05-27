import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PointService } from './application/point.service'
import { PointRepository } from './infrastructure/point.repository'
import { PointController } from './ui/point.controller'

@Module({
  imports: [TypeOrmModule.forFeature([PointRepository])],
  controllers: [PointController],
  providers: [PointService],
  exports: [PointService],
})
export class PointModule {}
