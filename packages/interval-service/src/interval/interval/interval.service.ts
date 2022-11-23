import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InterEntity } from 'src/entity/inter.entity'
import { Repository } from 'typeorm'
@Injectable()
export class IntervalService {
  constructor(
    @InjectRepository(InterEntity)
    private readonly interRepository: Repository<InterEntity>,
  ) {}

  async getAllIntervalsList() {
    try {
      // pageSize 和 offset
      return await this.interRepository
        .createQueryBuilder('inter_task')
        .select([
          'inter_task.id',
          'inter_task.title',
          'inter_task.description',
          'inter_task.url',
          'inter_task.createTime',
          'inter_task.isDelete',
          'inter_task.params',
        ])
        .where(' inter_task.isDelete = :isDelete', { isDelete: 0 })
        .skip(0)
        .take(10)
        .getManyAndCount()
    } catch (e) {
      console.log(e)
    }
  }
}
