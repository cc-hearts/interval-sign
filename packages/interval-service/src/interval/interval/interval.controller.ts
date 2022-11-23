import { Controller, Get, Post } from '@nestjs/common'
import { successResponse } from 'src/lib/BaseResponse'
import { IntervalService } from './interval.service'

@Controller('interval')
export class IntervalController {
  constructor(private readonly intervalService: IntervalService) {}
  @Post('addInterval')
  async addInterval() {
    //
  }

  @Get('getIntervalById')
  async getIntervalById() {
    const [list, total] = await this.intervalService.getAllIntervalsList()
    return successResponse('获取任务列表成功', {
      list,
      total,
    })
  }
}
