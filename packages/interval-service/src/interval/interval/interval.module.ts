import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IntervalController } from './interval.controller'
import { IntervalService } from './interval.service'
import { InterEntity } from '../../entity/inter.entity'
@Module({
  imports: [TypeOrmModule.forFeature([InterEntity])],
  controllers: [IntervalController],
  providers: [IntervalService],
})
export class IntervalModule {}
