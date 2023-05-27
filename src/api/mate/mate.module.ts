import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PointModule } from 'src/api/point/point.module'
import { MateService } from './application/mate.service'
import { MateRepository } from './infrastructure/mate.repository'
import { MateController } from './ui/mate.controller'

@Module({
  imports: [TypeOrmModule.forFeature([MateRepository]), PointModule],
  providers: [MateService],
  controllers: [MateController],
  exports: [MateService],
})
export class MateModule {}
